import React, { useEffect, useState } from 'react';
import Photocard from './Photocard';
import Logo from '../Images/logo.jpg';
import Ppic from '../Images/profileicon.png';
import { FaSearch } from 'react-icons/fa';

function Main() {
  const [user] = useState(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null);
  const [data, setdata] = useState([]);
  const [search, setsearch] = useState('');
  const [visible, setvisible] = useState(false);

  const logout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };
  console.log(data);
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

  const handlesearch = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:8000/api/board/search?search=${search}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
    });
    const res = await response.json();
    setdata(res);
  };

  useEffect(() => {

    handlephoto();
      
  }, []);

  return (
    <>
      <div >
        <div className='flex justify-between items-center bg-red-300 p-[0.85rem]'>
          <a href="/"><img src={Logo} alt="Site logo" className='w-[15vw] rounded-full md:w-[5vw]' /></a>
          <div>
            <a href="/board" className='font-bold text-xl m-5  hover:text-blue-800'>Board</a>
            <a href="/yourboard" className='font-bold text-xl m-5  hover:text-blue-800'>YourBoard</a>
            <a href="/chat" className='font-bold text-xl m-5  hover:text-blue-800'>Chat</a>            
          </div>
          <form className='flex justify-center items-center flex-row'>
            <input type="text" className='bg-slate-200 h-[8vh] rounded-2xl w-[24vw] pl-3 ml-3 md:h-[3vw]' placeholder='Search for ideas...' onChange={(e) => setsearch(e.target.value)} />
            <button className='bg-slate-200 h-[12vw] rounded-full pl-4 pr-4 ml-1   hover:bg-white hover:text-black md:h-[3vw] font-bold' onClick={handlesearch}> <FaSearch/> </button>
          </form>
          <div className='relative'>
            <img src={Ppic} alt="profile logo" className='w-[15vw] rounded-full border-black border md:w-[5vw]' onClick={() => setvisible(!visible)} />
            {visible && (
              <ul className='absolute right-0 mt-8 p-2 bg-white border border-gray-300 rounded shadow'>
                <li className='text-xl font-semibold hover:text-blue-500 cursor-pointer' onClick={logout}>LogOut</li>
              </ul>
            )}
          </div>
        </div>
      </div>
      <div className='mt-5 flex flex-wrap justify-center items-center'>
        {data
          .slice() // Create a shallow copy of the original array
          .sort((a, b) => a.likes - b.likes) // Sort the copy based on likes in ascending order
          .map((item, index) => (
            <Photocard
              key={index}
              id={item._id}
              pic={item.Imageurl}
              desc={item.Description}
              uploaderId={item.Userid}
              // currentUserId={user.id}
              comments={item.Comments}
            />
          ))}
      </div>

    </>
  );
}

export default Main;
