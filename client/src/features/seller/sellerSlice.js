import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { postData } from "../../api/AxiosPostRequest";

const fetchSeller = createAsyncThunk(
    'seller/fetchSeller',
    async (seller) => {
        try {
            const response = await postData('/sellers/login', seller, '');
            localStorage.setItem('sellerToken', response.data.accessToken);
            localStorage.setItem('sellerRefreshToken', response.data.refreshToken);
            return response.data.seller;
        } catch (error) {
            error.message = error.response.data.message;
            throw error;
        };
});

const initialState = {
    seller: {
        id: undefined,
        name: undefined,
        phoneNumber: undefined,
        email: undefined
    },
    status: 'idle',
    error: null
}


const sellerSlice = createSlice({
    name: 'seller',
    initialState,
    reducers: {
        login: (state,action) => {
            state.seller = action.payload;
        },
        logout: (state, action) => {
            state.seller = {
                id: undefined,
                name: undefined,
                phoneNumber: undefined,
                email: undefined
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchSeller.pending, (state,action)=>{
            state.status = 'loading';
        })
        .addCase(fetchSeller.fulfilled, (state,action)=>{
            state.status = 'complete';
            state.seller = action.payload;
        })
        .addCase(fetchSeller.rejected, (state,action)=>{
            state.status = 'failed';
            state.error = action.error.message;
            state.seller = {
                id: undefined,
                name: undefined,
                phoneNumber: undefined,
                email: undefined,
            }
        });
    }
})

export const selectSeller = (state) => state.seller.seller;
export const selectSellerStatus = (state) => state.seller.status;
export const selectSellerError = (state) => state.seller.error;

export { fetchSeller };

export const {login, logout } = sellerSlice.actions;

export default sellerSlice.reducer;