import { addAttachmentsToStore } from "./utils/reducerFunctions";

// ACTIONS

const SET_ATTACHMENTS = "SET_ATTACHMENTS";

// ACTION CREATORS

export const setNewAttachments = (attachments, sender) => {
  return {
    type: SET_ATTACHMENTS,
    payload: { attachments, sender: sender || null },
  };
};

const reducer = (state = "", action) => {
  switch (action.type) {
    case SET_ATTACHMENTS:
      return addAttachmentsToStore(state, action.payload);
    default:
      return state;
  }
};

export default reducer;
