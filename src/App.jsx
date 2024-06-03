import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Data from './components/Main';
import Login from './components/Login';
import Signup from './components/Signup';
import Board from './components/Board'; 
import YBoard from './components/Yourboard'; 
import Footer from './components/Footer';
import BigPhoto from './components/BigPhoto';
import Friends from "./components/Friends";
import Chat from './components/Chat';
import UsersList from './components/UsersList';
import FriendRequests from './components/FriendRequests';

function App() {
  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
  const id = user ? user.id : null;

  return (
    <>
      <BrowserRouter>
        <Routes>
          {!user && (
            <>
              <Route path='/' element={<Login/>}/>
              <Route path='/signup' element={<Signup/>}/>
              <Route path='*' element={<Navigate to="/" replace />}/> {/* Redirect to login if not logged in */}
            </>
          )}
          {user && (
            <>
              <Route path='/main' element={<Data/>}/>
              <Route path='/chat/:receiverid' element={<Chat/>}/>
              <Route path='/board' element={<Board/>}/>
              <Route path='/freinds' element={<Friends/>}/>
              <Route path='/yourboard' element={<YBoard/>}/>
              <Route path='/userslist' element={<UsersList currentUserId={id}/>}/>
              <Route path='/requests' element={<FriendRequests currentUserId={id}/>}/>
              <Route path='/picdetails/:id' element={<BigPhoto/>}/>
            </>
          )}
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App;
