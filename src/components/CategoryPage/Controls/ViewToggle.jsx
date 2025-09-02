import React from 'react';
import { AlignLeft } from 'lucide-react';
import { TfiLayoutGrid3Alt, TfiLayoutGrid4Alt } from 'react-icons/tfi';

const ViewToggle = ({ view, setView }) => {
  return (
    <div className="flex gap-2">
      <button
        className={`p-2   ${
          view === 'list' ? 'bg-blue-400 rounded-md text-white' : ''
        }`}
        onClick={() => setView('list')}
      >
        <AlignLeft size={20} />
      </button>
      <button
        className={`p-2 text-md ${
          view === 'grid3' ? 'bg-blue-400 rounded-md text-white' : ''
        }`}
        onClick={() => setView('grid3')}
      >
        <TfiLayoutGrid3Alt />
      </button>
      <button
        className={`p-2 text-xl ${
          view === 'grid4' ? 'bg-blue-400 rounded-md text-white' : ''
        }`}
        onClick={() => setView('grid4')}
      >
        <TfiLayoutGrid4Alt />
      </button>
    </div>
  );
};

export default ViewToggle;
