import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const userData = [
  {
    name: 'Alice',
    email: 'alice@prisma.io'
  },
  {
    name: 'Nilu',
    email: 'nilu@prisma.io'
  },
  {
    name: 'Mahmoud',
    email: 'mahmoud@prisma.io'
  }
]

const typeData = [
  {
    name: 'Banner Type',
    tag: 'banner_type',
    isSchema: false,
    isCollection: true,
    forms: {
      create: [
        {
          name: 'banner_name',
          label: 'Banner Name',
          description: 'To store the banner',
          dataType: 'String',
          initialValues: '',
          bluePrint: 'TextInput',
          validationRules: ['required']
        },
        {
          name: 'banner_description',
          label: 'Banner Description',
          description: 'To store the banner',
          dataType: 'String',
          initialValues: '',
          bluePrint: 'RichTextInput',
          validationRules: ['required']
        },
        {
          name: 'banner_types',
          label: 'Banner Types',
          description: 'To store the banner type',
          dataType: 'String',
          initialValues: 'React',
          bluePrint: 'Select',
          validationRules: ['required']
        },
      ]
    }
  },
  {
    name: 'Custom Type',
    tag: 'custom_type',
    isSchema: false,
    isCollection: true,
    forms: {
      create: [
        {
          name: 'custom_name',
          label: 'Custom Name',
          description: 'To store the custom',
          dataType: 'String',
          initialValues: '',
          bluePrint: 'TextInput',
          validationRules: ['required']
        },
        {
          name: 'custom_description',
          label: 'Custom Description',
          description: 'To store the custom',
          dataType: 'String',
          initialValues: 'React',
          bluePrint: 'TextInput',
          validationRules: ['required']
        }
      ]
    }
  },
  {
    name: 'Slider Type',
    tag: 'slider_type',
    isSchema: false,
    isCollection: false,
    forms: {
      create: [
        {
          name: 'title',
          label: 'Title',
          description: 'To store the custom',
          dataType: 'String',
          initialValues: '',
          bluePrint: 'TextInput',
          validationRules: ['required']
        },
        {
          name: 'content',
          label: 'Image content',
          description: 'To store the custom',
          dataType: 'String',
          initialValues: '',
          bluePrint: 'TextInput',
          validationRules: ['required']
        }
      ]
    }
  }
]


const contentData = [
  {
    typeName: "banner_type",
    contents: [
      {
        banner_name: "",
        banner_description: "",
        banner_types: "React"
      },
      {
        banner_name: "",
        banner_description: "",
        banner_types: "React"
      },
      {
        banner_name: "",
        banner_description: "",
        banner_types: "React"
      }
    ]
  },
  {
    typeName: "custom_type",
    contents: [
      {
        custom_name: "test",
        custom_description: "React"
      }
    ]
  },
  {
    typeName: "slider_type",
    contents: [
      {
        slider_title: "",
        slider_content: ""
      }
    ]
  }
];

async function upsertContent(typeName: string, contentValue: object, index: number) {
  const type = await prisma.type.findFirst({ where: { tag: typeName } });
  if (type) {
    await prisma.content.create({
      data: {
        value: contentValue,
        typeId: type.id,
        index
      }
    });
  }
}

async function main() {
  console.log(`Start seeding ...`)
  for (const u of userData) {
    const user = await prisma.user.create({
      data: u
    })
    console.log(`Created user with id: ${user.id}`)
  }

  for (const t of typeData) {
    const type = await prisma.type.create({
      data: t
    })
    console.log(`Created type with id: ${type.id}`)
  }

  for (const item of contentData) {
    const typeName = item.typeName;
    const contents = item.contents;
    
    contents.map(async (content, index) => {
      await upsertContent(typeName, content, index);
    })
  }
  console.log(`Seeding finished.`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async e => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
