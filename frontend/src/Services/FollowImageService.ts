import { useEffect, useState } from "react";
import FollowerModel from "../Models/FollowerModel";
import LocationsModel from "../Models/LocationModel"
import UserModel from "../Models/UserModel"
import store from "../Redux/Store";
import followerService from "./FollowerService";
import notifyService from "./NotifyService";

class FollowImageService{


    // public async isHiFollow(userId:UserModel,locationId:LocationsModel): Promise<FollowerModel[]> {
    //     const [followers,setFollowers] = useState<FollowerModel[]>();
        
    //     useEffect(()=> {
    //         followerService.getAllFollowers()
    //         .then(followers => followers.map(f => f.userId === userId && f.locationId === locationId))
    //         // .then(followers => setFollowers(followers))
    //         .catch(err =>  notifyService.error(err));
    //     }, []);
        
    //     return followers
    // }
}

const followImageService = new FollowImageService()
export default followImageService