import { createAsyncThunk, createSlice, isRejectedWithValue } from "@reduxjs/toolkit";
import axios from "axios";


const AUTH_ENDPOINT = `https://jlug-quiz-server.onrender.com/api/v1/`;

const initialState = {
  status: "",
  error: "",
  user: {
    id: "",
    name: "",
    email: "",
    domain: "",
    branch: "",
    token: "",
  },
};

export const registerUser=createAsyncThunk('auth/register',async(values,{rejectWithValue})=>{
  try{
   const {data}=await axios.post(`${AUTH_ENDPOINT}/auth/register`, {...values})
   return data;
  }
  catch(error){
     return rejectWithValue(error.response.data.error.message);
  }
}
)

export const loginUser=createAsyncThunk('auth/login',async(values,{rejectWithValue})=>{
  try{
   const {data}=await axios.post(`${AUTH_ENDPOINT}/auth/login`, {...values})
   return data;
  }
  catch(error){
     return rejectWithValue(error.response.data.error.message);
  }
}
)

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.status = "";
      state.error = "";
      state.user = {
        id: "",
        name: "",
        email: "",
        domain: "",
        branch: "",
        token: "",
      };
    },
    changeStatus:(state,action)=>{
      state.status=action.payload;
    }
  },
  extraReducers(builder){
    builder.addCase(registerUser.pending,(state,action)=>{
      state.status='loading'
    })
    .addCase(registerUser.fulfilled,(state,action)=>{
      state.status="succeeded";
      state.error="";
      state.user=action.payload.user;

    })
    .addCase(registerUser.rejected,(state,action)=>{
      state.status="failed";
      state.error=action.payload;
    })
    .addCase(loginUser.pending,(state,action)=>{
      state.status='loading'
    })
    .addCase(loginUser.fulfilled,(state,action)=>{
      state.status="succeeded";
      state.error="";
      state.user=action.payload.user;

    })
    .addCase(loginUser.rejected,(state,action)=>{
      state.status="failed";
      state.error=action.payload;
    })    
  }
});

export const { logout,changeStatus } = userSlice.actions;

export default userSlice.reducer;
