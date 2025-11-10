import React from "react";
import { motion } from "framer-motion";
import { FaCircle } from "react-icons/fa";

const ProductCard = ({ pro, index }) => {
  const title = pro?.name?.[0] || "";
  const img = pro?.image?.[0] || "";
  const price = Number(pro?.price?.[0] || 0).toFixed(2);
  const colors = Array.isArray(pro?.color) ? pro.color : [];

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

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -8 }}
      className="group"
    >
      {/* Image */}
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-md bg-neutral-100">
        <motion.img
          src={img}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          whileHover={{ scale: 1.05 }}
        />
      </div>

      {/* Info */}
      <div className="mt-3">
        <motion.h3
          animate={{ opacity: [0.9, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-[15px] font-medium text-neutral-900 line-clamp-1"
        >
          {title}
        </motion.h3>

        <div className="mt-2 flex items-center gap-3">
          <motion.span
            animate={{ opacity: [0.9, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-[15px] text-slate-900 font-semibold"
          >
            ${price}
          </motion.span>

          {/* color dots (supports array) */}
          <div className="flex items-center gap-2">
            {colors.map((c, i) => (
              <motion.span
                key={i}
                title={c}
                whileHover={{ scale: 1.2 }}
                className="inline-grid h-4 w-4 place-items-center rounded-full ring-1 ring-black/10 cursor-pointer"
                style={{ background: colorMap[c] || c.toLowerCase() }}
              >
                <FaCircle className="opacity-0" />
              </motion.span>
            ))}
          </div>
        </div>

        {/* Add to cart (no floating, solid button) */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-3 w-full rounded-md px-4 py-2 text-sm font-medium transition hover:opacity-95"
          style={{ backgroundColor: "#F6E0D9", color: "#2b2b2b" }}
          onClick={() => console.log("Add to cart:", pro.id)}
        >
          Add to cart
        </motion.button>
      </div>
    </motion.article>
  );
};

export default ProductCard;