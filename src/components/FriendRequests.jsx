import React, { useEffect, useState } from 'react';

const FriendRequests = ({ currentUserId }) => {
    // State variables
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
            const response = await fetch(`/api/friend-requests/respond-request`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    requestId: requestId,
                    action: 'accept',
                }),
            });

            const data = await response.json();

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
            const response = await fetch(`/api/friend-requests/respond-request`, {
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
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Friend Requests</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {requests.map((request) => (
                    <div className="p-4 bg-white shadow rounded-lg" key={request._id}>
                        <div className="mb-2">
                            <p className="font-semibold">{request.sender.Name}</p>
                            <p className="text-gray-500">{request.sender.Email}</p>
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
    );
};

export default FriendRequests;
