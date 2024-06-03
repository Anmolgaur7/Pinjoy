import React, { useEffect } from 'react'
import { useState } from 'react'
import Ppic from '../Images/profileicon.png'
import Logo from '../Images/logo.jpg'
import { FaBars, FaTimes } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
function Friends() {
    const [friends, setfriends] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [visible, setvisible] = useState(false);
  const logout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };
  

    const navigate = useNavigate();
    const [user] = useState(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null);
    const createconversation = async (reciever) => {
        const response = await fetch("http://localhost:8000/api/conversation/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            participants: [user.id, `${reciever}`]
          })
        });
        const res = await response.json();
        console.log(res);
        if (res.message === "Conversation already exists with these participants") {
          navigate(`/chat/${res.id}`);
        }
      };
      const handlefriends = async () => {
        const response = await fetch("http://localhost:8000/api/user/friends", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            userId: user.id
          })
        });
        const res = await response.json();
        setfriends(res.friends);
        console.log(res.friends);
      };

      useEffect(() => {
        handlefriends();
      }
        , []);


  return (
    <div className=''>
       <div className="bg-red-400 p-[0.85rem]">
          <div className="flex justify-between items-center">
            <a href="/main">
              <img src={Logo} alt="Site logo" className="w-[15vw] rounded-full md:w-[3vw]" />
            </a>
            <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <FaTimes className="text-white text-2xl" /> : <FaBars className="text-white text-2xl" />}
            </button>
            <div className="hidden md:flex flex-grow justify-between items-center">
              <div className="flex items-center">
                <a href="/yourboard" className="font-bold text-xl m-2 md:m-5 hover:text-blue-800">YourBoard</a>
                <a href="/userslist" className="font-bold text-xl m-2 md:m-5 hover:text-blue-800">People</a>
                <a href="/requests" className="font-bold text-xl m-2 md:m-5 hover:text-blue-800">Requests</a>
              </div>
            </div>
            <div className="relative mt-2 md:mt-0">
              <img
                src={Ppic}
                alt="profile logo"
                className="w-[15vw] rounded-full border-black border md:w-[3vw]"
                onClick={() => setvisible(!visible)}
              />
              {visible && (
                <ul className="absolute right-0 mt-8 p-2 bg-white border border-gray-300 rounded shadow">
                  <li className="text-xl font-semibold hover:text-blue-500 cursor-pointer" onClick={logout}>LogOut</li>
                </ul>
              )}
            </div>
          </div>
          {menuOpen && (
            <div className="fixed inset-0 bg-red-400 flex flex-col items-center justify-center z-50 md:hidden">
              <a href="/yourboard" className="font-bold text-2xl m-5 hover:text-blue-800" onClick={() => setMenuOpen(false)}>YourBoard</a>
              <a href="/userslist" className="font-bold text-2xl m-5 hover:text-blue-800" onClick={() => setMenuOpen(false)}>People</a>
              <a href="/requests" className="font-bold text-2xl m-5 hover:text-blue-800" onClick={() => setMenuOpen(false)}>Requests</a>
              <a href="/freinds" className="font-bold text-2xl m-5 hover:text-blue-800" onClick={() => setMenuOpen(false)}
              >freinds</a>
            </div>
          )}
        </div>
    <h1 className='text-2xl font-bold mt-5 mb-4'>Friends</h1>
    <div className='flex flex-col justify-center items-center p-4 bg-white shadow rounded-lg'>
      {friends && friends.length > 0 ? (
        friends.map((item, index) => (
          <div
            key={index}
            className='flex justify-center bg-[#FAEBD7] items-center cursor-pointer flex-row p-3 m-2 rounded-3xl space-x-4 transition-transform duration-300 hover:scale-105 hover:shadow-lg'
            onClick={() => createconversation(item._id)}
          >
            <div className='w-12 h-12 rounded-full bg-black shadow-sm hover:ring-2 hover:ring-purple-300 hover:ring-opacity-50' />
            <p className='text-lg font-semibold text-gray-800 hover:text-purple-500 transition-colors duration-300'>
              {item.Name}
            </p>
          </div>
        ))
      ) : (
        <p className='text-lg text-gray-500'>No friends available</p>
      )}
    </div>
  </div>
  
  )
}

export default Friends
