// import React from 'react';

// const ShowDropdown = ({ limit, setLimit }) => {
//   return (
//     <select
//       value={limit}
//       onChange={e => setLimit(+e.target.value)}
//       className=" p-2 "
//     >
//       {[10, 20, 30, 40, 50, 60].map(n => (
//         <option key={n} value={n}>
//           Show {n}
//         </option>
//       ))}
//     </select>
//   );
// };

// export default ShowDropdown;

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const ShowDropdown = ({ limit, setLimit }) => {
  const [open, setOpen] = useState(false);
  const options = [10, 20, 30, 40, 50, 60];

  return (
    <div className="relative w-32 z-50">
      {/* Selected box */}
      <div
        className="p-2  flex items-center gap-3 cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <span>Show {limit}</span>
        <ChevronDown
          className={`transition-transform duration-300 ${
            open ? 'rotate-180' : 'rotate-0'
          }`}
          size={18}
        />
      </div>

      {/* Dropdown menu */}
      <ul
        className={`absolute left-0 mt-2 w-full bg-white shadow-2xl overflow-hidden transition-all transform origin-top ${
          open
            ? 'opacity-100 scale-y-100 translate-y-0'
            : 'opacity-0 scale-y-95 -translate-y-2 pointer-events-none'
        } duration-200`}
      >
        {options.map(n => (
          <li
            key={n}
            className="px-3 py-2 hover:bg-gray-100 cursor-pointer transition"
            onClick={() => {
              setLimit(n);
              setOpen(false);
            }}
          >
            Show {n}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShowDropdown;
