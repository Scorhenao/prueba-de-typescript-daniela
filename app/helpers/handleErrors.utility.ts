import { Request, Response } from "express";
import { mapErrorToResponse } from "./errorMapping.utility";

export const handleError = (res:Response, req:Request, error:Error) =>{
    const {statusCode,message,data} = mapErrorToResponse(error)
    return res.status(statusCode).json({status:statusCode,message,data})
} 