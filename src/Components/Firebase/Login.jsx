import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiMail, FiLock, FiEye } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  return (
    <section className="min-h-[75vh] my-12 flex items-center justify-center bg-white">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="w-full max-w-xl px-4"
      >
        <h1 className="text-center text-2xl tracking-wide my-8">SIGN IN</h1>

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

          {/* Submit */}
          <button
            type="button"
            className="w-full py-3 font-semibold"
            style={{ backgroundColor: "#F6E0D9" }}
          >
            Sign In
          </button>

          {/* Row: Forgot + Sign up */}
          <div className="flex items-center justify-between text-sm">
            <Link to="/forgot-password" className="underline">
              Forgot password
            </Link>
            <Link to="/register" className="underline">
              Sign up
            </Link>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4">
            <span className="h-[1px] flex-1 bg-slate-200" />
            <span className="text-sm" style={{ color: "#959391" }}>
              Or sign in with the following methods
            </span>
            <span className="h-[1px] flex-1 bg-slate-200" />
          </div>

          {/* Google button */}
          <button
            type="button"
            className="mx-auto flex items-center justify-center gap-3 border border-slate-300 bg-white px-5 py-2 rounded-md"
            title="Sign in with Google"
          >
            <FcGoogle size={20} />
            <span>Google</span>
          </button>
        </form>
      </motion.div>
    </section>
  );
};

export default Login;
