import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Homescreen from './pages/Home/Homescreen'
import Login from './pages/Login/Login'
import Signup from './pages/Signup/Signup'
import About from './pages/Footer/About'
import Security from './pages/Footer/Security'
import Contact from './pages/Contact/Contact'
import '../src/index.css'

const routes = (
  <Router>
    <Routes>
      <Route path='/' element={ <Homescreen/>}/>
      <Route path='/dashboard' exact element={ <Home/>}/>
      <Route path='/login' exact element={ <Login/>}/>
      <Route path='/signup' exact element={ <Signup/>}/>
      <Route path='/about' exact element={ <About/>}/>
      <Route path='/security' exact element={ <Security/>}/>
      <Route path='/contact' exact element={ <Contact/>}/>
    </Routes>
  </Router>
)

const App = () => {
  return ( 
    <>
      { routes }
    </>
  )
}

export default App