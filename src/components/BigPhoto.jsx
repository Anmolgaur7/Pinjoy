import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

function BigPhoto() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [currentUserId] = useState(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).id : null);
    console.log(id);
    const [data, setdata] = useState([]);
    console.log(data);
    const [comment, setComment] = useState('');
    const [comments1, setComments] = useState(["No Comments Yet"]);

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const handleSubmitComment = async () => {
        try {
            const res = await fetch('http://localhost:8000/api/board/updatecomment', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ id, comment })
            });
            if (res.status === 200) {
                alert('Comment added');
            }
        } catch (error) {
            console.error('Error adding comment:', error);
            // Handle error
            navigate('/');
        }
    };

    const handleDownload = () => {
        // Create a temporary anchor element
        const anchor = document.createElement('a');
        // Set the href attribute to the image URL
        anchor.href = data.Imageurl;
        // Set the download attribute to the desired filename (optional)
        anchor.download = 'image.jpg'; // You can customize the filename here
        // Programmatically trigger a click event on the anchor element
        anchor.click();
        // Clean up by removing the anchor element
        anchor.remove();
    };

    const handledel = async () => {
        const res = await fetch(`http://localhost:8000/api/board/delete`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id })
        }).then((res) => {
            if (res.status === 200) {
                alert('Photo Deleted');
                navigate('/');
            }
        });
    }
    const handleLike = () => {
        const res = fetch(`http://localhost:8000/api/board/updatelike`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id })
        }).then((res) => {
            if (res.status === 200) {
                alert('Liked');
                Window.location.reload();
            }
        });
    };

    const datafetch = async () => {
        const response = await fetch(`http://localhost:8000/api/board/inboard`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id })
        });
        const res = await response.json();
        setdata(res);
        setComments(res.Comments);
    }
    useEffect(() => {
        console.log("useEffectcalled");
        setComments(data.Comments);
        datafetch();
    }, []);
    return (
        <div>
            <div className='fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 flex justify-center items-center'>
                <div className='modal-container bg-white p-8 rounded-lg flex'>
                    <div className='w-3/4'>
                        <img src={data.Imageurl} alt='Sunset in the mountains' className='max-h-[40rem]' />
                    </div>
                    <div className='w-1/4 p-4'>
                        {/* <h2 className='font-bold text-xl mb-4'>{desc}</h2> */}
                        <div className='mb-4'>
                            <p className='text-gray-700'>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec dui nec libero placerat rhoncus.
                                Nam nec dolor sit amet purus varius efficitur. In hac habitasse platea dictumst.
                            </p>
                        </div>
                        {/* Comment Section */}
                        <div className='mb-4'>
                            <div className='flex justify-between'>
                                <button
                                    className={`bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded`}
                                    onClick={() => handleLike()}>
                                    {data.likes}
                                </button>
                                {
                                    data.Userid === currentUserId && (
                                        <button className='bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 rounded' onClick={handledel}>
                                            Delete
                                        </button>
                                    )
                                }
                                <button onClick={handleDownload} className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'>
                                    Download
                                </button>
                            </div>
                            <h3 className='font-semibold text-lg mb-4'>Comments</h3>
                            <ul className='divide-y divide-gray-200 overflow-scroll h-auto max-h-[20rem] overflow-x-hidden'>
                                {comments1 ? (
                                    comments1.map((comment, index) => (
                                        <li key={index} className='py-4'>
                                            <div className='flex items-start'>
                                                <div className='ml-4'>
                                                    <p className='text-lg font-medium text-gray-500'>{comment}</p>
                                                </div>
                                            </div>
                                        </li>
                                    ))
                                ) : (
                                    <li className='text-gray-500 italic py-4'>No comments yet</li>
                                )}
                            </ul>

                            <input
                                type='text'
                                placeholder='Add a comment...'
                                value={comment}
                                onChange={handleCommentChange}
                                className='border border-gray-400 rounded-md w-full py-2 px-3 focus:outline-none focus:border-blue-500'
                            />
                            <button onClick={() => {
                                handleSubmitComment();
                                handleComment();
                            }} className='mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BigPhoto
