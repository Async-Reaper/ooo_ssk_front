import React, { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ReducersList, DynamicModuleLoader } from "@shared/libs/component";
import {
  AppImage, HStack, Typography, VStack, 
} from "@shared/ui";
import { useAppDispatch } from "@shared/hooks";
import { __API__ } from "@shared/protocols/api";
import { getRouteMain } from "@shared/const/router";
import { fetchBrandsList } from "../model/brandsListService";
import { brandsListReducer } from "../model/brandsListSlice";
import { getBrandsListData } from "../model/brandsListSelectors";
import cls from "./BrandsLIst.module.scss";

const reducers:ReducersList = {
  brandsList: brandsListReducer,
};

const Component = () => {
  const brandsList = useSelector(getBrandsListData);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchBrandsList());
  }, [dispatch]);

  const handleBrand = useCallback((elem: any) => {
    const httpQuery = new URLSearchParams(location.search);
    httpQuery.set("brandGUID", elem!);
    httpQuery.delete("parentGUID");
    navigate({
      pathname: getRouteMain(),
      search: `${httpQuery}`,
    });
  }, []);

  return (
    <DynamicModuleLoader
      removeAfterUnmount
      reducers={reducers}
    >
      <VStack gap="16" align="center" max>
        <HStack className={cls.brandslist__wrapper} gap="8"> 
          {brandsList?.map((brand) => (
               
            <div className={cls.brand__wrapper} key={brand.guid} onClick={() => handleBrand(brand.guid)}>
              <Typography className={cls.brand__name} variant="h3" bold align="center">{brand.fullname}</Typography>
              {brand && brand!.pictures!.length > 0
                  && (
                    <div className={cls.brand__image}>
                      <AppImage src={__API__ + brand!.pictures[0].path} />
                      {" "}
 
                    </div>
                  )}
            </div>

          ))} 
        </HStack>
      </VStack>
    </DynamicModuleLoader>
      
  ); 
};

export const BrandsList = React.memo(Component);
