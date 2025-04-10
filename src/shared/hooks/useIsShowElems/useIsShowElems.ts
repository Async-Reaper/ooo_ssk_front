import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { UserRoles, getUserAuthData } from "../../../entities/user";

export const useIsShowElems = () => {
  const [isShowHeader, setIsShowHeader] = useState(false);
  const [isShowFooter, setIsShowFooter] = useState(false);
  const location = useLocation();
  const userRole = useSelector(getUserAuthData)?.role;

  useEffect(() => {
    if (location.pathname === "/login") {
      setIsShowHeader(false);
    } else {
      setIsShowHeader(true);
    }
  }, [location, setIsShowHeader]);

  useEffect(() => {
    // || Арина сюда нужно условие если роль продавца, то не показывать футер
    if (userRole === UserRoles.SELLER || location.pathname === "/login") {
      setIsShowFooter(false);
    } else {
      setIsShowFooter(true);
    }
  }, [location, setIsShowFooter]);
   
  return {
    isShowHeader,
    isShowFooter,
  };
};
