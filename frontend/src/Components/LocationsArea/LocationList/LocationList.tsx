import { useEffect, useState } from "react";
import FollowerModel from "../../../Models/FollowerModel";
import LocationsModel from "../../../Models/LocationModel";
import Role from "../../../Models/RoleModel";
import UserModel from "../../../Models/UserModel";
import store from "../../../Redux/Store";
import followerService from "../../../Services/FollowerService";
import interceptorService from "../../../Services/InterceptorService";
import locationsService from "../../../Services/LocationsService";
import notifyService from "../../../Services/NotifyService";
import TotalUserFollow from "../../FollowerArea/TotalUserFollow/TotalUserFollow";
import Loading from "../../SharedArea/Loading/Loading";
import LocationsCard from "../LocationsCard/LocationsCard";
import "./LocationList.css";

function LocationList(): JSX.Element {
    const [user, setUser] = useState<UserModel>();
    const [role, setRole] = useState<boolean>();
    interceptorService.createInterceptors();
    const [locations, setLocations] = useState<LocationsModel[]>([]);
    const [followers, setFollowers] = useState<FollowerModel[]>([])
    const getUserInfo = store.getState().authState.user;
    const userId = getUserInfo.userId ;
    
    
    useEffect(()=>{
        const getUserInfo = store.getState().authState.user;
        const takeTheRole = getUserInfo.role
        const isAdmin = takeTheRole === Role.Admin
        setRole(isAdmin)
     },[]);
    useEffect(() => {
        setUser(getUserInfo);
        locationsService.getAllLocations(userId)
        .then(locations => setLocations(locations))
        // .catch(err =>  notifyService.error(err));
        .catch(err =>  console.log("locationsService",err));
        
        followerService.getAmountOfTheSameLocationWithoutId()
        .then(follower=>setFollowers(follower))
        .catch(err =>  console.log("followerService",err));
        // .catch(err =>  notifyService.error(err)); 
        
        
        const unsubscribe = store.subscribe(() => {
            
            const dupLocations = [...store.getState().locationsState.locations];
            setLocations(dupLocations);
            
            const dupFollowers = [...store.getState().followersState.locationsFollowers];
            setFollowers(dupFollowers);
        });
        return()=> unsubscribe();
    }, []);
    
    
    return (
        <div className="LocationList">
            
		 {!role && <TotalUserFollow/>}

{locations.length === 0 && <Loading />}     
<br />      

{locations.map(l => <LocationsCard key={l.locationId} location={l}/>)}

        </div>
    );
}

export default LocationList;
