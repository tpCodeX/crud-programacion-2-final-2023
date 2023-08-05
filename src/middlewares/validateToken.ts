import { Request, Response,NextFunction } from "express";
import UserHelper from "../helpers/userHelper";

const helper=new UserHelper();
export const authRequired=async (req:Request,res:Response,next:NextFunction)=>{
    const {token} = req.cookies;

    if(!token){
        res.status(401).json({message:"no token"})
    }
    const isVerificado=await helper.verifyToken(token);
    req.body={...req.body, isVerificado: isVerificado};
    next()

}