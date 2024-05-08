import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import {Link} from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
// import Logout from './Auth/Logout'


export default function Navigation() {
  const { currentUser, logout } = useAuth()
  return (
    <Navbar expand='md' data-bs-theme='dark' bg='dark' className='p-3'>
      <Navbar.Brand href='/'>ToDo API | Killingsworth</Navbar.Brand>

      {/* Hamburger Button Below */}
      <Navbar.Toggle />
      <Navbar.Collapse className='justify-content-end'>
       
        <Nav className='text-center'>
          <Link to='/' className='nav-link'>
            Home
          </Link>
          <Link to='/about' className='nav-link'>
            About
          </Link>
        {currentUser &&
          //&& means if true do below
          <>
            <Link to='/todos' className='nav-link'>
              To Do
            </Link>
            
            <Link to='/categories' className='nav-link'>
              Categories
            </Link>
          </>
          }
          {!currentUser ?
          <Link to='/login' className='nav-link'>
            Login
          </Link>
            :
            <Nav.Link onClick={() => logout()}>Logout</Nav.Link> 
          }
        </Nav>
      </Navbar.Collapse>

    </Navbar>
  )
}

//npx kill-port 3000 will fix port error in Terminal