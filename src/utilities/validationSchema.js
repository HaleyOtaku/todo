//To begin Create/Edit implementation, `npm install formik yup` (both formik AND yup)

//This file will house the schemas for both resources and categories for the create/edit form.
//To bring in a simple validation implementation, we are going to use Yup by installing it in
//our app (npm install yup) see implementation below

//Yup will work in tandem with Formik, which is an npm package that creates and stores form
//inputs for each item (catName, catDesc) that we need to capture in our forms.

//(npm install formik)

import * as Yup from 'yup'

const catSchema = Yup.object().shape({
  categoryName: Yup.string().max(25, 'Max 25 characters').required('Category name is required!'),
  categoryDesc: Yup.string().max(100, 'Max 100 characters')
})

const todoSchema = Yup.object().shape({
  name: Yup.string(). max(25, 'Max 25 characters').required('Resource name is required!'),
  categoryId: Yup.number().required()
})

export {catSchema, todoSchema}