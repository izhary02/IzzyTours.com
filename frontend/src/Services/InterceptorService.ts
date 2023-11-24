import axios from "axios";
import jwtDecode from "jwt-decode";
import store from "../Redux/Store";
import authService from "./AuthService";


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