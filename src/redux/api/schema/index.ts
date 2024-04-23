import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  data: {
    id: 'ProductSchema',
    name: 'Product Schema',
    tag: 'product',
    isSchema: true,
    isCollection: false,
    formList: [
      {
        name: 'sliders',
        label: 'Sliders',
        description: 'To store the product',
        dataType: 'SliderType',
        initialValues: '',
        bluePrint: 'TextInput',
        unstructured: '',
        validationRules: ['required']
      },
      {
        name: 'banner',
        label: 'Banner Description',
        description: 'To store the product',
        dataType: 'BannerType',
        initialValues: '',
        bluePrint: 'TextInput',
        unstructured: '',
        validationRules: ['required']
      },
      // {
      //   name: 'product_page',
      //   label: 'Product Page',
      //   description: 'To store the product',
      //   dataType: 'String',
      //   initialValues: '',
      //   bluePrint: 'RichTextInput',
      //   validationRules: ['required']
      // },
      {
        name: 'product_categories',
        label: 'Product Category',
        description: 'To store the product',
        dataType: 'String',
        initialValues: '',
        bluePrint: 'Select',
        validationRules: ['required']
      }
      // {
      //   name: 'product_banners',
      //   label: 'Product Banners',
      //   description: 'To show the banner',
      //   dataType: 'CustomType',
      //   initialValues: '',
      //   bluePrint: 'TextInput',
      //   validationRules: ['required']
      // },
      // {
      //   name: 'product_custom',
      //   label: 'Product Banners',
      //   description: 'To show the banner',
      //   dataType: 'CustomType',
      //   initialValues: 'React',
      //   bluePrint: 'Select',
      //   validationRules: ['required']
      // }
    ]
  },
}

const schemaSlice = createSlice({
  name: 'schema',
  initialState,
  reducers: {
    setActiveId() {
      // state.activeId = action.payload
    }
  }
})

export const { setActiveId } = schemaSlice.actions

export default schemaSlice.reducer
