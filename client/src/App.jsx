import './App.css'
import Aboutt from './pages/Aboutt'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Dashboard from './pages/Dashboard'
import Projects from "./pages/Projects"




function App() {

  return (
   <BrowserRouter>
   <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/about' element={<Aboutt/>}/>
    <Route path='/sign-in' element={<SignIn/>}/>
    <Route path='/sign-up' element={<SignUp/>}/>
    <Route path='/dashboard' element={<Dashboard/>}/>
    <Route path='/projects' element={<Projects/>}/>
   </Routes>
   </BrowserRouter>
  )
}

export default App
