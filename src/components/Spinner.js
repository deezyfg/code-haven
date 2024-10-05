import React from 'react';
import './Spinner.css';

const Spinner = () => {
  return (
    <div className="spinner" role="status">
      <svg className="spinner-svg" viewBox="0 0 50 50">
        <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Spinner;
