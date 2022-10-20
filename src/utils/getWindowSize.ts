import React from "react";

type returnSize = { width: number; height: number };

function getWindowDimensions(): returnSize{
  const { innerWidth: width, innerHeight: height} = window;
  return {
    width,
    height,
  };
}

export function useWindowDimensions(): returnSize {
  const [windowDimensions, setWindowDimensions] = React.useState(
    getWindowDimensions()
  );

  React.useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
}
