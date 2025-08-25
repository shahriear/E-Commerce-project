import React from 'react';
import { List, LayoutGrid } from 'lucide-react';

const ViewToggle = ({ view, setView }) => {
  return (
    <div className="flex gap-2">
      <button
        className={`p-2 border rounded ${
          view === 'list' ? 'bg-blue-500 text-white' : ''
        }`}
        onClick={() => setView('list')}
      >
        <List size={20} />
      </button>
      <button
        className={`p-2 border rounded ${
          view === 'grid3' ? 'bg-blue-500 text-white' : ''
        }`}
        onClick={() => setView('grid3')}
      >
        3x
      </button>
      <button
        className={`p-2 border rounded ${
          view === 'grid4' ? 'bg-blue-500 text-white' : ''
        }`}
        onClick={() => setView('grid4')}
      >
        4x
      </button>
    </div>
  );
};

export default ViewToggle;
