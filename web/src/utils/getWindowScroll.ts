import React from "react";

type returnScroll = { scrollX: number; scrollY: number };

function getWindowScrolls(): any {
  const { scrollX, scrollY } = window;
  return {
    scrollX,
    scrollY,
  };
}

export function useWindowScrolls(): returnScroll {
  const [windowScrolls, setWindowScrolls] = React.useState(getWindowScrolls());

  React.useEffect(() => {
    function handleScroll() {
      setWindowScrolls(getWindowScrolls());
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return windowScrolls;
}
