import "./LocationList.css";
import Role from "../../../Models/RoleModel";
import UserModel from "../../../Models/UserModel";
import FollowerModel from "../../../Models/FollowerModel";
import LocationsModel from "../../../Models/LocationModel";
import Loading from "../../SharedArea/Loading/Loading";
import TotalUserFollow from "../../FollowerArea/TotalUserFollow/TotalUserFollow";
import interceptorService from "../../../Services/InterceptorService";
import locationsService from "../../../Services/LocationsService";
import followerService from "../../../Services/FollowerService";
import notifyService from "../../../Services/NotifyService";
import LocationsCard from "../LocationsCard/LocationsCard";
import { useEffect, useState } from "react";
import store from "../../../Redux/Store";


function LocationList(): JSX.Element {
  const [user, setUser] = useState<UserModel>();
  const [role, setRole] = useState<boolean>();
  const [locations, setLocations] = useState<LocationsModel[]>([]);
  const [followers, setFollowers] = useState<FollowerModel[]>([])
  const getUserInfo = store.getState().authState.user;
  const userId = getUserInfo.userId ;
  interceptorService.createInterceptors();
    
    
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
    .catch(err =>  notifyService.error(err));
       
    followerService.getAmountOfTheSameLocationWithoutId()
    .then(follower=>setFollowers(follower))
    .catch(err =>  notifyService.error(err)); 
        
    const unsubscribe = store.subscribe(() => {        
      const dupLocations = [...store.getState().locationsState.locations];
      setLocations(dupLocations);
            
      const dupFollowers = [...store.getState().followersState.locationsFollowers];
      setFollowers(dupFollowers);
    });
    return()=> unsubscribe();
  },[]);
    
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
