import SchemaFormList from '@/components/client/schema-form-list'

async function getData() {
  const res = await fetch('http://localhost:3000/api/v1/types')
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

const Home = async () => {
  const data = await getData()

  return (
    <SchemaFormList collection={data} />
  )
}

export default Home
