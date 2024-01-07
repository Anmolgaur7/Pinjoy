import React from 'react'
import Logo from '../Images/logo.jpg'
import Ppic from '../Images/profileicon.png'
function Navbar() {
  return (
    <>
    <div className='flex items-center justify-evenly'>
     <img src={Logo} alt="Site logo" className='w-[20vw] rounded-full'/>   
     <input type="text" className='bg-slate-200 h-[12vw] rounded-2xl pl-3 ml-3 mr-2' placeholder='Search for ideas...'/>
     <img src={Ppic} alt="profile logo" className='w-[15vw] rounded-full border-black border'/> 
    </div>
    </>
  )
}

export default Navbar
