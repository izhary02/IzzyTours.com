import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import store from "../../../Redux/Store";
import "./AuthMenu.css";

function AuthMenu(): JSX.Element {
    const [user, setUser] = useState<UserModel>(); 
    useEffect(()=>{
        setUser(store.getState().authState.user);
        const unsubscribe = store.subscribe(()=>{
            setUser(store.getState().authState.user);   
        });
        return ()=> unsubscribe();
        },[]);

    return (
        <div className="AuthMenu">
            {user && <span>Hello &nbsp; {user.firstName} {user.lastName} &nbsp; <NavLink to="/logout">Logout</NavLink> </span>}
            {!user && <span>Hello Guest &nbsp;<NavLink to="/login">Login</NavLink> &nbsp; <NavLink to="/register">Register</NavLink> </span>}
        </div>
    );
}

export default AuthMenu;
