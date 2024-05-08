import { useState, useEffect } from "react"
import axios from "axios"
import SingleCategory from "./SingleCategory"
import { useAuth } from "../../contexts/AuthContext"
import CatCreate from "./CatCreate"

export default function Categories() {
  const [categories, setCategories] = useState([])

  const [showCreate, setShowCreate] = useState(false)

  const { currentUser } = useAuth()

  const getCategories = () => {
    axios.get(`https://localhost:7011/api/Categories`).then(response => {
      console.log(response)
      setCategories(response.data)
    })
  }

  useEffect(() => {
    getCategories()
  }, [])

  return (
    <section className="categories">
      <article className="bg-info p-5">
        <h1 className="text-center">Categories Dashboard</h1>
      </article>
      {/* BEGIN CREATE UI */}

      {currentUser.email === import.meta.env.VITE_ADMIN_EMAIL &&
        <div className="bg-dark p-2 mb-3 text-center">
          {!showCreate ?
            <button onClick={() => setShowCreate(true)} className="btn btn-info">
              Create Category
            </button> 
            :
            <>
            <button onClick={() => setShowCreate(false)} className="btn btn-warning">
              Cancel
            </button>            
            <CatCreate setShowCreate={setShowCreate} getCategories={getCategories}/>
            </>          
            }
        </div>
        }

      {/* END CREATE UI */}
      <div className="container p-2">
        <table className="table bg-info table-dark my-3">
          <thead className="table-secondary text-uppercase">
            <tr>
              <th>Name</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {/* READ UI BEGINS */}
            {categories.map(c => 
              <SingleCategory
                key={c.categoryId}
                category={c}
                getCategories={getCategories}
              />
            )}
            {/* READ UI ENDS */}
          </tbody>
        </table>
      </div>
    </section>
  )
}
