import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../../Services/AuthService";
import notifyService from "../../../Services/NotifyService";
import socketService from "../../../Services/SocketService";
import locationsService from "../../../Services/LocationsService";
import followerService from "../../../Services/FollowerService";
import userService from "../../../Services/UserService";

function Logout(): JSX.Element {
    const navigate = useNavigate();
    
    useEffect(()=>{
        async function out():Promise<void> {  
            try{
                navigate("/login");
                authService.logout();
                socketService.disconnect();
                locationsService.logout();
                followerService.logout();
                userService.logout();

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
