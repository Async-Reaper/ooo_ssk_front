import { classNames } from "@shared/libs/classNames/classNames";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import cls from "./NotFoundPage.module.scss";
import { getRouteLogin, getRouteMain, getRouteOrders } from "../../../shared/const/router";
import { UserRoles, getUserAuthData, getUserInited } from "../../../entities/user";

interface NotFoundPageProps {
  className?: string;
}

export const NotFoundPage = ({ className }: NotFoundPageProps) => {
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
    } else {
      navigate(getRouteLogin());
    }
  }, [auth, navigate]);
   
  return (
    <div className={classNames(cls.NotFoundPage, {}, [className])}>
      Страница не найдена
    </div>
  ); 
};
