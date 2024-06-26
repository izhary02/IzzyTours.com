import Role from "../4-models/role-model";
import { ForbiddenError } from "../4-models/error-model";
import cyber from "../2-utils/cyber";
import { NextFunction, Request, Response } from "express";

async function verifyAdmin(request: Request, response: Response, next: NextFunction) {
  try{
    await cyber.verifyToken(request);
    const role = cyber.getTokenRole(request);
    if(role !== Role.Admin){
      const err = new ForbiddenError("You are not Admin!");
      next(err);
    }
    next();
  }
  catch(err: any){
    next(err);
  }
}

export default verifyAdmin;