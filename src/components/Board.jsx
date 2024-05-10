import React, { useEffect, useState } from 'react';
import Logo from '../Images/logo.jpg';
import Ppic from '../Images/profileicon.png';

function Board() {
  const [visible, setVisible] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [data, setData] = useState({
    Userid: '',
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
      alert('Photo added');
      setData({ ...data, Description: '', Imageurl: '' });
    }
    const responseData = await response.json();
    if (responseData.error) {
      alert(responseData.error);
    } else {
      alert('Image uploaded');
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
        <div className='flex justify-between items-center bg-red-300 p-[0.85rem]'>
          <a href="/"><img src={Logo} alt="Site logo" className='w-[15vw] rounded-full md:w-[5vw]' /></a>
          <div>
            <a href="/board" className='font-bold text-xl m-5  hover:text-blue-800'>Board</a>
            <a href="/yourboard" className='font-bold text-xl m-5  hover:text-blue-800'>YourBoard</a>
            <a href="/chat" className='font-bold text-xl m-5  hover:text-blue-800'>Chat</a>
          </div>
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
      <div className='flex flex-col items-center justify-center'>
        <h1 className='text-4xl p-3 font-semibold'>Add to your board!</h1>
        <form className='flex flex-col justify-center bg-orange-200 p-10 items-center'>
          <label className='p-3 text-2xl font-semibold'>Drag & Drop or Click to Upload</label>
          <input
            type="file"
            name='photo'
            onChange={handleFileChange}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`p-3 text-2xl m-1 w-[90vw] border border-black ${dragging ? 'border-blue-500' : ''}`}
          />
          {data.Imageurl &&
            <img src={data.Imageurl} alt="Uploaded" className="max-w-[90vw] my-4" />
          }
          <label className='p-3 text-2xl font-semibold'>Description</label>
          <textarea
            placeholder='Write an effective description'
            className='p-3 text-2xl w-[90vw] border border-black resize-none'
            onChange={(e) => setData({ ...data, Description: e.target.value })}
          />
          <button className='bg-slate-950 rounded-lg mt-4 text-white p-3 text-2xl' onClick={handleSubmit}>Add</button>
        </form>
      </div>
    </div>
  );
}

export default Board;
