import { loginAction, logoutAction, registerAction } from "../Redux/AuthState";
import CredentialsModel from "../Models/CredentialsModel";
import notifyService from "./NotifyService";
import UserModel from "../Models/UserModel";
import config from "../Utils/Config";
import store from "../Redux/Store";
import axios from "axios";

class AuthService{

  public async register(user: UserModel):Promise<void>{
    const response = await axios.post<string>(config.registerUrl, user)
    const token = response.data
    store.dispatch(registerAction(token))
  }

  public async login(credentials: CredentialsModel):Promise<void>{
    const response = await axios.post<string>(config.loginUrl, credentials)
    const token = response.data
    store.dispatch(loginAction(token));
  }

  public async logout():Promise<void> {      
    await store.dispatch(logoutAction())
    notifyService.success("You have been successfully logged-out.")
  }

  public isLoggedIn(): boolean{
    return store.getState().authState.user !==null
  }
  public heHasAAdmin(): boolean{
    return store.getState().authState.user.role  === "Admin"
  }
};

const authService = new AuthService();
export default authService;