import React from 'react';

const SkeletonCard = () => {
  return (
    <div className="bg-neutral-800 text-neutral-100 rounded-md shadow-md p-4 flex flex-col items-center animate-pulse">
      <div className="w-20 h-20 bg-neutral-700 rounded mb-2"></div>
      <div className="w-24 h-4 bg-neutral-700 rounded mb-1"></div>
      <div className="w-32 h-3 bg-neutral-700 rounded mb-2"></div>
      <div className="w-28 h-3 bg-neutral-700 rounded"></div>
    </div>
  );
};

export default SkeletonCard;
