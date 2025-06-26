import React, {
  useCallback, useEffect, useRef, useState, 
} from "react";
import { Typography } from "@shared/ui";
import { useAppDispatch } from "@shared/hooks";
import { useSelector } from "react-redux";
import { DynamicModuleLoader, ReducersList } from "@shared/libs/component";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Skeleton } from "@shared/ui/Skeleton";
import { getUserAuthData } from "@entities/user";
import { fetchFavoriteProduct } from "@entities/FavoriteProducts";
import { fetchTradePoints } from "../../model/services/fetchTradePoints";
import { tradePointActions, tradePointReducer } from "../../model/slice/tradePointSlice";
import {
  getCurrentTradePoint,
  getTradePointIsLoading,
  getTradePoints,
} from "../../model/selectors/tradePointSelectors";
import cls from "./SelectTradePoint.module.scss";

const reducers: ReducersList = {
  tradePointForm: tradePointReducer,
};

const Component = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isLoading = useSelector(getTradePointIsLoading);
  const dispatch = useAppDispatch();
  const currentTradePoint = useSelector(getCurrentTradePoint);
  const tradePoints = useSelector(getTradePoints);
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const userId = useSelector(getUserAuthData);
  const blockRef = useRef<HTMLDivElement>(null);
   
  const onSetIsExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    dispatch(fetchTradePoints(userId!.userGUID));
  }, [dispatch]);

  const handleSetValue = useCallback((id: string) => {
    const newTradePoint = tradePoints?.filter((item) => item.guid === id);
    dispatch(tradePointActions.changeTradePoint(newTradePoint![0]));
    dispatch(fetchFavoriteProduct({ userGuid: userId?.userGUID!, contractGuid: newTradePoint![0].guid }));
    const httpQuery = new URLSearchParams(location.search);
    httpQuery.set("contractGUID", newTradePoint![0].guid);
    navigate({
      search: `${httpQuery}`,
    });
    setIsExpanded(false);
  }, [tradePoints, dispatch, navigate, currentTradePoint, setIsExpanded]);

  useEffect(() => {
    tradePoints?.map((tradePoint) => {
      if (params.get("contractGUID") === tradePoint.guid) {
        dispatch(tradePointActions.changeTradePoint(tradePoint));
      }
    });
  }, [tradePoints, dispatch]);

  useEffect(() => {
    if (currentTradePoint && !params.get("contractGUID")) {
      const httpQuery = new URLSearchParams(location.search);
      httpQuery.set("contractGUID", currentTradePoint.guid);
      navigate({
        search: `${httpQuery}`,
      });
    }
  }, [currentTradePoint, navigate, params]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (blockRef.current && !blockRef.current.contains(event.target as Node)) {
        setIsExpanded(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
  }, [onSetIsExpanded]);

  return (
    <DynamicModuleLoader
      removeAfterUnmount
      reducers={reducers}
    >
      {
        isLoading
          ? <Skeleton width="250px" height="50px" border="10px" />
          : (
            <div ref={blockRef} className={cls.select__wrapper}>
              <div className={cls.select__default} onClick={onSetIsExpanded}>
                <Typography className={cls.trade_point__name} align="center" variant="h4">
                  {currentTradePoint?.fullname
                    ? currentTradePoint.fullname
                    : "Выберите торговую точку"}
                </Typography>
                <div className={isExpanded
                  ? cls.up
                  : cls.down}
                >
                  <Typography align="center" variant="h4">
                    ▼
                  </Typography>
                </div>
              </div>
              <div className={cls.select__list} aria-expanded={isExpanded}>
                {tradePoints?.map((select) => (
                  <div
                    className={cls.select__item}
                    key={select.guid}
                    onClick={() => handleSetValue(select.guid)}
                  >
                    <Typography variant="h4" align="center">
                      {select.fullname}
                    </Typography>
                  </div>
                ))}
              </div>
            </div>
          )
      }
    </DynamicModuleLoader>
  );
};

export const SelectTradePoint = React.memo(Component);
