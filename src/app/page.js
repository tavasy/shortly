"use client";
import { useState } from "react";
import Header from "./components/Header";
import UrlInput from "./components/UrlInput";
import LoadingDots from "./components/LoadingDots";
import ShortUrlDisplay from "./components/ShortUrlDisplay";
import Footer from "./components/Footer";

export default function Home() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [isValidUrl, setIsValidUrl] = useState(true);
  const [loading, setLoading] = useState(false);

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
    setLoading(true);

    try {
      const res = await fetch("/api/shorten", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ originalUrl }),
      });

      const data = await res.json();
      if (data.shortUrl) {
        setShortUrl(`${window.location.origin}/${data.shortUrl}`);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[100dvh] max-h-[100dvh] h-[100dvh] bg-customLightOrange px-8 py-10 md:px-16 md:py-20 lg:p-24 xl:p-28 2xl:p-28 flex flex-col justify-between">
      <Header />
      <div className="mb-8">
        <div className="middle-div mb-10 flex-grow flex flex-col items-center">
          <div className="flex justify-start w-full lg:w-3/4 xl:w-2/3 2xl:w-1/2 mb-4">
            <button
              onClick={() =>
                setOriginalUrl(
                  "https://en.wikipedia.org/wiki/List_of_tallest_buildings_and_structures_in_the_Paris_region"
                )
              }
              className="text-xs md:text-sm lg:text-sm xl:text-sm 2xl:text-sm bg-transparent px-4 py-2 text-gray-700 rounded-full border border-gray-400"
            >
              Add example link
            </button>
          </div>

          <UrlInput
            originalUrl={originalUrl}
            setOriginalUrl={setOriginalUrl}
            handleSubmit={handleSubmit}
            validateUrl={validateUrl}
          />

          <div className="relative mt-1 w-full lg:w-3/4 xl:w-2/3 2xl:w-1/2">
            {loading ? (
              <LoadingDots />
            ) : (
              shortUrl && (
                <ShortUrlDisplay
                  shortUrl={shortUrl}
                  handleCopy={handleCopy}
                  isCopied={isCopied}
                />
              )
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
