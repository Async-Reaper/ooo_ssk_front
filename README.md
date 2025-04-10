# Инструкция для локального запуска:

## С помощью node.js
Перед запуском нужно установить `yarn` если он не установлен: `npm install --global yarn`
1) Установка зависимостей: `yarn install`
2) Запуск проекта: `yarn dev`
3) Сборка проекта: `yarn build`

## С помощью Docker
1) Сборка образа `docker build -t ssk .`
2) Запуск образа `docker run -p 6002:80 ssk`
3) Открыть http://localhost:6002/

# Документация

## Памятка по архитектурной декомпозиции

<img src="https://feature-sliced.design/ru/assets/images/choosing-a-layer-ru-b9d9bdfa29418ef5443937d8d2dc479e.jpg">

### Описание 
- `shared` — переиспользуемый код, не имеющий отношения к специфике приложения/бизнеса. (например, UIKit, libs, API)
- `entities` (сущности) — бизнес-сущности. (например, User, Product, Order)
- `features` (фичи) — взаимодействия с пользователем, действия, которые несут бизнес-ценность для пользователя. (например, SendComment, AddToCart, UsersSearch)
- `widgets` (виджеты) — композиционный слой для соединения сущностей и фич в самостоятельные блоки (например, IssuesList, UserProfile).
- `pages` (страницы) — композиционный слой для сборки полноценных страниц из сущностей, фич и виджетов.
- `processes` (процессы, устаревший слой) — сложные сценарии, покрывающие несколько страниц. (например, авторизация)
- `app` — настройки, стили и провайдеры для всего приложения.

### Внутренние слои
<img src="https://feature-sliced.design/ru/assets/images/visual_schema-e826067f573946613dcdc76e3f585082.jpg">
Проект состоит из слоев (layers), каждый слой состоит из слайсов (slices) и каждый слайс состоит из сегментов (segments).
Слайсы группируют логически связанные модули, что облегчает навигацию по кодовой базе. Слайсы не могут использовать другие слайсы на том же слое, что обеспечивает высокий уровень связности (cohesion) при низком уровне зацепления (coupling). (проще говоря классно это)

Слайс состоит из сегментов. Это модули, задача которых — разделить код внутри слайса по техническому назначению.
В нашем проекте слайс состоит из сегментов `model` и `ui`.

Если в сегменте ui содержится один компонент тогда можно оставить его как корневой, если компонентов два и более тогда каждый компонент помещать в отдельную папку внутри `ui` (нужно это для того, чтобы не запутаться в файлах)

**Пример**:

![img.png](docs%2FentryUI.png)

Сегмент `model` содержит в себе:
- `selectors` - функции которые позволяют получить данные из глобального стора 
- `services` - запросы на сервер
- `slice` - функция для обработки данных содержащихся в сторе
- `types` - типы

**Пример**:

![img.png](docs%2FentryModel.png)

## Памятка по написанию кода

### 1) Определится с зоной ответственности модуля

Понять к какому слою относить новый функционал, опираясь на памятку по архитектурной декомпозиции. 
`ДЕЛАТЬ ОЧЕНЬ ВНИМАТЕЛЬНО, ИНАЧЕ МОЖНО УБИТЬ АРХИТЕКТУРУ И БУДЕТ КАК В PHP!!!!!`. 
Модули на одном слое (допустим модули в widgets) нельзя использовать на том же слое, так как нарушается принцип архитектуры. 
Но в самых крайних случаях можно, как это сделано например с модулем `Nomenclature`, так как он в `widgets` - он может использовать все слои снизу. 
Однако есть модули, которые используют `NomenclatureCard` у себя в списке (это может быть корзина, история заказов и тд),
(а так как в `NomenclatureCard` используется `NomenclatureCount`, который отвечает за работу с корзиной; 
и `NomenclatureFavorite` (работа с избранным), то переносить это модуль в `features` будет такое себе решение, так как возникнет куда большая каша.

# ВАЖНО!!!!!! Внутри модуля импорты должны относительными, то есть если мы допустим внутри модуля Номенклатуры импортируем что-то что находится в этом модуле, то импорт должен быть относительным (ЭТО ОТНОСИТСЯ НЕ ТОЛЬКО К СЕГМЕНТУ MODEL, НО И К UI)
**Пример как НУЖНО делать**:

![img.png](docs%2Fhow_need_import.png)


**Пример как НЕ нужно делать**:

![img_1.png](docs%2Fhow_no_need_import.png)


# ВАЖНО!!!!!! На файлы которые используются в других модулях нужно делать реэкспорт: в корне модуля создается файл index.ts и экспортируется все, что только можно

**Пример:**

```
export { NomenclatureCard } from "./ui/NomenclatureCard/NomenclatureCard";
export type { NomenclatureSchema, INomenclature } from "./model/types/nomenclature";
export * from "./model/selectors/nomenclatureSelectors";
export * from "./model/slice/nomenclatureSlice";
export { NomenclaturesList } from "./ui/NomenclaturesList/NomenclaturesList";
export type { NomenclaturesListSchema } from "./model/types/nomenclaturesList";
export * from "./model/selectors/nomenclaturesListSelectors";
export * from "./model/slice/nomenclaturesListSlice";
```

### 2) Составить типы данных
После создания модуля, нужно создать папку `model` и в ней папку `types` (папка нужна так как в одном модуле может быть несколько файлов с типами, как в `Nomenclature`), в которой нужно создать файл  

2.1) Типы для данных которые получены с сервера. Это интерфейс, где идет перечисление типов, называть стоит так, что сначала идет буква I.

**Пример**:

```
export interface INomenclature {
   guid: string;
   parent_guid: string;
   short_name: string;
   full_name: string;
   description: string;
   expiration_date: number;
   measure: string;
   weight: number;
   multiplicity?: number;
   pictures: INomenclaturePicture[];
   count: number;
   price: number;
   status: StatusNomenclatureType;
   is_deleted: boolean;
   is_discount: boolean;
   is_new: boolean;
   brand_name: string;
   brand_guid: string;
   parent_nomenclature_name: string;
}
```

2.2) Типы для данных, которые потом будут цепляться из селектора (`Схема`). В них как правило содержится тип
для 3 полей (может быть как больше, так и меньше, и сами типы могут быть другие)

**Пример**:

```
export interface NomenclatureSchema {
   isLoading: boolean;
   error?: IResponseError;
   data?: INomenclature
}
```

Где:
- `isLoading` - состояние запроса (`true` если запрос ушел и не получен никакой ответ, `false` если ответ пришел);
- `error` - значение ошибки если она есть;
- `data` - данные полученные при успешном запросе;

      Поля `data` и `error` нужно делать необязательными, так как изначально в них ничего не содержится.

В случае если запрос `POST` и ему нужно тело, то надо составлять отдельный интерфейс для тела:

```
export interface IAddToFavorite {
   user_guid: string;
   product_guid: string;
}
```

Перейти в файл `StateSchema`по пути **app/providers/StoreProvider/config/StateSchema.ts**

В интерфейс StateSchema добавить созданную схему: указывается название поля (обязательно с вопросительным знаком, чтобы подгрузка модуля шла асинхронно) и схема.

**StateSchema.ts:**

```
export interface StateSchema {
   user: UserSchema,
   ui: UISchema,
   nomenclature?: NomenclatureSchema;
   nomenclaturesList?: NomenclaturesListSchema
   authForm?: AuthSchema,
   tradePointForm?: TradePointSchema

   // BasketLink
   addToBasketForm?: AddToBasketSchema
   deleteFromBasketForm?: DeleteFromBasketSchema
   basketList?: BasketSchema

   // Favorite products
   addToFavoriteForm?: AddToFavoriteSchema,
   deleteFromFavoriteForm?: DeleteFromFavoriteSchema,
   favoriteList?: FavoriteSchema

   // Brand
   brandsList?: BrandsListSchema,

   // Nomenclature group
   nomenclatureGroupList?: NomenclatureGroupSchema;

   alerts?: AlertSchema;

   // History order
   historyOrderProduct?: HistoryOrderProductSchema;
   historyOrdersList?: HistoryOrdersListSchema;
   orderProductHistoryList?: OrderProductsHistoryListSchema;
   
   новоеПоле: НовоеПолеСхема
}
```

### 3) Создать запрос
Создать папку `services` и в ней файл, в начале файла добавляется приписка fetch и название запроса (название давать исходя из того, что запрос делает) 
Запрос составляется при помощи встроенной в `redux` функции `createAsyncThunk`:

**Пример:**

```
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ThunkConfig } from "@app/providers/StoreProvider";
import { INomenclature } from "../types/nomenclature";

export const fetchNomenclatureById = createAsyncThunk<INomenclature, string, ThunkConfig<any>>(
   "nomenclatures/ById",
   async (guid, thunkApi) => {
      const { extra, rejectWithValue } = thunkApi;
      try {
         const response = await extra.api.get(`/api/nomenclature/${guid}`);
         return response.data;
      } catch (e) {
         if (axios.isAxiosError(e)) {
            if (!e.response) {
               return rejectWithValue("NO_CONNECTION");
            }
         }
         return rejectWithValue("error");
      }
   },
);

```

В `<>`- образных скобках указываются типы:
- Первый тип это на то, что мы ожидаем, в примере запроса мы ожидаем получить номенклатуру, поэтому указываем интерфейс для номенклатуры
- Второй тип на то, что мы передаем, тип может быть как созданным интерфейсом, так и стандартным типом (string, number и тд), если ничего не передается то указывать `void` (пример ниже)

**Пример с пустым параметром:**

```
import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserDataType } from "@entities/user";
import { ThunkConfig } from "@app/providers/StoreProvider";
import axios from "axios";
import { getCookie } from "@shared/libs/cookie";

export const initUserAuthData = createAsyncThunk<UserDataType, void, ThunkConfig<string>>(
   "user/initUserAuthData",
   async (_, thunkApi) => {
      const { extra, rejectWithValue } = thunkApi;
      try {
         const response = await extra.api.get("/api/service/user/me", {
            headers: {
               access_token: getCookie("access_token"),
            },
         });
         return response.data;
      } catch (e) {
         if (axios.isAxiosError(e)) {
            if (!e.response) {
               rejectWithValue("NO CONNECTION");
            }
         }
         return rejectWithValue("error");
      }
   },
);

```
- Третий тип конфигурационный и везде одинаковый, поэтому его не трогать. Указать `ThunkConfig<any>` и все.

На второй строке идет префикс, он должен быть уникальный среди запросов, иначе они могут друг друга перебить. 
Называть стоит по смыслу, если это список историй допустим, то писать `history/all`
На третьей строке вызывается функция, перед ней всегда должен быть `async`, параметрами она принимает тело запроса (если оно есть, если его нет, то указывается `_`).
На строке где `await` идет сам запрос и указывается метод после `api`

### 4) Создать слайс
Создать папку `slice` и в ней файл, файлу дается название модуля и в конце добавляется приписка Slice 
В файле создать константу initialState и ей дать тип схемы модуля в котором находимся.
Далее провести действия как на примере ниже:
1. В нейм дать название модуля;
2. Создать редьюсеры для взаимодействия с данными если нужно;
3. Создать экстраредьюсеры для обработки состояния запроса (вместо `fetchOrderProductHistoryList` пишем название нашего запроса);
4. Экспортировать экшены и редьюсер 


**Пример без редьюсера:**

```
import { createSlice } from "@reduxjs/toolkit";
import { NomenclaturesListSchema } from "../types/nomenclaturesList";
import { fetchNomenclaturesList } from "../services/fetchNomenclaturesList";

const initialState: NomenclaturesListSchema = {
   isLoading: false,
};

const nomenclaturesListSlice = createSlice({
   name: "nomenclatures",
   initialState,
   reducers: {},
   extraReducers: (builder) => builder
      .addCase(fetchNomenclaturesList.pending, (state) => {
         state.isLoading = true;
      })
      .addCase(fetchNomenclaturesList.fulfilled, (state, action) => {
         state.isLoading = false;
         state.products = action.payload.products;
         state.total_count = action.payload.total_count;
      })
      .addCase(fetchNomenclaturesList.rejected, (state, action) => {
         state.isLoading = false;
         state.error = action.payload;
      }),
});

export const { actions: nomenclaturesListActions } = nomenclaturesListSlice;
export const { reducer: nomenclaturesListReducer } = nomenclaturesListSlice;
```

**Пример с редьюсером:**

```
import { createSlice } from "@reduxjs/toolkit";
import { NomenclatureSchema } from "../types/nomenclature";
import { fetchNomenclatureById } from "../services/fetchNomenclatureById";

const initialState: NomenclatureSchema = {
   isLoading: false,
};

const nomenclatureSlice = createSlice({
   name: "nomenclature/id",
   initialState,
   reducers: {
      setNomenclature(state, action) {
         state.data = action.payload;
      },
   },
   extraReducers: (builder) => builder
      .addCase(fetchNomenclatureById.pending, (state) => {
         state.isLoading = true;
      })
      .addCase(fetchNomenclatureById.fulfilled, (state, action) => {
         state.isLoading = false;
         state.data = action.payload;
      })
      .addCase(fetchNomenclatureById.rejected, (state, action) => {
         state.isLoading = false;
         state.error = action.payload;
      }),
});

export const { actions: nomenclatureActions } = nomenclatureSlice;
export const { reducer: nomenclatureReducer } = nomenclatureSlice;
```

### 5) Создать селекторы

1. Создать папку `selectors` и в ней файл, файлу дается название модуля и в конце добавляется приписка Selectors
2. В файле экспортировать функции для всех полей которые есть в схеме

**Пример:**

```
import { StateSchema } from "@app/providers/StoreProvider";

export const getNomenclaturesList = (state: StateSchema) => state.nomenclaturesList?.products;
export const getNomenclaturesCount = (state: StateSchema) => state.nomenclaturesList?.total_count;
export const getNomenclaturesListIsLoading = (state: StateSchema) => state.nomenclaturesList?.isLoading;
```

### 6) Связать UI с логикой

1) В папке UI создается компонент
2) В компоненте создаем константу `reducers`, которой даем тип `ReducersList`, и 
берем нужные поля, допустим для списка номенклатур нам нужно поле `nomenclaturesList`, после чего присваиваем соответсвующий редьюсер, который мы экспортировали до этого
3) Создаем константу `dispatch` и присваиваем ей функцию `useAppDispatch` (которую нужно импортировать);
4) Если нужно подгрузить данные сразу, то используем хук `useEffect`, в котором мы вызываем dispatch и передаем в него запрос, в массив зависимостей (квадратные скобки после хука) передаем dispatch и параметры для запроса (если они есть);
5) После всего этого оборачиваем верстку в компонент `DynamicModuleLoader`, в атрибут reducers указываем reducers который мы создали ранее и добавляем атрибут `removeAfterUnmount`, чтобы он удалился как только потеряется из виду
6) Создаем константы под данные с селекторов, импортируем хук useSelector и в него передаем селеторы которые мы создали
7) Для того, чтобы использовать значения внутри верстки, значение нужно обернуть в фигурные скобки 
8) Если нужно сделать запрос на сервер, чтобы что-то отправить, то создаем функцию в которую мы передаем dispatch и передаем в него запрос, в массив зависимостей (квадратные скобки после хука) передаем dispatch и параметры для запроса;

**Пример:**

```
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@shared/hooks";
import { useSearchParams } from "react-router-dom";
import { Skeleton } from "@shared/ui/Skeleton";
import { VStack } from "@shared/ui";
import { DynamicModuleLoader, ReducersList } from "@shared/libs/component";
import { getCurrentTradePoint } from "@entities/TradePoint";
import { favoriteReducer, fetchFavoriteProduct, getFavoriteData } from "@entities/FavoriteProducts";
import { getUserAuthData } from "@entities/user";
import { basketReducer, fetchBasketProductWithContract, getBasketData } from "@entities/BasketEntitie";
import { Pagination } from "@shared/ui/Pagination/Pagination";
import { usePlaceholderItems } from "../../model/libs/hooks/usePlaceholderItems";
import { NomenclatureCard } from "../NomenclatureCard/NomenclatureCard";
import {
   getNomenclaturesCount,
   getNomenclaturesList,
   getNomenclaturesListIsLoading,
} from "../../model/selectors/nomenclaturesListSelectors";
import { fetchNomenclaturesList } from "../../model/services/fetchNomenclaturesList";
import { nomenclaturesListReducer } from "../../model/slice/nomenclaturesListSlice";

const reducers: ReducersList = {
   nomenclaturesList: nomenclaturesListReducer,
   favoriteList: favoriteReducer,
   basketList: basketReducer,
};

const Component = () => {
   const nomenclatures = useSelector(getNomenclaturesList);
   const nomenclaturesCount = useSelector(getNomenclaturesCount);
   const isLoading = useSelector(getNomenclaturesListIsLoading);
   const currentTradePoint = useSelector(getCurrentTradePoint);
   const user = useSelector(getUserAuthData);
   const favoriteList = useSelector(getFavoriteData);
   const basketList = useSelector(getBasketData);
   
   const [page, setPage] = useState(1);
   const [limit] = useState(30);
   
   const placeholderItems = usePlaceholderItems(limit);
   const dispatch = useAppDispatch();
   const [search] = useSearchParams();

   const paramsForRequest: IFilterNomenclatures = {
      page,
      limit,
      isNew: Boolean(search.get("isNew")),
      contractGuid: search.get("contractGUID")?.toString(),
      isOnlyMatrix: Boolean(search.get("isOnlyMatrix")),
   };

   useEffect(() => {
      dispatch(fetchNomenclaturesList(paramsForRequest));
   }, [dispatch, page, currentTradePoint]);

   useEffect(() => {
      dispatch(fetchFavoriteProduct(user!.userID));
   }, [dispatch]);

   useEffect(() => {
      if (currentTradePoint) {
         dispatch(fetchBasketProductWithContract({ contractGuid: currentTradePoint.guid, userGuid: user!.userID }));
      }
   }, [dispatch, currentTradePoint, user]);
   
   return (
      <DynamicModuleLoader
         reducers={reducers}
      >
         <Pagination limit={limit} page={page} setPage={setPage} totalCount={nomenclaturesCount!} />
         <VStack gap="8" max>
            {isLoading
               ? placeholderItems.map((item) => <Skeleton key={item} width="100%" height="175px" border="15px" />)
               : nomenclatures?.map((nomenclature) => (
                  <NomenclatureCard 
                     key={nomenclature.guid} 
                     nomenclature={nomenclature} 
                     favoriteList={favoriteList!}
                     basketList={basketList}
                  />
               ))}
         </VStack>
         <Pagination limit={limit} page={page} setPage={setPage} totalCount={nomenclaturesCount!} />
      </DynamicModuleLoader>
   );
};

export const NomenclaturesList = React.memo(Component);

```

### 7) Создание страницы

### Важно!!! Если страница вычисляется под id (например нужно перейти на страницу конкретной номенклатуры, то создается отдельная страница и отдельный путь)

1) В папке `pages` создать папку под новую страницу, дать ей название, создать файл `index.ts`, создать папку `ui` и создать файл `НазваниеСтраницыPage.tsx`
2) Создать файл НазваниеСтраницыPage.async.ts и написать следующую функцию:

```
export const НазваниеСтраницыPageAsync = lazy(async () => import("./НазваниеСтраницыPage"));
```

3) В index.ts экспортировать НазваниеСтраницыPageAsync как просто НазваниеСтраницыPage следующим образом:

```
  export { НазваниеСтраницыPageAsync as НазваниеСтраницыPage } from "./ui/НазваниеСтраницыPage.async";
```

4) Перейти в `shared/const/router`.
5) Добавить перечисление в enum:
```
export enum AppRoutes {
   MAIN = "main",
   LOGIN = "login",
   BASKET = "basket",
   HISTORY = "history",
   HISTORY_ID = "history_id",
   BRANDS = "brands",
   ORDERS = "orders",
   ORDER_ID = "order_id",
   НОВОЕ_ПЕРЕЧИСЛЕНИЕ = "новое_перечисление",
   
   //Тот самый путь для id
   НОВОЕ_ПЕРЕЧИСЛЕНИЕ_ID = "новое_перечисление_id",
   NOT_FOUND = "not_found",
}

export const getRouteMain = () => "/nomenclatures";
export const getRouteLogin = () => "/login";
export const getRouteBasket = () => "/basket";
export const getRouteHistory = () => "/history";
export const getRouteHistoryId = (id: string) => `/history/${id}`;
export const getRouteBrands = () => "/brands";
export const getRouteOrders = () => "/orders";
export const getRouteOrderId = (id: string) => `/orders/${id}`;
export const getRouteНоваяСтраница = () => `/новая_страница`;
export const getRouteНоваяСтраницаId = (id: string) => `/новая_страница/${id}`;
```

6) Добавить в `configRouter` новую страницу:

```
import {
   AppRoutes,
   getRouteBasket,
   getRouteBrands,
   getRouteHistory,
   getRouteHistoryId,
   getRouteLogin,
   getRouteMain,
   getRouteOrderId,
   getRouteOrders,
} from "@shared/const/router";
import { AppRoutesProps } from "@shared/types/router";
import { NotFoundPage } from "@pages/NotFoundPage";
import { MainPage } from "@pages/MainPage";
import { LoginPage } from "@pages/LoginPage";
import { HistoryPage } from "@pages/HistoryPage";
import { HistoryIdPage } from "@pages/HistoryIdPage";
import { BasketPage } from "@pages/BasketPage";
import { BrandPage } from "@pages/BrandPage";
import { OrdersPage } from "@pages/OrdersPage";
import { OrderIdPage } from "@pages/OrderIdPage";
import { UserRoles } from "@entities/user";

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
   [AppRoutes.HISTORY]: {
      path: getRouteHistory(),
      element: <HistoryPage />,
      authOnly: true,
      roles: UserRoles.BUYER,
   },
   [AppRoutes.HISTORY_ID]: {
      path: getRouteHistoryId(":id"),
      element: <HistoryIdPage />,
      authOnly: true,
      roles: UserRoles.BUYER,
   },
   [AppRoutes.MAIN]: {
      path: getRouteMain(),
      element: <MainPage />,
      authOnly: true,
   },
   [AppRoutes.LOGIN]: {
      path: getRouteLogin(),
      element: <LoginPage />,
   },
   [AppRoutes.BASKET]: {
      path: getRouteBasket(),
      element: <BasketPage />,
      authOnly: true,
   },
   [AppRoutes.BRANDS]: {
      path: getRouteBrands(),
      element: <BrandPage />,
      authOnly: true,
   },
   [AppRoutes.ORDERS]: {
      path: getRouteOrders(),
      element: <OrdersPage />,
      roles: UserRoles.ADMIN,
   },
   [AppRoutes.ORDER_ID]: {
      path: getRouteOrderId(":id"),
      element: <OrderIdPage />,
      roles: UserRoles.ADMIN,
   },
   [AppRoutes.НОВОЕ_ПЕРЕЧИСЛЕНИЕ]: {
      path: getRouteНоваяСтраница(),
      element: <НоваяСтраницаPage />,
      authOnly: true,
   },
   [AppRoutes.НОВОЕ_ПЕРЕЧИСЛЕНИЕ_ID]: {
      path: getRouteНоваяСтраницаId(":id"),
      element: <НоваяСтраницаIdPage />,
      authOnly: true,
   },
   
   // last
   [AppRoutes.NOT_FOUND]: {
      path: "*",
      element: <NotFoundPage />,
   },
};
```

## Путеводитель по проекту

1) Чтобы поменять глобальные стили: `app/styles/index.scss`
2) Чтобы поменять адрес апишки: `shared/protocols/api.ts`

Моменты где можно спутать что-то
1) `features/HistoryOrderProduct` - модуль отвечающий за историю заказов у товара (кнопка "История заказов" у товара);
2) `features/HistoryOrders` - модуль отвечающий за историю заказов в принципе (ссылка "История заказов" в хедере);
3) `widgets/OrderProductsHistory` - модуль отвечающий за отображение товаров у конкретной истории
