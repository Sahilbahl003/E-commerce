import React from "react";


const FilterSidebar = ({ filters, setFilters }) => {
  const min = 0;
  const max = 10000;
  const step = 100;

  
  const handleMinChange = (e) => {
    const value = Math.min(Number(e.target.value), filters.maxPrice - step);
    setFilters({ ...filters, minPrice: value });
  };

  const handleMaxChange = (e) => {
    const value = Math.max(Number(e.target.value), filters.minPrice + step);
    setFilters({ ...filters, maxPrice: value });
  };

  return (
    <div className="w-64 shadow p-5 sticky top-[90px] h-fit bg-white">
      <h2 className="font-bold text-lg mb-4">Search by</h2>

      
      <input
        type="text"
        placeholder="Search title"
        className="border p-2 w-full mb-6"
        value={filters.title}
        onChange={(e) => setFilters({ ...filters, title: e.target.value })}
      />

      <div className="mb-10">
        <label className="block text-sm font-medium mb-4">
          Price Range: <span className="font-bold">₹{filters.minPrice} - ₹{filters.maxPrice}</span>
        </label>
        
        <div className="relative h-2 w-full bg-gray-200 rounded-lg">
          
          <div 
            className="absolute h-2 bg-blue-500 rounded"
            style={{
              left: `${(filters.minPrice / max) * 100}%`,
              right: `${100 - (filters.maxPrice / max) * 100}%`
            }}
          />

          {/* Dual Sliders */}
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={filters.minPrice}
            onChange={handleMinChange}
            className="absolute w-full h-2 appearance-none bg-transparent pointer-events-none custom-slider z-20"
          />
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={filters.maxPrice}
            onChange={handleMaxChange}
            className="absolute w-full h-2 appearance-none bg-transparent pointer-events-none custom-slider z-10"
          />
        </div>
      </div>

      {/* Sort Dropdown */}
      <select
        className="border p-2 w-full mt-4"
        value={filters.sort}
        onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
      >
        <option value="">Sort</option>
        <option value="priceLow">Price Low → High</option>
        <option value="priceHigh">Price High → Low</option>
      </select>

      
      <style>{`
        .custom-slider::-webkit-slider-thumb {
          appearance: none;
          pointer-events: auto;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 1px 3px rgba(0,0,0,0.3);
        }
        .custom-slider::-moz-range-thumb {
          appearance: none;
          pointer-events: auto;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: 2px solid white;
        }
      `}</style>
    </div>
  );
};

export default FilterSidebar;



























































































// import React from "react";

// const FilterSidebar = ({ filters, setFilters }) => {
//   return (
//     <div className="w-64 shadow p-5 sticky top-[90px] h-fit bg-white">
//       <h2 className="font-bold text-lg mb-4">Search by</h2>

//       {/* Title Search */}
//       <input
//         type="text"
//         placeholder="Search title"
//         className="border p-2 w-full mb-6"
//         value={filters.title}
//         onChange={(e) => setFilters({ ...filters, title: e.target.value })}
//       />

//       <hr className="mb-6" />

//       {/* Min Price Slider */}
//       <div className="mb-6">
//         <label className="block text-sm font-medium mb-1">
//           Min Price: <span className="font-bold">${filters.minPrice}</span>
//         </label>
//         <input
//           type="range"
//           min="0"
//           max="2000"
//           step="100"
//           className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
//           value={filters.minPrice || 0}
//           onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
//         />
//       </div>

//       {/* Max Price Slider */}
//       <div className="mb-6">
//         <label className="block text-sm font-medium mb-1">
//           Max Price: <span className="font-bold">${filters.maxPrice}</span>
//         </label>
//         <input
//           type="range"
//           min="0"
//           max="2000"
//           step="100"
//           className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
//           value={filters.maxPrice || 2000}
//           onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
//         />
//       </div>

//       {/* Sort Dropdown */}
//       <select
//         className="border p-2 w-full"
//         value={filters.sort}
//         onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
//       >
//         <option value="">Sort</option>
//         <option value="priceLow">Price Low → High</option>
//         <option value="priceHigh">Price High → Low</option>
//       </select>
//     </div>
//   );
// };

// export default FilterSidebar;




























// import React from "react";

// const FilterSidebar = ({ filters, setFilters }) => {

//   return (

//     <div className="w-64  shadow p-5 sticky top-[90px] h-fit">
//       <h2 className="font-bold text-lg mb-4">Search by</h2>

//       <input
//         type="text"
//         placeholder="Search title"
//         className="border p-2 w-full mb-3"
//         value={filters.title}
//         onChange={(e)=>setFilters({...filters,title:e.target.value})}
//       />

//       <input
//         type="number"
//         placeholder="Min Price"
//         className="border p-2 w-full mb-3"
//         value={filters.minPrice}
//         onChange={(e)=>setFilters({...filters,minPrice:e.target.value})}
//       />

//       <input
//         type="number"
//         placeholder="Max Price"
//         className="border p-2 w-full mb-3"
//         value={filters.maxPrice}
//         onChange={(e)=>setFilters({...filters,maxPrice:e.target.value})}
//       />

//       <select
//         className="border p-2 w-full"
//         value={filters.sort}
//         onChange={(e)=>setFilters({...filters,sort:e.target.value})}
//       >

//         <option value="">Sort</option>
//         <option value="priceLow">Price Low → High</option>
//         <option value="priceHigh">Price High → Low</option>

//       </select>

//     </div>

//   );

// };

// export default FilterSidebar;