import fs from "fs/promises"
import { NextFunction, Request, Response } from "express";

const filePath = "./src/1-assets/log/log.txt";
const RequestIp = require('@supercharge/request-ip')


async function logRequest(request: Request, response: Response, next: NextFunction){
//    fetch("http://api.ipify.org/?format=json")
//    .then(results => results.json())
//    .then( data => console.log(data.ip))
    const ip = RequestIp.getClientIp(request)
    const useIp = ip
    
    const now = new Date();
    const method = request.method;
    const route = request.originalUrl;
    const date = `Time: ${now.toLocaleString()}, Method: ${method}, Route: ${route}, IP: ${ip}\n\n`;
    await fs.appendFile(filePath,date)

    next();
};

export default logRequest;
