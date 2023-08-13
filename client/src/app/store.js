import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/user/userSlice'
import userCartSlice from '../features/userCart/userCartSlice'
import sellerSlice from '../features/seller/sellerSlice'
export const store = configureStore( {
    reducer: {
        user: userReducer,
        cart: userCartSlice,
        seller: sellerSlice,
    },
})