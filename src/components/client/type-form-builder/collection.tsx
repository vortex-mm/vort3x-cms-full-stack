import { UseFormReturnType } from '@mantine/form'
import { Button } from '@mantine/core'
import TypeFormBuilder, { type TypeFormObj } from '.'
import { useCallback, useEffect, useState } from 'react'

const TypeFormCollectionBuilder = ({
  form,
  formValue,
  formType
}: {
  form: UseFormReturnType<object, (values: object) => object>
  formValue: TypeFormObj[]
  formType: string
}) => {
  const getFormItemName = useCallback((index: string | number) => `${formType}.${index}`, [formType])
  const [tab, setTab] = useState(getFormItemName(0))
  useEffect(() => {
    setTab(getFormItemName(0))
  }, [getFormItemName])

  const handleTabChange = (tab: string) => {
    setTab(tab)
  }

  const isActiveTab = (name: string) => (name === tab ? 'active' : '')

  const formSubValueIndex = formValue.findIndex((_formSubValue, i) => getFormItemName(i) === tab) || 0
  return (
    <div className="form-collection">
      <div className="form-list">
        <ul>
          {formValue.map((_formSubValue, i) => (
            <li
              key={`form-sub-list-${i}`}
              className={isActiveTab(getFormItemName(i))}
              onClick={() => handleTabChange(getFormItemName(i))}
            >
              {i + 1} Item
            </li>
          ))}
        </ul>
      </div>
      <div>
        <TypeFormBuilder
          form={form}
          formValue={formValue[formSubValueIndex]}
          formType={formType}
          formItemName={getFormItemName(formSubValueIndex)}
        />
        <Button onClick={() => form.insertListItem(formType, formValue[0])}>Add {formType}</Button>
      </div>
      {/* <Drawer opened={opened} onClose={close} title="Authentication">
        {formValue.map((formSubValue, i) => (
          <ul key={`form-collection-list-${i}`}>
            <TypeFormBuilder
              form={form}
              formValue={formSubValue}
              formType={formType}
              formItemName={`${formType}.${i}`}
            />
          </ul>
        ))}
      </Drawer> */}
    </div>
  )
}

export default TypeFormCollectionBuilder
