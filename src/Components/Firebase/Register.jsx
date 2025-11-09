import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiMail,
  FiLock,
  FiEye,
  FiCalendar,
  FiChevronDown,
} from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";

const Register = () => {
  return (
    <section className="min-h-[85vh] my-12 md:my-20 flex items-center justify-center bg-white">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="w-full max-w-xl px-6 md:px-12"
      >
        <h1 className="text-center text-2xl tracking-wide mb-8">REGISTER</h1>

        <form className="space-y-5">
          {/* Email */}
          <div className="relative">
            <input
              name="email"
              type="email"
              placeholder="Email address"
              className="w-full border border-slate-300 px-4 py-3 pr-12 outline-none"
            />
            <FiMail className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500" />
          </div>

          {/* Password */}
          <div className="relative">
            <input
              name="password"
              type="password"
              placeholder="Password"
              className="w-full border border-slate-300 px-4 py-3 pr-12 outline-none"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
              <FiEye className="text-slate-600" />
              <span className="block h-[2px] w-6 bg-slate-600 translate-y-[6px]" />
            </div>
          </div>

          {/* First / Last */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="firstName"
              type="text"
              placeholder="First Name"
              className="w-full border border-slate-300 px-4 py-3 outline-none"
            />
            <input
              name="lastName"
              type="text"
              placeholder="Last Name"
              className="w-full border border-slate-300 px-4 py-3 outline-none"
            />
          </div>

          {/* Birthday */}
          <div className="relative">
            <input
              name="birthday"
              type="date"
              placeholder="Birthday"
              className="w-full border border-slate-300 px-4 py-3 pr-12 outline-none"
            />
            <FiCalendar className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600" />
          </div>

          {/* Gender */}
          <div className="relative">
            <select
              name="gender"
              className="w-full appearance-none border border-slate-300 px-4 py-3 pr-10 outline-none bg-white"
              defaultValue="prefer-not"
            >
              <option value="prefer-not">Gender</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="other">Other</option>
            </select>
            <FiChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-600" />
          </div>

          {/* Register button */}
          <button
            type="button"
            className="w-full py-3 font-semibold"
            style={{ backgroundColor: "#F6E0D9" }}
          >
            Register
          </button>

          {/* Terms */}
          <label className="flex items-start gap-2 text-sm">
            <input type="checkbox" name="agree" className="mt-1" />
            <span className="leading-6">
              I agree to the <span className="underline">Privacy Policy</span>{" "}
              and <span className="underline">Terms of Service</span>
            </span>
          </label>

          {/* Divider */}
          <div className="flex items-center gap-4 pt-2">
            <span className="h-[1px] flex-1 bg-slate-200" />
            <span className="text-sm" style={{ color: "#959391" }}>
              Al Ready Have an Account ?
            </span>
            <span className="h-[1px] flex-1 bg-slate-200" />
          </div>

          {/* Google button */}
          <Link to="/login" className="font-semibold ">
          <button
            type="button"
            className="w-full py-3 mt-4 font-semibold"
            style={{ backgroundColor: "#F6E0D9" }}
          >
            Log In
          </button>
          </Link>
        </form>
      </motion.div>
    </section>
  );
};

export default Register;
