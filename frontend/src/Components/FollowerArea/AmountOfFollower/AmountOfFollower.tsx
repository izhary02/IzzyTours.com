import { useEffect, useState } from "react";
import LocationsModel from "../../../Models/LocationModel";
import store from "../../../Redux/Store";
import followerService from "../../../Services/FollowerService";
import notifyService from "../../../Services/NotifyService";

interface AmountOfFollowerProps{
  location:LocationsModel;
}
function AmountOfFollower(props:AmountOfFollowerProps): JSX.Element {
  const [amount, setAmount] = useState<number>(); 
  const LocationId = props.location.locationId
 
  useEffect(()=> {       
    followerService.getAmountOfTheSameLocation(LocationId)
    .then(theAmount=>setAmount(theAmount))
    .catch(err =>  notifyService.error(err)); 
          
    const unsubscribe = store.subscribe(() =>{        
      followerService.getAmountOfTheSameLocation(LocationId)
      .then(theAmount=>setAmount(theAmount))
      .catch(err =>  notifyService.error(err));     
    });
    return () => {
      unsubscribe();
    }
  },[LocationId]);
    
  return (
    <div className="AmountOfFollower">
      <span>Total Followers: {amount} </span>
    </div>
  );
}

export default AmountOfFollower;
