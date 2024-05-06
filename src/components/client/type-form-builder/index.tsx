import { UseFormReturnType } from '@mantine/form'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import FormInputBuilder from '@client-components/form-input-builder'

export type TypeFormObj = { [key: string]: string }

export type FormItem = {
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
  formValue,
  formType,
  formItemName
}: {
  form: UseFormReturnType<object, (values: object) => object>
  formValue: TypeFormObj
  formType: string
  formItemName?: string
}) => {
  const type = useSelector((state: RootState) => state.type.collection.find(item => item.tag === formType))

  if (!type) {
    return <h1>Collection have not found your type</h1>
  }

  const extraProps = (componentType: string) => {
    const props = new Map([
      [
        'TextInput',
        {
          wrapperClassName: 'form-text-input'
        }
      ],
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

  const getFormItem = (name: string) => {
    return type.forms.find(formItem => formItem.name === name) || type.forms[0]
  }

  const formItemKeys = formValue ? Object.keys(formValue): []

  const formItems = formItemKeys.map(formItemKey => getFormItem(formItemKey))
  return (
    <>
      {formItems.map((formItem, indx) => {
        const formName = `${formItemName}.${formItem.name}`
        return (
          <FormInputBuilder
            key={`form-sub-item-${indx}`}
            formItem={formItem}
            formProps={{
              ...form.getInputProps(formName),
              ...extraProps(formItem.bluePrint)
            }}
          />
        )
      })}
    </>
  )
}

export default TypeFormBuilder
