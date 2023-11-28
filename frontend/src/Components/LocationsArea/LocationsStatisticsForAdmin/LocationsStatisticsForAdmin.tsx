import { useEffect, useState } from "react";
import LocationsModel from "../../../Models/LocationModel";
import UserModel from "../../../Models/UserModel";
import store from "../../../Redux/Store";
import interceptorService from "../../../Services/InterceptorService";
import locationsService from "../../../Services/LocationsService";
import notifyService from "../../../Services/NotifyService";
import Loading from "../../SharedArea/Loading/Loading";
import userService from "../../../Services/UserService";
import FollowerModel from "../../../Models/FollowerModel";
import followerService from "../../../Services/FollowerService";
import BarChart from "../../FollowerArea/BarChart/BarChart";

function LocationsStatisticsForAdmin(): JSX.Element {
  interceptorService.createInterceptors();
  const [users, setUsers] = useState<UserModel[]>([]);
  const [allFollower, setAllFollower] = useState<FollowerModel[]>([]);
  const [locations, setLocations] = useState<LocationsModel[]>([]);
  const [followers, setFollowers] = useState<FollowerModel[]>([])
  const [, setSumFollowers] = useState<FollowerModel[]>([])
  const getUserInfo = store.getState().authState.user;
  const userId = getUserInfo.userId ;
  const getAllLocations = store.getState().locationsState.locations;


  useEffect(()=>{   
    setLocations(getAllLocations)     
    userService.getAllUsers()
    .then(users => setUsers(users))
    .catch(err =>  notifyService.error(err));
   
   locationsService.getAllLocations(userId)
   .then(locations => setLocations(locations))
   .catch(err =>  notifyService.error(err));

   followerService.getAmountOfTheSameLocationWithoutId()
   .then(follower=>setFollowers(follower))
   .catch(err =>  notifyService.error(err)); 
          
   const unsubscribe = store.subscribe(() => {
     const dupLocations = [...store.getState().locationsState.locations];
     setLocations(dupLocations);
    
     const dupUsers = [...store.getState().usersState.users];
     setUsers(dupUsers);
   });

   return() => {
     unsubscribe();
   };
 },[getAllLocations,userId]);
    
 useEffect(() =>{
   followerService.getAllUsersFollowers()
   .then(allUsersFollowers => setAllFollower(allUsersFollowers))
   .catch(err => notifyService.error(err));
        
   followerService.getAmountOfTheSameLocationWithoutId()
   .then(follower=>setFollowers(follower))
   .catch(err =>  notifyService.error(err)); 

   followerService.sumEachLocation(allFollower,followers)
   .then(sumFollowers=>setSumFollowers(sumFollowers))
   .catch(err =>  notifyService.error(err)); 

   const unsubscribe = store.subscribe(() => {
     const dupFollowers = [...store.getState().followersState.allUsersFollowers]
     setAllFollower(dupFollowers);
   });
   return() => {
     unsubscribe();
   };       
 },[allFollower,followers]); 
 
 useEffect(() =>{
   followerService.sumEachLocation(allFollower,followers)
   .then(sumFollowers=>setSumFollowers(sumFollowers))
   .catch(err =>  notifyService.error(err)); 
  },); 
    
  return (
    <div className="LocationsStatisticsForAdmin">
      {locations.length === 0 && <Loading />}
      <h1>LocationsBar</h1>
      <BarChart location={locations} allFollower ={allFollower} eachFollower={followers}  users={users}/>  
      <br /> 
      <br /> 
      <br /> 
    </div>
  );
}

export default LocationsStatisticsForAdmin;
