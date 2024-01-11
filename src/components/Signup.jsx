import React from 'react'

function Signup() {
  return (
    <>
    <div className='bg-slate-200 w-screen h-screen shadow-lg flex justify-center items-center flex-col'>
        <h1 className='text-3xl text-center font-semibold text-slate-900 pb-16'>Signup</h1>
        <form className='flex flex-col bg-white p-10 items-center justify-center'>
            <input className='w-[35vw] h-10 mt-5 bg-slate-50 border border-black rounded-md pl-2' type='text' placeholder='Username' />
            <input className='w-[35vw] h-10 mt-5 bg-slate-50 border border-black rounded-md pl-2' type='email' placeholder='Email' />
            <input className='w-[35vw] h-10 mt-5 bg-slate-50 border border-black rounded-md pl-2' type='Password' placeholder='Password' />
            <button className='w-[20vw] h-10 mt-5 rounded-md bg-slate-900 text-slate-50 hover:bg-slate-800'>Sign Up</button>
        </form>

        <h1 className='mt-3 text-lg'>Already have  an  account? <a href="/" className='text-blue-700 text-blue-500'>LogIN</a></h1>
    </div>
      
      
    </>
  )
}

export default Signup
