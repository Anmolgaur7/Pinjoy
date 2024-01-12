import './App.css'
import Navbar from './components/Navbar'
import { BrowserRouter ,Routes,Route} from "react-router-dom";
import Data from './components/Main'
import Login from './components/Login'
import Signup from './components/Signup'


function App() {
  return (
    <>
    <Navbar/>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Data/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
