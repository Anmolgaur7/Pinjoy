import React from 'react'
import { useNavigate,Link } from 'react-router-dom'
import { useState } from 'react'
import Logo from '../Images/logo.jpg'
import Ppic from '../Images/profileicon.png'

function Signup() {
  const [visible, setvisible] = useState(false)

  const logout = () => {
    localStorage.clear()
    window.location.href = '/login'
  }
  const [data, setdata] = useState({
    Name: '',
    Email: '',
    Password: ''
  })
  const navigate = useNavigate();
  const handlesubmit = async (e) => {
    try {
      e.preventDefault()
      const { Name, Email, Password } = data
      const response = await fetch("http://localhost:8000/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ Name, Email, Password })
      })
      const res = await response.json()
      console.log(res);
      navigate('/login')
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
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
      <div className='flex relative justify-end  bg-center items-center'>
        <div className=' absolute inset-0 bg-log bg-cover bg-center'></div>
        <div className='  absolute inset-0 bg-black opacity-50'></div>
        <form onSubmit={(e) => handlesubmit(e)} className='  w-full text-white  bg-opacity-20 md:text-black md:bg-opacity-100 lg:bg-opacity-100 relative md: bg-white flex-col md:w-1/2  lg:w-1/2 flex justify-center items-center p-20 shadow-lg rounded-lg'>
          <h1 className='text-4xl  font-bold'>Welcome</h1>
          <h1 className='text-lg  font-normal mb-16'>Sign up to get Started</h1>
          <label className='text-lg  font-normal'>First Name</label>
          <input type="text" name='fullname' placeholder='Enter your  Name' onChange={(e) => setdata({ ...data, fullname: e.target.value })} className=' p-2 m-2 border bg-slate-100 border-black ' />
          <label className='text-lg  font-normal' >Email</label>
          <input type="email" name='email' placeholder='Enter your email' onChange={(e) => setdata({ ...data, email: e.target.value })} className=' p-2 m-2 border bg-slate-100 border-black ' />
          <label className='text-lg  font-normal'>Password</label>
          <input type="password" name='password' placeholder='Enter you password' onChange={(e) => { setdata({ ...data, password: e.target.value }) }} className=' p-2 m-2 bg-slate-100 border border-black ' />
          <button type='submit' className='bg-blue-500 text-lg w-[6rem]  h-[3rem] p-1 font-bold text-white rounded-2xl mt-10 hover:bg-blue-400'   >Sign Up</button>
          <div className='mt-8 font-medium '>Already have an account? <span className='text-blue-400'><Link to="/login">Sign In</Link></span></div>
        </form>
      </div>
    </>
  )
}

export default Signup
