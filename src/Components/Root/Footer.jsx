// src/Components/Root/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiMail, FiArrowUp, FiGift } from "react-icons/fi";
import { FaFacebookF, FaPinterestP, FaInstagram } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";

const subText = { color: "#959391" };
const ICON_COLOR = "#303030";
const BG = "#F9F6F2";

const colVariant = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

const Footer = () => {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative w-full mt-14" style={{ backgroundColor: BG }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-10">
        {/* 3-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16">
          {/* SERVICE */}
          <motion.div
            variants={colVariant}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <h3 className="text-md font-semibold text-[#1D1E20] tracking-wide uppercase mb-4">
              Service
            </h3>

            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  to="/about"
                  style={subText}
                  className="hover:text-slate-900 transition"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  style={subText}
                  className="hover:text-slate-900 transition"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  to="/shipping-policy"
                  style={subText}
                  className="hover:text-slate-900 transition"
                >
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/returns"
                  style={subText}
                  className="hover:text-slate-900 transition"
                >
                  Return &amp; Exchange
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  style={subText}
                  className="hover:text-slate-900 transition"
                >
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  style={subText}
                  className="hover:text-slate-900 transition"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/ipr"
                  style={subText}
                  className="hover:text-slate-900 transition"
                >
                  Intellectual Property Rights
                </Link>
              </li>
              <li>
                <Link
                  to="/member-system"
                  style={subText}
                  className="hover:text-slate-900 transition"
                >
                  Member System
                </Link>
              </li>
              <li>
                <Link
                  to="/store-credit"
                  style={subText}
                  className="hover:text-slate-900 transition"
                >
                  About Store Credit
                </Link>
              </li>
            </ul>

            {/* Follow us */}
            <div className="mt-8">
              <p className="text-md font-semibold mb-3 text-[#1D1E20]">
                Follow us
              </p>
              <div className="flex items-center gap-3">
                {[
                  { Icon: FaFacebookF, to: "#" },
                  { Icon: FaXTwitter, to: "#" },
                  { Icon: FaPinterestP, to: "#" },
                  { Icon: FaInstagram, to: "#" },
                  { Icon: FaTiktok, to: "#" },
                ].map(({ Icon, to }, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.25, delay: i * 0.05 }}
                  >
                    <Link
                      to={to}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#303030]"
                      title="social"
                      aria-label="social"
                    >
                      <Icon size={13} color={ICON_COLOR} />
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* QUICK LINKS */}
          <motion.div
            variants={colVariant}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <h3 className="text-md font-semibold tracking-wide uppercase mb-4 text-[#1D1E20]">
              Quick Links
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  to="/faq"
                  style={subText}
                  className="hover:text-slate-900 transition"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  to="/track-order"
                  style={subText}
                  className="hover:text-slate-900 transition"
                >
                  Track Your Order
                </Link>
              </li>
              <li>
                <Link
                  to="/size-charts"
                  style={subText}
                  className="hover:text-slate-900 transition"
                >
                  Size Charts
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  style={subText}
                  className="hover:text-slate-900 transition"
                >
                  Our Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/fabrics"
                  style={subText}
                  className="hover:text-slate-900 transition"
                >
                  Our Fabrics
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* SIGN UP & SAVE */}
          <motion.div
            variants={colVariant}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <h3 className="text-md font-semibold tracking-wide text-[#1D1E20] uppercase mb-4">
              Sign up and save
            </h3>
            <p className="text-sm leading-7 text-slate-800" style={subText}>
              Subscribe to get special offers, free giveaways, and
              once-in-a-lifetime deals.
            </p>

            {/* Email field */}
            <div className="mt-5">
              <div className="flex items-center border border-slate-300 bg-white">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-5 py-4 text-[15px] outline-none bg-transparent placeholder-slate-400"
                />
                <div className="flex flex-col items-center gap-1 pr-4">
                  <FiMail size={18} color={ICON_COLOR} />
                  {/* thin underline on the far right like screenshot */}
                  <span className="h-[1px] w-6 bg-slate-400 -mb-3 block"></span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Floating Rewards button (right) */}
      <motion.button
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="hidden md:flex items-center gap-2 fixed right-6 bottom-28 rounded-full px-4 py-2 shadow-sm"
        style={{ backgroundColor: "#F3C690" }} // soft beige/orange like screenshot
        title="Rewards"
      >
        <FiGift  className="text-slate-950" size={18} />
        <span className="font-semibold text-slate-900">Rewards</span>
      </motion.button>

      {/* Back to top button */}
      <motion.button
        onClick={scrollTop}
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="fixed right-6 bottom-8 h-12 w-12 rounded-full bg-white shadow-sm border border-slate-200 flex items-center justify-center"
        aria-label="Back to top"
        title="Back to top"
      >
        <FiArrowUp size={20} color={ICON_COLOR} />
      </motion.button>

      {/* bottom hairline like the screenshot */}
      <div className="h-[1px] w-full bg-black/10" />
    </footer>
  );
};

export default Footer;
