import { io, Socket } from "socket.io-client"
import CredentialsModel from "../Models/CredentialsModel";
import FollowerModel from "../Models/FollowerModel";
import LocationModel from "../Models/LocationModel";
import UserModel from "../Models/UserModel";
import { addFollowerAction, deleteFollowerAction } from "../Redux/FollowerState";
import { addLocationAction, deleteLocationAction, updateLocationAction} from "../Redux/LocationsState";
import store from "../Redux/Store";

class SocketService {

    private socket: Socket;

    public connect():void{
        this.socket = io("http://localhost:3001");
        this.listen();
    }

    private listen():void{
        this.socket.on("admin-added-location",(location: LocationModel) => {
            store.dispatch(addLocationAction(location));
        });
        
        this.socket.on("admin-updated-location",(location: LocationModel) => {
            store.dispatch(updateLocationAction(location));
        });
        
        this.socket.on("admin-deleted-location",(id: number) => {
            store.dispatch(deleteLocationAction(id));
        });
        
        this.socket.on("user-follow-location",(follower:FollowerModel) => {
            store.dispatch(addFollowerAction(follower));
        });
        
        this.socket.on("user-unfollow-location",(follower:FollowerModel) => {
            store.dispatch(deleteFollowerAction(follower));
        });
   
    }


    public logIn(user: CredentialsModel): void{
        this.socket.emit("logIn", user);  
    }

    public register(user: UserModel): void{
        this.socket.emit("register", user);
    }

    public disconnect():void{
       this.socket.disconnect()
    }

    
    
   

}

const socketService = new SocketService();
export default socketService;