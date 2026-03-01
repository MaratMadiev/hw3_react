import { User } from "@/shared/api/authApi";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
    user: User | null;
    token: string | null;
    isLoading: boolean;
}

const initialState: AuthState = {
    user: null,
    token: null,
    isLoading: false
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        
        setCredentials: (state, action: PayloadAction<{user: User, token: string}>) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        logOut: (state) => {
            state.user = null;
            state.token = null;
        },
    }
})

export const { setCredentials, logOut } = authSlice.actions;
export const authReducer = authSlice.reducer;
export default authSlice.reducer;