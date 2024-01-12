import React from 'react'
import Pic from '../images/logo.jpg' 

function Photocard() {
  return (
    <div className='w-[40vw] h-auto shadow-md m-3 pb-2'>
     <img src={Pic} alt="" className='h-[50vw]'/>
      <h2 className='text-xl'>Lorem ipsum dolor sit amet.</h2> 
    </div>
  )
}

export default Photocard
