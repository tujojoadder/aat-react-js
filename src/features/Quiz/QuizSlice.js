import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  storySeen: false,
  quesSeen: false,
  reward:false
 


};

export const quizSlice = createSlice({
  name: "qs",
  initialState,
  reducers: {

    //story
    setStorySeen: (state) => {
      state.storySeen = true;
    },
    stopStorySeen: (state) => {
        state.storySeen = false;
      },

      //questions
      setQuesSeen: (state) => {
        state.quesSeen = true;
      },
      stopQuesSeen: (state) => {
          state.quesSeen = false;
        },

          //reward
      setReward: (state) => {
        state.reward = true;
      },
      stopReward: (state) => {
          state.reward = false;
        },



  },
});

// Action creators are generated for each case reducer function
export const { setStorySeen,stopStorySeen,setQuesSeen,stopQuesSeen,setReward,stopReward } = quizSlice.actions;

export default quizSlice.reducer;
