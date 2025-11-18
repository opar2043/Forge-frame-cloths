// src/Components/SwiperCard.jsx
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode, Pagination } from "swiper/modules";

import ProductCard from "./ProductCard";
import useProducts from "../Hooks/useProducts";
import { Link } from "react-router-dom";

const SwiperCard = () => {
  const [products] = useProducts();

  // you can slice if you want only some products
  const shownProducts = (products || []).slice(0, 10);

  return (
    <div className="w-full py-10 bg-white">
      {/* Title */}
      <div className="max-w-6xl mx-auto px-4 mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-950">
            Wedding Guest Dresses
          </h2>
          <Link to={'/dresses'} className="mt-1 text-sm text-slate-950 font-semibold underline underline-offset-4">
            Shop All
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row gap-6">
        {/* Left big static image */}
        <div className="md:w-1/3 w-full">
          <div className="relative h-full min-h-[320px] overflow-hidden rounded-lg">
            <img
              src="https://www.lerevecraze.com/wp-content/uploads/2025/02/9032467e-48e5-4833-8e5e-244c63ae67c0-300x400.jpg"
              alt="Featured dress"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </div>

        {/* Right slider with product cards */}
        <div className="md:w-2/3 w-full">
          <Swiper
            slidesPerView={1.2}
            spaceBetween={20}
            freeMode={true}
            pagination={{ clickable: true }}
            breakpoints={{
              640: { slidesPerView: 2.2, spaceBetween: 24 },
              1024: { slidesPerView: 3, spaceBetween: 28 },
            }}
            modules={[FreeMode, Pagination]}
            className="mySwiper pb-8"
          >
            {shownProducts.map((product, idx) => (
              <SwiperSlide key={product.id || product._id} className="!w-auto">
                <div className="max-w-xs mx-auto">
                  <ProductCard pro={product} index={idx} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default SwiperCard;
