import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUserAuthData } from "@entities/user";
import { DynamicModuleLoader, ReducersList } from "@shared/libs/component";
import { useAppDispatch } from "@shared/hooks";
import { __API__ } from "@shared/protocols/api";
import { favoriteReducer, getFavoriteData } from "..";
import { fetchFavoriteById } from "../models/services/fetchFavoriteById";
import cls from "./favorite.module.scss";
// import { NomenclatureCount } from "../../Nomenclature/ui/NomenclatureCount/NomenclatureCount";
import { FavoriteButton } from "./favoriteButton_Add";
import { NomenclatureFavorite } from "../../Nomenclature/ui/NomenclatureFavorite/NomenclatureFavorite";

const reducers: ReducersList = {
  favoriteSchem: favoriteReducer,
};

const Component = (() => {
  const favoriteData = useSelector(getFavoriteData);
  const userInfo = useSelector(getUserAuthData);
  const dispatch = useAppDispatch();
  const [isShowFavorite, setIsShowFavorite] = useState(false);

  useEffect(() => {
    if (isShowFavorite) {
      dispatch(fetchFavoriteById(userInfo?.userGUID!));
    }
  }, [dispatch, userInfo, isShowFavorite]);

  const showFunc = () => {
    setIsShowFavorite(!isShowFavorite);
  };

  return (
    <DynamicModuleLoader
      reducers={reducers}
    >
      <button className={cls.button_favorite} onClick={showFunc}>
        Избранные
      </button>
      {isShowFavorite 
        ? (
          <div className={cls.modal}>
            <div className={cls.modal_window}>
              <div className={cls.title_favorite}>  
                <h1>Избранные продукты</h1> 
              </div> 
              { favoriteData?.map((elem) => (
                <div className={cls.favorite_product} key={elem.user_guid}>
                  <img className={cls.picture_path} src={__API__ + elem!.picture_path} alt="" />
                  <div className={cls.other_data}>
                    {/* <h3>{elem?.user_name}</h3> */}
                    <h3>{elem?.product_title}</h3>
                  </div>
                  <div className="div">
                    <button className={cls.product_solution}>
                      {/* <NomenclatureCount 
                                    countValue={1}
                                    user={userInfo!}
                                 /> */}
                      <FavoriteButton />
                      <NomenclatureFavorite
                        user={userInfo!}
                        favoriteList={favoriteData!}
                        nomenclatureData={elem.nomenclature_data} 
                      />
                    </button>
                  </div>
                  <br />
                </div>
              ))} 
              <button className={cls.btn_close} onClick={showFunc}>
                х
              </button>
            </div>

            <div className={cls.overlay} onClick={showFunc}>
              {" "}
            </div>
          </div>
        )
        : ""}
         
    </DynamicModuleLoader>
  );
});

export const FavoriteMenu = React.memo(Component);
