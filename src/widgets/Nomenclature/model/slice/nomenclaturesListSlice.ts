import { createSlice } from "@reduxjs/toolkit";
import { NomenclaturesListSchema } from "../types/nomenclaturesList";

const initialState: NomenclaturesListSchema = {
  isLoading: false,
  products: [
    {
      guid: "dasfsdfas",
      short_name: "Сыр чет",
      full_name: "Сыр чет много разговаривает",
      description: "Сыр который чет много разговаривает, совсем потерялся",
      expiration_date: 365,
      measurement: "кг",
      weight: 400,
      multiplicity: 12,
      is_deleted: false,
      is_discount: false,
      is_new: false,
      brand_guid: "dsafasdf",
      parent_guid: "asdfasdf",
      pictures: [
        {
          path: "https://xn--42-1lc1aa.xn--p1ai/media/nomenclatures/c0d84811-8e57-11e9-8171-1831bfb22726/mainPicture.JPEG",
          full_name: "fdsa",
          guid_product: "sdfa",
          id: 2,
        },
      ],
      additional_information: {
        product_guid: "выафыв",
        count: 13,
        price: 2342,
        remains: 45,
      },
      // status: StatusNomenclatureType.IN_STOCK,
    },
  ],
};

const nomenclaturesListSlice = createSlice({
  name: "nomenclatures",
  initialState,
  reducers: {},
  // extraReducers: (builder) => builder
  //   .addCase(fetchNomenclaturesList.pending, (state) => {
  //     state.isLoading = true;
  //   })
  //   .addCase(fetchNomenclaturesList.fulfilled, (state, action) => {
  //     state.isLoading = false;
  //     state.products = action.payload.products;
  //     state.total_count_products = action.payload.count_products;
  //   })
  //   .addCase(fetchNomenclaturesList.rejected, (state, action) => {
  //     state.isLoading = false;
  //     state.error = action.payload;
  //   }),
});

export const { actions: nomenclaturesListActions } = nomenclaturesListSlice;
export const { reducer: nomenclaturesListReducer } = nomenclaturesListSlice;
