import React, { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import ProductCard from "./ProductCard";

const Products = () => {


  const [expandedFilter, setExpandedFilter] = useState(null);
  const [activeFilters, setActiveFilters] = useState({});
  const [sortBy, setSortBy] = useState("recommended");
  const [products , setProducts] = useState([]);
  useEffect(()=>{
    fetch('./products.json')
    .then(res => res.json())
    .then(data => {
      setProducts(data)
    })
  },[])
  const colorMap = {
    Brown: "#8B6F47",
    Black: "#000000",
    Ivory: "#FFFFF0",
    Sage: "#9DC183",
    Burgundy: "#800020",
    Navy: "#001F3F",
    "Dusty Pink": "#D8A5A5",
    Champagne: "#F7E7CE",
    Beige: "#D9C4A3",
    Mocha: "#7B5B44",
    Stone: "#CBC4B3",
    Cream: "#F5F1E6",
    White: "#FFFFFF",
    Emerald: "#006C5B",
  };

  const filterData = useMemo(() => {
    const allColors = [...new Set(products.map((p) => p.color[0]))];

    return {
      availability: {
        label: "Availability",
        items: [
          { name: "In Stock", count: products.length },
          { name: "Out of Stock", count: 0 },
        ],
      },
      price: {
        label: "Price",
        items: [
          { name: "$0 - $80", count: products.filter((p) => p.price < 80).length },
          {
            name: "$80 - $120",
            count: products.filter((p) => p.price >= 80 && p.price <= 120).length,
          },
          {
            name: "$120+",
            count: products.filter((p) => p.price > 120).length,
          },
        ],
      },
      color: {
        label: "Color",
        items: allColors.map((color) => ({
          name: color,
          count: products.filter((p) => p.color[0] === color).length,
          colorCode: colorMap[color],
        })),
      },
      size: {
        label: "Size",
        items: ["XS", "S", "M", "L", "XL"].map((size) => ({
          name: size,
          count: products.filter((p) => p.sizes.includes(size)).length,
        })),
      },
    };
  }, [products, colorMap ]);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Color filter
    if (activeFilters.color && activeFilters.color.length > 0) {
      result = result.filter((p) => activeFilters.color.includes(p.color[0]));
    }

    // Size filter
    if (activeFilters.size && activeFilters.size.length > 0) {
      result = result.filter((p) =>
        activeFilters.size.some((size) => p.sizes.includes(size))
      );
    }

    // Availability (for now, “In Stock” = all)
    if (activeFilters.availability && activeFilters.availability.length > 0) {
      if (activeFilters.availability.includes("In Stock")) {
        result = result.filter(() => true);
      }
    }

    // Price filter (simple ranges matching labels)
    if (activeFilters.price && activeFilters.price.length > 0) {
      result = result.filter((p) => {
        return activeFilters.price.some((label) => {
          if (label === "$0 - $80") return p.price < 80;
          if (label === "$80 - $120") return p.price >= 80 && p.price <= 120;
          if (label === "$120+") return p.price > 120;
          return true;
        });
      });
    }

    // Sort
    if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [products, activeFilters, sortBy]);

  const handleFilterChange = (filterKey, itemName) => {
    setActiveFilters((prev) => ({
      ...prev,
      [filterKey]: prev[filterKey]?.includes(itemName)
        ? prev[filterKey].filter((i) => i !== itemName)
        : [...(prev[filterKey] || []), itemName],
    }));
  };

  const handleReset = () => {
    setActiveFilters({});
    setSortBy("recommended");
  };

  // Small dropdown component for the top bar
  const TopFilterDropdown = ({ filterKey, data }) => {
    const isOpen = expandedFilter === filterKey;

    return (
      <div className="relative">
        <button
          type="button"
          onClick={() => setExpandedFilter(isOpen ? null : filterKey)}
          className="flex items-center gap-1 text-sm font-semibold text-gray-800 border border-gray-200 rounded-full px-3 py-1.5 hover:border-black hover:bg-gray-50 transition"
        >
          <span>{data.label}</span>
          <ChevronDown
            size={16}
            className={`transition-transform ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
          />
        </button>

        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            className="absolute left-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-30 p-3"
          >
            <div className="space-y-2">
              {data.items.map((item) => (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => handleFilterChange(filterKey, item.name)}
                  className="flex items-center justify-between w-full text-left text-sm text-gray-800 hover:bg-gray-50 rounded-md px-2 py-1.5"
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      readOnly
                      checked={
                        activeFilters[filterKey]?.includes(item.name) || false
                      }
                      className="w-4 h-4 accent-black"
                    />
                    <span>{item.name}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {filterKey === "color" && item.colorCode && (
                      <span
                        className="inline-block w-4 h-4 rounded-full border border-gray-300"
                        style={{ backgroundColor: item.colorCode }}
                      />
                    )}
                    <span className="text-xs text-gray-500">
                      ({item.count})
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    );
  };

  return (
    <div className="w-full bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        {/* Top title / count (optional) */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 mb-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Shop Our Collection
          </h1>
          <p className="text-sm text-gray-600">
            {Object.values(activeFilters).flat().length > 0
              ? `Showing ${filteredProducts.length} of ${products.length} items`
              : `Showing all ${products.length} items`}
          </p>
        </div>

        {/* 🔹 FILTER BAR (like your screenshot) */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-8 border-b border-gray-200 pb-4">
          {/* Left: filters */}
          <div className="flex flex-wrap gap-3">
            {Object.entries(filterData).map(([key, data]) => (
              <TopFilterDropdown key={key} filterKey={key} data={data} />
            ))}
          </div>

          {/* Right: sort + reset */}
          <div className="flex items-center gap-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-sm font-semibold border border-gray-200 rounded-full px-3 py-1.5 bg-white text-gray-800"
            >
              <option value="recommended">Recommended</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>

            <button
              type="button"
              onClick={handleReset}
              className="text-xs font-semibold text-gray-500 underline underline-offset-2 hover:text-gray-800"
            >
              Reset all
            </button>
          </div>
        </div>

        {/* Cards grid (your data-wise cards) */}
        {filteredProducts.length > 0 ? (
          <div className="grid gap-6 grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product, idx) => (
              <ProductCard key={product.id} pro={product} index={idx} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-lg font-semibold text-gray-700">
              No products found with selected filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
