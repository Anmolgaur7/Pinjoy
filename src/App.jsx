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
import UsersList from './components/UsersList';
import FriendRequests from './components/FriendRequests';

function App() {
  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

  const id = user ? user.id : null;

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
      <Route path='/userslist' element={<UsersList currentUserId={id}/>}/>
      <Route path='/requests' element={<FriendRequests currentUserId={id}/>}/>
      <Route path='*' element={<h1>404 Not Found</h1>}/>
      <Route path='/picdetails/:id' element={<BigPhoto/>}/>
    </Routes>
    <Footer />
    </BrowserRouter>
    </>
  )
}

export default App
