import { UseFormReturnType } from '@mantine/form'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import FormInputBuilder from '@client-components/form-input-builder'

type FormItem = {
  name: string
  label: string
  description: string
  dataType: string
  initialValues: string
  bluePrint: string
  validationRules: string[]
}

const TypeFormBuilder = ({
  form,
  formItem,
  formValue,
  formItemName
}: {
  form: UseFormReturnType<object, (values: object) => object>
  formItem: FormItem
  formValue: FormItem
  formItemName: string
}) => {
  const typeCollection = useSelector((state: RootState) => state.type.collection)

  const type = typeCollection.find(repo => repo.id === formItem.dataType) || typeCollection[0]

  const extraProps = (componentType: string) => {
    const props = new Map([
      ['TextInput', {}],
      [
        'Select',
        {
          clearable: true,
          data: ['React', 'Angular']
        }
      ]
    ])
    return props.get(componentType)
  }

  return (
    <>
      {Object.entries(formValue).map(([subFormName], indx) => {
        const subFormItem = type.formList.find(formItem => formItem.name === subFormName) || type.formList[0]
        const formName = `${formItemName}.${subFormItem.name}`
        return (
          <FormInputBuilder
            key={`form-sub-item-${indx}`}
            formItem={subFormItem}
            formProps={{
              ...form.getInputProps(formName),
              ...extraProps(subFormItem.bluePrint)
            }}
          />
        )
      })}
    </>
  )
}

export default TypeFormBuilder
