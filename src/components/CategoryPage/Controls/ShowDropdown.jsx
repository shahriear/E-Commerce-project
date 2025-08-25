import React from 'react';

const ShowDropdown = ({ limit, setLimit }) => {
  return (
    <select
      value={limit}
      onChange={e => setLimit(+e.target.value)}
      className="border p-2 rounded"
    >
      {[10, 20, 30, 40, 50, 60].map(n => (
        <option key={n} value={n}>
          Show {n}
        </option>
      ))}
    </select>
  );
};

export default ShowDropdown;
