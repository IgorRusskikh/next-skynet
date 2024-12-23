import { useEffect, useState } from "react";

const useNearTop = (threshold = 10) => {
  const [isNearTop, setIsNearTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight;
      const viewportHeight = window.innerHeight;

      const distanceFromTop = (scrollTop / (documentHeight - viewportHeight)) * 100;
      setIsNearTop(distanceFromTop <= threshold);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [threshold]);

  return isNearTop;
};

export default useNearTop;
