import React ,{useState,useEffect} from 'react'
import Photocard from './Photocard'
import Logo from '../Images/logo.jpg'
import Ppic from '../Images/profileicon.png'

function Yourboard() {
  const [visible, setvisible] = useState(false)

  const logout=()=>{
    localStorage.clear()
    window.location.href='/login'
  }
  const [user] = useState(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null)
  const id=user.id;
  
  console.log(id);
  console.log(user);
  const [data, setdata] = useState([])
  const handlephoto = async (e) => {
    const response = await fetch("http://localhost:8000/api/board", {
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
  }, [])
  return (
    <div className='mt-4'>
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
      <h1 className='text-4xl font-semibold ml-2 font-mono'>Your Board</h1>
      <div className='flex justify-evenly items-center mt-3 flex-wrap'>
        {
          data.map((item, index) => {
            if(item.Userid==id){
              return <Photocard key={index} pic={item.Imageurl} desc={item.Description} />
            }
          })
        }
        </div>
    </div>
  )
}

export default Yourboard
