import React, { useEffect, useState } from 'react'
import Photocard from './Photocard'
import Logo from '../Images/logo.jpg'
import Ppic from '../Images/profileicon.png'

function Main() {
  const [user] = useState(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null)
  
  console.log(user);
  const [visible1, setvisible2] = useState(true)
  const [data, setdata] = useState([])
  const [visible, setvisible] = useState(false)
  const [search, setsearch] = useState('')

  const logout=()=>{
    localStorage.clear()
    window.location.href='/login'
  }
  const handlephoto = async (e) => {
    const response = await fetch("http://localhost:8000/api/board", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
    })
    const res = await response.json()
    setdata(res)
    console.log(data);
  }
  const handlesearch = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:8000/api/board/search?search=${search}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
    })
    const res = await response.json()
    console.log(res);
    setdata(res)

    console.log(data);

  }
  useEffect(() => {
    handlephoto();
    setTimeout(() => {
      setvisible2(false)
    }, 5000);
  }, [])
  return (
    <>
     <div className='flex items-center justify-evenly relative' >
        <a href="/"><img src={Logo} alt="Site logo" className='w-[20vw] rounded-full' /></a>
        <form >
          <input type="text" className='bg-slate-200 h-[12vw] rounded-2xl pl-3 ml-3 mr-2' placeholder='Search for ideas...' onChange={(e) => setsearch(e.target.value)} />
          <button className='bg-slate-200 h-[12vw] rounded-2xl pl-3 ml-3 mr-2' onClick={handlesearch}>Search</button>
        </form>
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
      <div className='bg-[rgb(211,186,241)] mt-5 flex flex-col justify-center items-center'>
        <div className='flex items-center justify-center'>
          {
            visible1 ? <h1 className='text-3xl text-center font-bold
      mt-12 text-slate-900 mb-6'>Welcome {user?.name}</h1> : null
          }
        </div>
        <div className='flex justify-center items-center pb-10'>
          <button className='text-2xl font-medium bg-slate-950 pl-4 pr-4 mt-10 pt-2 pb-2 rounded-md text-white hover:bg-slate-900'> <a href="/board">Add to board</a></button>
        </div>
      </div>
      <div className='flex  justify-evenly items-center mt-3 flex-wrap'>
        {
          data.map((item, index) => {
            return <Photocard key={index} pic={item.Imageurl} desc={item.Description} />
          })
        }
      </div>
    </>
  )
}

export default Main
