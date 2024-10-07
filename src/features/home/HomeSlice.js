// Updated Redux slice

import { createSlice } from "@reduxjs/toolkit";

/* Initial state */
const initialState = {
  /* Profile state */
  user_id: "",
  profile_picture: "",
  user_fname: "",
  user_lname: "",
  email: "",
  identifier: "",
  cover_photo: "",
  gender: "",
  birthdate: "",

  /* Confirmation Modal state */
  show_modal: false,
  modal_message: "No message bro",

  /* User token */
  token: "",

  /* Toast Messages */
  toastError: "",
  toastSuccess: "",

  /* Hadith */
  allDayHadith: [],

  /* Friends Requests */
  acceptedRequests: {}, // To store accepted friend requests by user ID
  rejectedRequests: {}, // To store rejected/canceled friend requests by user ID
  sentRequests: {},     // To store sent friend requests by user ID

/* Group State */
audience: '',
groupDetails: '',

 // State that will trigger refetch
groupUpdate: false, 
//for store admin groups
adminGroups: [],



/* <--- Page ---> */
pagePhone: '',
pageCategory: '',
pageLocation: '',
pageEmail:'',
pageDetails:'',
 // State that will trigger refetch
 pageUpdate: false, 
pageError:'',



/* Love and Unlike for post */
loveReactions: {}, // To store rejected/canceled friend requests by user ID
unlikeReactions: {},     // To store sent friend requests by user ID

/* Love and Unlike for Comment */
commentLoveReactions: {}, // To store rejected/canceled friend requests by user ID
commentUnlikeReactions: {},     // To store sent friend requests by user ID

/* Love and Unlike for Replies */
replyLoveReactions: {}, // To store rejected/canceled friend requests by user ID
replyUnlikeReactions: {},     // To store sent friend requests by user ID




  /* Online  Users */
// Initial state: an array to store online user IDs
  onlineUsers: [],

/*   Message */
receiver_id: null,

shouldRefetch: false,//comment
isReplySucess:false

};

export const homeSlice = createSlice({
  name: "userDetails",
  initialState,
  reducers: {
    /* Profile state reducers */
    setUser_id: (state, action) => {
      state.user_id = action.payload.user_id;
    },
    setProfile_picture: (state, action) => {
      state.profile_picture = action.payload.profile_picture;
    },

    setUser_fname: (state, action) => {
      state.user_fname = action.payload.user_fname;
    },

    setUser_lname: (state, action) => {
      state.user_lname = action.payload.user_lname;
    },

    setEmail: (state, action) => {
      state.email = action.payload.email;
    },

    setIdentifier: (state, action) => {
      state.identifier = action.payload.identifier;
    },

    setCover_photo: (state, action) => {
      state.cover_photo = action.payload.cover_photo;
    },

    setGender: (state, action) => {
      state.gender = action.payload.gender;
    },

    setBirthDate: (state, action) => {
      state.birthdate = action.payload.birthdate;
    },

    /* Confirmation Modal state reducers */

    setShow_Modal: (state, action) => {
      state.show_modal = action.payload.show_modal;
    },

    setModalMessage: (state, action) => {
      state.modal_message = action.payload.modal_message;
    },

    setToken: (state, action) => {
      state.token = action.payload.token;
    },

    /* Toast Messages reducers */

    setToastError: (state, action) => {
      state.toastError = action.payload.toastError;
    },

    setToastSuccess: (state, action) => {
      state.toastSuccess = action.payload.toastSuccess;
    },

    /* Hadith reducers */

    setAllDayHadith: (state, action) => {
      state.allDayHadith = action.payload;
    },

    setIsLiked: (state, action) => {
      const { index } = action.payload;
      state.allDayHadith[index].day_hadith.isLiked = true;
    },

    /* Friend Requests reducers */

    setRequestSent: (state, action) => {
      const { userId } = action.payload;
      state.sentRequests[userId] = true; // Mark request as sent
      delete state.rejectedRequests[userId]; // Remove from rejected if re-sent
    },

    setRequestAccepted: (state, action) => {
      const { userId } = action.payload;
      state.acceptedRequests[userId] = true; // Mark request as accepted
      delete state.sentRequests[userId]; // Remove from sent if accepted
    },

    setRequestRejected: (state, action) => {
      const { userId } = action.payload;
      state.rejectedRequests[userId] = true; // Mark request as rejected/canceled
      delete state.sentRequests[userId]; // Remove from sent if canceled
    },

/* Group */

setGroupAudience(state, action) {
  state.audience = action.payload;
},
setGroupDetails(state, action) {
  state.groupDetails = action.payload;
},

setPageUpdate: (state, action) => {
  state.pageUpdate = action.payload;  // Update the pageUpdate state
},

setAdminGroups: (state, action) => {
  state.adminGroups = action.payload;
},
// Add this to your homeSlice
setGroupName: (state, action) => {
  const { groupId, newName } = action.payload;
  state.adminGroups = state.adminGroups.map((group) =>
    group.group_id === groupId
      ? { ...group, group_name: newName }
      : group
  );
},

/*<--- Page --->*/
/* 
pageAddress: '',
pageCategory: '',
pageLocation: '',
pageEmail:'',
pageDetails:'', */


setPagePhone(state, action) {
  state.pagePhone = action.payload;
},
setpageCategory(state, action) {
  state.pageCategory = action.payload;
},
setpageLocation(state, action) {
  state.pageLocation = action.payload;
},
setpageEmail(state, action) {
  state.pageEmail = action.payload;
},
setpageDetails(state, action) {
  state.pageDetails = action.payload;
},

setGroupUpdate: (state, action) => {
  state.groupUpdate = action.payload;  // Update the groupUpdate state
},
setPageError: (state, action) => {
  state.pageError = action.payload;  // Update the groupUpdate state
},




/* Love and Unlike */

setLoveReaction: (state, action) => {
  const { postId, isActive } = action.payload;
  if (isActive) {
    state.loveReactions[postId] = true; // Mark as loved
    delete state.unlikeReactions[postId]; // Remove the 'unlike' if it was previously active
  } else {
    delete state.loveReactions[postId]; // Remove love reaction if deactivated
  }
},

setUnlikeReactions: (state, action) => {
  const { postId, isActive } = action.payload;
  if (isActive) {
    state.unlikeReactions[postId] = true; // Mark as unliked
    delete state.loveReactions[postId]; // Remove love reaction if it was previously active
  } else {
    delete state.unlikeReactions[postId]; // Remove unlike reaction if deactivated
  }
}
,



/* Love and Unlike for comment */
/* commentLoveReactions: {}, // To store rejected/canceled friend requests by user ID
commentUnlikeReactions: {},     // To store sent friend requests by user ID
 */



setCommentsLoveReaction: (state, action) => {
  const { commentID, isActive } = action.payload;
  if (isActive) {
    state.commentLoveReactions[commentID] = true; // Mark as loved
    delete state.commentUnlikeReactions[commentID]; // Remove the 'unlike' if it was previously active
  } else {
    delete state.commentLoveReactions[commentID]; // Remove love reaction if deactivated
  }
},

setCommentsUnlikeReactions: (state, action) => {
  const { commentID, isActive } = action.payload;
  if (isActive) {
    state.commentUnlikeReactions[commentID] = true; // Mark as unliked
    delete state.commentLoveReactions[commentID]; // Remove love reaction if it was previously active
  } else {
    delete state.commentUnlikeReactions[commentID]; // Remove unlike reaction if deactivated
  }
}
,

/* replyLoveReactions: {}, // To store rejected/canceled friend requests by user ID
replyUnlikeReactions: {},     // To store sent friend requests by user ID

 */

setReplyLoveReaction: (state, action) => {
  const { replyID, isActive } = action.payload;
  if (isActive) {
    state.replyLoveReactions[replyID] = true; // Mark as loved
    delete state.replyUnlikeReactions[replyID]; // Remove the 'unlike' if it was previously active
  } else {
    delete state.replyLoveReactions[replyID]; // Remove love reaction if deactivated
  }
},

setReplyUnlikeReactions: (state, action) => {
  const { replyID, isActive } = action.payload;
  if (isActive) {
    state.replyUnlikeReactions[replyID] = true; // Mark as unliked
    delete state.replyLoveReactions[replyID]; // Remove love reaction if it was previously active
  } else {
    delete state.replyUnlikeReactions[replyID]; // Remove unlike reaction if deactivated
  }
}
,













/*   Online Users */
setUserOnline: (state, action) => {
  state.onlineUsers.push(action.payload);
},
setUserOffline: (state, action) => {
  state.onlineUsers = state.onlineUsers.filter(
    (userId) => userId !== action.payload
  );
},


/* Message */
setReceiverId: (state, action) => {
  state.receiver_id = action.payload;
},

 /* Comment */
triggerRefetch: (state) => {
  state.shouldRefetch = !state.shouldRefetch; // Toggling state
},

/*  Reply refresh */
setIsReplySucess: (state) => {
  state.isReplySucess = !state.isReplySucess; // Toggling state
},


  },
});
/*<--- Page --->*/
/* 
pageAddress: '',
pageCategory: '',
pageLocation: '',
pageEmail:'',
pageDetails:'', */

export const {
 setGroupUpdate,
 setIsReplySucess,
 triggerRefetch,
 setReplyLoveReaction,
 setReplyUnlikeReactions,
 setReceiverId,
 setUserOffline,
 setUserOnline,
 setLoveReaction,
 setUnlikeReactions,
 setPageError,
 setPageUpdate,
 setPagePhone,
 setpageCategory,
 setpageLocation,
 setpageEmail,
 setpageDetails,
 setGroupName,
 setAdminGroups,
  setProfile_picture,
  setUser_id,
  setUser_fname,
  setUser_lname,
  setEmail,
  setIdentifier,
  setCover_photo,
  setGender,
  setBirthDate,
  setShow_Modal,
  setModalMessage,
  setToken,
  setToastError,
  setToastSuccess,
  setAllDayHadith,
  setIsLiked,
  setRequestSent,
  setRequestAccepted,
  setRequestRejected,
  setGroupAudience,
  setGroupDetails,
  setCommentsLoveReaction,
  setCommentsUnlikeReactions
} = homeSlice.actions;

export default homeSlice.reducer;
