import React, { useEffect, useState } from 'react';

function Photocard({ id, pic,title ,desc, uploaderId }) {
  const [uploader, setUploader] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/user/one`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ id: uploaderId })
        });
        const userData = await response.json();
        setUploader(userData);
      } catch (error) {
        console.error("Error fetching uploader data:", error);
      }
    };

    fetchUserData();
  }, [uploaderId]);

  return (
    <div className="max-w-3xl rounded overflow-hidden shadow-lg m-4">
      <a href={`/picdetails/${id}`}>
        <img className="w-full h-auto" src={pic} alt="Sunset in the mountains" />
      </a>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <div className="flex items-center mb-2">
          {uploader && (
            <div className="flex items-center">
              {/* <img src={uploader.profilePic} alt="Uploader" className="w-8 h-8 rounded-full mr-2" /> */}
              <p className="text-gray-700 text-base font-semibold">{uploader.Name}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Photocard;
