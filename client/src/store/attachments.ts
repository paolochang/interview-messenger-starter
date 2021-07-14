import { holdAttachmentsToStore } from "./utils/reducerFunctions";

// ACTIONS

const SET_ATTACHMENTS = "SET_ATTACHMENTS";

// ACTION CREATORS

export const setNewAttachments = (
  attachments: string[],
  sender: any = undefined
) => {
  return {
    type: SET_ATTACHMENTS,
    payload: { attachments, sender: sender || null },
  };
};

const reducer = (state = "", action: any) => {
  switch (action.type) {
    case SET_ATTACHMENTS:
      return holdAttachmentsToStore(state, action.payload);
    default:
      return state;
  }
};

export default reducer;
