import { NextFunction, Request, Response } from "express";





async function priceCheck(request: Request, response: Response, next: NextFunction){
    const thePrice = request.body.price
    if(request.method === "POST" && thePrice === 0){
            response.status(400).send("Weeee - Free Vacation!");
            return;
        }
    if(request.method === "POST" && thePrice < 0){
            response.status(400).send("And Who`s Gonna Pay For That? ");
    }

    next();
};

export default priceCheck;