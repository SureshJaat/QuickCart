import { createSlice, createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../../store/store';

interface CartItem {
  id: string;
  quantity: number;
  [key: string]: any;
}

interface CartState {
  loading: boolean;
  cartData: any[];
  cartList: Record<string, CartItem>;
  favoriteList: string[];
}

const initialState: CartState = {
  loading: false,
  cartData: [],
  cartList: {},
  favoriteList: [],
};

export const CartSlice = createSlice({
  name: 'CartSlice',
  initialState,
  reducers: {
    setCartData: (state, { payload }) => {
      const itemId = payload?.item?.id;
      const existingItem = state.cartList[itemId] ?? { ...payload?.item, quantity: 0 };
      let newQuantity = existingItem.quantity;

      if (payload?.action === "add") {
        newQuantity += 1;
      } else if (payload?.action === "remove") {
        newQuantity = Math.max(0, newQuantity - 1);
      }

      if (newQuantity === 0) {
        const { [itemId]: removed, ...rest } = state.cartList;
        state.cartList = rest;
      } else {
        state.cartList = {
          ...state.cartList,
          [itemId]: { ...existingItem, quantity: newQuantity },
        };
      }
    },

    setFavoriteData: (state, { payload }) => {
      const id = payload?.item?.id;
      if (state.favoriteList.includes(id)) {
        state.favoriteList = state.favoriteList.filter((itemId) => itemId !== id);
      } else {
        state.favoriteList = [...state.favoriteList, id];
      }
    },
  },
});

export const { setCartData, setFavoriteData } = CartSlice.actions;

export const selectCount = (state: RootState) => state.CartSlice;

export const selectCartList = createSelector(
  (state: RootState) => state.CartSlice.cartList,
  (cartList) => Object.values(cartList ?? {})
);
export const quantitySelector = (state: RootState, id: string) =>
  state.CartSlice.cartList?.[id]?.quantity ?? 0;

export const favoriteSelector = createSelector(
  [(state: RootState) => state.CartSlice.favoriteList, (_, id: string) => id],
  (favoriteList, id) => favoriteList.includes(id)
);

export const selectLoading = (state: RootState) => state.CartSlice.loading;
export default CartSlice.reducer;
