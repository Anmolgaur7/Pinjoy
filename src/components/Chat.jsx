import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useRef } from 'react'
import { FaBars } from 'react-icons/fa';
import { FaTimes } from 'react-icons/fa';
import Logo from '../Images/logo.jpg'
import Ppic from '../Images/profileicon.png'
import { useParams } from 'react-router-dom'


function Chat() {
  const conversationid = useParams().receiverid;
  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

  const [loggedinuser, setloggedinuser] = useState(user)

  const [messages, setmessages] = useState([])
  const logout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };
  const [message, setmessage] = useState("")
  const [conversation, setconversation] = useState([])
  const part = conversation.participants
  const receiver = part?.find((p) => p !== user.id)
  const [receiveruser, setreceiveruser] = useState([])
  const [menuOpen, setMenuOpen] = useState(false);
  
  



  const sendmessage = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:8000/api/conversation/message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        conversationId: conversationid,
        senderId: user.id,
        content: message
      })
    });
    const res = await response.json();
    console.log(res)
    setmessages([...messages, { message: { content: message } }])
    setmessage("")
    messageref.current.scrollIntoView({ behavior: "smooth" })
  }
  const fetchreceiver = async () => {
    const response = await fetch(`http://localhost:8000/api/user/one`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: receiver
      })
    });
    const res = await response.json();
    setreceiveruser(res);
    console.log(res)
  }
  const messageref = useRef(null)
  const [visible, setvisible] = useState(false)
  const fetchconversation = async () => {
    const response = await fetch(`http://localhost:8000/api/conversation/${conversationid}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
    });
    const res = await response.json();

    setconversation(res);
    setmessages(res.messages)
    console.log(res)

  }

  useEffect(() => {
    setInterval(() => {
      fetchconversation();
    }, 200)
  }, [])

  useEffect(() => {
    fetchreceiver();
    fetchconversation();
  }, [])

  return (
    <div>
        <div className="bg-red-400 p-[0.85rem]">
          <div className="flex justify-between items-center">
            <a href="/main">
              <img src={Logo} alt="Site logo" className="w-[15vw] rounded-full md:w-[3vw]" />
            </a>
            <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <FaTimes className="text-white text-2xl" /> : <FaBars className="text-white text-2xl" />}
            </button>
            <div className="hidden md:flex flex-grow justify-between items-center">
              <div className="flex items-center">
                <a href="/yourboard" className="font-bold text-xl m-2 md:m-5 hover:text-blue-800">YourBoard</a>
                <a href="/userslist" className="font-bold text-xl m-2 md:m-5 hover:text-blue-800">People</a>
                <a href="/requests" className="font-bold text-xl m-2 md:m-5 hover:text-blue-800">Requests</a>
              </div>
            </div>
            <div className="relative mt-2 md:mt-0">
              <img
                src={Ppic}
                alt="profile logo"
                className="w-[15vw] rounded-full border-black border md:w-[3vw]"
                onClick={() => setvisible(!visible)}
              />
              {visible && (
                <ul className="absolute right-0 mt-8 p-2 bg-white border border-gray-300 rounded shadow">
                  <li className="text-xl font-semibold hover:text-blue-500 cursor-pointer" onClick={logout}>LogOut</li>
                </ul>
              )}
            </div>
          </div>
          {menuOpen && (
            <div className="fixed inset-0 bg-red-400 flex flex-col items-center justify-center z-50 md:hidden">
              <a href="/yourboard" className="font-bold text-2xl m-5 hover:text-blue-800" onClick={() => setMenuOpen(false)}>YourBoard</a>
              <a href="/userslist" className="font-bold text-2xl m-5 hover:text-blue-800" onClick={() => setMenuOpen(false)}>People</a>
              <a href="/requests" className="font-bold text-2xl m-5 hover:text-blue-800" onClick={() => setMenuOpen(false)}>Requests</a>
              <a href="/freinds" className="font-bold text-2xl m-5 hover:text-blue-800" onClick={() => setMenuOpen(false)}
              >freinds</a>
            </div>
          )}
        </div>
      <div className=' min-h-[25vw] mt-4 '>
        <div className=' min-h-[500px]  p-4 overflow-y-scroll '>
          {
            messages?.length > 0 ? messages.map((message) => {
              return (
                <>
                  <div key={message._id} className={` max-w-[40%] rounded-b-2xl h-[2rem] shadow-lg  pl-2 p-1 mb-2 ${message.sender === loggedinuser.id ? 'bg-blue-200 rounded-tl-2xl  ml-auto' : ' bg-slate-100   rounded-tr-2xl'} `}>
                    <h1 className='text-black'>
                      {message.content}
                    </h1>
                  </div>
                  <div ref={messageref}>

                  </div>
                </>
              )
            }) : <div className=' flex justify-center items-center'>
              <div className='text-center text-xl m-3 font-semibold p-3 rounded-2xl bg-slate-100 w-fit'> No conversations</div>
            </div>
          }
        </div>
      </div>
      <div className='  flex m-3 items-center'>
        <input type="text" className=' w-[75%] h-[2.65rem] rounded-full p-3 ml-6 mr-1 focus:ring-2 focus:border-0 outline-none shadow-lg' placeholder='Type a message' value={message} onChange={(e) => setmessage(e.target.value)} />
        <div className={`${!message && 'pointer-events-none'}`} onClick={(e) => sendmessage(e)} >
          <svg xmlns="http://www.w3.org/2000/svg" className={`icon icon-tabler icon-tabler-send  bg-white rounded-full p-1 cursor-pointer`} width="30" height="30" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M10 14l11 -11" />
            <path d="M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5" />
          </svg>
        </div>
        <div className={`${!message && 'pointer-events-none'}`}>
          <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-circle-plus bg-white rounded-full p-1 cursor-pointer ml-1" width="30" height="30" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
            <path d="M9 12h6" />
            <path d="M12 9v6" />
          </svg>
        </div>
      </div>

    </div>
  )
}

export default Chat
