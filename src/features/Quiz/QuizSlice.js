import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  storySeen: false,
  quesSeen: false,
  reward:false,
 

  hadithData: '',
  hadithId:'',

  question_id: '',
  question: '',
  first_ans: '',
  second_ans: '',


  win:false,
  points:0,

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
        setHadithData: (state, action) => {
          state.hadithData = action.payload;
        },
        setHadithId: (state, action) => {
          state.hadithId = action.payload;
        },


        setQuestion: (state, action) => {
          state.question = action.payload;
        },
        setQuestionId: (state, action) => {
          state.question_id = action.payload;
        },
        setFirstAns: (state, action) => {
          state.first_ans = action.payload;
        },
        setSecondAns: (state, action) => {
          state.second_ans = action.payload;
        },
        setWin: (state, action) => {
          state.win = true;
        },
        setLose: (state, action) => {
          state.win = false;
        },
        setPoints: (state, action) => {
          state.points = action.payload.points;
        },


  },
});

// Action creators are generated for each case reducer function
export const { setHadithData,setPoints,setWin,setLose,setQuestionId,setQuestion,setFirstAns,setSecondAns,setHadithId,setStorySeen,stopStorySeen,setQuesSeen,stopQuesSeen,setReward,stopReward } = quizSlice.actions;

export default quizSlice.reducer;
