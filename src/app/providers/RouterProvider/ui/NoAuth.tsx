import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { getRouteLogin } from "@shared/const/router";
import { getUserAuthData } from "@entities/user";
import { useSelector } from "react-redux";
import { getCookie } from "@shared/libs/cookie";

interface RequireAuthProps {
  children: ReactNode;
}

export function NoAuth({
  children,
}: RequireAuthProps) {
  const location = useLocation();
  const auth = useSelector(getUserAuthData);

  if (!auth && getCookie("JWT")) {
    return (
      <Navigate
        to={getRouteLogin()}
        state={{ from: location }}
        replace
      />
    );
  }

  return children;
}
