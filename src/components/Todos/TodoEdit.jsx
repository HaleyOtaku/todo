import { Modal } from "react-bootstrap"
import TodoForm from "./TodoForm"

export default function TodoEdit({
  showEdit,
  setShowEdit,
  todo,
  getTodos,
  
}) {

  const{ name } = todo

  return (
    <Modal show={showEdit} onHide={() => setShowEdit(false)} size='lg'>
      <Modal.Header closeButton>
        <h2>Editing {name}</h2>
      </Modal.Header>

      <Modal.Body>
        <TodoForm 
          setShowEdit={setShowEdit}
          getTodos={getTodos}
          todo={todo}
        />
      </Modal.Body>
    </Modal>
  )
}