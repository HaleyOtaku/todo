//This component will house the form for creating AND editing a category
import { catSchema } from "../../utilities/validationSchema"
import axios from "axios"
import { Formik, Form, Field } from "formik"

export default function CatForm({category = '', setShowCreate, getCategories, setShowEdit}) {

const {catName, catDesc, categoryId} = category || ''

  const handleSubmit = (values) => {
    console.log(values)
    if(!category){
      //If we fall into these scopes, there is NO category prop, so we are in CREATE mode
      //Below, we create a temp object to send in our API POST request
      const catToCreate = values

      //send the object in a POST request using Axios:
      axios.post(`https://localhost:7011/api/Categories`, catToCreate).then(() => {
        setShowCreate(false) //this will close the form..passed as a prop from Categories.jsx
        getCategories() //this updates the Categories table..also a prop from Categories.jsx
      })
    } else{
      //If we fall into these scopes, there IS a category prop, so we are in EDIT mode
      //Make the temp object to send in our API PUT request
      const catToEdit = {
        categoryId : categoryId,
        categoryName : values.catName,
        categoryDescription : values.catDesc
      }
      //Now we can send the catToEdit in a PUT request to the proper API endpoint (need the id!)
      axios.put(`https://localhost:7011/api/Categories/${categoryId}`, catToEdit).then(() => {
        setShowEdit(false)
        getCategories()
      })
    }
  }

  return (
    <div className="createCategory m-2 text-white text-center">
      <Formik
        initialValues={{
         //Below is a ternary operator that makes our form behave differently based on whether we have a prop called category (edit mode if true)
         categoryName: category ? catName : '',
         categoryDescription: category ? catDesc : ''
        }}
        validationSchema={catSchema} 
        onSubmit={(values) => handleSubmit(values)} >
        {({errors, touched}) => (
          //The form will be rendered below, passing in errors and touched, which are 2 values we destructure off of the Formik component
          <Form id='catForm' className="row text-center m-auto">
            <div className="form-group m-1 p-1">
              <Field name='categoryName' className='form-control' placeholder='Name'/>
              {/* The errors are conditionally rendered below */}
              {errors.catName && touched.catName &&
              <div className="text-danger">{errors.catName}</div>
              }
            </div>
            <div className="form-group m-1 p-1">
              <Field name='categoryDescription' className='form-control' placeholder='Description'/>
              {/* The errors are conditionally rendered below */}
              {errors.catDesc && touched.catDesc &&
              <div className="text-danger">{errors.catDesc}</div>
              }
            </div>
            <div className="form-group m-1">
              <button type="submit" className="btn btn-success">
                Submit Category to API
              </button>
              </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}