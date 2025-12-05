// src/components/Review.jsx
import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { motion } from "framer-motion";

// 🔹 Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

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
    rating: 5,
    review:
      "Bought this for a wedding and got so many compliments. The color is gorgeous, I just needed a tiny alteration on the length.",
    image: "https://images.pexels.com/photos/34747810/pexels-photo-34747810.jpeg",
  },
    {
    name: "Ava Wilson",
    rating: 5,
    review:
      "So pleasantly surprised with the quality and workmanship. It flows beautifully when you walk!",
    image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
  },
  {
    name: "Olivia Brown",
    rating: 5,
    review:
      "This dress was EXACTLY what I wanted. It looked amazing and fit perfectly right out of the bag.",
    image: "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg",
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
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.35 }}
      className="bg-white rounded-md shadow-md border border-gray-100 overflow-hidden flex flex-col h-full"
    >
      {/* top image */}
      <div className="h-36 w-full overflow-hidden">
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
            <span className="font-semibold text-xs text-gray-900">
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
    <section className="py-10 px-3 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl md:text-2xl font-semibold text-slate-950">
          Customer reviews
        </h2>
        <p className="text-xs md:text-sm text-slate-500">
          Real women. Real fits. Real feedback.
        </p>
      </div>

      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={18}
        slidesPerView={1.1}
        centeredSlides={true}
        loop={true}
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 1.3, centeredSlides: true },
          768: { slidesPerView: 2, centeredSlides: false },
          1024: { slidesPerView: 3, centeredSlides: false },
        }}
        className="pb-10"
      >
        {reviews.map((item, index) => (
          <SwiperSlide key={index} className="!h-auto">
            <ReviewCard item={item} index={index} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Review;
