import React, { useEffect, useState } from 'react'
import Photocard from './Photocard'

function Main() {
  const[user]=useState(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null)
  console.log(user);
  const [visible , setvisible] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setvisible(false)
    }, 5000);
  }, [])
  return (
    <>
    <div className='bg-[rgb(211,186,241)] mt-5 flex flex-col justify-center items-center'>
    <div className='flex items-center justify-evenly'>
      {
      visible? <h1 className='text-3xl text-center font-bold
      mt-12 text-slate-900 mb-6'>Welcome {user?.name}</h1> : null
      }
    </div>
    <div className='flex justify-center items-center pb-10'>
    <button className='text-2xl font-medium bg-slate-950 pl-4 pr-4 pt-2 pb-2 rounded-md text-white hover:bg-slate-900'>Add Pin</button>
    </div>
    </div>
    <div className='flex  justify-evenly items-center mt-3 flex-wrap'>
    <Photocard />
    <Photocard />
    <Photocard />
    <Photocard />
    <Photocard />
    <Photocard />
    </div>
    </>
  )
}

export default Main
