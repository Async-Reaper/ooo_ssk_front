import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthForm } from "@features/Auth";
import { useSelector } from "react-redux";
import cls from "./LoginPage.module.scss";
import { UserRoles, getUserAuthData, getUserInited } from "../../../entities/user";
import { getRouteMain, getRouteOrders } from "../../../shared/const/router";

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
    </div>
  ); 
};

export default LoginPage;
