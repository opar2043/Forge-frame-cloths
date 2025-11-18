// src/components/Review.jsx
import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { motion } from "framer-motion";

// ✅ Review data
const REVIEW_DATA = [
  {
    name: "Sophia Martinez",
    rating: 5,
    review:
      "I was a little nervous ordering this dress online, but it fits perfectly and looks so flattering. Definitely a 10/10 stunner!",
    image: "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg",
  },
  {
    name: "Emma Johnson",
    rating: 4,
    review:
      "Bought this for a wedding and got so many compliments. The color is gorgeous, I just needed a tiny alteration on the length.",
    image: "https://images.pexels.com/photos/34747810/pexels-photo-34747810.jpeg",
  },
  {
    name: "Olivia Brown",
    rating: 5,
    review:
      "This dress was EXACTLY what I wanted. It looked amazing and fit perfectly right out of the bag.",
    image: "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg",
  },
  {
    name: "Ava Wilson",
    rating: 4,
    review:
      "So pleasantly surprised with the quality and workmanship. It flows beautifully when you walk!",
    image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
  },
  {
    name: "Isabella Davis",
    rating: 5,
    review:
      "If you’re thinking about it, just get it. Super comfortable, flattering, and perfect for events and photos.",
    image: "https://images.pexels.com/photos/34747810/pexels-photo-34747810.jpeg",
  },
];

// ⭐ helper to render stars
const Stars = ({ rating }) => {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, idx) => (
        <FaStar
          key={idx}
          className={
            idx < rating
              ? "text-pink-400 w-4 h-4"
              : "text-gray-300 w-4 h-4"
          }
        />
      ))}
    </div>
  );
};

const ReviewCard = ({ item, index }) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      className="bg-white rounded shadow-md border border-gray-100 overflow-hidden flex flex-col"
    >
      {/* top image */}
      <div className="h-52 w-full overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* content */}
      <div className="p-4 flex flex-col gap-3 flex-1">
        {/* stars */}
        <div className="flex items-center gap-2">
          <Stars rating={item.rating} />
          <span className="text-xs text-gray-400">{item.rating}.0</span>
        </div>

        {/* name + badge */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="font-semibold text-sm text-gray-900">
              {item.name}
            </span>
            <span className="text-xs text-gray-400">Verified buyer</span>
          </div>
          <span className="text-[10px] uppercase tracking-wide bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
            qualified
          </span>
        </div>

        {/* review text */}
        <p className="text-sm text-gray-700 leading-relaxed line-clamp-4">
          {item.review}
        </p>
      </div>
    </motion.article>
  );
};

const Review = () => {
  const [reviews] = useState(REVIEW_DATA);

  return (
    <section className="py-8 px-3 max-w-6xl mx-auto">
      <h2 className="text-xl text-slate-950 md:text-2xl font-semibold mb-4">
        Customer reviews
      </h2>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {reviews.map((item, index) => (
          <ReviewCard key={index} item={item} index={index} />
        ))}
      </div>
    </section>
  );
};

export default Review;
