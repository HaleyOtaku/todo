//rfc : React Functional Component
//This component will house a button for each category and an ALL button to remove
//filtering in Resources.jsx
import { useState, useEffect } from "react"
import axios from "axios"

export default function FilterTodo({ setFilter }) {
  //we need the categories from our API in order to build our buttons:
  //usf -> tab
  const [categories, setCategories] = useState([])

  useEffect(() => {
    axios.get(`http://todoapi.haleykillingsworth.com/api/categories`).then(response => {
      console.log(response)
      setCategories(response.data)
    })
  }, [])

  return (
    <div className="text-center mt-5">
      <button onClick={() => setFilter(0)} className="btn btn-outline-light bg-dark m-1">
        All
      </button>
      {/* Below, we map all the categories to buttons that will filter resources on
          their respective categories */}
      {
        categories.map(c => 
        
          <button key={c.categoryId} onClick={() => setFilter(+c.categoryId)} 
           className="btn btn-outline-light bg-dark m-1">
            {c.catName}
          </button>
        )
      }
    </div>
  )
}