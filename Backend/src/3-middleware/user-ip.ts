import fs from "fs/promises"
import { NextFunction, Request, Response } from "express";

const filePath = "./src/1-assets/log/log.txt";
const RequestIp = require('@supercharge/request-ip');
async function expressMiddleware (request:Request, response:Response, next:NextFunction) {  
  request.ip = RequestIp.getClientIp(request)
  const date = `IP: ${request.ip}\n\n`;
  await fs.appendFile(filePath,date);      
  next();
};
    


export default expressMiddleware;