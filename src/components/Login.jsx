import React from 'react'

function Login() {
  return (
    <>
    <div className='bg-slate-200 w-screen h-screen shadow-lg flex justify-center items-center flex-col'>
        <h1 className='text-3xl text-center font-semibold text-slate-900 pb-16'>Login</h1>
        <form className='flex flex-col bg-white p-10 items-center justify-center'>
            <input className='w-[35vw] h-10 mt-5 bg-slate-50 border border-black rounded-md pl-2' type='text' placeholder='Username' />
            <input className='w-[35vw] h-10 mt-5 bg-slate-50 border border-black rounded-md pl-2' type='password' placeholder='Password' />
            <button className='w-[20vw] h-10 mt-5 rounded-md bg-slate-900 text-slate-50 hover:bg-slate-800'>Login</button>
        </form>

        <h1 className='mt-3 text-lg'>Did'nt have  an  account? <a href="/" className='text-blue-700 text-blue-500'>SignUp</a></h1>
    </div>
      
    </>
  )
}

export default Login
