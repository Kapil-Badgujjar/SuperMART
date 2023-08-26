import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    AdminLogedIn: false,
    loginID: null,
}

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        login: (state, action) => {
            const {flag, id} = action.payload;
            state.AdminLogedIn = flag,
            state.loginID = id
        },
        logout: (state, action) => {
            state = {
                AdminLogedIn: false,
                loginID: null,
            }
        }
    }
})

export const LoginStatus = (state) => state.admin.flag;
export const LoginID = (state) => state.admin.loginID;

export const {login, logout } = adminSlice.actions;

export default adminSlice.reducer;