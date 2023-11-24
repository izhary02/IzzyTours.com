import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../../Services/AuthService";
import notifyService from "../../../Services/NotifyService";
import socketService from "../../../Services/SocketService";

function Logout(): JSX.Element {
    const navigate = useNavigate();
    
    useEffect(()=>{
        async function out():Promise<void> {  
            try{
                navigate("/login");
                authService.logout();
                socketService.disconnect();
            }
            catch(err:any){
                notifyService.error(err);
            }
        }
     if(authService.isLoggedIn()){
        out()
     }
    },[]);

    return null;
}

export default Logout;
