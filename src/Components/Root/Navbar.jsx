// src/Components/Root/Navbar.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiMenu,
  FiX,
  FiSearch,
  FiHeart,
  FiUser,
  FiShoppingBag,
  FiChevronDown,
} from "react-icons/fi";
import useAuth from "../Hooks/useAuth";
import { toast } from "react-toastify";
import { FaRegistered } from "react-icons/fa6";
import CartSidebar from "./CartSidebar";

const ICON_COLOR = "#303030";

const CATEGORIES = [
  { name: "Best Sellers" },
  { name: "NEW IN" },
  {
    name: "Dresses",
    mega: {
      columns: [
        {
          title: "Occasion",
          items: ["Party", "Work", "Casual", "Wedding Guest", "Holiday"],
        },
        { title: "Length", items: ["Mini", "Midi", "Maxi"] },
        { title: "Season", items: ["Spring", "Summer", "Autumn", "Winter"] },
        {
          title: "Color",
          items: ["Black", "White", "Neutrals", "Brights", "Pastels"],
        },
        {
          title: "Fabric",
          items: ["Silk", "Satin", "Linen", "Cotton", "Knit"],
        },
        {
          title: "All Dresses",
          items: ["View All", "New Arrivals", "Best Rated"],
        },
      ],
      media: {
        title: "Editor’s Pick",
        text: "Save 15% with code BLACK15 — Limited time only.",
        img: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1200&auto=format&fit=crop",
      },
    },
  },
  { name: "Black Friday", highlight: true },
  { name: "By Trend" },
  { name: "Lookbook" },
  { name: "Clothing" },
  { name: "Accessories" },
  { name: "SALE" },
  { name: "Shop Instagram" },
];

const slugify = (s) =>
  "/" +
  s
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

// Small link component (JS only, no TS types)
const NavLink = ({ label, active, to }) => (
  <Link
    to={to}
    className={`relative px-3 py-3 text-[15px] font-semibold ${
      active ? "text-rose-400" : "text-slate-800"
    }`}
  >
    <span className="after:absolute after:left-1/2 after:-translate-x-1/2 after:-bottom-0.5 after:h-[2px] after:w-0 hover:after:w-full after:bg-slate-900 after:transition-all after:duration-200">
      {label}
    </span>
  </Link>
);

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMega, setOpenMega] = useState(null);
  const [langOpen, setLangOpen] = useState(false);
  const [regOpen, setRegOpen] = useState(false);

  // 🔹 start CLOSED
  const [isCartOpen, setIsCartOpen] = useState(false);

  const { opar, handleLogout, user } = useAuth();
  const navigate = useNavigate();

  function logOut() {
    handleLogout()
      .then(() => {
        navigate("/");
        toast.success("Logged Out");
      })
      .catch(() => toast.error("Something went Wrong"));
  }

  return (
    <header className="w-full bg-[#F9F6F2]">
      <div className="h-[1px] w-full bg-black/60" />
      <div className="text-center font-extrabold text-sm tracking-wide py-2 text-slate-900">
        FREE SHIPPING OVER $89
      </div>

      {/* 🔹 Cart Sidebar (overlay, fixed) */}
      <CartSidebar
        isOpen={isCartOpen}                // ✅ prop name matches
        onClose={() => setIsCartOpen(false)}
      />

      <div className="mx-auto px-4 sm:px-6 lg:px-8 md:mt-5">
        {/* Top row */}
        <div className="flex h-16 items-center justify-between">
          {/* Left (mobile) */}
          <div className="flex items-center gap-2 md:gap-4">
            <button
              className="md:hidden p-2"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <FiMenu size={22} color={ICON_COLOR} />
            </button>
            <button className="md:hidden p-2" aria-label="Search">
              <Link to="/dresses">
                <FiSearch size={22} color={ICON_COLOR} />
              </Link>
            </button>
          </div>

          {/* Center logo */}
          <div className="flex-1 flex justify-center text-center">
            <Link
              to="/"
              className="text-2xl md:text-4xl font-extrabold tracking-tight text-[#000000] italic md:ml-80"
            >
              Forge & Frame {opar}
            </Link>
          </div>

          {/* Right (desktop) */}
          <div className="hidden md:flex items-center gap-5">
            {/* Language */}
            <div className="relative">
              <button
                onClick={() => {
                  setLangOpen((v) => !v);
                  setRegOpen(false);
                }}
                className="flex items-center gap-1 text-sm text-slate-800"
              >
                English <FiChevronDown size={16} color={ICON_COLOR} />
              </button>
              {langOpen && (
                <div
                  className="absolute right-0 mt-2 w-40 rounded-md border border-gray-200 bg-white shadow-sm z-20"
                  onMouseLeave={() => setLangOpen(false)}
                >
                  <button className="w-full px-3 py-2 text-left hover:bg-gray-50">
                    English
                  </button>
                  <button className="w-full px-3 py-2 text-left hover:bg-gray-50">
                    Nederlands
                  </button>
                </div>
              )}
            </div>

            {/* Region / Currency */}
            <div className="relative">
              <button
                onClick={() => {
                  setRegOpen((v) => !v);
                  setLangOpen(false);
                }}
                className="flex items-center gap-1 text-sm text-slate-800"
              >
                United States (USD $){" "}
                <FiChevronDown size={16} color={ICON_COLOR} />
              </button>
              {regOpen && (
                <div
                  className="absolute right-0 mt-2 w-60 rounded-md border border-gray-200 bg-white shadow-sm z-20"
                  onMouseLeave={() => setRegOpen(false)}
                >
                  <button className="w-full px-3 py-2 text-left hover:bg-gray-50">
                    United States (USD $)
                  </button>
                  <button className="w-full px-3 py-2 text-left hover:bg-gray-50">
                    Europe (EUR €)
                  </button>
                  <button className="w-full px-3 py-2 text-left hover:bg-gray-50">
                    United Kingdom (GBP £)
                  </button>
                </div>
              )}
            </div>

            {/* Icons */}
            <div className="flex items-center gap-3">
              <Link to="/dresses">
                <FiSearch size={22} color={ICON_COLOR} />
              </Link>

              {/* replace this icon dashboard */}
              <Link to="/dashboard" aria-label="Wishlist" className="p-2">
                <FiHeart size={22} color={ICON_COLOR} />
              </Link>

              {/* replace this icon logout icon */}
              {user ? (
                <button onClick={() => logOut()} className="p-2">
                  <FaRegistered size={22} />
                </button>
              ) : (
                <Link to="/login" aria-label="Account" className="p-2">
                  <FiUser size={22} color={ICON_COLOR} />
                </Link>
              )}

              {/* Cart button (opens sidebar) */}
              <button
                type="button"
                aria-label="Cart"
                className="p-2"
                onClick={() => setIsCartOpen(true)}   // ✅ open on click
              >
                <FiShoppingBag className="" size={22} color={ICON_COLOR} />
              </button>
            </div>
          </div>

          {/* Right (mobile) */}
          <div className="md:hidden flex items-center gap-2">
            <Link to="/account" className="p-2" aria-label="Account">
              <FiUser size={20} color={ICON_COLOR} />
            </Link>

            {/* Mobile cart button (opens sidebar) */}
            <button
              type="button"
              className="p-2"
              aria-label="Cart"
              onClick={() => setIsCartOpen(true)}
            >
              <FiShoppingBag size={20} color={ICON_COLOR} />
            </button>
          </div>
        </div>

        {/* Category row (desktop) */}
        <div className="hidden md:flex justify-center gap-4 text-sm font-semibold py-6 text-[#1E293B] relative">
          {CATEGORIES.map((cat) => {
            const to = slugify(cat.name);
            return (
              <div
                key={cat.name}
                className="group relative"
                onMouseEnter={() => setOpenMega(cat.mega ? cat.name : null)}
                onMouseLeave={() =>
                  setOpenMega((n) => (n === cat.name ? null : n))
                }
              >
                <NavLink label={cat.name} active={cat.highlight} to={to} />

                {/* Mega dropdown */}
                {cat.mega && openMega === cat.name && (
                  <div className="absolute left-1/2 -translate-x-1/2 top-[28px] z-30 w-screen max-w-7xl px-4 trasnslate-y-2 opacity-100 visible transition-all duration-300">
                    <div className="mx-auto rounded-b-2xl border border-slate-200 bg-white shadow-sm">
                      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 p-6">
                        <div className="lg:col-span-3 grid grid-cols-2 sm:grid-cols-3 gap-4">
                          {cat.mega.columns.map((col) => (
                            <div key={col.title}>
                              <div className="text-[13px] font-bold uppercase text-[#131a25] tracking-wide mb-2">
                                {col.title}
                              </div>
                              <ul className="space-y-1">
                                {col.items.map((it) => (
                                  <li key={it}>
                                    <Link
                                      to={`${to}${slugify(
                                        "/" + col.title
                                      )}/${slugify(it)}`}
                                      className="text-[#7C7A79] hover:underline font-normal text-sm"
                                    >
                                      {it}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>

                        <div className="lg:col-span-2">
                          <div className="overflow-hidden rounded-xl border border-slate-200">
                            <div className="p-4">
                              <div className="font-semibold">
                                {cat.mega.media.title}
                              </div>
                              <p className="text-sm text-slate-600 mt-1">
                                {cat.mega.media.text}
                              </p>
                              <Link
                                to={to}
                                className="mt-3 inline-block text-sm font-semibold underline"
                              >
                                Shop now
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full w-80 max-w-[85%] bg-[#F9F6F2] shadow-xl p-4 overflow-y-auto">
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold text-slate-900">Menu</span>
              <button onClick={() => setMobileOpen(false)} className="p-2">
                <FiX size={22} color={ICON_COLOR} />
              </button>
            </div>

            <div className="mt-4">
              {CATEGORIES.map((cat) => {
                const to = slugify(cat.name);
                return (
                  <details
                    key={cat.name}
                    className="group border-b border-slate-200"
                  >
                    <summary className="flex list-none items-center justify-between py-3 font-semibold text-slate-900">
                      <Link
                        to={to}
                        className={cat.highlight ? "text-rose-400" : ""}
                      >
                        {cat.name}
                      </Link>
                      {cat.mega ? (
                        <FiChevronDown className="transition group-open:rotate-180" />
                      ) : (
                        <span />
                      )}
                    </summary>
                    {cat.mega && (
                      <div className="pb-3 pl-2">
                        {cat.mega.columns.map((col) => (
                          <details key={col.title} className="group">
                            <summary className="flex list-none items-center justify-between py-2 text-[15px] text-slate-800">
                              {col.title}
                              <FiChevronDown className="transition group-open:rotate-180" />
                            </summary>
                            <ul className="pl-3 pb-2 space-y-1">
                              {col.items.map((it) => (
                                <li key={it}>
                                  <Link
                                    to={`${to}${slugify(
                                      "/" + col.title
                                    )}/${slugify(it)}`}
                                    className="text-[15px] text-slate-800"
                                  >
                                    {it}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </details>
                        ))}
                      </div>
                    )}
                  </details>
                );
              })}
            </div>

            <div className="py-4 border-t border-slate-200 mt-2">
              <Link
                to="/wishlist"
                className="flex items-center gap-2 font-semibold"
              >
                <FiHeart size={20} color={ICON_COLOR} />
                WISHLIST
              </Link>
            </div>

            <div className="py-2 border-t border-slate-200 text-sm">
              <details className="group">
                <summary className="flex list-none items-center justify-between py-2">
                  English{" "}
                  <FiChevronDown className="transition group-open:rotate-180" />
                </summary>
                <div className="pl-3 pb-2 space-y-2">
                  <button className="block text-left w-full">English</button>
                  <button className="block text-left w-full">Nederlands</button>
                </div>
              </details>

              <details className="group">
                <summary className="flex list-none items-center justify-between py-2">
                  United States (USD $){" "}
                  <FiChevronDown className="transition group-open:rotate-180" />
                </summary>
                <div className="pl-3 pb-2 space-y-2">
                  <button className="block text-left w-full">
                    United States (USD $)
                  </button>
                  <button className="block text-left w-full">
                    Europe (EUR €)
                  </button>
                  <button className="block text-left w-full">
                    United Kingdom (GBP £)
                  </button>
                </div>
              </details>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
