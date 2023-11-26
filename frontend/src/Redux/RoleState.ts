import Role from "../Models/RoleModel";

export class RoleState{
  public role : Role;
};

export enum RoleActionType{
  FetchRole = "FetchRole",
  UpdateRole = "UpdateRole",
  IsHeAdmin = "IsHeAdmin",
  IsHeUser = "IsHeUser",
};

export interface RoleAction{
  type: RoleActionType;
  payload: any;
};

export function FetchRoleAction(role : Role):RoleAction{
  const action: RoleAction = {type: RoleActionType.FetchRole ,payload: role};
  return action;
};

export function UpdateRoleAction(role : Role):RoleAction{
  const action: RoleAction = {type: RoleActionType.UpdateRole ,payload: role};
  return action;
};

export function IsHeAdminAction(role : Role):RoleAction{
  const action: RoleAction = {type: RoleActionType.IsHeAdmin ,payload: role};
  return action;
};

export function IsHeUserAction(role : Role):RoleAction{
  const action: RoleAction = {type: RoleActionType.IsHeUser ,payload: role};
  return action;
};


export function roleReducer(currentState: RoleState = new RoleState(), action: RoleAction): RoleState {
  const newState = {...currentState };
  switch (action.type) {
    case RoleActionType.FetchRole:
      newState.role = action.payload
    break;
    
    case RoleActionType.IsHeAdmin:
      newState.role = action.payload
      const theRole = newState.role      
    break;

    case RoleActionType.IsHeUser:
            
    break;

    case RoleActionType.UpdateRole:
            
    break;
  };
  return newState;
};