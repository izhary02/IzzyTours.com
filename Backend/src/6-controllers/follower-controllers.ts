import express, {Request,Response,NextFunction} from "express";
import verifyLoggedIn from "../3-middleware/verify-logged-in";
import FollowerModel from "../4-models/follower-model";
import logic from "../5-logic/follower-logic";



const router = express.Router();


// GET http://localhost:3001/api/follower
router.get("/follower", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const followers = await logic.getAllFollowers();
        response.json(followers);
    }
    catch (err: any) {
        next(err);
    }
});

// GET http://localhost:3001/api/follower/amountFollower
router.get("/follower/amountFollower", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const followers = await logic.getAllFollowersAndLocations();
        response.json(followers);
    }
    catch (err: any) {
        next(err);
    }
});


// GET http://localhost:3001/api/follower/:userId/:locationId
router.get("/follower/:userId([0-9]+)/:locationId([0-9]+)", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const userId =+ request.params.userId;
        const locationId =+ request.params.locationId;
        request.body = request.params
        const follow = new FollowerModel(request.body)
        // console.log(follow);
        
        const location = await logic.getOneFollower(follow);
        response.json(location);
    }
    catch (err: any) {
        next(err);
    }
});

// GET http://localhost:3001/api/follower/:userId
router.get("/follower/:userId([0-9]+)", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const userId =+ request.params.userId;
        request.body = request.params
        const follow = new FollowerModel(request.body)
        // console.log(follow);
        
        const location = await logic.getAllFollowerOfOneUser(follow);
        response.json(location);
    }
    catch (err: any) {
        next(err);
    }
});

// POST http://localhost:3001/api/follower
router.post("/follower",verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const { body } = request;
        const { isDeleted } = body;
        const follower = new FollowerModel(body);
        console.log(JSON.stringify(body.isDeleted));
        
        if(body.isDeleted){
            await logic.deleteFollower(follower);
            response.status(201).json("deleted");
        } else {
            const addedFollower = await logic.addFollower(follower);
            response.status(201).json(addedFollower);
        }
    }
    catch (err: any) {
        next(err);
    }
});
router.delete("/follower",verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const { body } = request;
        const { isDeleted } = body;
        const follower = new FollowerModel(body);
        if(body.isDeleted){
            await logic.deleteFollower(follower);
            response.status(201).json("deleted");
        } else {
            const addedFollower = await logic.addFollower(follower);
            response.status(201).json(addedFollower);
        }
    }
    catch (err: any) {
        next(err);
    }
});

 //DELETE http://localhost:3001/api/follower/:userId/:locationId
 router.delete("/follower/:userId([0-9]+)/:locationId([0-9]+)",verifyLoggedIn, async (request:Request, response:Response, next:NextFunction) => { 
    try {
        // const userId =+ request.params.userId;
        // const locationId =+ request.params.locationId;
        request.body = request.params
        const follow = new FollowerModel(request.body);
    await logic.deleteFollower(follow);
    response.sendStatus(204);
 }
 catch(err: any){
    next(err)
 }
 });

export default router;

