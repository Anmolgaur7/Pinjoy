import React, { useEffect, useState } from 'react'

function Board() {

    const id=JSON.parse(localStorage.getItem('user')).id;
    console.log(id);
    const [data, setdata] = useState({ 
        Userid:id,
        Description: '',
        Imageurl: '', 
    })


    const uploadimage=async(file)=>{
        const formdata=new FormData();
        formdata.append('file',file);
        formdata.append('upload_preset','Pinjoy');
        formdata.append('cloud_name','dvmsnhndm');
        const res=await fetch('https://api.cloudinary.com/v1_1/dvmsnhndm/image/upload',{
          method:'POST',
          body:formdata
        })
        const resdata=await res.json();
        console.log(resdata);
        return {url:resdata.secure_url}
      }

      const handlesubmit = async (e) => {
        e.preventDefault();
        console.log(data);
        const {url}=await uploadimage(data.Imageurl)
        console.log(url);
        if (!url) {
          alert('Please Upload Image')
          return
        }
        const res = await fetch('http://localhost:8000/api/board/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ ...data, Imageurl: url })
        })
        if (res.status === 200) {
          alert('Photo Added')
          setdata({
            Description: '',
            Imageurl: '',
          }) 
        }
        console.log(data);
        const resdata = await res.json()
        console.log(resdata);
        if (resdata.error) {
          alert(resdata.error)
        }
        else {
          alert('Image Uploaded')
        } 
      }

      useEffect(() => {
        if (!localStorage.getItem('user')) {
          window.location.href = '/login'
        }
      }, [])
    return (
        <div>
            <h1 className='text-7xl p-3 font-semibold'>Add to your board!</h1>
            <form className='flex flex-col justify-center bg-orange-200 p-10 items-center'>
            <label className='p-3 text-2xl font-semibold'>Photo</label>
            <input type="file" name='photo' onChange={(e)=>setdata({...data,Imageurl:e.target.files[0]})} className='p-3 text-2xl m-1 w-[90vw] '/>
            <label className='p-3 text-2xl font-semibold'>Description</label>
            <input type="text" placeholder='Write an effective description' className='p-3 text-2xl w-[90vw] border border-black' onChange={(e)=>setdata({...data,Description:e.target.value})}/>
            <button className='bg-slate-950 rounded-lg mt-4 text-white p-3 text-2xl' onClick={handlesubmit}>Add</button>
            </form>
        </div>
    )
}

export default Board
