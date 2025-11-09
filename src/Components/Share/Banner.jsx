import React from 'react';

const Banner = ({ ban, alt = 'Banner image' }) => {
  return (
    <section className="relative w-full h-[40vh] sm:h-[50vh] md:h-[60vh] lg:h-[80vh] xl:h-[90vh] mb-8 bg-[#F9F6F2]">
      <img
        src={ban}
        alt={alt}
        className="absolute inset-0 w-full h-full object-cover object-center"
        loading="eager"
      />
    </section>
  );
};

export default Banner;
