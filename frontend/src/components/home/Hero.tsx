import { motion } from "framer-motion";

const Banner = () => {
  const bannerData = {
    imgSrc: "/banner1.png",
    heading: "Welcome to Astavet",
    subheading: "Modern, reliable and professional veterinary solutions.",
    cta: "Learn more",
  };

  return (
    <div className="relative w-full min-h-[80vh] flex items-center justify-center bg-black text-white shadow-lg pt-[80px]">
      {/* Banner Image */}
      <img
        src={bannerData.imgSrc}
        alt="banner"
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Overlay - làm tối ảnh nền */}
      <div className="absolute inset-0 bg-black opacity-60"></div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl">
        <motion.h1
          className="text-5xl md:text-7xl font-extrabold text-white mb-4"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {bannerData.heading}
        </motion.h1>
        <motion.p
          className="text-xl md:text-2xl mb-6 text-gray-200"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.0 }}
        >
          {bannerData.subheading}
        </motion.p>
        <motion.button
          className="px-6 py-3 bg-[#c2272f] text-white font-semibold text-lg rounded-md shadow-none transition-all"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {bannerData.cta}
        </motion.button>
      </div>
    </div>
  );
};

export default Banner;
