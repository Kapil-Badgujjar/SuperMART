import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const fetchUser = createAsyncThunk(
    'user/fetchUserStatus',
    async (data) =>{
        try{
            const response = await axios.post(import.meta.env.VITE_SERVER_ADDRESS+'/user/login',data,{withCredentials: true, headers: {'Content-Type': 'application/json'}});
            if(response.status === 200){
                localStorage.setItem('userToken', response.data.accessToken);
                return response.data.user;
            }

        } catch (error){
            error.message = error.response.data.message;
            throw error;
        }
    }
)

const initialState = {
    user : {
        id: undefined,
        name: undefined,
        email: undefined
    },
    status: 'idle',
    error: null
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: (state) => {
                state.user = {
                id: undefined,
                name: undefined,
                email: undefined
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUser.pending, (state, action) => {
            state.status = 'loading';
        })
        .addCase(fetchUser.fulfilled, (state, action)=>{
            state.status = 'succeeded';
            state.user = action.payload;
        })
        .addCase(fetchUser.rejected, (state, action)=>{
            state.status = 'failed';
            state.error = action.error.message;
            state.user = {
                id: undefined,
                name: undefined,
                email: undefined
            }
        });
    }
})

export {fetchUser};

export const selectUserDetail = (state) => state.user.user;
export const selectUserStatus = (state) => state.user.status;
export const selectUserErrors = (state) => state.user.error;

export const { logout } = userSlice.actions;

export default userSlice.reducer;