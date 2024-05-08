import './Todos/Todos.css'

export default function Footer() {
  return (
    <footer className="text-center p-4 mt-5">
      <strong>&copy {new Date().getFullYear()} Haley Killingsworth, All Rights Reserved</strong>
    </footer>
  )
}