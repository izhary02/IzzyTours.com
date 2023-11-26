import "./Layout.css";
import { useEffect, useState } from "react";
import Menu from "../Menu/Menu";
import Header from "../Header/Header";
import store from "../../../Redux/Store";
import Role from "../../../Models/RoleModel";
import UserModel from "../../../Models/UserModel";
import userService from "../../../Services/UserService";
import authService from "../../../Services/AuthService";
import socketService from "../../../Services/SocketService";
import followerService from "../../../Services/FollowerService";
import locationsService from "../../../Services/LocationsService";
import Routing from "../Routing/Routing";
import RoutingForUser from "../Routing/RoutingForUser";
import RoutingForUnknownUsers from "../Routing/RoutingForUnknownUsers";


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
 