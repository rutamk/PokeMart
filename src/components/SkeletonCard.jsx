import React from 'react';

const SkeletonCard = () => {
  return (
    <div className="bg-neutral-800 text-neutral-100 rounded-xl shadow-md p-3 flex flex-col items-center animate-pulse">
      {/* Image Placeholder */}
      <div className="w-[7rem] h-[7rem] bg-neutral-700 rounded-full mb-3" />

      {/* Name Placeholder */}
      <div className="h-4 w-4/5 bg-neutral-700 mb-2 rounded" />

      {/* Types Placeholder */}
      <div className="flex gap-3 mb-3">
        <div className="h-3 w-14 bg-neutral-700 rounded-full" />
        <div className="h-3 w-14 bg-neutral-700 rounded-full" />
      </div>

      {/* Stats Placeholder */}
      <div className="flex gap-3 text-xs text-neutral-300 mb-3">
        <div className="flex items-center gap-1">
          <div className="h-4 w-12 bg-neutral-700 rounded" />
        </div>
        <div className="flex items-center gap-1">
          <div className="h-4 w-12 bg-neutral-700 rounded" />
        </div>
        <div className="flex items-center gap-1">
          <div className="h-4 w-12 bg-neutral-700 rounded" />
        </div>
      </div>

      {/* Price and Button Placeholder */}
      <div className="flex justify-between items-center w-full mt-3 text-sm text-neutral-300">
        <div className="h-3 w-20 bg-neutral-700 rounded ml-2" />
        <div className="h-4 w-24 bg-neutral-700 rounded" />
      </div>
    </div>
  );
};



export default SkeletonCard;
