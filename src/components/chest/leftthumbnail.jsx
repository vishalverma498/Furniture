// DrawerThumbnailList.js
import React from "react";

export default function DrawerThumbnailList({ images, selected, onSelect }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 sm:gap-6">
      {images.map((img, idx) => (
        <button
          key={img}
          onClick={() => onSelect(idx)}
          className={`w-full max-w-[180px] sm:w-44 sm:h-44 aspect-square rounded-2xl overflow-hidden shadow-lg border-4 ${
            selected === idx ? "border-[#F4C16B]" : "border-transparent"
          }`}
        >
          <img
            src={img}
            alt={`Drawer ${idx + 1}`}
            className="w-full h-full object-cover"
          />
        </button>
      ))}
    </div>
  );
}
