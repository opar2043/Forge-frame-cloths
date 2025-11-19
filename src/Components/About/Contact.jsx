// src/Components/About/Contact.jsx
import React from "react";
import { motion } from "framer-motion";
import { FiPhone, FiMapPin, FiMail } from "react-icons/fi";

const container = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const fadeUp = (i = 1) => ({
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay: 0.08 * i, duration: 0.45, ease: "easeOut" },
  },
});

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: add your submit logic (email / API)
  };

  return (
    <div className="bg-white text-slate-900">
      <motion.section
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20"
        initial="hidden"
        animate="visible"
        variants={container}
      >
        {/* Hero text */}
        <motion.div
          className="mb-10 md:mb-14 max-w-3xl"
          variants={fadeUp(1)}
        >
          <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-slate-900">
            Contact
          </p>
          <h1 className="mt-4 text-3xl md:text-4xl font-semibold tracking-[0.12em] uppercase text-slate-900">
            Forge &amp; Frame Studio
          </h1>
          <p className="mt-4 text-sm md:text-base text-slate-600 leading-relaxed">
            Forge &amp; Frame is built on the power of contrast: the quiet
            precision of the Forge (uncompromising construction, tailored
            linings, sustainable sourcing) and the bold presence of the Frame
            (architectural silhouettes, clean lines, confident drape). Our
            promise—{" "}
            <span className="font-semibold text-slate-800">
              Style Without Compromise
            </span>{" "}
            —means no trade-offs between quality, fit, ethics, or impact.
            Crafted in silence, worn loud. Designed so the woman wearing them is
            always the statement.
          </p>
        </motion.div>

        {/* Content grid */}
        <div className="grid grid-cols-1 md:grid-cols-[1.1fr,1fr] gap-10 md:gap-16 items-start">
          {/* Left: form */}
          <motion.div
            className="border-t border-slate-200 pt-6"
            variants={fadeUp(2)}
          >
            <h2 className="text-lg md:text-xl font-semibold text-slate-900 mb-6">
              Send us a message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div>
                <label className="block text-[11px] font-semibold tracking-[0.18em] uppercase text-slate-800 mb-1.5">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  className="
                    w-full
                    bg-transparent
                    border-b border-slate-300
                    py-2 text-sm md:text-[15px]
                    text-slate-900
                    placeholder:text-slate-400
                    focus:outline-none focus:border-slate-900
                    transition-colors duration-150
                  "
                  placeholder="Full name"
                />
              </div>

              {/* Mobile */}
              <div>
                <label className="block text-[11px] font-semibold tracking-[0.18em] uppercase text-slate-800 mb-1.5">
                  Mobile
                </label>
                <input
                  type="tel"
                  name="mobile"
                  className="
                    w-full
                    bg-transparent
                    border-b border-slate-300
                    py-2 text-sm md:text-[15px]
                    text-slate-900
                    placeholder:text-slate-400
                    focus:outline-none focus:border-slate-900
                    transition-colors duration-150
                  "
                  placeholder="+44 7…"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-[11px] font-semibold tracking-[0.18em] uppercase text-slate-800 mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  className="
                    w-full
                    bg-transparent
                    border-b border-slate-300
                    py-2 text-sm md:text-[15px]
                    text-slate-900
                    placeholder:text-slate-400
                    focus:outline-none focus:border-slate-900
                    transition-colors duration-150
                  "
                  placeholder="you@example.com"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-[11px] font-semibold tracking-[0.18em] uppercase text-slate-800 mb-1.5">
                  Message
                </label>
                <textarea
                  name="message"
                  rows={4}
                  required
                  className="
                    w-full
                    bg-transparent
                    border-b border-slate-300
                    py-2 text-sm md:text-[15px]
                    text-slate-900
                    placeholder:text-slate-400
                    focus:outline-none focus:border-slate-900
                    transition-colors duration-150
                    resize-none
                  "
                  placeholder="Tell us about sizing, an order, or how you’d like to wear Forge & Frame…"
                />
              </div>

              {/* Button */}
              <motion.button
                type="submit"
                whileHover={{ x: 1, y: -1 }}
                whileTap={{ scale: 0.98 }}
                className="
                  mt-4 inline-flex items-center justify-center
                  px-8 py-2.5
                  text-sm font-semibold tracking-[0.18em] uppercase
                  border border-slate-900
                  bg-slate-900 text-white
                  hover:bg-white hover:text-slate-900
                  transition-colors duration-150
                "
              >
                Send Message
              </motion.button>

              <p className="mt-3 text-[11px] text-slate-800">
                We use your details only to respond to your enquiry. No spam,
                no third-party sharing.
              </p>
            </form>
          </motion.div>

          {/* Right: details */}
          <motion.div
            className="border-t border-slate-200 pt-6 space-y-6"
            variants={fadeUp(3)}
          >
            <h2 className="text-lg md:text-xl font-semibold text-slate-900">
              Studio details
            </h2>

            <div className="space-y-5 text-sm md:text-[15px] text-slate-700">
              <div className="flex items-start gap-3">
                <FiMapPin className="mt-0.5 text-slate-500" />
                <div>
                  <p className="font-semibold text-slate-900">Location</p>
                  <p>Leichter, United Kingdom</p>
                  <p className="text-xs text-slate-500 mt-1">
                    Private studio — visits by appointment only.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <FiPhone className="mt-0.5 text-slate-500" />
                <div>
                  <p className="font-semibold text-slate-900">Phone / WhatsApp</p>
                  <p className="select-all">+44 7849 009982</p>
                  <p className="text-xs text-slate-500 mt-1">
                    Mon–Fri, 09:00–17:00 (UK time)
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <FiMail className="mt-0.5 text-slate-500" />
                <div>
                  <p className="font-semibold text-slate-900">Email</p>
                  <p className="select-all">support@forgeandframe.com</p>
                  <p className="text-xs text-slate-500 mt-1">
                    We typically respond within one business day.
                  </p>
                </div>
              </div>
            </div>

            <p className="pt-2 text-xs text-slate-500">
              For press, partnerships, and styling pulls, mention it in your
              message and it will be routed directly to our studio team.
            </p>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default Contact;
