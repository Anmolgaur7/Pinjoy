import React, { useState, useEffect } from 'react';
import Logo from '../Images/logo.jpg';
import Ppic from '../Images/profileicon.png';



const UsersList = ({ currentUserId }) => {
    // State variables
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [visible, setvisible] = useState(false);

    // Fetch users from the server
    useEffect(() => {
        const fetchUsers = async () => {
            try {
            const response = await fetch(`http://localhost:8000/api/user`, {
                method: "GET",
                headers: {
                  "Content-Type": "application/json"
                },
              });
              const res = await response.json();
              setUsers(res);
            }
            catch (error) {
                console.error(error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    // Send a friend request
    const sendFriendRequest = async (receiverId) => {
        try {
            const response = await fetch('http://localhost:8000/api/request/send-request', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    senderId: currentUserId,
                    receiverId: receiverId
                }),
            });

            const data = await response.json();
            console.log(data);

            if (response.ok) {
                console.log(data.message); // Log the success message
            } else {
                console.error(data.message); // Log the error message
            }
        } catch (error) {
            console.error(error);
            // Handle error appropriately
        }
    };

    // Render loading, error, or users list
    if (loading) {
        return <div className="text-center text-gray-500">Loading...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500">Error: {error}</div>;
    }

    return (
        <>
         <div className='flex justify-between items-center bg-red-300 p-[0.85rem]'>
          <a href="/"><img src={Logo} alt="Site logo" className='w-[15vw] rounded-full md:w-[5vw]' /></a>
          <div>
            <a href="/board" className='font-bold text-xl m-5  hover:text-blue-800'>Board</a>
            <a href="/yourboard" className='font-bold text-xl m-5  hover:text-blue-800'>YourBoard</a>
            <a href="/userslist" className='font-bold text-xl m-5  hover:text-blue-800'>Peaple</a>
          </div>
          <div className='relative'>
            <img src={Ppic} alt="profile logo" className='w-[15vw] rounded-full border-black border md:w-[5vw]' onClick={() => setvisible(!visible)} />
            {visible && (
              <ul className='absolute right-0 mt-8 p-2 bg-white border border-gray-300 rounded shadow'>
                <li className='text-xl font-semibold hover:text-blue-500 cursor-pointer' onClick={logout}>LogOut</li>
              </ul>
            )}
          </div>
        </div>
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">All Users on Pinjoy</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {users.map((user) => (
                    <div className="p-4 bg-white shadow rounded-lg" key={user._id}>
                        <div className="mb-2">
                            <p className="font-semibold">{user.Name}</p>
                            <p className="text-gray-500">{user.Email}</p>
                        </div>
                        {user._id !== currentUserId && (
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
                                onClick={() => sendFriendRequest(user._id)}
                            >
                                Send Friend Request
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
        </>
    );
};

export default UsersList;
