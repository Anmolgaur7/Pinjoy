import React, { useState, useEffect } from 'react'
import { useNavigate ,Link } from 'react-router-dom'
import Logo from '../Images/logo.jpg'
import Ppic from '../Images/profileicon.png'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { FaSearch } from 'react-icons/fa';
import { FaBars } from 'react-icons/fa';
import { FaTimes } from 'react-icons/fa';

function Login() {
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false);

  const [data, setdata] = useState({
    Email: '',
    Password: ''
  })
  const [visible, setvisible] = useState(false)

  const logout = () => {
    localStorage.clear()
    window.location.href = '/login'
  }
  const handlesubmit = async (e) => {
    try {
      e.preventDefault()
      const { Email, Password } = data
      const response = await fetch("http://localhost:8000/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ Email, Password })
      })
      const res = await response.json()
      const { token, user } = res;
      if (token) {
        window.localStorage.setItem("token", token)
        window.localStorage.setItem("user", JSON.stringify(user))
      }
      navigate('/main')
    } catch (error) {
          toast.error("User or password is incorrect")
    }
  }
  useEffect(() => {
    const token = window.localStorage.getItem("token")
    if (token) {
      window.location.href = '/main'
    }
  }, [])

  return (
    <>
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
        <div className=' justify-center flex relative md:justify-end lg:justify-end bg-center items-center flex-wrap'>
          <div className=' absolute inset-0 bg-log bg-cover bg-center'></div>
          <div className='  absolute inset-0 bg-black opacity-50'></div>
          <form onSubmit={(e) => handlesubmit(e)} className=' w-full text-white  bg-opacity-20 md:text-black md:bg-opacity-100 lg:bg-opacity-100 relative md: bg-white flex-col md:w-1/2  lg:w-1/2 flex justify-center items-center p-20 shadow-lg rounded-lg'>
            <h1 className='text-4xl  font-bold'>Welcome Back</h1>
            <h1 className='text-lg  font-normal mb-16'>Sign in to explore</h1>
            <label className='text-lg  font-normal'>Email</label>
            <input type="email" name='email' placeholder='Enter your email' onChange={(e) => setdata({ ...data, Email: e.target.value })} className=' p-2 m-2  border bg-slate-100 border-black ' />
            <label className='text-lg  font-normal'>Password</label>
            <input type="password" name='password' placeholder='Enter you password' onChange={(e) => setdata({ ...data, Password: e.target.value })} className=' p-2 m-2 border bg-slate-100 border-black' />
            <button  className='bg-blue-500 text-lg w-[6rem]  h-[3rem] p-1 font-bold text-white rounded-2xl mt-8 hover:bg-blue-400' type='submit'>Sign In</button>
            <div className='mt-4 font-medium '>Didn't have an account? <span className='text-blue-400'><Link to="/signup">Sign Up</Link></span></div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login
