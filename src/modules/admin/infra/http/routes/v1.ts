import express, { Router } from "express";
import { CreateUserController } from "../../../useCases/createUser/createUserController";
import { LoginUserController } from "../../../useCases/loginUser/loginUserController";
import { OrderUserController } from "../../../useCases/orderUser/orderUserController";
import { UpdateUserController } from "../../../useCases/updateUser/updateUserController";
import { DeleteUserController } from "../../../useCases/deleteUser/deleteUserController";
import { authenticated } from "../../../../../infra/http/middleware/verifyToken";


export const newUserRouter = (
    createUserController: CreateUserController, loginUserController: LoginUserController,
    orderUserContactController: OrderUserController, updateUserController: UpdateUserController,
    deleteUderController: DeleteUserController
): Router => {
    const contactRouter = express.Router();

    contactRouter.post("/create", (req, res) => createUserController.execute(req, res));
    contactRouter.post("/login", (req, res) => loginUserController.execute(req, res));
    contactRouter.post("/order", authenticated, (req, res) => orderUserContactController.execute(req, res));
    contactRouter.patch("/update", authenticated, (req, res) => updateUserController.execute(req, res));
    contactRouter.delete("/delete", authenticated, (req, res) => deleteUderController.execute(req, res));

    return contactRouter;
};