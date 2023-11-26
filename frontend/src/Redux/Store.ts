import { authReducer } from "./AuthState";
import { followersReducer } from "./FollowerState";
import { locationsReducer } from "./LocationsState";
import { usersReducer } from "./UserState";
import { combineReducers, createStore } from "redux";

const reducers = combineReducers({
  locationsState: locationsReducer,
  followersState: followersReducer,
  authState: authReducer,
  usersState: usersReducer,
});

const store = createStore(reducers);

export default store;