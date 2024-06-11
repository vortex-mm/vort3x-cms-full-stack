import { JsonValue } from '@prisma/client/runtime/library';
import { NextResponse } from 'next/server';
import prisma from '~/prisma';

interface Content {
  id: number;
  value: JsonValue;
  type: {
    tag: string;
    isCollection: boolean;
  };
}

interface BulkContentRequest {
  contents: {
    value: JsonValue;
    typeId: number;
    index: number;
  }[];
}


export async function GET() {
  try {
    const contents: Content[] = await prisma.content.findMany({
      include: {
        type: true
      }
    });

    const groupedContents = groupContentsByTag(contents);

    return NextResponse.json(groupedContents);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' });
  }
}

function groupContentsByTag(contents: Content[]) {
  return contents.reduce((result: Record<string, JsonValue[]>, content) => {
    const { tag } = content.type;
    const isCollection = content.type.isCollection;

    if (!result[tag]) {
      result[tag] = [];
    }

    if (isCollection) {
      result[tag].push(content.value);
    } else {
      result[tag].push([content.value]);
    }

    return result;
  }, {});
}


export async function POST(req: BulkContentRequest) {
  try {
    const { contents } = req;

    for (const content of contents) {
      const { typeId, index, value } = content;

      // Update existing content
      await prisma.content.updateMany({
        where: { typeId, index },
        data: { value: value || {} },
      });

      // Find the maximum index for the type ID from the payload
      const maxIndex = Math.max(...contents.filter(c => c.typeId === typeId).map(c => c.index));

      // Create new content entries for remaining indexes
      for (let i = index + 1; i <= maxIndex; i++) {
        // Check if content with this index already exists
        const existingContent = await prisma.content.findFirst({
          where: { typeId, index: i },
        });
        if (!existingContent) {
          await prisma.content.create({
            data: { value: {}, typeId, index: i },
          });
        }
      }

      // Delete existing content entries beyond the payload index
      await prisma.content.deleteMany({
        where: { typeId, index: { gt: maxIndex } },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ success: false, message: 'Internal Server Error' });
  }
}
