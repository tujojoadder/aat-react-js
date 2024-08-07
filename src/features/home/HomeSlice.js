//email for login

import { createSlice } from "@reduxjs/toolkit";

/* those states will be used from any component */
const initialState = {
 /*  Profile state */
  profile_picture: "",
  user_fname: "",
  user_lname: "",
  email: "",
  identifier: "",
/*   Confirmation Modal state  */
show_modal:false,
modal_message:'No message bro',

/* userToen */
token:'',

/* Toast Messsage */
  toastError:'',
  
};

export const homeSlice = createSlice({
  name: "userDetails",
  initialState,
  reducers: {

/*  <--- Profile State ---> */

    /* profile_picture */
    setProfile_picture: (state, action) => {
      const { profile_picture } = action.payload;
      state.profile_picture = profile_picture;
    },

    /* user_fname */
    setUser_fname: (state, action) => {
      const { user_fname } = action.payload;
      state.user_fname = user_fname;
    },
    /* user_lname */
    setUser_lname: (state, action) => {
      const { user_lname } = action.payload;
      state.user_lname = user_lname;
    },

    /* email */
    setEmail: (state, action) => {
      const { email } = action.payload;
      state.email = email;
    },

    /* identifier */
    setIdentifier: (state, action) => {
      const { identifier } = action.payload;
      state.identifier = identifier;
    },

/*  <--- Confirmation Modal State ---> */
 
setShow_Modal: (state,action) => {
  const { show_modal } = action.payload;
  state.show_modal =show_modal;
},

setModalMessage: (state, action) => {
  const { modal_message } = action.payload;
  state.modal_message = modal_message;
},

setToken: (state, action) => {
  const { token } = action.payload;
  state.token = token;
},



/* Toast Message */
setToastError: (state, action) => {
  const { toastError } = action.payload;
  state.toastError = toastError;
},


  },
});

// Action creators are generated for each case reducer function
export const { setProfile_picture,setUser_fname,setUser_lname,setEmail,setIdentifier,setModalMessage,setShow_Modal,setToken,setToastError } = homeSlice.actions;

export default homeSlice.reducer;
