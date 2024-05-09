import React, { useEffect, useState } from 'react';

function Photocard({id,pic, desc,uploaderId, currentUserId }) {
  console.log(id ,uploaderId,currentUserId);
  const [data, setdata] = useState([]);
  console.log(data);
  const datafetch=async()=>{
    const response = await fetch(`http://localhost:8000/api/user/one`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id: uploaderId })
    });
    const res = await response.json();
    setdata(res);
    console.log(res);
  }
  useEffect(() => {
    datafetch();
  }, []); 
  return (
    <div>
      <a href={`/picdetails/${id}`}>
      <div className='max-w-xs rounded overflow-hidden shadow-lg m-4'>
        <img
          className='w-full cursor-pointer'
          src={pic}
          alt='Sunset in the mountains'
        />
        <div className='px-6 py-4'>
          <div className='font-bold text-xl mb-2'>{desc}</div>
          <p className='text-gray-700 text-base font-semibold'>
            Uploaded by:
            {data?.Name}
          </p>
        </div>
      </div>
      </a>
    </div>
  );
}

export default Photocard;
