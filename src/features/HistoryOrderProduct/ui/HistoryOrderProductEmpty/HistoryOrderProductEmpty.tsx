import React from "react";
import { useSelector } from "react-redux";
import { Typography } from "@shared/ui";
import { getHistoryOrderProductMessage } from "../../model/selectors/historyOrderProductSelectors";
import cls from "./HistoryOrderProductEmpty.module.scss";

const Component = () => {
  const textMessage = useSelector(getHistoryOrderProductMessage);
  return (
    <div className={cls.central_info}>
      <Typography variant="h4" align="center">
        {textMessage}
      </Typography>
    </div>
  ); 
};

export const HistoryOrderProductEmpty = React.memo(Component);
