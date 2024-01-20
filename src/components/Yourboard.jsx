import React ,{useState,useEffect} from 'react'
import Photocard from './Photocard'

function Yourboard() {
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
  data.map((item) => {
    console.log(item.Userid==id);
  })
  useEffect(() => {
    handlephoto();
  }, [])
  return (
    <div className='mt-4'>
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
