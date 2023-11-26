import { Request } from "express";
import jwt from "jsonwebtoken";
import { UnauthorizedError } from "../4-models/error-model";
import Role from "../4-models/role-model";
import UserModel from "../4-models/user-model";
import crypto from "crypto"

const secret = "Let the fUn begIn!";
const salt = "Look at me, I'm Salt Bae";
function hash(plainText:string):string{
  if(!plainText) return null;
  const hashText = crypto.createHmac("sha512",salt).update(plainText).digest("hex");
  return hashText;
}

function getNewToken(user:UserModel):string{
  const payload = {user};
  const token = jwt.sign(payload,secret,{expiresIn:"3h"});
  return token
}

function verifyToken(request:Request):Promise<boolean>{
  return new Promise<boolean>((resolve, reject) => {
    const header = request.headers.authorization;
    if(!header){
      reject(new UnauthorizedError("No token sent"));
      return;
    }

    const token = header.substring(7)
    if(!token){
      reject(new UnauthorizedError("No token sent"));
      return;
    }

    jwt.verify(token, secret, (err, payload) => {
      if(err){
        reject(new UnauthorizedError("Invalid or expired token"));
        return;
      }
      resolve(true)
    })
  })
}

function getTokenRole(request:Request):Role{
  const header = request.headers.authorization;
  const token = header.substring(7)
  const payload = jwt.decode(token)
  const user = (payload as any).user;
  return user.role;
}

export default {
  getNewToken,
  verifyToken,
  getTokenRole,
  hash,
}