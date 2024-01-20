import React ,{useState} from 'react'
import Logo from '../Images/logo.jpg'
import Ppic from '../Images/profileicon.png'
function Navbar() {
  const [visible, setvisible] = useState(false)

  const logout=()=>{
    localStorage.clear()
    window.location.href='/login'
  }

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
    </>
  )
}

export default Navbar
