import { combineReducers, createStore } from "redux";
import { authReducer } from "./AuthState";
import { followersReducer } from "./FollowerState";
import { locationsReducer } from "./LocationsState";
import { usersReducer } from "./UserState";


const reducers = combineReducers({
    locationsState: locationsReducer,
    followersState: followersReducer,
    authState: authReducer,
    usersState: usersReducer,
});


const store = createStore(reducers);

export default store;