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
  FiHome,
  FiDatabase,
  FiLogOut,
} from "react-icons/fi";
import useAuth from "../Hooks/useAuth";
import { toast } from "react-toastify";
import CartSidebar from "./CartSidebar";
import useCart from "../Hooks/useCart";
import useProducts from "../Hooks/useProducts";

const ICON_COLOR = "#303030";

// Mega-menu config for Dresses (kept same as before)
const DRESSES_MEGA = {
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
};

const slugify = (s) =>
  "/" +
  s
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

// Small link component
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
  const [cart] = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [products] = useProducts(); // 🔥 build categories from this
  const { handleLogout, user } = useAuth();
  const navigate = useNavigate();

  // Build unique category list from products
  const uniqueCategoryNames = Array.from(
    new Set((products || []).map((p) => p?.category).filter(Boolean))
  );

  // Final CATEGORIES array (static + dynamic)
  const CATEGORIES = [
    { name: "Best Sellers" },
    { name: "NEW IN" },
    // dynamic categories from product data
    ...uniqueCategoryNames.map((name) => ({
      name,
      mega: name === "Dresses" ? DRESSES_MEGA : undefined,
    })),
    { name: "Black Friday", highlight: true },
    { name: "By Trend" },
    { name: "Lookbook" },
    { name: "Accessories" },
    { name: "SALE" },
    { name: "Shop Instagram" },
  ];

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
      <div className="text-center px-3 md:px-10 font-extrabold text-sm tracking-wide py-1 text-slate-900">

        FREE SHIPPING OVER $89
      </div>

      {/* Cart Sidebar */}
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      <div className="mx-auto px-4 sm:px-6 lg:px-8 md:mt-2">
        {/* Top row */}
        <div className="flex h-16 md:h-20 items-center justify-between border-b border-slate-200 md:border-none">
          {/* Left (mobile) */}
          <div className="flex items-center gap-2 md:gap-4">
            <button
              className="md:hidden p-2 rounded-full hover:bg-black/5"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <FiMenu size={22} color={ICON_COLOR} />
            </button>
          </div>

          {/* Center logo */}
          <div className="flex-1 flex justify-center text-center">
            <Link
              to="/"
              className="flex items-center gap-2 md:gap-3 text-xl md:text-4xl font-extrabold tracking-tight text-[#000000] italic"
            >
              <img
                src="/logo2.svg"
                alt="logo"
                className="rounded-full w-9 h-9 md:w-12 md:h-12"
              />
              <span className="uppercase tracking-[0.25em] md:tracking-[0.35em] text-sm md:text-2xl">
                Forge &amp; Frame
              </span>
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

            {/* Icons (desktop) */}
            <div className="flex items-center gap-3">
              <Link to="/dresses" aria-label="Search" className="p-2">
                <FiSearch size={22} color={ICON_COLOR} />
              </Link>

              {/* dashboard */}
              <Link to="/dashboard" aria-label="Dashboard" className="p-2">
                <FiDatabase size={22} color={ICON_COLOR} />
              </Link>

              {/* login / logout */}
              {user ? (
                <button onClick={logOut} className="p-2" aria-label="Logout">
                  <FiLogOut size={22} color={ICON_COLOR} />
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
                onClick={() => setIsCartOpen(true)}
                className="
                  relative inline-flex items-center justify-center
                  h-10 w-10 rounded-full
                  shadow-sm
                  hover:bg-slate-50 hover:border-slate-300
                  transition-all duration-200
                "
              >
                <FiShoppingBag size={20} color={ICON_COLOR} />

                {cart?.length > 0 && (
                  <span
                    className="
                      absolute top-1 right-1
                      min-w-[16px] h-[16px]
                      rounded-full
                      bg-rose-500
                      text-[10px] leading-[18px]
                      text-white font-semibold
                      flex items-center justify-center
                      shadow-sm
                    "
                  >
                    {cart.length > 9 ? "9+" : cart.length}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Right (mobile) – simplified like reference UI */}
          <div className="md:hidden flex items-center gap-1">
            <Link
              to="/search"
              aria-label="Search"
              className="p-2 rounded-full hover:bg-black/5"
            >
              <FiSearch size={20} color={ICON_COLOR} />
            </Link>

            {user ? (
              <Link
                to="/dashboard"
                aria-label="Dashboard"
                className="p-2 rounded-full hover:bg-black/5"
              >
                <FiDatabase size={20} color={ICON_COLOR} />
              </Link>
            ) : (
              <Link
                to="/login"
                aria-label="Account"
                className="p-2 rounded-full hover:bg-black/5"
              >
                <FiUser size={20} color={ICON_COLOR} />
              </Link>
            )}

            <button
              type="button"
              aria-label="Cart"
              onClick={() => setIsCartOpen(true)}
              className="
                relative inline-flex items-center justify-center
                h-9 w-9 rounded-full
                bg-white shadow-sm
                hover:bg-slate-50
                transition-all duration-200
              "
            >
              <FiShoppingBag size={18} color={ICON_COLOR} />
              {cart?.length > 0 && (
                <span
                  className="
                    absolute -top-1 -right-1
                    min-w-[16px] h-[16px]
                    rounded-full
                    bg-rose-500
                    text-[10px] leading-[16px]
                    text-white font-semibold
                    flex items-center justify-center
                    shadow-sm
                  "
                >
                  {cart.length > 9 ? "9+" : cart.length}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Category row (desktop) */}
        <div className="hidden md:flex justify-center gap-4 text-sm font-semibold py-6 text-[#1E293B] relative">
          {CATEGORIES.map((cat) => {
            const to = slugify(cat.name); // e.g. "Dresses" -> "/dresses"
            return (
              <div
                key={cat.name}
                className="group relative"
                onMouseEnter={() => setOpenMega(cat.mega ? cat.name : null)}
                onMouseLeave={() =>
                  setOpenMega((n) => (n === cat.name ? null : n))
                }
              >
                {/* keep your routing logic */}
                <NavLink
                  label={cat.name}
                  active={cat.highlight}
                  to={`dresses${to}`}
                />

                {/* Mega dropdown (only for Dresses) */}
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
                        to={`/dresses${to}`}
                        className={cat.highlight ? "text-rose-400" : ""}
                        onClick={() => setMobileOpen(false)}
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
                                    onClick={() => setMobileOpen(false)}
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

            {/* Dashboard + login/logout inside drawer */}
            <div className="py-2 border-t border-slate-200 mt-2 space-y-3">
              <Link
                to="/dashboard"
                className="flex items-center gap-2 font-semibold"
                onClick={() => setMobileOpen(false)}
              >
                <FiDatabase size={20} color={ICON_COLOR} />
                Dashboard
              </Link>

              {user ? (
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    logOut();
                  }}
                  className="flex items-center gap-2 font-semibold text-sm text-slate-800"
                >
                  <FiLogOut size={18} color={ICON_COLOR} />
                  Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 font-semibold text-sm text-slate-800"
                >
                  <FiUser size={18} color={ICON_COLOR} />
                  Login / Register
                </Link>
              )}
            </div>

            {/* Language & region in drawer */}
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
