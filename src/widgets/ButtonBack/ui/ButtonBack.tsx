import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@shared/hooks";
import { Button, Typography } from "@shared/ui";
import { getRouteHistory } from "@shared/const/router";

const Component = (() => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
  }, [dispatch]);
 
  const handleReturnListOrders = () => {
    navigate({
      pathname: getRouteHistory(),
    });
  };

  return (
    <Button variant="outlined" onClick={handleReturnListOrders}>
      <Typography variant="h3">
        Вернуться к истории
      </Typography>
    </Button>
  );
});
 
export const ButtonBack = React.memo(Component);
