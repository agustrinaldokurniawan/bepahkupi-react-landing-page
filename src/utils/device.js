import { useEffect, useState } from "react";

const Device = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    screenWidthHandleChange();
  }, []);

  const screenWidthHandleChange = () => {
    window.addEventListener("resize", () => {
      setScreenWidth(window.innerWidth);
    });
  };

  return { screenWidth, screenWidthHandleChange };
};

export default Device;
