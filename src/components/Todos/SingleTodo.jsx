import './Todos.css'
import { useAuth } from "../../contexts/AuthContext"
import { FaEdit, FaTrashAlt } from 'react-icons/fa'
import TodoEdit from './TodoEdit'
import { useState } from 'react'
// import axios from 'axios'

export default function SingleTodo({todo, getTodos}) {
  const {name, done } = todo //add toDoId for delete functionality
  const {currentUser} = useAuth()
  const [showEdit, setShowEdit] = useState(false)
  
  // const deleteTodo = (id) => {
  //   if(window.confirm(`Are you sure you want to delete ${name}?`)){
  //     axios.delete(`http://todoapi.haleykillingsworth.com/api/ToDos/${id}`).then(getTodos)
  //   }
  // }

  return (
    <div className="singleTodo col-md-8 offset-md-2 bg-dark">
      {currentUser.email === import.meta.env.VITE_ADMIN_EMAIL && (
        <div>
          <button onClick={() => setShowEdit(true)} id="editLink">
            <FaEdit />
          </button>
          <button id="deleteLink">
            <FaTrashAlt />
          </button>
          {showEdit && (
            <TodoEdit
              showEdit={showEdit}
              setShowEdit={setShowEdit}
              todo={todo}
              getTodos={getTodos}
            />
          )}
        </div>
      )}

      <div className="row mt-3">
        <p className="col-md-4 offset-md-3">{name}</p>
        <div className="col-md-2">
          <input className='checkmark' type="checkbox" checked={done}/>
        </div>
      </div>
    </div>
  )
}