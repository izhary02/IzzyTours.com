import authService from "./AuthService";
import store from "../Redux/Store";
import axios from "axios";

class InterceptorService{
  public createInterceptors():void{
    axios.interceptors.request.use(request=>{
      if(authService.isLoggedIn()){
        request.headers ={
          authorization:"Bearer "+ store.getState().authState.token
        };
      };
      return request;
    });
  }
}
const interceptorService = new InterceptorService();

export default interceptorService