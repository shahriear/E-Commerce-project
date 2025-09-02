import React, { useState, useRef, useEffect } from 'react';

export default function ProductTabs({
  description,
  additionalInfo,
  reviews,
  activeTab,
  setActiveTab,
}) {
  const [localTab, setLocalTab] = useState('description');

  const currentTab = activeTab || localTab;
  const changeTab = tab => {
    if (setActiveTab) setActiveTab(tab);
    else setLocalTab(tab);
  };

  const reviewsRef = useRef(null);

  // Scroll reviews to center of screen
  useEffect(() => {
    if (currentTab === 'reviews' && reviewsRef.current) {
      reviewsRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      });
    }
  }, [currentTab]);

  return (
    <div className="bg-purple-200 rounded-2xl p-4 md:p-6 mt-8">
      {/* Tabs */}
      <div className="flex gap-4 mb-6 ">
        <button
          onClick={() => changeTab('description')}
          className={`px-4 py-2 rounded-full transition ${
            currentTab === 'description'
              ? 'bg-purple-800 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-200 border border-gray-400'
          }`}
        >
          Description
        </button>
        <button
          onClick={() => changeTab('info')}
          className={`px-4 py-2 rounded-full transition ${
            currentTab === 'info'
              ? 'bg-purple-800 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-200 border border-gray-400'
          }`}
        >
          Additional Info
        </button>
        <button
          onClick={() => changeTab('reviews')}
          className={`px-4 py-2 rounded-full transition ${
            currentTab === 'reviews'
              ? 'bg-purple-800 text-white'
              : 'bg-white border border-gray-400 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Reviews ({reviews?.length || 0})
        </button>
      </div>

      {/* Tab Content */}
      <div className="bg-purple-100 rounded-xl shadow p-4 md:p-6">
        {currentTab === 'description' && (
          <div>
            <p className="text-gray-700 leading-relaxed">{description}</p>
          </div>
        )}

        {currentTab === 'info' && (
          <div className="overflow-x-auto rounded-sm ">
            <table className="w-full border-collapse ">
              <tbody>
                {additionalInfo?.map((item, index) => (
                  <tr
                    key={index}
                    className={`border border-gray-300 ${
                      index % 2 === 0 ? 'bg-purple-100' : 'bg-purple-100'
                    }`}
                  >
                    <td className="p-2 font-medium text-gray-700 w-1/3">
                      {item.label}
                    </td>
                    <td className="p-2 text-gray-600">{item.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {currentTab === 'reviews' && (
          <div ref={reviewsRef}>
            <h3 className="font-semibold text-lg mb-4">
              Customer questions & answers
            </h3>
            <div className="space-y-4 mb-6 w-3/5 ">
              {reviews?.map((review, i) => (
                <div
                  key={i}
                  className="border-b border-gray-300 pb-3 flex justify-between"
                >
                  <div>
                    <p className="font-semibold">{review.user}</p>
                    <p className="text-sm text-gray-500">{review.date}</p>
                    <p className="mt-1 text-gray-700">{review.comment}</p>
                  </div>
                  <div>
                    <p className="text-yellow-500">⭐⭐⭐ {review.rating}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Add review */}
            <div className="w-3/5 ">
              <h1 className="font-bold text-xl mb-3">Add a review</h1>
              <textarea
                placeholder="Write a Review"
                className="w-full h-32 p-3 border shadow-xl border-gray-400 rounded-xl resize-y 
             focus:outline-none focus:ring-0 focus:ring-blue-500 focus:border-blue-500
              focus:shadow-lg transition-all duration-75 ease-in-out bg-white"
              />
              <button className="px-6 py-2 mt-4 bg-purple-800 text-white rounded-lg hover:bg-purple-700">
                Submit Review
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
