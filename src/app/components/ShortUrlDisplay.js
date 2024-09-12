import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink, faCheck } from "@fortawesome/free-solid-svg-icons";
import { faCopy } from "@fortawesome/free-regular-svg-icons";
import { motion } from "framer-motion";

const ShortUrlDisplay = ({ shortUrl, handleCopy, isCopied }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 10 }}
    transition={{ duration: 0.3 }}
    className="absolute inset-x-0 border border-black flex items-center bg-transparent rounded-full h-14 pl-6 pr-0 md:pl-8 md:pr-1 lg:pl-8 lg:pr-1 xl:pl-8 xl:pr-1 2xl:pl-8 2xl:pr-1 w-full"
  >
    <div className="text-sm md:text-base lg:text-base xl:text-base 2xl:text-base flex-1 flex items-center space-x-2 overflow-hidden">
      <FontAwesomeIcon icon={faLink} className="text-customOrange mr-1" />
      <a
        href={shortUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="truncate whitespace-nowrap overflow-hidden"
      >
        {shortUrl}
      </a>
    </div>

    <button
      onClick={handleCopy}
      className="text-sm md:text-base lg:text-base xl:text-base 2xl:text-base px-5 py-3 md:px-6 lg:px-6 xl:px-6 2xl:px-6 border-l border-black flex items-center space-x-2 h-full"
    >
      {isCopied ? (
        <>
          <FontAwesomeIcon icon={faCheck} className="text-customOrange" />
          <span className="hidden lg:inline-block">Copied!</span>
        </>
      ) : (
        <>
          <FontAwesomeIcon icon={faCopy} className="text-customOrange" />
          <span className="hidden lg:inline-block">Copy</span>
        </>
      )}
    </button>
  </motion.div>
);

export default ShortUrlDisplay;
