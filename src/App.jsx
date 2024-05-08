import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import Home from './components/Home/Home'
import About from './components/About/About'
import Todos from './components/Todos/Todos'
import Categories from './components/Categories/Categories'
import Login from './components/Auth/Login'
import Footer from './components/Footer'
import NotFound from './components/NotFound/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import AuthProvider from './contexts/AuthContext'

export default function App() {
  return (
    <div className='App'>

      <AuthProvider>

      <Router>
        <Navigation />
        <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/todos' element={<ProtectedRoute><Todos /></ProtectedRoute>} />
        <Route path='/categories' element={<ProtectedRoute><Categories /></ProtectedRoute>} />
        <Route path='/login' element={<Login />} />
        <Route path='*' element={<NotFound />} />
        </Routes>
      </Router>
      <Footer />

      </AuthProvider>

    </div>
  )
}