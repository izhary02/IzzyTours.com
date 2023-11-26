import { NextFunction, Request, Response } from "express";

async function preventGarbage(request: Request, response: Response, next: NextFunction){  
  for(const prop in request.body){
    if(typeof request.body[prop] === "string" && request.body[prop].length >10000){
      response.status(400).send("Data too long");
      return;
    }
  }
  next();
};

export default preventGarbage;