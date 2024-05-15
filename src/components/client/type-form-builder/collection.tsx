import { UseFormReturnType } from '@mantine/form'
import TypeFormBuilder, { type TypeFormObj } from '.'
import { useCallback, useEffect, useState } from 'react'
import { MdFormatListBulletedAdd } from "react-icons/md";

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
      <div className="form-list vertical">
        <ul>
          <li className="form-add" onClick={() => form.insertListItem(formType, formValue[0])}>
            <MdFormatListBulletedAdd />
          </li>
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
      <div className="form-panel">
        <TypeFormBuilder
          form={form}
          formValue={formValue[formSubValueIndex]}
          formType={formType}
          formItemName={getFormItemName(formSubValueIndex)}
        />
      </div>
    </div>
  )
}

export default TypeFormCollectionBuilder
