import "./LocationList.css";
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
import authService from "../../../Services/AuthService";


function LocationList(): JSX.Element {
  const [locations, setLocations] = useState<LocationsModel[]>([]);
  const [, setFollowers] = useState<FollowerModel[]>([])
  const getUserInfo = store.getState().authState.user;
  const userId = getUserInfo.userId ;
  interceptorService.createInterceptors();
  const isAdmin = authService.heHasAAdmin()
    
  useEffect(() => {

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
  },[userId]);
    
  return (
    <div className="LocationList">        
      {!isAdmin && <TotalUserFollow/>}
      {locations.length === 0 && <Loading />}     
      <br />      
      {locations.map(l => <LocationsCard key={l.locationId} location={l}/>)}
    </div>
  );
}

export default LocationList;
