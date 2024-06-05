import React, { useEffect, useState } from 'react';
import Photocard from './Photocard';
import Logo from '../Images/logo.jpg';
import { useNavigate } from 'react-router-dom';

import Ppic from '../Images/profileicon.png';
import { FaSearch } from 'react-icons/fa';
import { FaBars } from 'react-icons/fa';
import { FaTimes } from 'react-icons/fa';
import { MdPostAdd } from 'react-icons/md';
import { toast } from 'react-toastify';

function Main() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [friends, setfriends] = useState([]);
  const navigate = useNavigate();
  const [user] = useState(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null);
  console.log(user);
  const [data, setdata] = useState([]);
  const [search, setsearch] = useState('');
  const [visible, setvisible] = useState(false);


  const logout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };
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
  const handlephoto = async () => {
    const response = await fetch("http://localhost:8000/api/board", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
    });
    const res = await response.json();
    setdata(res);
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



  const handlesearch = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:8000/api/board/search?search=${search}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
    });
    const res = await response.json();
    console.log(res);
    if (res.length === 0) {
      toast.error("No results found");
      navigate('/main');
    }
    setdata(res);
  };

  useEffect(() => {
    handlefriends();
    handlephoto();

  }, []);

  return (
    <>
      <div >
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
          <form className="flex items-center">
            <input
              type="text"
              className="bg-slate-200 h-[3vw] rounded-2xl w-[24vw] pl-3"
              placeholder="Search for ideas..."
              onChange={(e) => setsearch(e.target.value)}
            />
            <button
              className="bg-slate-200 h-[3vw] rounded-full pl-4 pr-4 ml-1 font-bold hover:bg-white hover:text-black"
              onClick={handlesearch}
            >
              <FaSearch />
            </button>
          </form>
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
          <a href="/freinds" className="font-bold text-2xl m-5 hover:text-blue-800" onClick={() => setMenuOpen(false)}>Friends</a>

          <form className="flex flex-col items-center w-full px-5 mt-5">
            <input
              type="text"
              className="bg-slate-200 h-[8vh] rounded-2xl w-full pl-3"
              placeholder="Search for ideas..."
              onChange={(e) => setsearch(e.target.value)}
            />
            <button
              className="bg-slate-200 h-[8vh] rounded-full pl-4 pr-4 mt-2 font-bold hover:bg-white hover:text-black"
              onClick={()=>{
                handlesearch()
                setMenuOpen(false)
              }}
            >
              <FaSearch />
            </button>
          </form>
        </div>
      )}
    </div>
      </div>
      <div className='flex flex-col lg:flex-row justify-center'>
  <div className='w-full lg:w-1/5 lg:h-[100vh] mb-5 lg:mb-0'>
    <div className='flex justify-center items-center flex-col lg:fixed lg:ml-6'>
      <div className='hidden md:block'>
        <h1 className='text-2xl font-bold mt-5 mb-4'>Friends</h1>
        <div className='flex flex-col justify-center items-center p-4 bg-white shadow rounded-lg'>
          {friends && friends.length > 0 ? (
            friends.map((item, index) => (
              <div
                key={index}
                className={`flex justify-center bg-[#FAEBD7] items-center cursor-pointer flex-row p-3 m-2 rounded-3xl space-x-4 transition-transform duration-300 hover:scale-105 hover:shadow-lg`}
                onClick={() => createconversation(item._id)}
              >
                <div className='w-12 h-12 rounded-full bg-black shadow-sm hover:ring-2 hover:ring-purple-300 hover:ring-opacity-50' />
                <p className='text-lg font-semibold text-gray-800 hover:text-purple-500 transition-colors duration-300'>{item.Name}</p>
              </div>
            ))
          ) : (
            <p className='text-lg text-gray-500'>No friends available</p>
          )}
        </div>
      </div>
    </div>
  </div>
  <div className='w-full lg:w-4/5 flex flex-col items-center'>
    <div className='mt-5 flex flex-col items-center w-full px-4 lg:px-0'>
      <div className="flex flex-col items-center justify-center w-full bg-yellow-200 p-8 rounded-lg shadow-lg">
        <p className="text-5xl font-extrabold mb-6 text-center"><span className='text-red-500'>{user.name}</span> got any ideas? Add them to Pinjoy!</p>
        <button className="bg-blue-500 text-white font-bold py-2 text-3xl px-4 rounded focus:outline-none focus:shadow-outline hover:bg-blue-700 hover:text-white">
          <a href="/board" className='flex justify-center items-center gap-3'>
            Add to Pinjoy <MdPostAdd />
          </a>
        </button>
      </div>
    </div>
    <div className='flex flex-col items-center w-full px-4 lg:px-0 mt-5'>
      {data
        .slice() // Create a shallow copy of the original array
        .sort((a, b) => a.likes - b.likes) // Sort the copy based on likes in ascending order
        .map((item, index) => (
          <Photocard
            key={index}
            id={item._id}
            pic={item.Imageurl}
            title={item.Title}
            desc={item.Description}
            uploaderId={item.Userid}
            currentUserId={user.id}
            comments={item.Comments}
            className="w-full mb-5"
          />
        ))}
    </div>
  </div>
</div>
    </>
  );
}

export default Main;
