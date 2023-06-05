import { combineReducers } from '@reduxjs/toolkit';
import authReducer from "./reducers/authReducer"
import postReducer from "./reducers/postReducer"

const rootReducer = combineReducers({
  auth: authReducer,
  post: postReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
