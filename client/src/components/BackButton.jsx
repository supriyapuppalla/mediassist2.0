import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function BackButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      aria-label="Go back"
      className="p-2 rounded-md bg-transparent hover:bg-green-100 text-green-700 mr-2"
    >
      {/* simple left arrow */}
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M12.293 16.293a1 1 0 010-1.414L15.586 11H4a1 1 0 110-2h11.586l-3.293-3.879a1 1 0 011.524-1.297l5 5.888a1 1 0 01.083.11l.007.01a1 1 0 01.09.144l.004.01a1 1 0 01.028.098l.003.02a1 1 0 01.017.073v.003l.002.01a1 1 0 01.004.03v.01a1 1 0 01-.005.057v.01a1 1 0 01-.012.09l-.002.01-.006.03-.006.029a1 1 0 01-.02.076l-.007.023-.016.045a1 1 0 01-.03.08l-5 6.001a1 1 0 01-1.524.094z" clipRule="evenodd" />
      </svg>
    </button>
  );
}