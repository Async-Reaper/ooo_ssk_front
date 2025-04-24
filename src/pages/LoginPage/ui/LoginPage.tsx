import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthForm } from "@features/Auth";
import { useSelector } from "react-redux";
import { getUserAuthData, getUserInited, UserRoles } from "@entities/user";
import { getRouteMain, getRouteOrders } from "@shared/const/router";
import { AnimationDots } from "@shared/ui";
import cls from "./LoginPage.module.scss";

const LoginPage = () => {
  const navigate = useNavigate();
  const inited = useSelector(getUserInited);
  const auth = useSelector(getUserAuthData);

  useEffect(() => {
    if (inited && auth) {
      if (auth.role === UserRoles.BUYER) {
        navigate(getRouteMain());
      } else {
        navigate(getRouteOrders());
      }
    }
  }, [auth, navigate]);

  return (
    <div className={cls.login_page}>
      <div className={cls.login__form__wrapper}>
        <AuthForm />
      </div>
      {/* <AnimationDots /> */}
    </div>
  );
};

export default LoginPage;
