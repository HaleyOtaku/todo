import TodoForm from "./TodoForm"

export default function TodoCreate(setShowCreate, getTodos) {
  return (
    <article className="createTodo m-2 text-white justify-content-center">
      <TodoForm
        setShowCreate={setShowCreate}
        getTodos={getTodos}
      />
    </article>
  )
}