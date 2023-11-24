import FollowerModel from "../Models/FollowerModel";

export class FollowerState {
    public userFollower: FollowerModel[] = [];
    public allFollowers: FollowerModel[] = [];
    public allUsersFollowers: FollowerModel[] = [];
    public locationsFollowers: FollowerModel[] = [];
}


export enum FollowersActionType {
    FetchFollowers = "FetchFollowers",
    FetchAllFollowers = "FetchAllFollowers",
    FetchUserFollower = "FetchUserFollower",
    FetchUsersFollowers = "FetchUsersFollowers",
    AddFollower = "AddFollower",
    AddToUserFollower = "AddToUserFollower",
    AddUserFollower = "AddUserFollower",
    DeleteFollower = "DeleteFollower",
    LocationsFollowers = "LocationsFollowers",
}

export interface FollowersAction {
    type: FollowersActionType;
    payload: any;
}


export function fetchFollowersAction(followers: FollowerModel[]): FollowersAction {
    const action: FollowersAction = { type: FollowersActionType.FetchFollowers, payload: followers };
    return action;
}
export function fetchAllFollowersAction(followers: FollowerModel[]): FollowersAction {
    const action: FollowersAction = { type: FollowersActionType.FetchAllFollowers, payload: followers };
    return action;
}
export function fetchAllUserFollowerAction(followers: FollowerModel[]): FollowersAction {
    const action: FollowersAction = { type: FollowersActionType.FetchUserFollower, payload: followers };
    return action;
}

export function fetchAllUsersFollowersAction(followers: FollowerModel[]): FollowersAction {
    const action: FollowersAction = { type: FollowersActionType.FetchUsersFollowers, payload: followers };
    return action;
}
export function fetchLocationsFollowersAction(followers: FollowerModel[]): FollowersAction {
    const action: FollowersAction = { type: FollowersActionType.LocationsFollowers, payload: followers };
    return action;
}
export function addToAllUsersFollowersAction(follower: FollowerModel): FollowersAction {
    const action: FollowersAction = { type: FollowersActionType.AddToUserFollower, payload: follower };
    return action;
}
export function addUserFollowerAction(follower: FollowerModel): FollowersAction {
    const action: FollowersAction = { type: FollowersActionType.AddUserFollower, payload: follower };
    return action;
}
export function addFollowerAction(follower: FollowerModel): FollowersAction {
    const action: FollowersAction = { type: FollowersActionType.AddFollower, payload: follower };
    return action;
}

export function deleteFollowerAction(follower: FollowerModel): FollowersAction {
    const action: FollowersAction = { type: FollowersActionType.DeleteFollower, payload: follower };
    return action;
}


export function followersReducer(currentState: FollowerState = new FollowerState(), action: FollowersAction): FollowerState {
    const newState = { ...currentState};

    switch (action.type) {

        case FollowersActionType.FetchAllFollowers:
            newState.allFollowers = action.payload;
        break;

        case FollowersActionType.FetchUsersFollowers:
            newState.allUsersFollowers = action.payload;
        break;

        case FollowersActionType.FetchUserFollower:
            newState.userFollower = action.payload;
        break;

        case FollowersActionType.LocationsFollowers:
            newState.locationsFollowers = action.payload;
            
        break;

        case FollowersActionType.AddFollower: 
            newState.userFollower.push(action.payload);
            newState.locationsFollowers.push(action.payload);
      
        break;
        


       case FollowersActionType.DeleteFollower:

        const indexToDeleteFromAllUsers = newState.locationsFollowers.findIndex(f => f.locationId === action.payload.locationId && f.userId === action.payload.userId);
        if(indexToDeleteFromAllUsers >= 0) {
            newState.locationsFollowers.splice(indexToDeleteFromAllUsers, 1)
        }
        const indexToDeleteUser = newState.userFollower.findIndex(f => f.locationId === action.payload.locationId && f.userId === action.payload.userId);
        if(indexToDeleteUser >= 0) {
            newState.userFollower.splice(indexToDeleteUser, 1)      
        }
    }
    return newState
}

 