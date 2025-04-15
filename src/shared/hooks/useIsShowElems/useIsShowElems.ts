import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const useIsShowElems = () => {
  const [isShowHeader, setIsShowHeader] = useState(false);
  const [isShowFooter, setIsShowFooter] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/login") {
      setIsShowHeader(false);
      setIsShowFooter(false);
    } else {
      setIsShowHeader(true);
      setIsShowFooter(true);
    }
  }, [location, setIsShowHeader, setIsShowFooter]);
   
  return {
    isShowHeader,
    isShowFooter,
  };
};
