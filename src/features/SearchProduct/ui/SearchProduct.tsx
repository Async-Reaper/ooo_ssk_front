import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../shared/hooks";
import { Input } from "../../../shared/ui/Input/Input";
import { searchProductActions, searchProductReducer } from "../model/slice/searchProductSlice";
import cls from "./SearchProduct.module.scss";
import { getRouteMain, getRouteOrders } from "../../../shared/const/router";
import { getSearchValue } from "..";
import { DynamicModuleLoader, ReducersList } from "../../../shared/libs/component";
import { AppImage } from "../../../shared/ui";
import { Conditions } from "../../../shared/libs/conditions/conditions";

const reducer : ReducersList = {
  search: searchProductReducer,
};

const Component = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const valueSearch = useSelector(getSearchValue);
  // const [searchTerm, setSearchTerm] = useState(valueSearch);

  const handleSearch = (value: string) => {
    dispatch(searchProductActions.setSearchValue(value));
    const httpQuery = new URLSearchParams(location.search);
    navigate({
      pathname: location.pathname !== getRouteMain()
        ? getRouteMain()
        : undefined,
      search: `${httpQuery}`,
    });
    // setSearchTerm(value);
  };
   
  // useEffect(() => {
  //    const delayDebounceFn = setTimeout(() => {
  //       dispatch(searchProductActions.setSearchValue(searchTerm));
  //    }, 500);
  //    return () => clearTimeout(delayDebounceFn);
  // }, [searchTerm]);

  return (
    <DynamicModuleLoader reducers={reducer}>
      <Conditions condition={location.pathname !== getRouteOrders()}>
        <div className={cls.search_object}>
          <Input
            className={cls.input}
            placeholder="Поиск товара"
            value={valueSearch}
            onChange={handleSearch}
          />

          <AppImage className={cls.glass} width={23} src="./common/magnifying-glass.webp" /> 
        </div>
      </Conditions>
    </DynamicModuleLoader>
  );
};

export const SearchProduct = React.memo(Component);
