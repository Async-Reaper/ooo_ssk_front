import React, { memo } from "react";
import { classNames, Mods } from "@shared/libs/classNames/classNames";
import { ColoredIcon } from "../../../../../shared/libs/icons";
import { Typography } from "../../../../../shared/ui";
import cls from "./styles.module.scss";
import { type IAlert } from "../../../model/types/alertsSchema";

interface Props {
  alert: IAlert;
  onCloseHandler: (id: number) => void;
}

export const DefaultAlert = memo(({ alert, onCloseHandler }: Props) => {
  const [show, setShow] = React.useState(true);

  const closeAlert = React.useCallback(() => {
    setTimeout(() => {
      onCloseHandler(alert.id);
    }, 300);
    setShow(false);
  }, [alert.id, onCloseHandler]);

  const onClickHandler = React.useCallback(
    () => () => {
      closeAlert();
    },
    [closeAlert],
  );

  React.useEffect(() => {
    const timer = setTimeout(() => {
      closeAlert();
    }, 6000);
    return () => {
      clearTimeout(timer);
    };
  }, [closeAlert]);

  const additional = [];

  if (alert.type === "success") {
    additional.push(cls.success);
  }

  if (alert.type === "error") {
    additional.push(cls.error);
  }

  if (alert.type === "info") {
    additional.push(cls.info);
  }

  const mods: Mods = {
    [cls.hide]: !show,
  };

  return (
    <div
      className={classNames(cls.alertWrapper, mods, additional)}
      onClick={onClickHandler()}
    >
      <div className={cls.alert__body}>
        <div className={cls.icon__wrapper}>
          <ColoredIcon
            name={alert.type === "error"
              ? "error"
              : "checkbox"}
            size={50}
          />
        </div>
        <div className={cls.notification}>
          <div className={cls.notification__title}>
            <Typography variant="h5" noWrap bold>
              {alert.title}
            </Typography>
          </div>
          <div className={cls.notification__text}>
            <Typography variant="h6">{alert.text}</Typography>
          </div>
        </div>
      </div>
    </div>
  );
});
