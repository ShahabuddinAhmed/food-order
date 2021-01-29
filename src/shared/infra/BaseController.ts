import { Request, Response } from "express";

export abstract class BaseController {

    protected abstract executeImpl(req: Request, res: Response): Promise<void | any>;

    public async execute(req: Request, res: Response): Promise<void> {
        try {
            await this.executeImpl(req, res);
        } catch (err) {
            console.log("[BaseController]: Uncaught controller error");
            console.log(err);
            this.fail(res, "An unexpected error occurred");
        }
    }

    public static jsonResponse(res: Response, code: number, message: string | string[] | any): Response<any> {
        return res.status(code).json(message);
    }

    public ok<T>(res: Response, dto?: T): Response<any> {
        if (dto) {
            res.type("application/json");
            return res.status(200).json(dto);
        } else {
            return res.sendStatus(200);
        }
    }

    public created(res: Response): Response<any> {
        return res.sendStatus(201);
    }

    public clientError(res: Response, data?: string | string[] | any): Response<any> {
        if (data.error instanceof Error) {
            return res.status(400).json({
                ...data,
                error: data.error.message
            });
        }
        return res.status(400).json(data);
    }

    public unauthorized(res: Response, message?: string | any): Response<any> {
        return BaseController.jsonResponse(res, 401, message ? message : "Unauthorized");
    }

    public paymentRequired(res: Response, message?: string | any): Response<any> {
        return BaseController.jsonResponse(res, 402, message ? message : "Payment required");
    }

    public forbidden(res: Response, message?: string | any): Response<any> {
        return BaseController.jsonResponse(res, 403, message ? message : "Forbidden");
    }

    public notFound(res: Response, message?: string | any): Response<any> {
        return BaseController.jsonResponse(res, 404, message ? message : "Not found");
    }

    public conflict(res: Response, message?: string | any): Response<any> {
        return BaseController.jsonResponse(res, 409, message ? message : "Conflict");
    }

    public tooMany(res: Response, message?: string | any): Response<any> {
        return BaseController.jsonResponse(res, 429, message ? message : "Too many requests");
    }

    public todo(res: Response): Response<any> {
        return BaseController.jsonResponse(res, 400, "TODO");
    }

    public fail(res: Response, data: string | any): Response<any> {
        if (data.error instanceof Error) {
            return res.status(500).json({
                ...data,
                error: data.error.message
            });
        }
        return res.status(500).json(data);
    }
}