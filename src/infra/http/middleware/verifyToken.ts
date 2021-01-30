import { NextFunction, Request, Response } from "express";
import { User } from "../../../modules/user/domain/entity/user";


export const authenticated = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
        return res.status(401).send({
            code: "UNAUTHORIZED",
            message: "Please provide a valid token",
            data: null,
            errors: []
        });
    }

    const token = authorizationHeader.split(" ")[1];
    try {
        const user = await User.verifyAuthToken(token);
        res.locals.user = user;
        next();
    } catch (err) {
        return res.status(401).send({
            code: "UNAUTHORIZED",
            message: "Please provide a valid token",
            data: null,
            errors: []
        });
    }
};