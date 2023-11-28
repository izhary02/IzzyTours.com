import "./LocationsCard.css";
import FollowerModel from "../../../Models/FollowerModel";
import LocationsModel from "../../../Models/LocationModel";
import FollowerService from "../../../Services/FollowerService";
import notifyService from "../../../Services/NotifyService";
import followerService from "../../../Services/FollowerService";
import dayjs from 'dayjs'
import config from "../../../Utils/Config";
import store from "../../../Redux/Store";
import { NavLink } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Checkbox} from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import AmountOfFollower from "../../FollowerArea/AmountOfFollower/AmountOfFollower";
import authService from "../../../Services/AuthService";


interface LocationCardProps {
   location:LocationsModel;
}
const NoOfCharac = 30

function LocationsCard(props: LocationCardProps):JSX.Element{

  const infoContent = props.location.locationsInfo
  const getUserInfo = store.getState().authState.user;
  const displayText = infoContent.slice(0,NoOfCharac) + "...";
  const locationInfo = props.location
  const [, setFollower] = useState<FollowerModel[]>([]);
  const [icon, setIcon] = useState<boolean>(false);
  const [checked, setChecked] = React.useState({icon});
  const isAdmin = authService.heHasAAdmin()

  
        

  useEffect(() => {
    followerService.getAllFollowerOfOneUser(getUserInfo)
    .then(followers => {setFollower(followers)
    followerService.isHeFollow(followers,locationInfo)
    .then(icons => setIcon(icons))})
    .catch(err => alert(err.message));

    const unsubscribe = store.subscribe(()=>{
      const dupUserFollower = [...store.getState().followersState.userFollower]; 
      setFollower(dupUserFollower)
    });
    return()=> unsubscribe();
  },[getUserInfo,locationInfo]);
      
  async function handleChange (event: React.ChangeEvent<HTMLInputElement>):Promise<void>{   
    const userId = getUserInfo.userId ;
    const locationId = props.location.locationId;
    const follower = new FollowerModel();
    follower.userId = userId
    follower.locationId = locationId;
   
    setChecked({
      ...checked,
      [event.target.name]: event.target.checked});
      if(event.target.checked === true){ 
        try{  
          await FollowerService.triggerFollower(follower,false);
          notifyService.success("Follow")
          setIcon(true) 
         }
        catch(err:any){ notifyService.error(err)};
      }
      else if(event.target.checked === false){
        try{          
          await FollowerService.triggerFollower(follower,true);
          notifyService.success("unFollow");
          setIcon(false)
         }
        catch(err:any){ notifyService.error(err)}};
   }

  return (
    <div className="LocationsCard Box">
      <div>
        {!isAdmin && (    
          <div className="followButton">
            <Checkbox icon={<FavoriteBorder />}  checked={icon} onChange={handleChange} checkedIcon={<Favorite color="error" />} 
              inputProps={{ 'aria-label': 'controlled' }}/>
          </div>           
        )}     
        <NavLink to={"/locations/Details/" + props.location.locationId}>
          <div className="Container">
            <div>
              <img src={config.locationImagesUrl + props.location.imageName} alt={props.location.imageName} />
            </div>
            <span className="Country">{props.location.locationName} </span>

            <br />
            <span className="Info"> Info: </span><span className="TheInfo">{displayText}</span>
            <br />
            <br />
            <span className="Price">Price:</span>&nbsp;<span className="ThePrice"> ${props.location.price}</span>
            &nbsp;
            <br />
            <span className="TheDate">{dayjs(props.location.locationsStartDate).format('DD/MM/YYYY')} - {dayjs(props.location.locationsEndDate).format('DD/MM/YYYY')}</span>
            <div className="Bottom-left">
              <AmountOfFollower location={props.location}/>    
            </div>   
          </div>
         </NavLink>
      </div>
    </div>
  );
}
   
export default LocationsCard;
   
