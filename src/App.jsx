import './App.css'
// import Navbar from './components/Navbar'
import { BrowserRouter ,Routes,Route} from "react-router-dom";
import Data from './components/Main'
import Login from './components/Login'
import Signup from './components/Signup'
import Board from './components/Board'; 
import YBoard from './components/Yourboard'; 

function App() {
  return (
    <>
    {/* <Navbar/>/ */}
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Data/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/board' element={<Board/>}/>
      <Route path='/yourboard' element={<YBoard/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
