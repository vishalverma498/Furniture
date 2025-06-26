import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const chairImages = [
  "/images/CrockeryUnits/0012.jpg",
  "/images/CrockeryUnits/001.jpg",
  "/images/CrockeryUnits/002.jpg",
  "/images/CrockeryUnits/003.jpg",
  "/images/CrockeryUnits/004.jpg",
  "/images/CrockeryUnits/005.jpg",
  "/images/CrockeryUnits/006.jpg",
  "/images/CrockeryUnits/007.jpg",
  "/images/CrockeryUnits/008.jpg",
  "/images/CrockeryUnits/009.jpg",
  "/images/CrockeryUnits/0010.jpg",
  "/images/CrockeryUnits/0011.jpg",
];

const colorVariants = [
  "/images/CrockeryUnits/0012.1.jpg",
];

export default function Crockery() {
  const [selected, setSelected] = useState(0);
  const [color, setColor] = useState(0);
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/showmore");
  };

  return (
    <div className="w-screen h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="bg-[#252223] flex flex-col lg:flex-row items-start lg:items-center justify-between px-6 sm:px-10 py-6">
        <div className="flex items-center space-x-4 mb-4 md:mb-0">
          <img
            src="/images/home/ylogo.png"
            alt="Vaastu Kalpaa Logo"
            width={130}
            height={60}
            className="object-contain"
          />
        </div>
        <div className="text-4xl sm:text-5xl font-light text-white leading-none">
          Crockery Units
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden px-4 sm:px-10 py-6 gap-6">
        {/* Left: Thumbnails */}
        <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 sm:gap-6 overflow-y-auto pr-2 lg:max-w-[360px]">
          {chairImages.map((img, idx) => (
            <button
              key={img}
              onClick={() => setSelected(idx)}
              className={`w-full max-w-[180px] sm:w-44 sm:h-44 aspect-square rounded-2xl overflow-hidden shadow-lg border-4 ${
                selected === idx ? "border-[#F4C16B]" : "border-transparent"
              }`}
            >
              <img
                src={img}
                alt={`Chair ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>

        {/* Right: Preview */}
        <div className="flex-1 flex flex-col items-center overflow-auto">
          <div className="w-full max-w-[600px] h-[250px] sm:h-[400px] bg-black rounded-lg flex items-center justify-center shadow-xl">
            <img
              src={chairImages[selected]}
              alt="Selected chair"
              className="max-h-[80%] max-w-[80%] object-contain"
            />
          </div>

          {/* Color Variants */}
          <div className="flex flex-wrap justify-center sm:justify-start gap-4 mt-6 sm:mt-8">
            {colorVariants.map((img, idx) => (
              <button
                key={img}
                onClick={() => setColor(idx)}
                className={`w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden border-4 ${
                  color === idx ? "border-[#F4C16B]" : "border-transparent"
                }`}
              >
                <img
                  src={img}
                  alt={`Variant ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Back Button */}
      <div className="fixed bottom-6 right-6 z-50">
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
