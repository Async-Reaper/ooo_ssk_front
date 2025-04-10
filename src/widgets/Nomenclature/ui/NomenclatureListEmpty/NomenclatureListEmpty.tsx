import React from "react";
import { Typography } from "../../../../shared/ui";
import cls from "./NomenclatureListEmpty.module.scss";
import { useAppDispatch } from "../../../../shared/hooks";
import { searchProductActions } from "../../../../features/SearchProduct";

const Component = () => {
  const dispatch = useAppDispatch();
  const httpQuery = new URLSearchParams(location.search);

  const onHandleReturnMain = () => {
    httpQuery.delete("brandGUID");
    httpQuery.delete("parentGUID");
    dispatch(searchProductActions.setSearchValue(""));
  };

  return (
    <>
      <Typography variant="h2" bold>
        Список товаров пуст
      </Typography>
      <Typography variant="h3">
        <div className={cls.returnHome_object}>
          Вернитесь на 
          <div className={cls.button_style} onClick={onHandleReturnMain}>
            <h1>главную страницу</h1>
            {/* <Button variant="text" onClick={onHandleReturnMain}>главную страницу</Button> */}
          </div>
        </div>
      </Typography>
    </>
  ); 
};

export const NomenclaturesListEmpty = React.memo(Component);
