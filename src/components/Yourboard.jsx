import React ,{useState,useEffect} from 'react'

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
  useEffect(() => {
    handlephoto();
  }, [])
  return (
    <div className='mt-4'>
      <h1 className='text-4xl font-semibold ml-2 font-mono'>Your Board</h1>
    </div>
  )
}

export default Yourboard
