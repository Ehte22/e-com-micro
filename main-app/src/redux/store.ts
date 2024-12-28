import { combineReducers, configureStore, Reducer } from "@reduxjs/toolkit";
import { authApi } from "auth/redux/auth.api"
import { productApi } from "admin/redux/product.api"
import { userApi } from "admin/redux/user.api"
import { cartApi } from "cart/redux/cart.api"
import { orderApi } from "order/redux/order.api"

import authSlice from "auth/redux/auth.slice"
import cartSlice from "cart/redux/cart.slice"

const injectedReducers: { [key: string]: Reducer } = {};

const reduxStore = configureStore({
    reducer: {
        [productApi.reducerPath]: productApi.reducer,
        [cartApi.reducerPath]: cartApi.reducer,
        auth: authSlice,
        cart: cartSlice
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            productApi.middleware,
            authApi.middleware,
            userApi.middleware,
            cartApi.middleware,
            orderApi.middleware
        )
})

export const injectReducer = (name: string, reducer: Reducer) => {
    injectedReducers[name] = reducer;
    reduxStore.replaceReducer(
        combineReducers({
            ...injectedReducers,
            auth: authSlice,
            cart: cartSlice
        })
    );
};

export const LOAD_PRODUCT_API = async () => {
    const { productApi } = await import('admin/redux/product.api');
    injectReducer(productApi.reducerPath, productApi.reducer);
};

export const LOAD_USER_API = async () => {
    const { userApi } = await import('admin/redux/user.api');
    injectReducer(userApi.reducerPath, userApi.reducer);
};

export const LOAD_ORDER_API = async () => {
    const { orderApi } = await import('order/redux/order.api');
    injectReducer(orderApi.reducerPath, orderApi.reducer);
};

export const LOAD_CART_API = async () => {
    const { cartApi } = await import('cart/redux/cart.api');
    injectReducer(cartApi.reducerPath, cartApi.reducer);
    injectReducer("cart", authSlice)
};

export const LOAD_AUTH_API = async () => {
    const { authApi } = await import('auth/redux/auth.api');
    injectReducer(authApi.reducerPath, authApi.reducer);
    injectReducer("auth", authSlice)
};

export type RootState = ReturnType<typeof reduxStore.getState>;
export type AppDispatch = typeof reduxStore.dispatch;

export default reduxStore