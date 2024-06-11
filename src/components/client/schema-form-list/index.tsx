'use client'

import { useForm } from '@mantine/form'
import { Button } from '@mantine/core'
import TypeFormBuilder, { TypeFormObj } from '@client-components/type-form-builder'
import { useDispatch } from 'react-redux'
import { ContentServerProps, TypesServerProps } from '~/src/app/form/page'
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

const SchemaFormList = ({ collection, initialContent }: { collection: TypesServerProps[], initialContent: ContentServerProps }) => {

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

  const initialValues = isEmpty(initialContent)
    ? collection.reduce((combineFormItem, formItem) => {
        return {
          ...combineFormItem,
          [formItem.tag]: formItem.isCollection
            ? [generateFormObject(formItem.forms)]
            : generateFormObject(formItem.forms)
        }
      }, {})
    : initialContent

  const form = useForm({
    initialValues
  })

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(updateTypeCollection(collection))
  }, [collection, dispatch])

  const collectionTabs = collection.map(item => ({ tag: item.tag, name: item.name }))

  type TypeFormEntries = [string, Array<TypeFormObj> | TypeFormObj][]
  const formEntries: TypeFormEntries = Object.entries(form.values)

  const [tab, setTab] = useState(collectionTabs[0].tag)

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
              {collectionTabs.map((tab, index) => 
                <li className={isActiveTab(tab.tag)} key={`tab-${index}`} onClick={() => handleTabChange(tab.tag)}>
                  {tab.name}
                </li>
              )}
            </ul>
          </div>
          <form onSubmit={form.onSubmit(values => console.log({ values }))}>
            <div className="form-panel">
              {isFormValueCollection ? (
                <TypeFormCollectionBuilder form={form} formValue={formValue} formType={formType} />
              ) : (
                <TypeFormBuilder form={form} formValue={formValue} formType={formType} formItemName={formType} />
              )}
            </div>
            <div className="form-btn-submit">
              <Button type="submit">
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
