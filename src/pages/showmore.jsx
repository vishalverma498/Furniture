import React from "react";
import { Link } from "react-router-dom";

const categories = [
  { label: "Arm Chairs", img: "/images/ARMCHAIRS/001.jpg", route: "armchair" },
  { label: "Dressing Tables", img: "/images/dresstable/dressing.jpg", route: "dressing" },
  { label: "Chest of Drawers", img: "/images/ChestofDrawers/001.jpg", route: "chest" },
  { label: "Console Tables", img: "/images/ConsoleTables/001.jpg", route: "console" },
  { label: "book shelfs", img: "/images/bookshelfs/001.jpg", route: "book" },
  { label: "Shoes Racks", img: "/images/ShoesRacks/001.jpg", route: "shoe" },
  { label: "Crockery Units", img: "/images/CrockeryUnits/001.jpg", route: "crockery" },
  { label: "Sofas", img: "/images/sofa/sofa.jpg", route: "sofa" },
  { label: "Bedside Tables", img: "/images/BedsideTables/001.jpg", route: "beside" },
  { label: "Dinning Table Sets", img: "/images/dinningtable/dinning.jpeg", route: "dinningtable" },
];

const ITEMS_PER_PAGE = 8;

export default function ShowMore() {
  const [page, setPage] = React.useState(1);
  const totalPages = Math.ceil(categories.length / ITEMS_PER_PAGE);
  const paginated = categories.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen w-screen bg-white flex flex-col">
      {/* Header */}
      <div className="bg-[#252223] flex flex-col lg:flex-row items-start lg:items-center justify-between px-6 sm:px-10 py-6">
        <div className="flex items-center space-x-4 mb-4 lg:mb-0">
          <img
            src="/images/home/ylogo.png"
            alt="Vaastu Kalpaa Logo"
            width={130}
            height={60}
            className="object-contain"
          />
        </div>
        <div className="text-4xl sm:text-5xl font-light text-white leading-none">
          Furniture Collections
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col justify-between">
        {/* Grid */}
        <div className="max-w-7xl mx-auto py-10 px-4 flex-1">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-8 gap-y-12">
            {paginated.map((cat) => (
              <div key={cat.label} className="flex flex-col items-center">
                <Link to={`/${cat.route}`}>
                  <div className="w-48 h-48 rounded-[32px] overflow-hidden shadow-lg mb-4 bg-gray-100 flex items-center justify-center hover:scale-105 transition-transform duration-200">
                    <img
                      src={cat.img}
                      alt={cat.label}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </Link>
                <span className="text-xl font-normal text-black text-center">{cat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination */}
        <div className="flex justify-center sm:justify-end items-center px-4 sm:px-16 pb-8 space-x-2">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`w-8 h-8 rounded-full border border-gray-400 text-black text-sm font-semibold flex items-center justify-center ${
                page === i + 1 ? "bg-gray-700 text-white" : "bg-gray-200"
              }`}
            >
              {i + 1}
            </button>
          ))}
          {page < totalPages && (
            <button
              onClick={() => setPage(page + 1)}
              className="ml-2 px-3 py-1 rounded bg-gray-300 text-black text-sm font-semibold"
            >
              NEXT
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
