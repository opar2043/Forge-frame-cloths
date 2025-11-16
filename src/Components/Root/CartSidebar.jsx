// src/Components/CartSidebar.jsx
import React, { useEffect, useState } from "react";
import { FaShoppingCart, FaTrash } from "react-icons/fa";
import { MdClose } from "react-icons/md";

// 🔹 Demo cart data (you can replace with real cart later)
const demoCart = [
  {
    _id: "1",
    name: "Catharine Floral Maxi Dress opar",
    price: 109,
    image:
      "https://images.unsplash.com/photo-1543076447-215ad9ba6923?auto=format&fit=crop&w=600&q=80",
  },
  {
    _id: "2",
    name: "Oversized Linen Shirt",
    price: 69,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=80",
  },
  {
    _id: "3",
    name: "Structured Blazer",
    price: 129,
    image:
      "https://images.unsplash.com/photo-1528701800489-20be3c30c1d5?auto=format&fit=crop&w=600&q=80",
  },
];

// change the design . here too much black. use less 
const CartSidebar = ({ isOpen = false, onClose = () => {} }) => {  // 🔹 default false
  const [cart, setCart] = useState(demoCart);
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    const initial = {};
    cart.forEach((item) => {
      initial[item._id] = 1;
    });
    setQuantities(initial);
  }, [cart]);

  const handleQuantityChange = (id, value) => {
    let qty = parseInt(value, 10);
    if (isNaN(qty) || qty < 1) qty = 1;
    setQuantities((prev) => ({
      ...prev,
      [id]: qty,
    }));
  };

  const handleDelete = (id) => {
    setCart((prev) => prev.filter((item) => item._id !== id));
    setQuantities((prev) => {
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });
  };

  const subtotal =
    cart?.reduce((sum, item) => {
      const qty = quantities[item._id] ?? 1;
      return sum + Number(item.price) * qty;
    }, 0) || 0;

  return (
    <>
      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white text-black shadow-2xl z-[60] transform transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="bg-black text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FaShoppingCart className="text-xl" />
            <h2 className="text-lg font-semibold tracking-wide">Your Cart</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded hover:bg-white/10 transition"
          >
            <MdClose className="text-2xl" />
          </button>
        </div>

        {/* Body */}
        <div className="flex flex-col h-[calc(100%-theme(spacing.16)-theme(spacing.32))] overflow-y-auto p-4">
          {cart && cart.length > 0 ? (
            <div className="space-y-3">
              {cart.map((item) => {
                const qty = quantities[item._id] ?? 1;
                const lineTotal = (Number(item.price) * qty).toFixed(2);

                return (
                  <div
                    key={item._id}
                    className="flex gap-3 p-3 border border-black/10 rounded-xl bg-white hover:shadow-md transition"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 rounded-lg object-cover border border-black/10"
                    />
                    <div className="flex-1 flex flex-col">
                      <h4 className="text-sm font-semibold line-clamp-2">
                        {item.name}
                      </h4>

                      <div className="mt-2 flex items-center gap-2">
                        <span className="text-xs text-gray-500">Qty</span>
                        <input
                          type="number"
                          min="1"
                          value={qty}
                          onChange={(e) =>
                            handleQuantityChange(item._id, e.target.value)
                          }
                          className="w-16 border border-black/20 rounded px-2 py-1 text-xs bg-white focus:outline-none focus:ring-1 focus:ring-black"
                        />
                      </div>

                      <div className="mt-2 flex justify-between items-center text-xs text-gray-600">
                        <span>€{Number(item.price).toFixed(2)} each</span>
                        <span className="font-semibold text-black">
                          €{lineTotal}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleDelete(item._id)}
                      className="self-start p-2 rounded-lg hover:bg-black/5 text-red-500 transition"
                    >
                      <FaTrash />
                    </button>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <FaShoppingCart className="text-gray-300 text-6xl mb-4" />
              <p className="text-gray-700 text-lg font-medium">
                Your cart is empty
              </p>
              <p className="text-gray-400 text-sm mt-1">
                Add something you love.
              </p>
              <button
                onClick={onClose}
                className="mt-6 px-6 py-2 border border-black text-black rounded-full text-sm font-semibold hover:bg-black hover:text-white transition"
              >
                Continue Shopping
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        {cart && cart.length > 0 && (
          <div className="absolute bottom-0 left-0 right-0 border-t border-black/10 bg-white p-4 space-y-3">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-700">Subtotal</span>
              <span className="text-lg font-bold text-black">
                €{subtotal.toFixed(2)}
              </span>
            </div>

            <button className="w-full bg-black text-white py-3 rounded-full text-sm font-semibold tracking-wide hover:bg-black/90 transition">
              Go to Checkout
            </button>

            <button
              onClick={onClose}
              className="w-full text-center text-xs text-gray-600 py-1 hover:text:black transition"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-[55]"
          onClick={onClose}
        />
      )}
    </>
  );
};

export default CartSidebar;
