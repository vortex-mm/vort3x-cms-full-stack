import SchemaFormList from '@/components/client/schema-form-list'

async function getData() {
  const res = await fetch('http://localhost:3000/api/v1/types')
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

async function getContentData() {
  const res = await fetch('http://localhost:3000/api/v1/contents')
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

type FormItem = {
  name: string
  label: string
  description: string
  dataType: string
  initialValues: string
  bluePrint: string
  validationRules: string[]
}

export type TypesServerProps = {
  id: string
  name: string
  tag: string
  isSchema: boolean
  isCollection: boolean
  forms: FormItem[]
}

export type ContentServerProps = {
  [typeTag: string]: { [typeItemName: string]: string }[] | { [typeItemName: string]: string }
}

const Home = async () => {
  const data = await getData()
  const contentData = await getContentData()

  return <SchemaFormList collection={data} initialContent={contentData} />
}

export default Home
