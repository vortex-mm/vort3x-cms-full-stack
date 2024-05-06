'use client'

import { useForm } from '@mantine/form'
import { Button } from '@mantine/core'
import TypeFormBuilder, { TypeFormObj } from '@client-components/type-form-builder'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/redux/store'
import { TypesServerProps } from '~/src/app/form/page'
import { useEffect, useState } from 'react'
import { updateTypeCollection } from '~/src/redux/api/type'
import TypeFormCollectionBuilder from '../type-form-builder/collection'

type FormItem = {
  name: string
  label: string
  description: string
  dataType: string
  initialValues: string
  bluePrint: string
  validationRules: string[]
}

const SchemaFormList = ({ collection }: { collection: TypesServerProps[] }) => {
  const content = useSelector((state: RootState) => state.content.data)

  function isEmpty(obj: object) {
    return Object.keys(obj).length === 0
  }

  const generateFormObject = (forms: FormItem[]) =>
    forms.reduce((combineFormItem, formItem) => {
      return {
        ...combineFormItem,
        [formItem.name]: formItem.initialValues
      }
    }, {})

  const initialValues = isEmpty(content)
    ? collection.reduce((combineFormItem, formItem) => {
        return {
          ...combineFormItem,
          [formItem.tag]: formItem.isCollection
            ? [generateFormObject(formItem.forms)]
            : generateFormObject(formItem.forms)
        }
      }, {})
    : content

  const form = useForm({
    initialValues
  })

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(updateTypeCollection(collection))
  }, [collection, dispatch])

  type TypeFormEntries = [string, Array<TypeFormObj> | TypeFormObj][]
  const formEntries: TypeFormEntries = Object.entries(form.values)

  const [tab, setTab] = useState('SliderType')

  const activeTabIndex = formEntries.findIndex(([formType]) => formType === tab)
  const [formType, formValue] = formEntries[activeTabIndex]
  const isFormValueCollection = Array.isArray(formValue)

  const handleTabChange = (tab: string) => {
    setTab(tab)
  }

  const isActiveTab = (name: string) => (name === tab ? 'active' : '')

  return (
    <div className="form-page-container">
      <div className="container">
        <div className="title">
          <h1>Update Content</h1>
          <h2>Manage your content and upload to your database.</h2>
        </div>
        <div className="form-container">
          <div className="form-list">
            <ul>
              <li className={isActiveTab('SliderType')} onClick={() => handleTabChange('SliderType')}>
                General
              </li>
              <li className={isActiveTab('BannerType')} onClick={() => handleTabChange('BannerType')}>Banner Type</li>
              <li className={isActiveTab('CustomType')} onClick={() => handleTabChange('CustomType')}>Custom Type</li>
            </ul>
          </div>
          <form onSubmit={form.onSubmit(values => console.log({ values }))}>
            <div className="form-panel">
              {isFormValueCollection ? (
                <TypeFormCollectionBuilder form={form} formValue={formValue} formType={formType} />
              ) : (
                <TypeFormBuilder form={form} formValue={formValue} formType={formType} formItemName={formType} />
              )}
              <Button color="green" type="submit">
                Submit
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SchemaFormList
