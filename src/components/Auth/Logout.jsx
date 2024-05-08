//1) Import
import { useAuth } from "../../contexts/AuthContext"
import Profile from "./Profile"
import { useNavigate } from "react-router-dom"

export default function Logout() {
  //2) Destructure
  const { logout } = useAuth()
  const navigate = useNavigate()

  function handleAuth(){
    logout()
    navigate('/')
  }

  return (
    <div className="logout text-center p-3 bg-dark text-white">
      <Profile />
      {/* Add to Button */}
      <button onClick={handleAuth} className="btn btn-info">
        Logout
      </button>
    </div>
  )
}