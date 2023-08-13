import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const fetchCart = createAsyncThunk(
    'user/cart',
    async () => {
        try{
            const response = await axios.get(import.meta.env.VITE_SERVER_ADDRESS+`/cart/get-cart`,{withCredentials:true, headers: {'Content-Type': 'application/json'}});
            if(response.status === 200) return response.data; 
        } catch(error) {
            throw error;
        }
    }
)

const initialState =  {
    cart: [],
    status: 'idle',
    error: null
}

export const userCartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addProduct: (state, action) =>{

        },
        removeProduct: (state, action) =>
        {

        },
        updateQuantity: (state, action) => {

        },
        resetCart: (state, action) => {
            state =  {
                cart: [],
                status: 'idle',
                error: null
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCart.pending, (state, action)=>{
            state.status = 'pending';

        })
        .addCase(fetchCart.fulfilled, (state, action)=>{
            state.status = 'successed';
            state.cart = action.payload;
        })
        .addCase(fetchCart.rejected, (state, action)=>{
            state.status = 'failed';
            state.error = action.error.message;
        })
    }
});

export { fetchCart };

export const selectUserCart = (state) => state.cart.cart;
export const selectCartStatus = (state) => state.cart.status;
export const selectCartError = (state) => state.cart.error;

export const { addProduct, removeProduct, updateQuantity, resetCart } = userCartSlice.actions;

export default userCartSlice.reducer;