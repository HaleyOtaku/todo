import './Auth.css'

//any time we wish to implement any of the AuthContext objects, we will need 3 steps:
//1) Import the useAuth function from the AuthContext file
import { useAuth } from '../../contexts/AuthContext'
//Below we import the useNavigate hook from react-router-dom so we can redirect a logged in user
import { useNavigate } from 'react-router-dom'

import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'

export default function Login() {
  //2) Destructure the desired value(s) from useAuth() 
  //In this component, we only need the login function
  const{ login } = useAuth()
  //Below we bring useNavigate() functionality in as a hook so it will be available in handleAuth()
  const navigate = useNavigate()

  async function handleAuth(){
    //Await will pause code until we get a response from the login function
    await login()
    //Once the promise of login is returned, we can redirect the user to the home view:
    navigate('/')
  }
  
  
  return (
    <section className="login">
      <article className="title mb-5 p-5 text-dark">
        <h1 className="text-center">Welcome to ResourcePlus!</h1>
      </article>
      <Container>
        <Card className="m-2 border-dark text-center">
          <Card.Header className='bg-dark text-white'>
            <h2>Login for full functionality</h2>
          </Card.Header>
          <Card.Body>
            {/* 3) We need to call upon the Login() somewhere within the UI */}
            <button onClick={handleAuth} className="btn btn-success">
              Login w/ GitHub
            </button>
          </Card.Body>
        </Card>
      </Container>
    </section>
  )
}