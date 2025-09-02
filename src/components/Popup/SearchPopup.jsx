// import { Search, X } from 'lucide-react';
// import React, { useState } from 'react';

// const SearchPopup = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [search, setSearch] = useState('');

//   const areas = [
//     'All',
//     'Dhaka',
//     'Chittagong',
//     'Khulna',
//     'Sylhet',
//     'Rajshahi',
//     'Aighanistan',
//     'Albania',
//     'Algeria',
//     'Andorra',
//     'Angola',
//     'Anguilla',
//     'Antigua And Barbuda',
//     'Argentina',
//     'Armenia',
//     'Aruba',
//     'Australia',
//     'Austria',
//     'Azerbaijan',
//     'Bahamas',
//     'Bahrain',
//     'Bangladesh',
//     'Barbados',
//     'Belarus',
//     'Belgium',
//     'Belize',
//     'Benin',
//     'Bermuda',
//     'Bhutan',
//     'Bolivia',
//     'Bosnia And Herzegovina',
//     'Bolswana',
//     'Brazil',
//     'British Indian Ocean Territory',
//     'Brunei',
//     'Bulgaria',
//     'Burkina Faso',
//     'Myanmar',
//     'Burundi',
//     'Cambodia',
//     'Cameroon',
//     'Canada',
//     'Cape Verde',
//     'Cayman Islands',
//     'Central African Republic',
//     'Chad',
//     'Christmas Island',
//     'Cocos (Keeling) Islands',
//     'Cook Islands',
//     'Chile',
//     'Comoros',
//     'Congo',
//     'Costa Rica',
//     'Croatia',
//     'Cuba',
//     'Cyprus',
//     'Czech Republic',
//     'Denmark',
//     'Djibouti',
//   ];

//   return (
//     <div className="relative">
//       {/* Search bar trigger */}
//       <input
//         type="text"
//         placeholder="Your Location"
//         onClick={() => setIsOpen(true)}
//         className="px-4 py-2 border rounded w-64 focus:outline-none border-gray-300 "
//       />
//       <Search
//         className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
//         size={18}
//       />

//       {/* Modal Overlay */}
//       {isOpen && (
//         <div
//           className="fixed inset-0 bg-black/60 bg-opacity-50 flex items-center justify-center z-50"
//           onClick={() => setIsOpen(false)}
//         >
//           {/* Modal Content */}
//           <div
//             className="bg-white rounded-xl w-fit p-6 relative"
//             onClick={e => e.stopPropagation()} //
//           >
//             {/* Close Button */}
//             <button
//               onClick={() => setIsOpen(false)}
//               className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl font-bold"
//             >
//               <X className="bg-gray-200 rounded-full " size={28} />
//             </button>

//             {/* Modal Heading */}
//             <h2 className="text-lg font-semibold mb-1 text-center">
//               Choose your Delivery Location
//             </h2>
//             <p className="text-[14px] font-sans mb-4 text-center">
//               Enter your address and we will specify the offer for your area.
//             </p>

//             {/* Search Input */}
//             <div className="relative">
//               <input
//                 type="text"
//                 value={search}
//                 onChange={e => setSearch(e.target.value)}
//                 placeholder="Search your area...."
//                 className="w-full px-4 py-2 border border-gray-200 rounded mb-4 focus:outline-none bg-gray-200"
//               />
//               <Search
//                 className="absolute right-3 top-1/3 -translate-y-1/2 text-gray-500"
//                 size={18}
//               />
//             </div>

//             {/* Area List */}
//             <ul className="max-h-48 overflow-y-auto">
//               {areas
//                 .filter(area =>
//                   area.toLowerCase().includes(search.toLowerCase())
//                 )
//                 .map((area, idx) => (
//                   <li
//                     key={idx}
//                     className="p-2 hover:bg-gray-100 rounded cursor-pointer"
//                     onClick={() => {
//                       setSearch(area);
//                       setIsOpen(false);
//                     }}
//                   >
//                     {area}
//                   </li>
//                 ))}
//             </ul>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SearchPopup;

import { Search, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

const SearchPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');

  const areas = [
    'All',
    'Dhaka',
    'Chittagong',
    'Khulna',
    'Sylhet',
    'Rajshahi',
    'Afghanistan',
    'Albania',
    'Algeria',
    'Andorra',
    'Angola',
    'Anguilla',
    'Antigua And Barbuda',
    'Argentina',
    'Armenia',
    'Aruba',
    'Australia',
    'Austria',
    'Azerbaijan',
    'Bahamas',
    'Bahrain',
    'Bangladesh',
    'Barbados',
    'Belarus',
    'Belgium',
    'Belize',
    'Benin',
    'Bermuda',
    'Bhutan',
    'Bolivia',
    'Bosnia And Herzegovina',
    'Botswana',
    'Brazil',
    'British Indian Ocean Territory',
    'Brunei',
    'Bulgaria',
    'Burkina Faso',
    'Myanmar',
    'Burundi',
    'Cambodia',
    'Cameroon',
    'Canada',
    'Cape Verde',
    'Cayman Islands',
    'Central African Republic',
    'Chad',
    'Christmas Island',
    'Cocos (Keeling) Islands',
    'Cook Islands',
    'Chile',
    'Comoros',
    'Congo',
    'Costa Rica',
    'Croatia',
    'Cuba',
    'Cyprus',
    'Czech Republic',
    'Denmark',
    'Djibouti',
  ];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  return (
    <div className="relative">
      {/* Trigger input */}
      <input
        type="text"
        placeholder="Your Location"
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 border rounded w-64 focus:outline-none border-gray-300 cursor-pointer"
        readOnly
      />

      {/* Popup via Portal */}
      {createPortal(
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="fixed inset-0 bg-black/60 flex items-center justify-center z-[9999] "
              onClick={() => setIsOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-white rounded-xl w-fit p-6 relative shadow-lg"
                onClick={e => e.stopPropagation()}
                initial={{ opacity: 0, y: -80 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -80 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                {/* Close button */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-3 right-3 flex items-center justify-center w-8 h-8 bg-gray-200 rounded-full hover:bg-gray-300"
                >
                  <X size={18} className="text-gray-700" />
                </button>

                <h2 className="text-lg font-semibold mb-2 ">
                  Choose your Delivery Location
                </h2>
                <p className="text-[14px] mb-4  text-gray-600">
                  Enter your address and we will specify the offer for your
                  area.
                </p>

                {/* Search Input */}
                <div className="relative mb-4">
                  <input
                    type="text"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Search your area..."
                    className="w-full px-4 py-2 border border-gray-200 rounded bg-gray-100 focus:outline-none"
                  />
                  <Search
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                    size={18}
                  />
                </div>

                {/* Area List */}
                <ul className="max-h-48 overflow-y-auto">
                  {areas
                    .filter(area =>
                      area.toLowerCase().includes(search.toLowerCase())
                    )
                    .map((area, idx) => (
                      <li
                        key={idx}
                        className="p-2 hover:bg-gray-100 rounded cursor-pointer"
                        onClick={() => {
                          setSearch(area);
                          setIsOpen(false);
                        }}
                      >
                        {area}
                      </li>
                    ))}
                </ul>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
};

export default SearchPopup;
