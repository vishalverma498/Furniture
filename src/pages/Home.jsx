import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const images = [
  "/images/home/home1.jpeg",
  "/images/home/home2.jpg",
  "/images/home/home3.jpg",
  "/images/home/home4.jpg",
  "/images/home/home5.jpg",
];

export default function HomePage() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      nextImage();
    }, 5000);
    return () => clearInterval(interval);
  }, [current]);

  const prevImage = () => {
    setDirection("left");
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setDirection("right");
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const getIndex = (offset) => (current + offset + images.length) % images.length;

  const handleShowMore = () => {
    navigate("/showmore");
  };

  return (
    <div className="min-h-screen w-screen bg-[#c6bb9c] flex flex-col items-center justify-center gap-10 py-10 overflow-hidden">
      {/* Logo + Show More Button */}
      <div className="flex flex-col items-center text-center px-4">
        <img
          src="/images/home/Hlogo.png"
          alt="Vaastu Kalpaa Logo"
          width={320}
          height={90}
          className="object-contain mb-4"
        />
        <button
          onClick={handleShowMore}
          className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition text-sm md:text-base"
        >
          SHOW MORE
        </button>
      </div>

      {/* Carousel */}
      <div className="flex items-center justify-center w-full px-4 gap-4">
        {/* Left Arrow */}
        <button
          onClick={prevImage}
          className="flex w-10 h-10 md:w-12 md:h-12 items-center justify-center rounded-full bg-white/30 hover:bg-white/50 transition"
        >
          <svg width="28" height="28" fill="none">
            <circle cx="14" cy="14" r="13" stroke="white" strokeWidth="2" />
            <polyline points="16,8 10,14 16,20" stroke="white" strokeWidth="2" fill="none" />
          </svg>
        </button>

        {/* Images */}
        <div className="relative w-full max-w-6xl h-[300px] sm:h-[350px] md:h-[400px]">
          <img
            src={images[getIndex(-1)]}
            alt="prev"
            className={`absolute left-[10%] sm:left-[15%] top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-48 sm:w-48 sm:h-64 object-cover rounded-lg shadow-lg opacity-60 scale-90 z-10 transition-all duration-500
              ${direction === "left" ? "animate-slideInRight" : direction === "right" ? "animate-slideOutLeft" : ""}`}
          />
          <img
            src={images[getIndex(0)]}
            alt="current"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-52 sm:w-64 sm:h-72 md:w-80 md:h-80 object-cover rounded-xl shadow-2xl z-20 transition-all duration-500"
          />
          <img
            src={images[getIndex(1)]}
            alt="next"
            className={`absolute left-[90%] sm:left-[85%] top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-48 sm:w-48 sm:h-64 object-cover rounded-lg shadow-lg opacity-60 scale-90 z-10 transition-all duration-500
              ${direction === "right" ? "animate-slideInLeft" : direction === "left" ? "animate-slideOutRight" : ""}`}
          />
        </div>

        {/* Right Arrow */}
        <button
          onClick={nextImage}
          className="flex w-10 h-10 md:w-12 md:h-12 items-center justify-center rounded-full bg-white/30 hover:bg-white/50 transition"
        >
          <svg width="28" height="28" fill="none">
            <circle cx="14" cy="14" r="13" stroke="white" strokeWidth="2" />
            <polyline points="12,8 18,14 12,20" stroke="white" strokeWidth="2" fill="none" />
          </svg>
        </button>
      </div>

      {/* Tailwind animation styles */}
      <style>{`
       
        @keyframes slideInLeft {
          from { transform: translateX(120%) scale(0.9); opacity: 0.6; }
          to { transform: translateX(0) scale(0.9); opacity: 0.6; }
        }
        @keyframes slideOutLeft {
          from { transform: translateX(0) scale(0.9); opacity: 0.6; }
          to { transform: translateX(-120%) scale(0.9); opacity: 0.6; }
        }

        .animate-slideInLeft { animation: slideInLeft 0.5s ease; }
        .animate-slideOutLeft { animation: slideOutLeft 0.5s ease; }
        .animate-slideInRight { animation: slideInRight 0.5s ease; }
        .animate-slideOutRight { animation: slideOutRight 0.5s ease; }
      `}</style>
    </div>
  );
}
