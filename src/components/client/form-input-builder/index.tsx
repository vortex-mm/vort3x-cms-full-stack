import InputRegistery from '@client-components/input-registery'
import { SelectProps, TextInputProps } from '@mantine/core'

type FormInputProps = TextInputProps & SelectProps & {
  wrapperClassName?: string
}

interface FormInputBuilderProps {
  name: string
  label: string
  description: string
  dataType: string
  bluePrint: string
  validationRules: string[]
  initialValues?: string
}

type InputBluePrint = keyof typeof InputRegistery

const FormInputBuilder = ({ formItem, formProps }: { formItem: FormInputBuilderProps; formProps: FormInputProps }) => {
  const { bluePrint, label, description } = formItem
  const { wrapperClassName, ...remainFormProps } = formProps

  if (bluePrint in InputRegistery) {
    const FormInput = InputRegistery[bluePrint as InputBluePrint]
    return (
      <div className={wrapperClassName}>
        <FormInput label={label} placeholder={description} {...remainFormProps} />
      </div>
    )
  }

  return <h1>Error: Blueprint does not exist in Form Input Registry</h1>
}

export default FormInputBuilder 
