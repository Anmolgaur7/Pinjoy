import React, { useEffect, useState } from 'react';
import Photocard from './Photocard';
import Logo from '../Images/logo.jpg';
import Ppic from '../Images/profileicon.png';

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
        <div className='flex justify-between items-center'>
          <a href="/"><img src={Logo} alt="Site logo" className='w-[15vw] rounded-full md:w-[5vw]' /></a>
          <form className='flex justify-center items-center flex-row'>
            <input type="text" className='bg-slate-200 h-[12vw] rounded-2xl pl-3 ml-3 mr-2 md:h-[4vw]' placeholder='Search for ideas...' onChange={(e) => setsearch(e.target.value)} />
            <button className='bg-slate-200 h-[12vw] rounded-2xl pl-4 pr-4 ml-3 hover:bg-[rgb(211,186,241)] md:h-[3vw] font-bold' onClick={handlesearch}>Search</button>
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
              currentUserId={user.id}
              comments={item.Comments}
            />
          ))}
      </div>

    </>
  );
}

export default Main;
