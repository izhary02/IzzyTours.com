import { useEffect, useState } from "react";
import UserModel from "../../../Models/UserModel";
import store from "../../../Redux/Store";
import Header from "../Header/Header";
import Menu from "../Menu/Menu";
import Routing from "../Routing/Routing";
import RoutingForUnknownUsers from "../Routing/RoutingForUnknownUsers";
import "./Layout.css";
import Role from "../../../Models/RoleModel";
import RoutingForUser from "../Routing/RoutingForUser";
import authService from "../../../Services/AuthService";
import socketService from "../../../Services/SocketService";
import locationsService from "../../../Services/LocationsService";
import userService from "../../../Services/UserService";
import followerService from "../../../Services/FollowerService";

function Layout(): JSX.Element {
    const [role, setRole] = useState<boolean>(false);
    const [user, setUser] = useState<UserModel>();

 
    window.onunload = () => {
        window.localStorage.clear()
        authService.logout();
            socketService.disconnect();
            locationsService.logout();
            followerService.logout();
            userService.logout();
        console.log("Layout");
     }


        useEffect(()=>{
            const TheUser = store.getState().authState.user
        setUser(TheUser);
        const unsubscribe = store.subscribe(()=>{
        const DupTheUser = store.getState().authState.user;
        setUser(DupTheUser)  
        if(DupTheUser){
            const TakeTheDupRole = DupTheUser.role
            const IsItAdmin = TakeTheDupRole === Role.Admin
            setRole(IsItAdmin);
        }
        else{setRole(false)}
        
    });
    return ()=> unsubscribe();

},[]);

    return (
        <div className="Layout">
            {role===false &&user && <div className="Userdiv">
            <header><Header /></header>
           <main><RoutingForUser/> </main>
           <footer>Footer</footer>
            </div>}
            {role===true&& <div className="Admindiv">
            <header><Header /></header>
           <nav><Menu/></nav>
           <main><Routing/> </main>
           <footer>Footer</footer>
            </div>}
            {!user && <div className="Nandiv">
            <header><Header /></header>
            <main><RoutingForUnknownUsers/></main>
            <footer>Footer</footer>
             </div>}
        </div>
    );
}

export default Layout;
 