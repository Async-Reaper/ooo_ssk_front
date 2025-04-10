import React from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@shared/hooks";
import { getAlerts } from "../../../model/selectors/alertsSelector";
import { alertsActions } from "../../../model/slice/AlertsSlice";
import { DefaultAlert } from "../../Alerts/DefaultAlert/DefaultAlert";
import cls from "./AlertContainer.module.scss";

const AlertsContainer = () => {
  const dispatch = useAppDispatch();
  const alerts = useSelector(getAlerts);

  const onCloseHandler = React.useCallback(
    (id: number) => {
      dispatch(alertsActions.CLOSE_ALERT(id));
    },
    [dispatch],
  );

  if (alerts === undefined || alerts.length === 0) {
    return null;
  }

  return (
    <div className={cls.AlertsContainer}>
      {alerts.map((alert) => (
        <DefaultAlert
          key={alert.id}
          alert={alert}
          onCloseHandler={onCloseHandler}
        />
      ))}
    </div>
  );
};

export default AlertsContainer;
