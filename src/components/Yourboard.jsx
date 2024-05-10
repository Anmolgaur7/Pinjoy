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
            <div className='flex justify-between items-center bg-red-300 p-[0.85rem]'>
          <a href="/"><img src={Logo} alt="Site logo" className='w-[15vw] rounded-full md:w-[5vw]' /></a>
          <div>
            <a href="/board" className='font-bold text-xl m-5  hover:text-blue-800'>Board</a>
            <a href="/yourboard" className='font-bold text-xl m-5  hover:text-blue-800'>YourBoard</a>
            <a href="/chat" className='font-bold text-xl m-5  hover:text-blue-800'>Chat</a>            
          </div>
          {/* <form className='flex justify-center items-center flex-row'>
            <input type="text" className='bg-slate-200 h-[8vh] rounded-2xl w-[24vw] pl-3 ml-3 md:h-[3vw]' placeholder='Search for ideas...' onChange={(e) => setsearch(e.target.value)} />
            <button className='bg-slate-200 h-[12vw] rounded-full pl-4 pr-4 ml-1   hover:bg-white hover:text-black md:h-[3vw] font-bold' onClick={handlesearch}> <FaSearch/> </button>
          </form> */}
          <div className='relative'>
            <img src={Ppic} alt="profile logo" className='w-[15vw] rounded-full border-black border md:w-[5vw]' onClick={() => setvisible(!visible)} />
            {visible && (
              <ul className='absolute right-0 mt-8 p-2 bg-white border border-gray-300 rounded shadow'>
                <li className='text-xl font-semibold hover:text-blue-500 cursor-pointer' onClick={logout}>LogOut</li>
              </ul>
            )}
          </div>
        </div>
      <h1 className='text-3xl font-semibold mt-6 font-mono text-center '>Your Board</h1>
      <div className='flex justify-evenly items-center mt-3 flex-wrap'>
        {
          data.map((item) => {
            if(item.Userid===id){
              return <Photocard id={item._id} uploaderId={item.Userid}  pic={item.Imageurl} desc={item.Description} />
            }
          })
        }
        </div>
    </div>
  )
}

export default Yourboard
