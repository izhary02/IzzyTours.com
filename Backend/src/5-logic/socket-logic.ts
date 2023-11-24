import { Server as HttpServer } from "http";
import { Server as SocketServer, Socket } from "socket.io";
import CredentialsModel from "../4-models/credentials-model";
import FollowerModel from "../4-models/follower-model";
import LocationModel from "../4-models/location-model";
import UserModel from "../4-models/user-model";

let socketServer : SocketServer;

function init(httpServer:HttpServer):void{

    socketServer = new SocketServer(httpServer, { cors: { origin: "*"} });

    socketServer.sockets.on("connection",(socket: Socket) => {
        console.log("socket on....");
        
        socket.on("logIn", (user: CredentialsModel) => {
            console.log(`the user: ${user.username} has been connected....`);
            
        });
        
        socket.on("logIn-second-time",() => {
            console.log(`the user has been connected at the second time`);
            
        });
     
        socket.on("register", (user: UserModel) => {
            console.log(`We have a new user:  ${user.username} has been register....`);
            
        });


        socket.on("disconnect", (reason) => {
            if(reason === "transport close"){
                console.log("🔃"); 
            }
            else{console.log("user Disconnect");}
        });
            
      
    });
}
function reportAddLocation(location: LocationModel):void{
    socketServer.sockets.emit("admin-added-location",location);
}
function reportUpdateLocation(location: LocationModel):void{
    socketServer.sockets.emit("admin-updated-location",location);
}
function reportDeleteLocation(id: number):void{
    socketServer.sockets.emit("admin-deleted-location",id);
}
function reportFollowerLocation(follower:FollowerModel):void{
    socketServer.sockets.emit("user-follow-location",follower);
}
function reportUnfollowLocation(follower:FollowerModel):void{
    socketServer.sockets.emit("user-unfollow-location",follower);
}

export default {
    init,
    reportAddLocation,
    reportUpdateLocation,
    reportDeleteLocation,
    reportFollowerLocation,
    reportUnfollowLocation,

};

// pingInterval: 60000,