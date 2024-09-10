"use client";
import { motion } from "framer-motion";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink, faCheck } from "@fortawesome/free-solid-svg-icons";
import { faCopy } from "@fortawesome/free-regular-svg-icons";

export default function Home() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [isValidUrl, setIsValidUrl] = useState(true);

  const validateUrl = (url) => {
    const urlRegex = new RegExp(
      /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d+)?(\/.*)?$/
    );
    return urlRegex.test(url);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  const handleSubmit = async (e) => {
    if (!validateUrl(originalUrl)) {
      setIsValidUrl(false);
      return;
    }
    setIsValidUrl(true);

    const res = await fetch("/api/shorten", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ originalUrl }),
    });

    const data = await res.json();
    console.log(data);
    if (data.shortUrl) {
      setShortUrl(`${window.location.origin}/${data.shortUrl}`);
    }
  };

  return (
    <div className="min-h-[100dvh] max-h-[100dvh] h-[100dvh] bg-customLightOrange px-8 py-10 md:px-16 md:py-20 lg:p-24 xl:p-28 2xl:p-28 flex flex-col justify-between">
      <div className="top-div flex flex-row justify-between">
        <p className="text-2xl md:text-3xl lg:text-4xl xl:text-4xl 2xl:text-4xl font-bold">
          Shortly
        </p>
        <p className="text-2xl md:text-3xl lg:text-4xl xl:text-4xl 2xl:text-4xl font-medium text-customOrange">
          /link shortener
        </p>
      </div>

      <div className="middle-div mb-10 flex-grow flex flex-col items-center justify-center">
        <div className="flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-4 mb-6 w-full lg:w-3/4 xl:w-2/3 2xl:w-1/2">
          <input
            type="text"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            placeholder="Enter the link"
            required
            className={
              "placeholder-gray-500 text-sm md:text-base lg:text-base xl:text-base 2xl:text-base border px-6 md:px-8 lg:px-8 xl:px-8 2xl:px-8 h-14 shadow-lg rounded-full w-full lg:flex-grow focus:outline-none"
            }
          />
          <motion.button
            whileHover={validateUrl(originalUrl) ? { scale: 1.05 } : {}} // Only scale when valid
            whileTap={{ scale: 0.95 }} // Slight shrink on press
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

        {!isValidUrl && (
          <p className="text-red-500 text-sm mt-2">Please enter a valid URL.</p>
        )}

        <div className="relative mt-1 w-full lg:w-3/4 xl:w-2/3 2xl:w-1/2">
          {shortUrl && (
            <motion.div
              initial={{ opacity: 0, y: 10 }} // Start slightly lower and transparent
              animate={{ opacity: 1, y: 0 }} // Move up and fade in
              exit={{ opacity: 0, y: 10 }} // Fade out and move down
              transition={{ duration: 0.3 }}
              className="absolute inset-x-0 border border-black flex items-center bg-transparent rounded-full h-14 pl-6 pr-0 md:pl-8 md:pr-1 lg:pl-8 lg:pr-1 xl:pl-8 xl:pr-1 2xl:pl-8 2xl:pr-1 w-full"
            >
              {/* Shortened URL and Link Icon */}
              <div className="text-sm md:text-base lg:text-base xl:text-base 2xl:text-base flex-1 flex items-center space-x-2 overflow-hidden">
                <FontAwesomeIcon
                  icon={faLink}
                  className="text-customOrange mr-1"
                />
                <a
                  href={shortUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="truncate whitespace-nowrap overflow-hidden"
                >
                  {shortUrl}
                </a>
              </div>

              {/* Copy Button with Left Border */}
              <button
                onClick={handleCopy}
                className="text-sm md:text-base lg:text-base xl:text-base 2xl:text-base px-5 py-3 md:px-6 lg:px-6 xl:px-6 2xl:px-6 border-l border-black flex items-center space-x-2 h-full"
              >
                {isCopied ? (
                  <>
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="text-customOrange"
                    />
                    <span className="hidden lg:inline-block">Copied!</span>
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon
                      icon={faCopy}
                      className="text-customOrange"
                    />
                    <span className="hidden lg:inline-block">Copy</span>
                  </>
                )}
              </button>
            </motion.div>
          )}
        </div>
      </div>

      <div className="bottom-div flex flex-row justify-between">
        <p className="text-lg md:text-xl lg:text-2xl xl:text-2xl 2xl:text-2xl font-medium">
          Your link, but shorter
        </p>
        <p className="text-lg md:text-xl lg:text-2xl xl:text-2xl 2xl:text-2xl font-medium">
          2024
        </p>
      </div>
    </div>
  );
}
