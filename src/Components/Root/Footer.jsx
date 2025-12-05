// src/Components/Root/Footer.jsx
import { FaFacebookF, FaPinterestP, FaInstagram, FaVoicemail } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa6";
import { SiGmail } from "react-icons/si";

const Footer = () => {
  return (
    <footer className="bg-[#F9F6F2] mt-14 pt-10">
      
      {/* TOP SECTION */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">

          {/* LEFT: SOCIALS */}
          <div>
            <p className="text-lg font-semibold text-[#1D1E20] mb-3">
              Follow us
            </p>

            <div className="flex items-center gap-3">


              {/* X / Twitter */}
              {/* <a
                href="#"
                className="h-8 w-8 flex items-center justify-center rounded-full border-2 border-[#303030]"
              >
                <FaXTwitter size={13} color="#303030" />
              </a> */}


              <a
                href="mailto:Forge-frame@outlook.com"
                className="h-8 w-8 flex items-center justify-center rounded-full border-2 border-[#303030]"
              >
                <SiGmail size={13} color="#303030" />
              </a>

              {/* Instagram (real link) */}
              <a
                href="https://www.instagram.com/forgeandframe_uk?igsh=MTBwbXU0aGNueTN5Zg%3D%3D&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="h-8 w-8 flex items-center justify-center rounded-full border-2 border-[#303030]"
              >
                <FaInstagram size={13} color="#303030" />
              </a>

              {/* TikTok */}
              <a
                href="#"
                className="h-8 w-8 flex items-center justify-center rounded-full border-2 border-[#303030]"
              >
                <FaTiktok size={13} color="#303030" />
              </a>
            </div>
          </div>

          {/* RIGHT: BUSINESS INFO + TAGLINE */}
          <div className="text-sm text-gray-600 max-w-xs leading-relaxed">

            {/* Strong business tagline */}
            <p className="font-semibold text-[#1D1E20]">
              Today’s trusted UK clothing Quality brand 
            </p>

            <p className="mt-2">
              Delivering quality, comfort, and style — tailored for everyday life.
            </p>

            {/* Company Registration Info (placeholder) */}
            <p className="mt-4 text-xs text-gray-500">
              Company Registration No: <span className="font-medium">16811123</span>
            </p>
            <p className="text-xs text-gray-500">
              Company Email: <span className="font-medium">
                Forge-frame@outlook.com
              </span>
            </p>
            <p className="text-xs mt-2 text-gray-500">
              Registered in England & Wales.
            </p>

          </div>
        </div>
      </div>

      {/* HAIRLINE */}
      <div className="h-[1px] w-full bg-black/10 mt-10" />

      {/* BOTTOM SECTION */}
      <div className="py-4 text-center text-sm text-gray-600">
        © {new Date().getFullYear()}{" "}
        <span className="font-semibold">Forge N Frame</span>. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
