
import express, { NextFunction, Request, Response } from "express";
import expressFileUpload from "express-fileupload"
import path from "path";
import cors from "cors";
import config from "./2-utils/config";
import catchAll from "./3-middleware/catch-all";
import logRequest from "./3-middleware/log-request";
import preventGarbage from "./3-middleware/prevent-garbage";
import sanitize from "./3-middleware/sanitize";
import { RouteNotFoundError } from "./4-models/error-model";
import socketLogic from "./5-logic/socket-logic";
import controller from "./6-controllers/controllers";
import authController from "./6-controllers/auth-controller";
import followerController from "./6-controllers/follower-controllers";
import locationsController from "./6-controllers/locations-controller";
import expressRateLimit from "express-rate-limit";
import { request } from "http";
import userController from "./6-controllers/user-controller";


const expressServer = express();
expressServer.use("/api/",expressRateLimit({
  windowMs:1000,
  max:60,
  message:"Are you a hacker?"
}));
// ============================ Don't need it right now ===================================
// expressServer.use((request: Request, response: Response, next: NextFunction)=>{
//   response.header("Access-Control-Allow-Origin","*");
//   response.header("Access-Control-Allow-Headers","Origin,X-Requested-With, Content-Type, Accept, Authorization");
//   if(request.method === "OPTIONS"){
//     response.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
//     return response.status(200).json({});
//   }
//   next()
// });
//========================================================================================
expressServer.use(cors());
expressServer.use(express.json());
expressServer.use(expressFileUpload());
expressServer.use(sanitize);
 // if (config.isDevelopment) expressServer.use(cors());
 // expressServer.use(cors({origin:["http://localhost:3000","http://localhost:3001"]}));

 expressServer.use(logRequest);
 expressServer.use(preventGarbage);
 


 
 expressServer.use("/api",authController);
 expressServer.use("/api", locationsController);
 expressServer.use("/api", followerController);
 expressServer.use("/api", userController);
 expressServer.use("/api", controller);
 
 expressServer.use(express.static(path.join(__dirname,"./7-frontend")))
 
 expressServer.use("*", (request: Request, response: Response, next: NextFunction) => {
   if(config.isDevelopment){
     const err = new RouteNotFoundError(request.method,request.originalUrl);
     next(err);
    }
    else{
      response.sendFile(path.join(__dirname,"./7-frontend/index.html"));
    }
  });
  
  expressServer.use(catchAll);
  
  // const httpServer = expressServer.listen(3001, () => console.log("Listening..."));
 const httpServer = expressServer.listen(config.port, () => console.log("Listening..."));
  socketLogic.init(httpServer)


