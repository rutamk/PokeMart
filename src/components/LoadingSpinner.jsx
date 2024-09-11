import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-neutral-900">
      <div className="w-16 h-16 border-4 border-t-4 border-neutral-600 border-opacity-50 rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingSpinner;
