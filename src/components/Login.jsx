import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import Logo from '../Images/logo.jpg'
import Ppic from '../Images/profileicon.png'

function Login() {
  const navigate=useNavigate()
  const [data, setdata] = useState({
    Email: '',
    Password: ''
  })
  const [visible, setvisible] = useState(false)

  const logout=()=>{
    localStorage.clear()
    window.location.href='/login'
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
    console.log(res);
    const { token,user} = res;
    if(token){
      window.localStorage.setItem("token",token)
      window.localStorage.setItem("user",JSON.stringify(user))
    }
      navigate('/')
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    const token = window.localStorage.getItem("token")
    if (token) {
      window.location.href='/'
    }
  }, [])

  return (
    <>
    <div className='flex items-center justify-evenly relative' >
        <a href="/"><img src={Logo} alt="Site logo" className='w-[20vw] rounded-full' /></a>
        <input type="text" className='bg-slate-200 h-[12vw] rounded-2xl pl-3 ml-3 mr-2' placeholder='Search for ideas...' />
        <img src={Ppic} alt="profile logo" className='w-[15vw] rounded-full border-black border'onClick={()=>{
          visible ? setvisible(false) :
          setvisible(true)}} />
      </div>
      <div>
        {
          visible ? <ul className='bg-[rgb(211,186,241)] w-[7rem] h-[8rem] flex flex-col justify-center items-center absolute right-10 mt-16 top-1 border border-black'>
            <li className='text-xl font-semibold hover:text-blue-500  cursor-pointer'>Profile</li>
            <li className='text-xl font-semibold hover:text-blue-500 cursor-pointer' ><a href="/yourboard">Board</a></li>
            <li className='text-xl font-semibold hover:text-blue-500 cursor-pointer' onClick={logout}>LogOut</li>
          </ul> : null
        }
      </div>
    <div className='bg-slate-200 w-screen h-screen shadow-lg flex justify-center items-center flex-col'>
        <h1 className='text-3xl text-center font-semibold text-slate-900 pb-16'>Login</h1>
        <form className='flex flex-col bg-white p-10 items-center justify-center'>
            <input className='w-[35vw] h-10 mt-5 bg-slate-50 border border-black rounded-md pl-2' type='text' placeholder='Email' onChange={(e)=>setdata({...data,Email:e.target.value})} />
            <input className='w-[35vw] h-10 mt-5 bg-slate-50 border border-black rounded-md pl-2' type='password' placeholder='Password'onChange={ (e)=>setdata({...data ,Password:e.target.value})} />
            <button className='w-[20vw] h-10 mt-5 rounded-md bg-slate-900 text-slate-50 hover:bg-slate-800' onClick={handlesubmit}>Login</button>
        </form>

        <h1 className='mt-3 text-lg'>Did'nt have  an  account? <a href="/signup" className='text-blue-700 text-blue-500'>Signup</a></h1>
    </div>
      
    </>
  )
}

export default Login
