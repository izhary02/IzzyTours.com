import { OkPacket } from "mysql";
import dal from "../2-utils/dal";
import { ResourceNotFoundError, ValidationError } from "../4-models/error-model";
import FollowerModel from "../4-models/follower-model";
import UserModel from "../4-models/user-model";
import socketLogic from "./socket-logic";



async function getAllFollowers(): Promise<FollowerModel[]> {
    const sql = `SELECT * FROM follower ORDER BY follower.userId ASC`;
    const follower = await dal.execute(sql);
    return follower;
    
}

async function getAllFollowersAndLocations(): Promise<FollowerModel[]> {
    const sql = `SELECT locationId,COUNT(locationId)AS userId FROM follower GROUP BY locationId`;
    const follower = await dal.execute(sql);
    return follower;
    
}

async function getOneFollower(followerLocation:FollowerModel): Promise<FollowerModel[]> {
    const sql = `SELECT * FROM follower WHERE locationId = ? AND userId = ?`;
    const follower = await dal.execute(sql,[followerLocation.locationId,followerLocation.userId]);
    return follower;
    
}
async function getAllFollowerOfOneUser(followerLocation:FollowerModel): Promise<FollowerModel[]> {
    const sql = `SELECT * FROM follower WHERE userId = ?`;
    const follower = await dal.execute(sql,[followerLocation.userId]);
    return follower;
    
}


async function addFollower(follower:FollowerModel): Promise<void> {

    const errors = follower.validatePostFollower();
    if (errors) {
        throw new ValidationError(errors);
    }
    const sql =`INSERT INTO follower (locationId,userId) VALUES(?,?)`;
    const result = await dal.execute(sql,[follower.locationId,follower.userId]);
    socketLogic.reportFollowerLocation(follower)
    
}

async function deleteFollower(followerLocation:FollowerModel):Promise<void> {
    const sql = `DELETE FROM follower WHERE locationId = ? AND userId = ?`;
    const result = await dal.execute(sql,[followerLocation.locationId,followerLocation.userId]);
    if(result.affectedRows === 0 ){
        throw new ResourceNotFoundError(followerLocation.locationId)
    }
   socketLogic.reportUnfollowLocation(followerLocation)
}

export default {
    addFollower,
    getAllFollowers,
    deleteFollower,
    getOneFollower,
    getAllFollowerOfOneUser,
    getAllFollowersAndLocations
};