import React from "react";
import Skeleton from "react-loading-skeleton";

export const BenefitCard = ({ title, desc, imageUrl }) => {
  return (
    <div className="w-1/2 max-w-xs px-4">
      <div className="border shadow-lg rounded-lg py-4 px-2">
        <img src={imageUrl} alt="" className="object-cover" />
        <div className="mt-4 text-center">
          <p className="font-semibold text-lg">{title || <Skeleton />}</p>
          <p className="text-gray-800">{desc || <Skeleton />}</p>
        </div>
      </div>
    </div>
  );
};
