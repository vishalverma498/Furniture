import React from "react";

export default function DrawerThumbnailList({ images, selected, onSelect }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 sm:gap-6">
      {images.map((img, idx) => (
        <button
          key={img}
          onClick={() => onSelect(idx)}
          type="button"
          className={`w-full sm:w-44 sm:h-44 aspect-square rounded-2xl overflow-hidden bg-transparent p-0 m-0 border border-transparent`}
          style={selected === idx ? { outline: "4px solid #F4C16B" } : { boxShadow: "none" }}
        >
          <img
            src={img}
            alt={`Drawer ${idx + 1}`}
            className="w-full h-full object-cover block"
            style={{ imageRendering: "crisp-edges" }}
            draggable={false}
          />
        </button>
      ))}
    </div>
  );
}
