import React from "react";

const FilterSidebar = ({ filters, setFilters, categories = [] }) => {

  const min = 0;
  const max = 10000;
  const step = 100;

  const minPrice = filters.minPrice ?? min;
  const maxPrice = filters.maxPrice ?? max;

  const handleMinChange = (e) => {
    const value = Math.min(Number(e.target.value), maxPrice - step);
    setFilters({ ...filters, minPrice: value });
  };

  const handleMaxChange = (e) => {
    const value = Math.max(Number(e.target.value), minPrice + step);
    setFilters({ ...filters, maxPrice: value });
  };

  const handleResetFilters = () => {
  const defaultFilters = {
  title: "",
  minPrice: min,
  maxPrice: max,
  sort: "",
  category: [],
  subCategory: []
};


  setFilters(defaultFilters);
  localStorage.removeItem("filters"); 
};

  //  SUBCATEGORY HANDLER
  const handleSubCategoryChange = (id) => {
    const current = filters.subCategory || [];

    if (current.includes(id)) {
      // remove
      setFilters({
        ...filters,
        subCategory: current.filter(item => item !== id)
      });
    } else {
      // add
      setFilters({
        ...filters,
        subCategory: [...current, id]
      });
    }
  };

  const isFilterApplied =
  (filters.title && filters.title.trim() !== "") ||
  (filters.minPrice !== min) ||
  (filters.maxPrice !== max) ||
  (filters.sort && filters.sort !== "") ||
  (filters.category && filters.category.length > 0) ||
  (filters.subCategory && filters.subCategory.length > 0);


  return (
    <div className="w-64 shadow p-5 sticky top-[90px] h-fit bg-white">

      <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold text-lg">Filters</h2>
          {isFilterApplied && <button
            onClick={handleResetFilters}
            className="text-md text-blue-500 cursor-pointer"
          >
            Clear All
          </button>}
      </div>

      {/* Title Search */}
      <input
        type="text"
        placeholder="Search title"
        className="border p-2 w-full mb-6"
        value={filters.title || ""}
        onChange={(e) => setFilters({ ...filters, title: e.target.value })}
      />

      {/*  SUBCATEGORY FILTER */}
      <div className="mb-6">
  <h3 className="font-semibold mb-2">CATEGORIES</h3>

  <div className="flex flex-col gap-2">

    {categories
      .filter(cat => !cat.parentId)
      .map((cat) => {

        const children = categories.filter(
        sub => sub.parentId?._id?.toString() === cat._id.toString()
        );

        return (
          <div key={cat._id} className="mb-3">

            {/* CATEGORY */}
            <label className="flex items-center gap-2 font-medium cursor-pointer">
              <input
                type="checkbox"
                checked={filters.category?.includes(cat._id)}
                onChange={() => {

                  const current = filters.category || [];

                  if (current.includes(cat._id)) {
                    setFilters({
                      ...filters,
                      category: current.filter(id => id !== cat._id)
                    });
                  } else {
                    setFilters({
                      ...filters,
                      category: [...current, cat._id]
                    });
                  }

                }}
              />
              {cat.name}
            </label>

            {/* SUBCATEGORIES */}
            {filters.category?.includes(cat._id) && children.length > 0 && (
              <div className="ml-5 mt-2 flex flex-col gap-1">

                {children.map((sub) => (

                  <label
                    key={sub._id}
                    className="flex items-center gap-2 text-sm cursor-pointer"
                  >

                    <input
                      type="checkbox"
                      checked={filters.subCategory?.includes(sub._id)}
                      onChange={() => {

                        const current = filters.subCategory || [];

                        if (current.includes(sub._id)) {
                          setFilters({
                            ...filters,
                            subCategory: current.filter(id => id !== sub._id)
                          });
                        } else {
                          setFilters({
                            ...filters,
                            subCategory: [...current, sub._id]
                          });
                        }

                      }}
                    />

                    {sub.name}

                  </label>

                ))}

              </div>
            )}

          </div>
        );
      })}

  </div>
</div>


      {/* Price Slider */}
      <div className="mb-10">
        <label className="block text-sm font-medium mb-4">
          Price Range:{" "}
          <span className="font-bold">
            ₹{minPrice} - ₹{maxPrice}
          </span>
        </label>

        <div className="relative h-2 w-full bg-gray-200 rounded-lg">

          <div
            className="absolute h-2 bg-blue-500 rounded"
            style={{
              left: `${(minPrice / max) * 100}%`,
              right: `${100 - (maxPrice / max) * 100}%`
            }}
          />

          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={minPrice}
            onChange={handleMinChange}
            className="absolute w-full h-2 appearance-none bg-transparent pointer-events-none custom-slider z-20"
          />

          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={maxPrice}
            onChange={handleMaxChange}
            className="absolute w-full h-2 appearance-none bg-transparent pointer-events-none custom-slider z-10"
          />
        </div>
      </div>

      {/* Sort Dropdown */}
      <select
        className="border p-2 w-full mt-4 cursor-pointer"
        value={filters.sort || ""}
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