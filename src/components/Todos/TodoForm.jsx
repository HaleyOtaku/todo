import { useState,useEffect } from "react"
import { Formik, Field, Form} from "formik"
import {todoSchema} from "../../utilities/validationSchema.js"
import axios from "axios"

export default function TodoForm({
  todo = "",
  setShowCreate,
  getTodos,
  setShowEdit

}) {
  const {name, categoryId, toDoId} = todo || ""
  const[categories, setCategories] = useState([])

  useEffect(() => {
    axios.get(`https://localhost:7011/api/Categories`).then((response) => {
      console.log(response)
      setCategories(response.data)
    })
  }, [])

    const handleSubmit = (values) => {
      console.log(values)

      if(!todo){
        const todoToCreate = values

        axios
          .post(`https://localhost:7011/api/ToDos`, todoToCreate)
          .then(() => {
            setShowCreate(false)
            getTodos()

          })
      }
      else
      {
        const todoToEdit = {
          toDoId: toDoId,
          name: values.name,
          categoryId: values.categoryId
        }

        axios.put(`https://localhost:7011/api/ToDos/${toDoId}`, todoToEdit).then(() => {
          setShowEdit(false)
          getTodos()
        })

      }
    }

  return (
    <Formik
      initialValues={{
        name: todo ? name : "",
        categoryId: todo ? categoryId : ""
      }}

      validationSchema={todoSchema}
      onSubmit={(values) => handleSubmit(values)}
      >

        {({errors, touched}) => (
          <Form id="todoForm">
            <div className="form-group m-3">
              <Field name='name' className='form-control' placeholder='Name' />
              {errors.name && touched.name && (
                <div className="text-danger">{errors.name}</div>
              )}
             
            </div>

            <div className="form-group m-3">
            <Field as="select" name="categoryId" className="form-control">
              <option value="" disabled>
                [ -- Please Choose --]
              </option>
              {/* Below we map an option for each category in our DB */}
              {categories.map((cat) => (
                <option key={cat.categoryId} value={cat.categoryId}>
                  {cat.catName}
                </option>
              ))}
            </Field>
          </div>
            <div className="form-group m-3">
              <button type="submit" className="btn btn-success m-3">
                Submit Resource to API
              </button>
            </div>
          </Form>
        )}
    </Formik>
  )
}