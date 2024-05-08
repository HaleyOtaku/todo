import { useAuth } from "../../contexts/AuthContext"
import { useState } from "react"
import CatEdit from "./CatEdit"
//We need to import Axios into this component for delete funtionality
import axios from "axios"
//For our edit and delete buttons, we want to use a FontAwesome icon on each
//We will use react-icons to access the FontAwesome library (npm install react-icons)
import { FaEdit, FaTrashAlt } from "react-icons/fa"

//Below in the parens we destructure the category prop on the fly by passing category in a set of curly braces
export default function SingleCategory({ category, getCategories }) {
  //Below we destructure the name and description properties from the category received in the props.
  //This cleans up thye syntax in our UI and is a more efficient way to write this child component.

  const { catName, catDesc, categoryId } = category

  //We need the currentUser to check for the Admin and render edit UI
  const { currentUser } = useAuth()

  //The below hook tracks whether we show/hide the edit form
  const [showEdit, setShowEdit] = useState(false)

  //We need the resources from the DB to check if a category contains any resources
  //before the user tries to delete it.
  const [todos, setTodos] = useState([])

  //Below is the function to delete a category
  const deleteCat = (id) => {
    //we wait for confirmation from the user before making our delete request
    //if the user clicks 'cancel', this scope will be skipped
    if (window.confirm(`Are you sure you want to delete ${catName}?`)) {
      //If the user wants to delete, grab the resources from the API:
      axios.get(`https://localhost:7011/api/ToDos`).then((t) => {
        setTodos(t.data)
      })
      const filteredTodos = todos.filter((t) => t.categoryId === id)

      if (filteredTodos.length > 0) {
   
        window.alert(`Error! Cannot delete the category ${catName} because it contains the following resources:
        ${filteredTodos.map((t) => `\n${t.name}`)}
          \nPlease delete these resources or reassign them to a different category before deleting ${catName}.`)
      } else {
        axios
          .delete(`https://localhost:7011/api/Categories/${id}`)
          .then(getCategories)
      }
    }
  }
  return (
    <tr>
      <td>{catName}</td>
      <td>{catDesc}</td>
    
      {currentUser.email === import.meta.env.VITE_ADMIN_EMAIL && (
        <td>
          <button
            onClick={() => setShowEdit(true)}
            id="editLink"
            className="m-1 rounded"
          >
            <FaEdit />
          </button>
          <button
            onClick={() => deleteCat(categoryId)}
            id="deleteLink"
            className="m-1 rounded"
          >
            <FaTrashAlt />
          </button>
          {showEdit && (
            <CatEdit
              setShowEdit={setShowEdit} 
              showEdit={showEdit} 
              getCategories={getCategories} 
              category={category}
            />
          )}
        </td>
      )}
    </tr>
  )
}
