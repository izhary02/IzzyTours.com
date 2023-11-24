import axios from "axios";
import store from "../Redux/Store";
import config from "../Utils/Config";
import FollowerModel from "../Models/FollowerModel";
import {fetchAllUserFollowerAction, fetchAllUsersFollowersAction, fetchAllFollowersAction, fetchLocationsFollowersAction } from "../Redux/FollowerState";
import UserModel from "../Models/UserModel";
import LocationsModel from "../Models/LocationModel";


class FollowerService {

    public async getAllFollowers():Promise<FollowerModel[]> {  
        let allFollowers = store.getState().followersState.allFollowers;
        if (allFollowers.length === 0) {
            const response = await axios.get<FollowerModel[]>(config.followersUrl);
            allFollowers = response.data;
            store.dispatch(fetchAllFollowersAction(allFollowers)); 
        }
        return allFollowers;
        }

    public async getAllUsersFollowersNow():Promise<FollowerModel[]> {  
            const response = await axios.get<FollowerModel[]>(config.usersFollowersUrl);           
            let allUsersFollowers = response.data;
            store.dispatch(fetchAllUsersFollowersAction(allUsersFollowers)); 
        return allUsersFollowers;
    }
    public async getAllUsersFollowers():Promise<FollowerModel[]> {  
        let allUsersFollowers = store.getState().followersState.allUsersFollowers;
        if (allUsersFollowers.length === 0) {
            const response = await axios.get<FollowerModel[]>(config.usersFollowersUrl);           
            allUsersFollowers = response.data;
            store.dispatch(fetchAllUsersFollowersAction(allUsersFollowers)); 
        }
        return allUsersFollowers;
    }


   
    public async getAllFollowerOfOneUser(userId:UserModel):Promise<FollowerModel[]> {
        let followers = store.getState().followersState.userFollower;
        if (followers.length === 0) {
            const response = await axios.get<FollowerModel[]>(config.followersUrl+userId.userId);
            followers = response.data;
            store.dispatch(fetchAllUserFollowerAction(followers));
        }
        return followers;
    }


    public async triggerFollower(follower: FollowerModel, isDeleted: Boolean):Promise<void> {
        await axios.post<FollowerModel>(config.followersUrl,{...follower,isDeleted});   
    }

    public async isHeFollow(followers:FollowerModel[],location:LocationsModel):Promise<boolean>{
        const heFollow = await followers.find(f => f.locationId === location.locationId)
        if (heFollow) {
         return true 
        }
        else{
        return false
    }}

    public async getAmountOfTheSameLocation(userId:number):Promise<number>{
        const followers = store.getState().followersState.locationsFollowers
        const getTheLocations = await followers.filter(l => l.locationId === userId)
        const theAmount = getTheLocations.length
        return theAmount
    }
    public async getAmountOfLocation(follower:FollowerModel[],userId:number):Promise<number>{  
        const getTheLocations = await follower.filter(l => l.locationId === userId)
        const theAmount = getTheLocations.length
        return theAmount
    }

    public async getAmountOfTheSameLocationWithoutId():Promise<FollowerModel[]>{
       let AmountOfTheSameLocation = store.getState().followersState.locationsFollowers;
       if (AmountOfTheSameLocation.length === 0 ){ 
        const response = await axios.get<FollowerModel[]>(config.followersUrl)
        AmountOfTheSameLocation = response.data
        store.dispatch(fetchLocationsFollowersAction(AmountOfTheSameLocation))

       }
        return AmountOfTheSameLocation
    }
    public async sumEachLocation(AllUsersFollowers:FollowerModel[],AmountOfTheSameLocation:FollowerModel[]):Promise<FollowerModel[]>{
       const allTheLocations = AmountOfTheSameLocation
       const amountOfEachLocation = AllUsersFollowers
       const amountOfFollowerOfAllLocations = 0
       const allTheFollows = <any[]>[] 
       amountOfEachLocation.forEach((amountOfEachLocation)=>{
        allTheFollows.push (amountOfEachLocation.userId)
    })
      const sumTheFollowers = allTheFollows.reduce((accumulator,currentValue) => accumulator + currentValue,amountOfFollowerOfAllLocations);
       if (allTheLocations.length == sumTheFollowers){}
        else {
            await this.getAllUsersFollowersNow()
        };
        return amountOfEachLocation

    }
}

const followerService = new FollowerService();

export default followerService;