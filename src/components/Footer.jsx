import React, { useState } from 'react';

function Footer() {
  const [email, setEmail] = useState('');

  const handleSubscribe = () => {
    // Handle subscription functionality here
    console.log(`Subscribed with email: ${email}`);
    // You can send the email to your backend for subscription processing
    // Clear the email field after submission
    setEmail('');
  };

  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full lg:w-1/3 px-4 mb-4 lg:mb-0">
            <h2 className="text-2xl font-bold mb-4">Subscribe to our Newsletter</h2>
            <p className="mb-4">Stay updated with the latest news and promotions by subscribing to our newsletter.</p>
            <div className="flex">
              <input
                type="email"
                className="w-full bg-gray-800 text-white border border-gray-700 rounded-l py-2 px-3 focus:outline-none"
                placeholder="Your Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                onClick={handleSubscribe}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 rounded-r focus:outline-none"
              >
                Subscribe
              </button>
            </div>
          </div>
          <div className="w-full lg:w-2/3 px-4">
            {/* Add any additional footer content here */}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
