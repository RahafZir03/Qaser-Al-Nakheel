/* eslint-disable react/prop-types */

import { motion } from "framer-motion";

const BouncingImage = ({ image }) => {
  return (
    <motion.div
      className="border-8 rounded-2xl shadow-lg shadow-gray-500"
      animate={{ y: [0, -15, 0] }}
      transition={{
        duration: 5,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
      }}
    >
      <div className="shadow-inner-shadow shadow-white/20 p-5">
        <img src={image} alt="Bouncing Image" className="rounded-xl" />
      </div>
    </motion.div>
  );
};

export default BouncingImage;
