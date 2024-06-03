import React, { useEffect, useState } from 'react';
import Logo from '../Images/logo.jpg';
import Ppic from '../Images/profileicon.png';
import { toast,ToastContainer } from 'react-toastify';
import { FaBars } from 'react-icons/fa';
import { FaTimes } from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.css';

function Board() {
  const [visible, setvisible] = useState(false);
  
  const [menuOpen, setMenuOpen] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [data, setData] = useState({
    Userid: '',
    Title: '',
    Description: '',
    Imageurl: '',
  });

  const logout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  const user = JSON.parse(localStorage.getItem('user'));
  console.log(user);
  const id = user.id;

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'Pinjoy');
    formData.append('cloud_name', 'dvmsnhndm');
    const response = await fetch('https://api.cloudinary.com/v1_1/dvmsnhndm/image/upload', {
      method: 'POST',
      body: formData
    });
    const responseData = await response.json();

    return { url: responseData.secure_url };
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const { url } = await uploadImage(file);
    setData({ ...data, Imageurl: url });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { url } = await uploadImage(data.Imageurl);
    if (!url) {
      alert('Please upload an image');
      return;
    }
    const response = await fetch('http://localhost:8000/api/board/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ...data, Imageurl: url })
    });
    if (response.status === 200) {
      setData({ ...data, Description: '', Imageurl: '' });
    }
    const responseData = await response.json();
    if (responseData.error) {
      toast.error(responseData.error);
    } else {
      toast.success('Pin added successfully');
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    const { url } = await uploadImage(file);
    setData({ ...data, Imageurl: url });
  };

  useEffect(() => {
    if (!localStorage.getItem('user')) {
      window.location.href = '/login';
    }
    setData({ ...data, Userid: id });
  }, [id]);

  return (
    <div>
      
      <div>
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
        <ToastContainer />
      </div>
      <div className='flex flex-col items-center justify-center m-4'>
      <h1 className='text-5xl p-3 font-bold'>Post a pin!</h1>
      <form className='flex flex-col justify-center w-[70vw] bg-gray-100 p-10 items-center rounded-lg shadow-md'>
        <label className='p-3 text-xl font-semibold'>Drag & Drop or Click to Upload</label>
        <input
          type="file"
          name='photo'
          onChange={handleFileChange}
          onDragOver={(e) => { handleDragOver(e); setDragging(true); }}
          onDragLeave={(e) => { handleDragLeave(e); setDragging(false); }}
          onDrop={(e) => { handleDrop(e); setDragging(false); }}
          className={`p-3 text-xl m-1 w-[60vw] border border-black outline-none cursor-pointer ${dragging ? 'border-blue-500' : ''}`}
        />
        <img src={data.Imageurl} alt='Preview' className='w-[30vw] h-[200px] object-cover rounded border border-black m-4' />
        <label className='p-3 text-xl font-semibold'>Title</label>
        <input
          type='text'
          placeholder='Title'
          className='p-3 text-xl w-[60vw] border border-black rounded'
          onChange={(e) => setData({ ...data, Title: e.target.value })}
        />
        <label className='p-3 text-xl font-semibold'>Description</label>
       
        <textarea
          placeholder='Write an effective description'
          className='p-3 text-xl w-[60vw] h-[200px] border border-black rounded resize-none'
          onChange={(e) => setData({ ...data, Description: e.target.value })}
        />
        <button className='bg-blue-500 hover:bg-blue-600 text-white rounded-lg mt-4 text-xl px-6 py-3 shadow-md' onClick={handleSubmit}>Add</button>
      </form>
    </div>
    </div>
  );
}

export default Board;
