import './Todos.css'

//Steps to Read functionality
//1. add useState and useEffect to the react import
import { useState,useEffect } from "react"
//2. install and import axios
import axios from "axios"
import SingleTodo from "./SingleTodo"
import FilterTodo from './FilterTodo'
import { useAuth } from '../../contexts/AuthContext'
import TodoCreate from './TodoCreate'

//3. create the hook to store the data
//4. create the function that uses axios to get the resources
//5. create useEffect to automate retrieval of data in this component
//----- You should now have your data stored, and now on to the UI
//6. use .map to render each resource to the screen (also add any supplemental UI (container for the gallery)...combo of Resources/SingleResource)

export default function Todos() {

  const [todos, setTodos] = useState([])

  const [showCreate, setShowCreate] = useState(false)

  const { currentUser } = useAuth()

  const [filter, setFilter] = useState(0)

  const getTodos = () => {
    axios.get(`http://todoapi.haleykillingsworth.com/api/ToDos`).then(response => {
      setTodos(response.data)
    })
  }

  useEffect(() => {
    getTodos()
  }, [])


  return (
    <section className="todos">
      <article className="alert alert-success p-5">
        <h1 className="text-center">
          To Do Dashboard
        </h1>
      </article>

      {currentUser.email == import.meta.env.VITE_ADMIN_EMAIL && (
        <div className="bg-dark p-2 mb-3 text-center">
          <button
            onClick={() => setShowCreate(!showCreate)}
            className='btn btn-info'
          >
            {!showCreate ? "Create New To-Do" : "Close Form" }
          </button>
            <div className="createContainer">
              {showCreate && (
                <TodoCreate
                  getTodos={getTodos}
                  setShowCreate={setShowCreate}
                />
              )}
            </div>
        </div>

      )}



      <FilterTodo setFilter={setFilter}/>
      <div className="container mt-5">
        <article className="row justify-content-center">
        {filter === 0 ? todos.map(t => 
            <SingleTodo 
              key={t.toDoId}
              todo={t}
            />
          ) :
          todos.filter(t => t.categoryId === filter).map(t => 
            <SingleTodo 
              key={t.toDoId}
              todo={t}
            />
          )}

          {filter !== 0 && todos.filter(t => t.categoryId === filter).length === 0 && (

            <h2 className='alert alert-info text-dark'>
              There are no results for this category.
            </h2>
            
          )}
        </article>
      </div>
    </section>
  )
}