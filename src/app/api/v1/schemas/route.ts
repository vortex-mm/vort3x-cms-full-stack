import { NextResponse } from "next/server";

export async function GET() {
  try {
    const schemas = {}

    return NextResponse.json(schemas);
  } catch (e) {
    console.log({ e });
    return NextResponse.json({});
  }
}