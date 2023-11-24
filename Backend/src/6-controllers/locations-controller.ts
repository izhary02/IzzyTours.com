import express, {Request,Response,NextFunction} from "express";
import verifyLoggedIn from "../3-middleware/verify-logged-in";
import LocationModel from "../4-models/location-model";
import logic from "../5-logic/locations-logic";
import path from "path";
import fs from "fs";
import { RouteNotFoundError } from "../4-models/error-model";
import verifyAdmin from "../3-middleware/verify-admin";



const router = express.Router();


// GET http://localhost:3001/api/locations/:userId
router.get("/locations/:userId([0-9]+)",async (request: Request, response: Response, next: NextFunction) => {
    try {
        const userId =+ request.params.userId
        const locations = await logic.getAllLocations(userId);
        response.json(locations);
    }
    catch (err: any) {
        next(err);
    }
});

// GET http://localhost:3001/api/location/:locationId
router.get("/location/:locationId([0-9]+)",async (request: Request, response: Response, next: NextFunction) => {
    try {
        const locationId =+ request.params.locationId
        const locations = await logic.getOneLocationAmountOfTime(locationId);
        response.json(locations);
    }
    catch (err: any) {
        next(err);
    }
});


// GET http://localhost:3001/api/locations/details/:locationId
router.get("/locations/details/:locationId([0-9]+)", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const locationId =+ request.params.locationId;
        const location = await logic.getDetailsLocation(locationId);
        response.json(location);
    }
    catch (err: any) {
        next(err);
    }
});


// POST http://localhost:3001/api/locations
router.post("/locations",async (request: Request, response: Response, next: NextFunction) => {
    try {
        request.body.image = request.files?.image;
        
        const location = new LocationModel(request.body);
        const addedLocation = await logic.addLocation(location);
        response.status(201).json(addedLocation);
    }
    catch (err: any) {
        next(err);
    }
});

// GET http://localhost:3001/api/location/image/:imageName
router.get("/locations/images/:imageName", async (request: Request, response: Response, next: NextFunction) => {

    try {
        const imageName = request.params.imageName ;
        
        const absolutePath = path.join(__dirname, "..", "1-assets", "images", imageName);
        if(!fs.existsSync(absolutePath)){
            throw new RouteNotFoundError(request.method, request.originalUrl);
        }
          
        response.sendFile(absolutePath);
       
    }
    catch (err: any) {
        next(err);
    }
});

//PUT http://localhost:3001/api/locations/:locationId
router.put("/locations/:locationId([0-9]+)", async (request:Request, response:Response, next:NextFunction) => {
    try {
        request.body.locationId = request.params.locationId
        request.body.image = request.files?.image;
        
        const location = new LocationModel(request.body);
        const updatedLocation = await logic.updateFullLocation(location);
        response.json(updatedLocation);
    } catch (err:any) {
        next(err)
    }
 });
 
 
 //PATCH http://localhost:3001/api/locations/:locationId
 router.patch("/locations/:locationId([0-9]+)",  async (request:Request, response:Response, next:NextFunction) => {
     try {
         request.body.locationId = request.params.locationId
        request.body.image = request.files?.image;
        
        const location = new LocationModel(request.body);
        const updatedLocation = await logic.updatePartialLocation(location);
        response.json(updatedLocation);
    }catch(err: any){
      next(err)
     }
 });
 
 
 //DELETE http://localhost:3001/api/locations/:locationId
 router.delete("/locations/:locationId", verifyAdmin, async (request:Request, response:Response, next:NextFunction) => { 
    try {
       const locationId =+ request.params.locationId;
    await logic.deleteLocation(locationId);
    response.sendStatus(204);
 }
 catch(err: any){
    next(err)
 }
 });

export default router;



// ,[verifyLoggedIn]