import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DrawerPreview from "../components/chest/rightside";
import DrawerThumbnailList from "../components/chest/leftthumbnail";

const chairImages = [
  "/images/ChestofDrawers/001.jpg",
  "/images/ChestofDrawers/002.jpg",
  "/images/ChestofDrawers/003.jpg",
  "/images/ChestofDrawers/004.jpg",
  "/images/ChestofDrawers/005.jpg",
  "/images/ChestofDrawers/006.jpg",
  "/images/ChestofDrawers/007.jpg",
  "/images/ChestofDrawers/008.jpg",
  "/images/ChestofDrawers/009.jpg",
  "/images/ChestofDrawers/010.jpg",
  "/images/ChestofDrawers/0011.jpg",
  "/images/ChestofDrawers/012.jpg",
  "/images/ChestofDrawers/013.jpg",
];

const colorVariants = [
  "/images/ChestofDrawers/option1.jpeg",
  "/images/ChestofDrawers/option2.jpeg",
  "/images/ChestofDrawers/option3.jpeg",
  "/images/ChestofDrawers/option4.jpeg",
  "/images/ChestofDrawers/option5.jpeg",
];

export default function ChestofDrawers() {
  const [selected, setSelected] = useState(0);
  const [color, setColor] = useState(0);
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/showmore");
  };

  return (
    <div className="w-screen min-h-screen flex flex-col bg-white overflow-hidden">
      {/* Header */}
      <div className="bg-[#252223] px-6 sm:px-10 py-4 flex flex-col lg:flex-row items-start lg:items-center justify-between shrink-0">
        <img
          src="/images/home/ylogo.png"
          alt="Vaastu Kalpaa Logo"
          width={130}
          height={60}
          className="object-contain mb-2 lg:mb-0"
        />
        <div className="text-3xl sm:text-4xl font-light text-white">
          Chest of Drawers
        </div>
      </div>

      {/* Back button for mobile (above the content) */}
      <div className="px-4 sm:px-10 py-4 block lg:hidden">
        <button
          onClick={handleBack}
          className="bg-[#F4C16B] text-white px-6 py-2 rounded-full text-lg font-semibold shadow hover:bg-[#e0a94b] transition"
        >
          Back
        </button>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row flex-1 overflow-hidden px-4 sm:px-10 py-6 gap-6">
        {/* DrawerPreview (fixed height and sticky on large screens) */}
        <div className="w-full lg:w-2/3 order-1 lg:order-2 lg:h-[calc(100vh-150px)] lg:sticky lg:top-[120px]">
          <DrawerPreview
            mainImage={chairImages[selected]}
            colorVariants={colorVariants}
            selectedColor={color}
            onColorSelect={setColor}
          />
        </div>

        {/* Thumbnails scrollable on large screens */}
        <div className="w-full lg:w-1/3 order-2 lg:order-1 overflow-y-auto lg:max-h-[calc(100vh-150px)] pr-1">
          <DrawerThumbnailList
            images={chairImages}
            selected={selected}
            onSelect={setSelected}
          />
        </div>
      </div>

      {/* Back button for desktop (bottom right fixed) */}
      <div className="hidden lg:block absolute bottom-6 right-6 z-50">
        <button
          onClick={handleBack}
          className="bg-[#F4C16B] text-white px-6 py-2 rounded-full text-lg font-semibold shadow hover:bg-[#e0a94b] transition"
        >
          Back
        </button>
      </div>
    </div>
  );
}
