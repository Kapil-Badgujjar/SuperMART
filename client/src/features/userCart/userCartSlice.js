import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const fetchCart = createAsyncThunk(
    'user/cart',
    async () => {
        const token = localStorage.getItem('userToken');
        try{
            const response = await axios.get(import.meta.env.VITE_SERVER_ADDRESS+`/cart/get-cart`,{withCredentials:true, headers: {'Content-Type': 'application/json', "Authorization": "Bearer "+token}});
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
            state.cart.push(action.payload);
        },
        removeProduct: (state, action) =>
        {
            // console.log(action.payload);
            const cart = state.cart.filter(item => item.product.id != action.payload.product.id);
            state.cart = cart;
        },
        updateQuantity: (state, action) => {
            const {id, flag} = action.payload;
            state.cart = state.cart = state.cart.map((item)=>{
                if(item.product.id === id){
                    if(flag){
                        item.quantity += 1
                    } else {
                        item.quantity -= 1
                    }
                }
                return item;
            })
        },
        addQuantity: (state, action) => {
            const { id, quantity } = action.payload;
            state.cart = state.cart.map((item)=>{
                if(item.product.id === id){
                    item.quantity += quantity;
                }
                return item;
            })
        },
        resetCart: (state, action) => {
            state.cart =  [];
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

export const { addProduct, removeProduct, updateQuantity, addQuantity, resetCart } = userCartSlice.actions;

export default userCartSlice.reducer;