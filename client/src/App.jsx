import './App.css'
import Aboutt from './pages/Aboutt'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Dashboard from './pages/Dashboard'
import Projects from "./pages/Projects"
import Header from './components/Header'
import Footer from './components/Footer';




function App() {

  return (
   <BrowserRouter>
   <Header/>
   <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/about' element={<Aboutt/>}/>
    <Route path='/sign-in' element={<SignIn/>}/>
    <Route path='/sign-up' element={<SignUp/>}/>
    <Route path='/dashboard' element={<Dashboard/>}/>
    <Route path='/project' element={<Projects/>}/>
   </Routes>
   <Footer />
   </BrowserRouter>
  )
}

export default App
