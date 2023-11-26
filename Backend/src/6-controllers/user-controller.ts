import express, {Request,Response,NextFunction} from "express";
import logic from "../5-logic/user-logic";
import UserModel from "../4-models/user-model";

const router = express.Router();

// GET http://localhost:3001/api/users
router.get("/users", async (request: Request, response: Response, next: NextFunction) => {
  try {
    const users = await logic.getAllUsers();
    response.json(users);
  }
  catch (err: any) {
    next(err);
  }
});

// GET http://localhost:3001/api/users/:usersId
router.get("/users/:usersId([0-9]+)", async (request: Request, response: Response, next: NextFunction) => {
  try {
    const usersId =+ request.params.usersId;
    const user = await logic.getOneUser(usersId);
    response.json(user);
  }
  catch (err: any) {
    next(err);
  }
});

//PUT http://localhost:3001/api/users/:userId
router.put("/users/:userId([0-9]+)", async (request:Request, response:Response, next:NextFunction) => {
  try {
    request.body.userId = request.params.userId     
    const user = new UserModel(request.body);
    const updatedUser = await logic.updateFullUser(user);
    response.json(updatedUser);
  } catch (err:any) {
    next(err)
  }
});
 
//PATCH http://localhost:3001/api/users/:userId
router.patch("/users/:userId([0-9]+)", async (request:Request, response:Response, next:NextFunction) => {
  try {
    request.body.userId = request.params.userId    
    const user = new UserModel(request.body);
    const updatedUser = await logic.updatePartialUser(user);
    response.json(updatedUser);
  }catch(err: any){
    next(err)
  }
}); 
 
//DELETE http://localhost:3001/api/users/:userId
router.delete("/users/:userId([0-9]+)", async (request:Request, response:Response, next:NextFunction) => { 
  try {
    const userId =+ request.params.userId;
    await logic.deleteUser(userId);
    response.sendStatus(204);
   }
  catch(err: any){
    next(err)
  }
});

export default router;
