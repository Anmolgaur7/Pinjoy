import React, { useState } from 'react';

function Photocard({id,pic, desc,uploaderId, currentUserId, comments1 }) {
  console.log(id ,uploaderId,currentUserId);
  const [showModal, setShowModal] = useState(false);
  const [liked, setLiked] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmitComment = () => {
    if (comment.trim() !== '') {
      setComments([...comments, comment]);
      setComment('');
    }
  };
  const handleComment=()=>{
    const res = fetch(`http://localhost:8000/api/board/update`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id, Comments: comments })
    }).then((res) => {
      if (res.status === 200) {
        alert('Comment added');
      }
    }
    );
  }
  const handleDownload = () => {
    // Handle download functionality here
  };
 const handledel=async()=>{
    const res= await fetch(`http://localhost:8000/api/board/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id})
    }).then((res) => {
      if (res.status === 200) {
        alert('Photo Deleted');
        window.location.reload();
      }
    });
  }
  return (
    <div>
      <div className='max-w-xs rounded overflow-hidden shadow-lg m-4'>
        <img
          className='w-full cursor-pointer'
          src={pic}
          alt='Sunset in the mountains'
          onClick={() => setShowModal(true)}
        />
        <div className='px-6 py-4'>
          <div className='font-bold text-xl mb-2'>{desc}</div>
          
        </div>
      </div>
      {showModal && (
        <div className='fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 flex justify-center items-center'>
          <div className='modal-container bg-white p-8 rounded-lg flex'>
            <div className='w-3/4'>
              <img src={pic} alt='Sunset in the mountains' className='max-h-[40rem]' />
            </div>
            <div className='w-1/4 p-4'>
              <h2 className='font-bold text-xl mb-4'>{desc}</h2>
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
                  >
                    {liked ? 'Liked' : 'Like'}
                  </button>
                  {
                    uploaderId === currentUserId && (
                      <button className='bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 rounded' onClick={handledel}>
                        Delete
                      </button>
                    )
                  }
                  <button onClick={handleDownload} className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'>
                    Download
                  </button>
                </div>

                <h3 className='font-semibold text-lg mb-2'>Comments</h3>
                <ul className='list-disc list-inside'>
                  {comments.map((comment, index) => (
                    <li key={index} className='mb-1'>{comment}</li>
                  ))}
                </ul>
                <input
                  type='text'
                  placeholder='Add a comment...'
                  value={comment}
                  onChange={handleCommentChange}
                  className='border border-gray-400 rounded-md w-full py-2 px-3 focus:outline-none focus:border-blue-500'
                />
                <button onClick={()=>{
                  handleSubmitComment();
                  handleComment();
                }} className='mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                  Submit
                </button>
              </div>
              {/* End of Comment Section */}
              <button className='absolute top-0 right-0 mt-4 mr-4' onClick={() => setShowModal(false)}>X</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Photocard;
