import React, { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button, Input, Loader, Typography,
} from "@shared/ui";
import { DynamicModuleLoader, ReducersList } from "@shared/libs/component";
import { useAppDispatch } from "@shared/hooks";
import { initUserAuthData, UserRoles } from "@entities/user";
import { useAlertsInfo } from "@widgets/Nomenclature";
import { useSelector } from "react-redux";
import { authUser } from "../../model/services/authUser";
import { authReducer } from "../../model/slice/authSlice";
import cls from "./AuthForm.module.scss";
import { getAuthIsLoading } from "../../model/selectors/authSelectors";

const reducers: ReducersList = {
  authForm: authReducer,
};

const Component = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const alertBox = useAlertsInfo();
  const isLoading = useSelector(getAuthIsLoading);
  
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
        <Input value={login} onChange={setLogin} placeholder="Имя" fullWidth />
        <Input type="password" value={password} onChange={setPassword} placeholder="Пароль" fullWidth />
        {
          isLoading
            ? <Loader /> 
            : (
              <Button
                size="login"
                variant="login_special"
                disabled={disabled}
                onClick={onHandleAuth}
                background="gray-primary"
              >
                Авторизоваться
              </Button>
            )
        }
        <a href="/CCK.arm.apk" download className={cls.download__link}>
          <Typography variant="h4">
            Скачать мобильное приложение
          </Typography>
        </a>
      </div>
      {/* {errors && <Typography>{errors.message}</Typography>} */}
    </DynamicModuleLoader>
  );
};

export const AuthForm = React.memo(Component);
