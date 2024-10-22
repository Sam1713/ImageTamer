import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserType } from "../../types/userType";

interface UserState {
  currentUser: UserType | null; 
  loading: boolean;
  error: boolean;
  token:string|null
}

const initialState: UserState = {
  currentUser: null,
  loading: false,
  error: false,
  token:null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action: PayloadAction<UserType>) => {
      state.currentUser = action.payload;
      state.loading = false; 
    },
    signInFailure: (state) => {
      state.loading = false; 
    },
    setToken:(state,action:PayloadAction<string>)=>{
        state.token=action.payload
    },
    setLogout:(state)=>{
      state.currentUser=null
    }
  }
});

export const { signInStart, signInSuccess, signInFailure,setToken,setLogout } = userSlice.actions;
export default userSlice.reducer;
