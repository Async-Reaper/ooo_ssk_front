import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../../shared/hooks";
import { getDebtsData, getDebtsIsLoading } from "../../model/selectors/debtsSelectors";
import { getCurrentTradePoint, tradePointReducer } from "../../../../entities/TradePoint";
import { fetchDebts } from "../../model/services/fetchDebts";
import { DynamicModuleLoader, ReducersList } from "../../../../shared/libs/component";
import { debtsReducer } from "../../model/slice/debtsSlice";
import cls from "./DebtsPlate.module.scss";
import { HStack, Typography, VStack } from "../../../../shared/ui";
import { Conditions } from "../../../../shared/libs/conditions/conditions";
import { classNames } from "../../../../shared/libs/classNames/classNames";

const reducers: ReducersList = {
  debts: debtsReducer,
  tradePointForm: tradePointReducer,
};

const Component = () => {
  const dispatch = useAppDispatch();
   
  const debtsData = useSelector(getDebtsData);
  const debtsIsLoading = useSelector(getDebtsIsLoading);
  const [show, setShow] = useState(false);
   
  const currentTradePoint = useSelector(getCurrentTradePoint);
  const contractGUID = currentTradePoint?.guid || new URLSearchParams(location.search).get("contractGUID");

  useEffect(() => {
    if (!debtsIsLoading && contractGUID) {
      dispatch(fetchDebts(contractGUID));
    }
  }, [dispatch, currentTradePoint]);

  return (
    <DynamicModuleLoader reducers={reducers}>
         
      <Conditions condition={currentTradePoint !== undefined}>
        <div
          className={debtsData?.totalDebts! > 0
            ? cls.red
            : cls.debt_btn}
          onClick={() => setShow(!show)}
        >
          <Typography variant="h3">
            Сумма долга:
            {" "}
            {debtsData?.totalDebts}
          </Typography>
        </div>

        {show
            && (
              <div className={cls.debt_plate}>
                <Typography variant="h3">
                  Дебиторская задолженность
                </Typography>

                <VStack align="center" gap="4" max>

                  <HStack className={cls.debt_title} max>

                    <div className={cls.debt_column}>
                      <Typography variant="h5">
                        Дата
                      </Typography>
                    </div>

                    <div className={classNames(cls.number, {}, [cls.debt_column])}>
                      <Typography variant="h5">
                        Номер
                      </Typography>
                    </div>

                    <div className={cls.debt_column}>
                      <Typography variant="h5">
                        Сумма
                      </Typography>
                    </div>

                    <div className={classNames(cls.amountDebt, {}, [cls.debt_column])}>
                      <Typography variant="h5">
                        Остаток
                      </Typography>
                    </div>

                  </HStack>
                  { debtsData?.debts?.map((element) => (
                    <HStack className={cls.debt_row} key={element?.number} max>

                      <div className={cls.debt_column}>
                        <Typography variant="h5">
                          {element?.date}
                        </Typography>
                      </div>

                      <div className={classNames(cls.number, {}, [cls.debt_column])}>
                        <Typography variant="h5">
                          {element?.number}
                        </Typography>
                      </div>
                           
                      <div className={cls.debt_column}>
                        <Typography variant="h5">
                          {element?.amount}
                        </Typography>
                      </div>

                      <div className={classNames(cls.amountDebt, {}, [cls.debt_column])}>
                        <Typography variant="h5">
                          {element?.amountDebt}
                        </Typography>
                      </div>
                      {/* Привязать переход на /history */}
                      {/* {element?.documentGUID} */}
                    </HStack>
                  )) }
                  
                  {/* Количество документов:
                     {debtsData?.totalCount}
                     {" "}
                     Остаточная сумма:
                     {debtsData?.totalDebts} */}
                </VStack>
              </div>
            )}
      </Conditions>
    </DynamicModuleLoader>
  );
};

export const DebtsPlate = React.memo(Component);
