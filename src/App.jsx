import './App.css'
// import Navbar from './components/Navbar'
import { BrowserRouter ,Routes,Route} from "react-router-dom";
import Data from './components/Main'
import Login from './components/Login'
import Signup from './components/Signup'
import Board from './components/Board'; 
import YBoard from './components/Yourboard'; 
import Footer from './components/Footer';
import BigPhoto from './components/BigPhoto';
import Chat from './components/Chat';

function App() {
  return (
    <>
    {/* <Navbar/>/ */}
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Data/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/chat' element={<Chat/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/board' element={<Board/>}/>
      <Route path='/yourboard' element={<YBoard/>}/>
      <Route path='*' element={<h1>404 Not Found</h1>}/>
      <Route path='/picdetails/:id' element={<BigPhoto/>}/>
    </Routes>
    <Footer />
    </BrowserRouter>
    </>
  )
}

export default App
