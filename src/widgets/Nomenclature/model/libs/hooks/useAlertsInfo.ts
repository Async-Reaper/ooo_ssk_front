import { useCallback, useState } from "react";
import { alertsActions, IAlert } from "../../../../../entities/Alerts";
import { useAppDispatch } from "../../../../../shared/hooks";

export const useAlertsInfo = () => {
  const dispatch = useAppDispatch();
   
  const [addToFavoriteSuccess] = useState<IAlert>({
    id: 1,
    type: "success",
    title: "Успешно",
    text: "Товар успешно добавлен в избранное",
  });
  const [deleteFromFavoriteSuccess] = useState<IAlert>({
    id: 1,
    type: "success",
    title: "Успешно",
    text: "Товар успешно удален из избранного",
  });

  const [addToFavoriteError] = useState<IAlert>({
    id: 1,
    type: "error",
    title: "Ошибка",
    text: "Произошла ошибка при добавлении товара в избранное",
  });
  const [deleteFromFavoriteError] = useState<IAlert>({
    id: 1,
    type: "error",
    title: "Ошибка",
    text: "Произошла ошибка при удалении товара из избранного",
  });

  const onOpenAlertAddSuccess = useCallback(() => {
    dispatch(alertsActions.OPEN_ALERT(addToFavoriteSuccess));
  }, [dispatch]);

  const onOpenAlertDeleteSuccess = useCallback(() => {
    dispatch(alertsActions.OPEN_ALERT(deleteFromFavoriteSuccess));
  }, [dispatch]);

  const onOpenAlertAddError = useCallback(() => {
    dispatch(alertsActions.OPEN_ALERT(addToFavoriteError));
  }, [dispatch]);

  const onOpenAlertDeleteError = useCallback(() => {
    dispatch(alertsActions.OPEN_ALERT(deleteFromFavoriteError));
  }, [dispatch]);

  const onOpenAlert = useCallback((objectMessage : IAlert) => {
    dispatch(alertsActions.OPEN_ALERT(objectMessage));
  }, [dispatch]);

  return {
    onOpenAlertAddSuccess,
    onOpenAlertDeleteSuccess,
    onOpenAlertAddError,
    onOpenAlertDeleteError,
    onOpenAlert,
  };
}; 
