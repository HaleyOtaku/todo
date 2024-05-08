import CatForm from "./CatForm"


export default function CatCreate({setShowCreate, getCategories}) {
  return (
    <div className="createCategory m-2 text-center">
      <CatForm  setShowCreate={setShowCreate} getCategories={getCategories}/>
    </div>
  )
}