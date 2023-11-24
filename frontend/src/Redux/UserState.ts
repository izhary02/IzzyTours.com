import UserModel from "../Models/UserModel";

export class UserState {
    public users: UserModel[] = [];
}


export enum UsersActionType {
    FetchUsers = "FetchUsers",
    AddUser = "AddUser",
    UpdateUser = "UpdateUser",
    DeleteUser = "DeleteUser",
    Logout = "Logout",
}

export interface UsersAction {
    type: UsersActionType;
    payload?: any;
}


export function fetchUsersAction(users: UserModel[]): UsersAction {
    const action: UsersAction = { type: UsersActionType.FetchUsers, payload: users };
    return action;
}
export function addUserAction(user: UserModel): UsersAction {
    const action: UsersAction = { type: UsersActionType.AddUser, payload: user };
    return action;
}
export function updateUserAction(user: UserModel): UsersAction {
    const action: UsersAction = { type: UsersActionType.UpdateUser, payload: user };
    return action;
}
export function deleteUserAction(id: number): UsersAction {
    const action: UsersAction = { type: UsersActionType.DeleteUser, payload: id };
    return action;
}

export function logoutUserAction(): UsersAction{
    const action: UsersAction ={type:UsersActionType.Logout};
    return action;
}

export function usersReducer(currentState: UserState = new UserState(), action: UsersAction): UserState {
    const newState = { ...currentState };

    switch (action.type) {

        case UsersActionType.FetchUsers:
            newState.users = action.payload;
   break;

   case UsersActionType.AddUser:
    newState.users.push(action.payload);
   break;

   case UsersActionType.UpdateUser:
            const indexToUpdate = newState.users.findIndex(u => u.userId === action.payload.id);
            if(indexToUpdate >= 0) {
                newState.users[indexToUpdate] = action.payload;
            }
   break;

   case UsersActionType.DeleteUser:
    const indexToDelete = newState.users.findIndex(u => u.userId === action.payload);
    if(indexToDelete >= 0) {
        newState.users.splice(indexToDelete, 1);
    }
    break;

    case UsersActionType.Logout:
        newState.users = [];
    break;
}
return newState
}

 