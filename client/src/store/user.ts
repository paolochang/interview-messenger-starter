import { AnyAction } from "redux";
import { IUser, IError } from "../type";

// ACTIONS

const GET_USER = "GET_USER";
const SET_FETCHING_STATUS = "SET_FETCHING_STATUS";

// ACTION CREATORS

export const gotUser = (user: IUser | IError | {}) => {
  return {
    type: GET_USER,
    user,
  };
};

export const setFetchingStatus = (isFetching: boolean) => ({
  type: SET_FETCHING_STATUS,
  isFetching,
});

// REDUCER

const reducer = (state = { isFetching: true }, action: AnyAction) => {
  switch (action.type) {
    case GET_USER:
      return action.user;
    case SET_FETCHING_STATUS:
      return {
        ...state,
        isFetching: action.isFetching,
      };
    default:
      return state;
  }
};

export default reducer;
