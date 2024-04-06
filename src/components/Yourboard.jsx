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
    const res = await response.json();
    setdata(res)
    console.log(data);
  }
  useEffect(() => {
    handlephoto();
  }, [])
  return (
    <div >
      <div className='flex items-center justify-between relative bg-orange-50 p-2' >
        <a href="/"><img src={Logo} alt="Site logo" className='w-[20vw] rounded-full ml-10 md:w-[8vw]' /></a>
        <img src={Ppic} alt="profile logo" className='w-[15vw] rounded-full border-black border mr-10 md:w-[6vw]'onClick={()=>{
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
      <h1 className='text-3xl font-semibold mt-6 font-mono text-center'>Your Board</h1>
      <div className='flex justify-evenly items-center mt-3 flex-wrap'>
        {
          data.map((item) => {
            if(item.Userid==id){
              return <Photocard  pic={item.Imageurl} desc={item.Description} />
              askjndkjasnkdjnaskjdaskjd
            }
          })
        }
        </div>
    </div>
  )
}

export default Yourboard
