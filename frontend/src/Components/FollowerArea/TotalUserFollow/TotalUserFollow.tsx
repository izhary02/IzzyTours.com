import { useEffect, useState } from "react";
import store from "../../../Redux/Store";
import followerService from "../../../Services/FollowerService";
import "./TotalUserFollow.css";

function TotalUserFollow(): JSX.Element {
 const [amount,setAmount] = useState<number>();
 const userInfo = store.getState().authState.user;

    useEffect(()=> {
        followerService.getAllFollowerOfOneUser(userInfo)
        .then(followers => setAmount(followers.length))
        .catch(err => alert(err.message));
 
        const unsubscribe = store.subscribe(() =>{
         const dupFollowersLength = [...store.getState().followersState.userFollower];
         setAmount(dupFollowersLength.length)       
        })
        return () => {
         unsubscribe();
        }
    },[]);
    return (
        <div className="TotalUserFollow">
			<span>Your Total Follow: {amount} </span>
        </div>
    );
}


export default TotalUserFollow;
