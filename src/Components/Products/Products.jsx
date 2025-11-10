import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Grid3x3, List } from 'lucide-react';
import ProductCard from './ProductCard';

const Products = () => {
  const products = [
    {
      id: "catharine-maxi-brown",
      name: ["Catharine Floral Lace Sheer Maxi Dress"],
      slug: "catharine-floral-lace-sheer-maxi-brown",
      price: [109],
      currency: "USD",
      rating: 4.7,
      reviews_count: 38,
      color: ["Brown"],
      sizes: ["S", "M", "L", "XL"],
      materials: ["Polyester", "Premium Lace"],
      fit: "Relaxed",
      stretch: "High",
      opening: "Pullover",
      included: "Underdress",
      shipping_free_over: 89,
      promos: [{ threshold: 100, off: 10 }, { threshold: 200, off: 15 }, { threshold: 400, off: 20 }],
      sku: "CAT-MAXI-BRN",
      image: ["https://img-va.myshopline.com/image/store/1715339847991/2025-09-13-elena16936_375x.jpg?w=1770&h=2655"],
      category: ["Women", "Dresses", "Maxi"]
    },
    {
      id: "catharine-maxi-black",
      name: ["Catharine Floral Lace Sheer Maxi Dress"],
      slug: "catharine-floral-lace-sheer-maxi-black",
      price: [109],
      currency: "USD",
      rating: 4.8,
      reviews_count: 52,
      color: ["Black"],
      sizes: ["S", "M", "L", "XL"],
      materials: ["Polyester", "Premium Lace"],
      fit: "Relaxed",
      stretch: "High",
      opening: "Pullover",
      included: "Underdress",
      shipping_free_over: 89,
      promos: [{ threshold: 100, off: 10 }, { threshold: 200, off: 15 }, { threshold: 400, off: 20 }],
      sku: "CAT-MAXI-BLK",
      image: ["https://img-va.myshopline.com/image/store/1715339847991/2025-09-13-elena16936_375x.jpg?w=1770&h=2655"],
      category: ["Women", "Dresses", "Maxi"]
    },
    {
      id: "catharine-maxi-ivory",
      name: ["Catharine Floral Lace Sheer Maxi Dress"],
      slug: "catharine-floral-lace-sheer-maxi-ivory",
      price: [109],
      currency: "USD",
      rating: 4.6,
      reviews_count: 24,
      color: ["Ivory"],
      sizes: ["S", "M", "L", "XL"],
      materials: ["Polyester", "Premium Lace"],
      fit: "Relaxed",
      stretch: "High",
      opening: "Pullover",
      included: "Underdress",
      shipping_free_over: 89,
      promos: [{ threshold: 100, off: 10 }, { threshold: 200, off: 15 }, { threshold: 400, off: 20 }],
      sku: "CAT-MAXI-IVR",
      image: ["https://example.com/catharine/ivory.jpg"],
      category: ["Women", "Dresses", "Maxi"]
    },
    {
      id: "catharine-maxi-sage",
      name: ["Catharine Floral Lace Sheer Maxi Dress"],
      slug: "catharine-floral-lace-sheer-maxi-sage",
      price: [109],
      currency: "USD",
      rating: 4.5,
      reviews_count: 19,
      color: ["Sage"],
      sizes: ["S", "M", "L", "XL"],
      materials: ["Polyester", "Premium Lace"],
      fit: "Relaxed",
      stretch: "High",
      opening: "Pullover",
      included: "Underdress",
      shipping_free_over: 89,
      promos: [{ threshold: 100, off: 10 }, { threshold: 200, off: 15 }, { threshold: 400, off: 20 }],
      sku: "CAT-MAXI-SGE",
      image: ["https://example.com/catharine/sage.jpg"],
      category: ["Women", "Dresses", "Maxi"]
    },
    {
      id: "catharine-maxi-burgundy",
      name: ["Catharine Floral Lace Sheer Maxi Dress"],
      slug: "catharine-floral-lace-sheer-maxi-burgundy",
      price: [109],
      currency: "USD",
      rating: 4.7,
      reviews_count: 41,
      color: ["Burgundy"],
      sizes: ["S", "M", "L", "XL"],
      materials: ["Polyester", "Premium Lace"],
      fit: "Relaxed",
      stretch: "High",
      opening: "Pullover",
      included: "Underdress",
      shipping_free_over: 89,
      promos: [{ threshold: 100, off: 10 }, { threshold: 200, off: 15 }, { threshold: 400, off: 20 }],
      sku: "CAT-MAXI-BUR",
      image: ["https://example.com/catharine/burgundy.jpg"],
      category: ["Women", "Dresses", "Maxi"]
    },
    {
      id: "catharine-maxi-navy",
      name: ["Catharine Floral Lace Sheer Maxi Dress"],
      slug: "catharine-floral-lace-sheer-maxi-navy",
      price: [109],
      currency: "USD",
      rating: 4.6,
      reviews_count: 27,
      color: ["Navy"],
      sizes: ["S", "M", "L", "XL"],
      materials: ["Polyester", "Premium Lace"],
      fit: "Relaxed",
      stretch: "High",
      opening: "Pullover",
      included: "Underdress",
      shipping_free_over: 89,
      promos: [{ threshold: 100, off: 10 }, { threshold: 200, off: 15 }, { threshold: 400, off: 20 }],
      sku: "CAT-MAXI-NVY",
      image: ["https://example.com/catharine/navy.jpg"],
      category: ["Women", "Dresses", "Maxi"]
    },
    {
      id: "catharine-maxi-dusty-pink",
      name: ["Catharine Floral Lace Sheer Maxi Dress"],
      slug: "catharine-floral-lace-sheer-maxi-dusty-pink",
      price: [109],
      currency: "USD",
      rating: 4.5,
      reviews_count: 21,
      color: ["Dusty Pink"],
      sizes: ["S", "M", "L", "XL"],
      materials: ["Polyester", "Premium Lace"],
      fit: "Relaxed",
      stretch: "High",
      opening: "Pullover",
      included: "Underdress",
      shipping_free_over: 89,
      promos: [{ threshold: 100, off: 10 }, { threshold: 200, off: 15 }, { threshold: 400, off: 20 }],
      sku: "CAT-MAXI-DPK",
      image: ["https://example.com/catharine/dusty-pink.jpg"],
      category: ["Women", "Dresses", "Maxi"]
    },
    {
      id: "catharine-maxi-champagne",
      name: ["Catharine Floral Lace Sheer Maxi Dress"],
      slug: "catharine-floral-lace-sheer-maxi-champagne",
      price: [109],
      currency: "USD",
      rating: 4.6,
      reviews_count: 26,
      color: ["Champagne"],
      sizes: ["S", "M", "L", "XL"],
      materials: ["Polyester", "Premium Lace"],
      fit: "Relaxed",
      stretch: "High",
      opening: "Pullover",
      included: "Underdress",
      shipping_free_over: 89,
      promos: [{ threshold: 100, off: 10 }, { threshold: 200, off: 15 }, { threshold: 400, off: 20 }],
      sku: "CAT-MAXI-CHM",
      image: ["https://example.com/catharine/champagne.jpg"],
      category: ["Women", "Dresses", "Maxi"]
    }
  ];

  const [expandedFilter, setExpandedFilter] = useState(null);
  const [activeFilters, setActiveFilters] = useState({});
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('recommended');

  const colorMap = {
    Brown: "#8B6F47",
    Black: "#000000",
    Ivory: "#FFFFF0",
    Sage: "#9DC183",
    Burgundy: "#800020",
    Navy: "#001F3F",
    "Dusty Pink": "#D8A5A5",
    Champagne: "#F7E7CE",
  };

  const filterData = useMemo(() => {
    const allColors = [...new Set(products.map(p => p.color[0]))];
    
    return {
      availability: {
        label: "Availability",
        items: [
          { name: "In Stock", count: products.length },
          { name: "Out of Stock", count: 0 },
        ]
      },
      price: {
        label: "Price",
        items: [
          { name: "$50 - $100", count: 0 },
          { name: "$100 - $150", count: products.length },
          { name: "$150 - $200", count: 0 },
          { name: "$200+", count: 0 },
        ]
      },
      color: {
        label: "Color",
        items: allColors.map(color => ({
          name: color,
          count: products.filter(p => p.color[0] === color).length,
          colorCode: colorMap[color]
        }))
      },
      size: {
        label: "Size",
        items: [
          { name: "S", count: products.length },
          { name: "M", count: products.length },
          { name: "L", count: products.length },
          { name: "XL", count: products.length },
        ]
      }
    };
  }, []);

  const filteredProducts = useMemo(() => {
    let result = products;

    if (activeFilters.color && activeFilters.color.length > 0) {
      result = result.filter(p => activeFilters.color.includes(p.color[0]));
    }

    if (activeFilters.size && activeFilters.size.length > 0) {
      result = result.filter(p => 
        activeFilters.size.some(size => p.sizes.includes(size))
      );
    }

    if (activeFilters.availability && activeFilters.availability.length > 0) {
      if (activeFilters.availability.includes("In Stock")) {
        result = result.filter(p => true);
      }
    }

    if (sortBy === 'price-low') {
      result = result.sort((a, b) => a.price[0] - b.price[0]);
    } else if (sortBy === 'price-high') {
      result = result.sort((a, b) => b.price[0] - a.price[0]);
    } else if (sortBy === 'rating') {
      result = result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [activeFilters, sortBy]);

  const handleFilterChange = (filterKey, itemName) => {
    setActiveFilters(prev => ({
      ...prev,
      [filterKey]: prev[filterKey]?.includes(itemName)
        ? prev[filterKey].filter(i => i !== itemName)
        : [...(prev[filterKey] || []), itemName]
    }));
  };

  const handleReset = () => {
    setActiveFilters({});
    setSortBy('recommended');
  };

  const FilterSection = ({ filterKey, data }) => {
    const isExpanded = expandedFilter === filterKey;

    return (
      <motion.div className="border-b border-black/10">
        <motion.button
          onClick={() => setExpandedFilter(isExpanded ? null : filterKey)}
          className="w-full flex items-center justify-between py-4 px-5 hover:bg-black/5 transition"
        >
          <motion.span
            initial={false}
            animate={{ fontWeight: isExpanded ? 700 : 600 }}
            className="text-lg text-black"
          >
            {data.label}
          </motion.span>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown size={22} className="text-black" strokeWidth={2.5} />
          </motion.div>
        </motion.button>

        <motion.div
          initial={false}
          animate={{ height: isExpanded ? "auto" : 0, opacity: isExpanded ? 1 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          <motion.div className="px-5 pb-5 space-y-3">
            {data.items.map((item, idx) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                onClick={() => handleFilterChange(filterKey, item.name)}
                className="flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center gap-3 flex-1">
                  <motion.input
                    type="checkbox"
                    checked={activeFilters[filterKey]?.includes(item.name) || false}
                    onChange={() => {}}
                    className="w-5 h-5 cursor-pointer accent-black"
                    whileHover={{ scale: 1.1 }}
                  />
                  <motion.span
                    whileHover={{ x: 4 }}
                    className="text-black font-semibold"
                  >
                    {item.name}
                  </motion.span>
                </div>
                {filterKey === "color" && item.colorCode && (
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    className="w-5 h-5 rounded-full border-2 border-black/30"
                    style={{ backgroundColor: item.colorCode }}
                  />
                )}
                <motion.span
                  className="text-black font-bold ml-2 min-w-[2rem] text-right"
                >
                  ({item.count})
                </motion.span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <div className="w-full bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <motion.h1
            animate={{ opacity: [0.8, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-4xl sm:text-5xl font-bold text-black mb-3"
          >
            Shop Our Collection
          </motion.h1>
          <motion.p
            animate={{ opacity: [0.7, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
            className="text-xl text-black font-semibold"
          >
            {Object.values(activeFilters).flat().length > 0
              ? `Showing ${filteredProducts.length} of ${products.length} products`
              : `Showing all ${products.length} products`}
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-1"
          >
            <motion.div
              className="border-2 border-black/10 rounded-lg overflow-hidden sticky top-8"
              animate={{ boxShadow: "0 0 0 1px rgba(0,0,0,0.05)" }}
            >
              <div className="bg-black text-white p-5">
                <motion.h2
                  animate={{ opacity: [0.9, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-xl font-bold"
                >
                  Filters
                </motion.h2>
              </div>

              {Object.entries(filterData).map(([key, data], idx) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <FilterSection filterKey={key} data={data} />
                </motion.div>
              ))}

              <div className="p-5 space-y-3 border-t border-black/10">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-black text-white font-bold py-3 rounded-lg transition"
                >
                  Apply Filters
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleReset}
                  className="w-full border-2 border-black text-black font-bold py-3 rounded-lg"
                >
                  Reset All
                </motion.button>
              </div>
            </motion.div>
          </motion.div>

          {/* Products Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-3"
          >
            {/* Top Controls */}
            <motion.div
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 p-5 bg-black/5 rounded-lg"
              animate={{ opacity: [0.8, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <motion.span className="text-black font-bold text-lg">
                {filteredProducts.length} items
              </motion.span>

              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded ${viewMode === 'grid' ? 'bg-black text-white' : 'text-black border border-black'}`}
                  >
                    <Grid3x3 size={20} />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded ${viewMode === 'list' ? 'bg-black text-white' : 'text-black border border-black'}`}
                  >
                    <List size={20} />
                  </motion.button>
                </div>

                <motion.select
                  animate={{ opacity: [0.9, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-black text-black font-bold rounded-lg bg-white"
                >
                  <option value="recommended">Recommended</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </motion.select>
              </div>
            </motion.div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <motion.div
                className={`grid gap-6 ${
                  viewMode === 'grid'
                    ? 'grid-cols-2 sm:grid-cols-2 lg:grid-cols-3'
                    : 'grid-cols-1'
                }`}
              >
                {filteredProducts.map((product, idx) => (
                  <ProductCard key={product.id} pro={product} index={idx} />
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <motion.p
                  animate={{ opacity: [0.7, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-xl text-black font-semibold"
                >
                  No products found with selected filters
                </motion.p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Products;