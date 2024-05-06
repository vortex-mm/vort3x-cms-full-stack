"use client"

import { useForm } from '@mantine/form'
import { Button, Drawer } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import FormInputBuilder from '@client-components/form-input-builder'
import TypeFormBuilder from '@client-components/type-form-builder'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/redux/store'
import { updateContent } from "@/redux/api/content";

type FormItem = {
  name: string
  label: string
  description: string
  dataType: string
  initialValues: string
  bluePrint: string
  validationRules: string[]
}

const SchemaFormList = () => {
  const primitiveDataTypes = ['String', 'Boolean', 'Number']
  const schema = useSelector((state: RootState) => state.schema.data)

  const content = useSelector((state: RootState) => state.content.data)

  const initialValues = content

  const form = useForm({
    initialValues
  })

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

  const [opened, { open, close }] = useDisclosure(false)

  const dispatch = useDispatch();

  return (
    <div className="container">
      <form onSubmit={form.onSubmit(values => dispatch(updateContent(values)))}>
        {Object.entries(form.values).map(([formName, formValue], index) => {
          const formItem = schema.forms.find(formItem => formItem.name === formName) || schema.forms[0]
          if (!primitiveDataTypes.includes(formItem.dataType)) {
            if (Array.isArray(formValue)) {
              return (
                <div key={`form-item-${index}`}>
                  <Button onClick={open}>Extra Fields {formName}</Button>
                  <Drawer opened={opened} onClose={close} title="Authentication">
                    {formValue.map((formSubValue, i) => (
                      <ul key={`form-collection-list-${i}`}>
                        <TypeFormBuilder
                          form={form}
                          formValue={formSubValue as FormItem}
                          formItem={formItem}
                          formItemName={`${formItem.name}.${i}`}
                        />
                      </ul>
                    ))}
                    <Button onClick={() => form.insertListItem(formName, formValue[0])}>Add {formName}</Button>
                  </Drawer>
                </div>
              )
            } else {
              return (
                <div key={`form-item-${index}`}>
                  <TypeFormBuilder
                    form={form}
                    formValue={formValue as FormItem}
                    formItem={formItem}
                    formItemName={formItem.name}
                  />
                </div>
              )
            }
          } else {
            return (
              <FormInputBuilder
                key={`form-item-${index}`}
                formItem={formItem}
                formProps={{
                  ...form.getInputProps(formName),
                  ...extraProps(formItem.bluePrint)
                }}
              />
            )
          }
        })}
        <Button color="green" type="submit">
          Submit
        </Button>
      </form>
    </div>
  )
}

export default SchemaFormList
