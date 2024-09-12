import { motion } from "framer-motion";

const UrlInput = ({
  originalUrl,
  setOriginalUrl,
  handleSubmit,
  validateUrl,
}) => (
  <div className="flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-4 mb-4 w-full lg:w-3/4 xl:w-2/3 2xl:w-1/2">
    <input
      type="text"
      value={originalUrl}
      onChange={(e) => setOriginalUrl(e.target.value)}
      placeholder="Enter the link: https://..."
      required
      className={
        "placeholder-gray-500 text-sm md:text-base lg:text-base xl:text-base 2xl:text-base border px-6 md:px-8 lg:px-8 xl:px-8 2xl:px-8 h-14 shadow-lg rounded-full w-full lg:flex-grow focus:outline-none"
      }
    />
    <motion.button
      whileHover={validateUrl(originalUrl) ? { scale: 1.05 } : {}}
      whileTap={{ scale: 0.95 }}
      onClick={handleSubmit}
      type="button"
      className={`text-sm md:text-base lg:text-base xl:text-base 2xl:text-base w-full lg:w-auto px-8 py-4 bg-customBlack shadow-lg rounded-full text-white text-medium transition-transform duration-200 ${
        !validateUrl(originalUrl) ? "cursor-not-allowed" : ""
      }`}
      disabled={!validateUrl(originalUrl)}
    >
      Shorten
    </motion.button>
  </div>
);

export default UrlInput;
