// ViewProduct.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaCircle } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxios from "../Hooks/useAxios";
import useAuth from "../Hooks/useAuth";

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

// Helpers
const getPriceNumber = (price) => {
  if (typeof price === "number") return price;
  if (Array.isArray(price)) return Number(price[0] || 0);
  if (price && typeof price === "object") {
    if (price.$numberInt) return Number(price.$numberInt);
    if (price.$numberDecimal) return Number(price.$numberDecimal);
  }
  return 0;
};

const ViewProduct = () => {
  const { id } = useParams();
  const {handleCart} = useAuth()
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

  useEffect(() => {
    setLoading(true);
    fetch("/products.json")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data || []);
      })
      .catch((err) => {
        console.error("Error loading products.json", err);
      })
      .finally(() => setLoading(false));
  }, []);

  const product = products.find(
    (pr) => String(pr.id) === String(id)
  );

  useEffect(() => {
    if (product) {
      setSelectedImageIndex(0);

      const colorArr = Array.isArray(product.color)
        ? product.color
        : product.color
        ? [product.color]
        : [];
      setSelectedColor(colorArr[0] || "");

      const sizeArr = Array.isArray(product.size)
        ? product.size
        : product.size
        ? [product.size]
        : [];
      setSelectedSize(sizeArr[0] || "");
    }
  }, [product]);

  // * handle add to cart
  const axiosSecure = useAxios();

  // async function handleCart(item) {
  //   const res = await axiosSecure.post("/cart", item);
  //   if (res?.data?.insertedId) {
  //     Swal.fire({
  //       title: "Added!",
  //       text: `${item.name} added to your cart.`,
  //       icon: "success",
  //       timer: 1200,
  //       showConfirmButton: false,
  //     });
  //   } else {
  //     Swal.fire({
  //       title: "Already in Cart",
  //       text: `${item.name} is already in your cart.`,
  //       icon: "info",
  //       timer: 1200,
  //       showConfirmButton: false,
  //     });
  //   }
  // }

  if (loading) {
    return (
      <div className="w-full py-20 flex items-center justify-center">
        <p className="text-sm text-gray-600">Loading product...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="w-full py-20 flex flex-col items-center justify-center">
        <p className="text-lg font-semibold text-gray-800 mb-2">
          Product not found.
        </p>
        <Link
          to="/dresses"
          className="text-sm text-blue-600 hover:underline font-medium"
        >
          Back to collection
        </Link>
      </div>
    );
  }

  const images = Array.isArray(product.images) ? product.images : [];
  const title = Array.isArray(product.name)
    ? product.name[0]
    : product.name || "";
  const price = Number(getPriceNumber(product.price)).toFixed(2);

  const colors = Array.isArray(product.color)
    ? product.color
    : product.color
    ? [product.color]
    : [];

  const sizes = Array.isArray(product.size)
    ? product.size
    : product.size
    ? [product.size]
    : [];

  const handleColorClick = (c) => {
    setSelectedColor(c);
  };

  const handleAddToCart = () => {
    const cartItem = {
      id: product.id,
      name: title,
      price: getPriceNumber(product.price),
      color: selectedColor,
      size: selectedSize,
      image : images 
    };
    handleCart(cartItem);
  };

  return (
    <div className="w-full bg-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
        {/* Breadcrumb */}
        <div className="text-xs sm:text-sm text-gray-500 mb-4 space-x-1">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <span>/</span>
          <Link to="/dresses" className="hover:underline">
            Collection
          </Link>
          <span>/</span>
          <span className="text-gray-700">{title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* LEFT: images */}
          <div className="flex gap-4">
            {/* Thumbnails */}
            <div className="flex flex-col gap-2 max-h-[480px] overflow-y-auto pr-1">
              {images.map((img, idx) => (
                <motion.button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedImageIndex(idx)}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.04 }}
                  className={`relative w-14 h-20 overflow-hidden rounded border ${
                    selectedImageIndex === idx
                      ? "border-black"
                      : "border-gray-200"
                  }`}
                >
                  <img
                    src={img}
                    alt={`${title} thumbnail ${idx + 1}`}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </motion.button>
              ))}
            </div>

            {/* Main image */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex-1"
            >
              <div className="relative w-full aspect-[3/4] bg-neutral-100 overflow-hidden rounded">
                <motion.img
                  key={selectedImageIndex}
                  src={images[selectedImageIndex]}
                  alt={title}
                  className="h-full w-full object-cover"
                  initial={{ opacity: 0.4, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                />
              </div>
            </motion.div>
          </div>

          {/* RIGHT: details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Title & price */}
            <div>
              <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
                {title}
              </h1>
              <p className="mt-3 text-2xl font-semibold text-gray-900">
                £{price}
              </p>
            </div>

            {/* Color */}
            {colors.length > 0 && (
              <div>
                <p className="text-sm font-semibold text-gray-800 mb-2">
                  Color:{" "}
                  <span className="font-normal text-gray-700">
                    {selectedColor || colors[0]}
                  </span>
                </p>
                <div className="flex items-center gap-3">
                  {colors.map((c) => (
                    <motion.button
                      key={c}
                      type="button"
                      onClick={() => handleColorClick(c)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className={`w-8 h-8 rounded-full border ${
                        selectedColor === c
                          ? "border-black"
                          : "border-gray-300"
                      } flex items-center justify-center`}
                    >
                      <span
                        className="inline-block w-6 h-6 rounded-full"
                        style={{
                          backgroundColor:
                            colorMap[c] || c.toLowerCase(),
                        }}
                      />
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Size */}
            {sizes.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-gray-800">
                    Size
                  </p>
                  <button className="text-xs text-gray-600 underline underline-offset-2">
                    Size chart
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((size) => (
                    <motion.button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-4 py-1.5 text-sm rounded-full border ${
                        selectedSize === size
                          ? "bg-black text-white border-black"
                          : "border-gray-300 text-gray-800 bg-white"
                      }`}
                    >
                      {size}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Add to cart */}
            <div className="space-y-3">
              <motion.button
                type="button"
                onClick={handleAddToCart}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="w-full py-3 rounded-md font-semibold tracking-wide"
                style={{
                  backgroundColor: "#1D1E20",
                  color: "#FFFFFF",
                }}
              >
                Add to cart
              </motion.button>

              <div className="flex items-center gap-3 text-xs text-gray-500">
                <span>Free shipping over $89</span>
              </div>
            </div>

            {/* Description */}
            <div className="border-t border-gray-200 pt-4 text-sm text-gray-700 space-y-2">
              <p className="font-semibold">Product Description</p>
              <p>{product.description}</p>
              <p>
                Fit:{" "}
                <span className="font-normal">{product.fit}</span>
              </p>
              {product.materials && (
                <p>
                  Materials:{" "}
                  <span className="font-normal">
                    {product.materials.join(", ")}
                  </span>
                </p>
              )}
              {product.occasion && (
                <p>
                  Occasion:{" "}
                  <span className="font-normal">
                    {product.occasion}
                  </span>
                </p>
              )}
              <p className="text-xs text-gray-500 mt-2">
                Color may vary slightly due to lighting. Please refer
                to our size chart for the best fit.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ViewProduct;
