import UserModel from "../Models/UserModel";
import Role from "../Models/RoleModel";
import jwtDecode from "jwt-decode";

export class AuthState{
  public token: string = null;    
  public user: UserModel & { role: Role }= null;
  public isAdmin: boolean;
  public constructor(){
    this.token = localStorage.getItem("token");
    if(this.token){
      this.user = (jwtDecode(this.token) as any).user;
      this.isAdmin = this.user.role === Role.Admin;
    };
  };
};

export enum AuthActionType{
  Register = "Register",
  Login = "Login",
  Logout = "Logout",
};
export interface AuthAction{
  type:AuthActionType;
  payload?:string;
};

export type AuthActionPayload = {
  token: string;
};

export function registerAction(token: string): AuthAction{
  const action: AuthAction ={type:AuthActionType.Register, payload: token};
  return action;
};

export function loginAction(token: string): AuthAction{
  const action: AuthAction ={type:AuthActionType.Login, payload: token};
  return action;
};

export function logoutAction(): AuthAction{
  const action: AuthAction ={type:AuthActionType.Logout};
  return action;
};

export function authReducer(currentState:AuthState = new AuthState(), action:AuthAction):AuthState{
  const newState = {...currentState};
  switch(action.type){
    case AuthActionType.Register:
    case AuthActionType.Login:
      const token = action.payload;
      newState.token = token;
      newState.user = (jwtDecode(token)as any).user;
      localStorage.setItem("token",token);
    break;
  
    case AuthActionType.Logout:
      newState.token = null;
      newState.user = null;
      localStorage.removeItem("token");
    break;
  };
  return newState;

};


export default AuthState;


