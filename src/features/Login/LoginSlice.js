import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  email:'',

}

export const loginSlice = createSlice({
  name: 'ct',
  initialState,
  reducers: {
    change: (state,action) => {
     
    const {email}=action.payload;
state.email=email;
    },
   
  },
})

// Action creators are generated for each case reducer function
export const {change } = loginSlice.actions

export default loginSlice.reducer