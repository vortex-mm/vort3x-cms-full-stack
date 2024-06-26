import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  collection: [
    {
      id: 'BannerType',
      name: 'Banner Type',
      tag: 'banner',
      isSchema: false,
      isCollection: true,
      forms: [
        {
          name: 'banner_name',
          label: 'Banner Name',
          description: 'To store the banner',
          dataType: 'String',
          initialValues: '',
          bluePrint: 'TextInput',
          validationRules: ['required']
        },
        {
          name: 'banner_description',
          label: 'Banner Description',
          description: 'To store the banner',
          dataType: 'String',
          initialValues: '',
          bluePrint: 'TextInput',
          validationRules: ['required']
        }
      ]
    },
    {
      id: 'CustomType',
      name: 'Custom Type',
      tag: 'custom',
      isSchema: false,
      isCollection: true,
      forms: [
        {
          name: 'custom_name',
          label: 'Custom Name',
          description: 'To store the custom',
          dataType: 'String',
          initialValues: '',
          bluePrint: 'TextInput',
          validationRules: ['required']
        },
        {
          name: 'custom_description',
          label: 'Custom Description',
          description: 'To store the custom',
          dataType: 'String',
          initialValues: 'React',
          bluePrint: 'TextInput',
          validationRules: ['required']
        }
      ]
    },
    {
      id: 'SliderType',
      name: 'Slider Type',
      tag: 'slider',
      isSchema: false,
      isCollection: false,
      forms: [
        {
          name: 'title',
          label: 'Title',
          description: 'To store the custom',
          dataType: 'String',
          initialValues: '',
          bluePrint: 'TextInput',
          validationRules: ['required']
        },
        {
          name: 'content',
          label: 'Image content',
          description: 'To store the custom',
          dataType: 'String',
          initialValues: '',
          bluePrint: 'TextInput',
          validationRules: ['required']
        },
        {
          name: 'image_url',
          label: 'Image url',
          description: 'To store the custom',
          dataType: 'String',
          initialValues: '',
          bluePrint: 'TextInput',
          validationRules: ['required']
        }
      ]
    }
  ],
  activeId: 'BannerType'
}

const typeSlice = createSlice({
  name: 'type',
  initialState,
  reducers: {
    setActiveId(state, action) {
      state.activeId = action.payload
    },
    updateTypeCollection(state, action) {
      state.collection = action.payload
    }
  }
})

export const { setActiveId, updateTypeCollection } = typeSlice.actions

export default typeSlice.reducer
