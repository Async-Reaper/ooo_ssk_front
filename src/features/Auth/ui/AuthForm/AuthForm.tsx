import React, { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppLink, Button, Input, Typography, 
} from "@shared/ui";
import { DynamicModuleLoader, ReducersList } from "@shared/libs/component";
import { useAppDispatch } from "@shared/hooks";
import { authUser } from "@features/Auth/model/services/authUser";
import { initUserAuthData, UserRoles } from "@entities/user";
import { useSelector } from "react-redux";
import { getAuthErrors } from "@features/Auth";
import { useAlertsInfo } from "@widgets/Nomenclature";
import { authReducer } from "../../model/slice/authSlice";
import cls from "./AuthForm.module.scss";

const reducers: ReducersList = {
  authForm: authReducer,
};

const Component = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const errors = useSelector(getAuthErrors);
  const alertBox = useAlertsInfo();

  const onHandleAuth = useCallback(async () => {
    
    const responseLogin = await dispatch(authUser({ login, password }));
    const responseUser = await dispatch(initUserAuthData());

    const requestStatusLogin = responseLogin.meta.requestStatus;
    const requestStatusUser = responseUser.meta.requestStatus;

    if (requestStatusLogin === "fulfilled" && requestStatusUser === "fulfilled") {
      // @ts-ignore
      const role = responseUser.payload?.role;

      if (role === UserRoles.BUYER) {
        navigate({
          pathname: "/nomenclatures",
          // search: "?isNew=false&all=true&isOnlyMatrix=true",
          search: "",
        });
      } else {
        navigate({
          pathname: "/orders",
        });
      }
    } else {
      alertBox.onOpenAlert({
        id: 1,
        type: "error",
        title: "Не удалось авторизоваться",
        text: responseLogin.payload?.detail!,
      });
    }
  }, [dispatch, login, password, navigate]);

  const disabled = useMemo(
    () => !login || !password, 
    [login, password],
  );

  return (
    <DynamicModuleLoader
      removeAfterUnmount
      reducers={reducers}
    >
      <div className={cls.auth_wrapper}>
        <Typography variant="h2">Вход</Typography>
        <Input className={cls.auth_inp} value={login} onChange={setLogin} placeholder="Имя" />
        <Input className={cls.auth_inp} type="password" value={password} onChange={setPassword} placeholder="Пароль" />
        <Button
          size="login"
          variant="login_special"
          disabled={disabled}
          onClick={onHandleAuth}
          background="gray-primary"
        >
          Авторизоваться
        </Button>
        <AppLink to="">
          <Typography variant="h4">
            Скачать мобильное приложение
          </Typography>
        </AppLink>
      </div>
      {/* {errors && <Typography>{errors.message}</Typography>} */}
    </DynamicModuleLoader>
  );
};

export const AuthForm = React.memo(Component);
