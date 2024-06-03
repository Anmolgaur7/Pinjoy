import React, { useEffect, useState } from 'react';
import Logo from '../Images/logo.jpg';
import Ppic from '../Images/profileicon.png';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaSearch } from 'react-icons/fa';
import { FaBars } from 'react-icons/fa';
import { FaTimes } from 'react-icons/fa';

const FriendRequests = ({ currentUserId }) => {
    // State variables
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [visible, setvisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);


    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

    
    const logout = () => {
        localStorage.clear();
        window.location.href = '/login';
    };
    // Fetch friend requests from the server
    const fetchRequests = async () => {
        try {
            const response = await fetch(`http://localhost:8000/api/request/get-requests`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: currentUserId,
                }),
            });
            const data = await response.json();
            if (response.ok) {
                setRequests(data.requests);
                console.log(data.requests);
            } else {
                setError(data.message);
            }
        } catch (error) {
            console.error(error);
            setError('Server error');
        } finally {
            setLoading(false);
        }
    };

    // Handle accepting a friend request
    const handleAcceptRequest = async (requestId) => {
        try {
            const response = await fetch(`http://localhost:8000/api/request/respond-request`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    requestId: requestId,
                    action: 'accept',
                    userId: user.id
                }),
            });

            const data = await response.json();
            console.log(data);

            if (response.ok) {
                console.log(data.message); // Log the success message
                // Remove the accepted request from the list of requests
                setRequests(requests.filter(request => request._id !== requestId));
            } else {
                console.error(data.message); // Log the error message
            }
        } catch (error) {
            console.error(error);
            // Handle error appropriately
        }
    };

    // Handle declining a friend request
    const handleDeclineRequest = async (requestId) => {
        try {
            const response = await fetch(`http://localhost:8000/api/request/respond-request`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    requestId: requestId,
                    action: 'decline',
                }),
            });

            const data = await response.json();

            if (response.ok) {
                console.log(data.message); // Log the success message
                // Remove the declined request from the list of requests
                setRequests(requests.filter(request => request._id !== requestId));
            } else {
                console.error(data.message); // Log the error message
            }
        } catch (error) {
            console.error(error);
            // Handle error appropriately
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    // Render loading, error, or requests list
    if (loading) {
        return <div className="text-center text-gray-500">Loading...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500">Error: {error}</div>;
    }

    return (
        <>
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
            <div className="container mx-auto h-[40vw] p-4">
                <h2 className="text-2xl font-bold mb-4">Friend Requests</h2>

                {requests.length === 0 && <div className="text-center text-gray-500">No friend requests</div>}
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {requests.map((request) => (
                        
                        <div className="p-4 bg-white shadow rounded-lg" key={request._id}>
                            <div className="mb-2">
                                <p className="text-xl font-semibold">{request.Name}</p>
                            </div>
                            <div className="flex space-x-2">
                                <button
                                    className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded"
                                    onClick={() => handleAcceptRequest(request._id)}
                                >
                                    Accept
                                </button>
                                <button
                                    className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded"
                                    onClick={() => handleDeclineRequest(request._id)}
                                >
                                    Decline
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default FriendRequests;
