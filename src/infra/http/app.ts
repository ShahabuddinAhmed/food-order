import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";

import { initializeDBConnection } from "../db/sequelize";
import { newLogManager, newLogManagerStreamer } from "../logger/logger";

import { newUserRepo, newOrderRepo } from "../../modules/user/infra/repos";
import { newMenuRepo, newFoodRepo } from "../../modules/admin/infra/repos";
import { newCreateUserController, newCreateUserUseCase } from "../../modules/user/useCases/createUser";
import { newLoginContactController, newLoginContactUseCase } from "../../modules/user/useCases/loginUser";
import { newOrderController, newOrderUseCase } from "../../modules/user/useCases/orderUser";
import { newCreateOrderController, newCreateOrderUseCase } from "../../modules/user/useCases/createOrder";
import { newUpdateUserController, newUpdateUserUseCase } from "../../modules/user/useCases/updateUser";
import { newDeleteUserController, newDeleteUserUseCase } from "../../modules/user/useCases/deleteUser";
import { newUserRouter } from "../../modules/user/infra/http/routes/v1";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

(async () => {
    // initialize logger
    const logger = await newLogManager();
    const requestLogStreamer = await newLogManagerStreamer(logger);

    // initializing db connection
    await initializeDBConnection();

    // initializing repos 
    const userRepo = newUserRepo();
    const orderRepo = newOrderRepo();
    const menuRepo = newMenuRepo();
    const foodRepo = newFoodRepo();

    // initializing controller
    const userV1Router = await newUserRouter(
        newCreateUserController(
            newCreateUserUseCase(userRepo)
        ),
        newLoginContactController(
            newLoginContactUseCase(userRepo)
        ),
        newOrderController(
            newOrderUseCase(orderRepo)
        ),
        newUpdateUserController(
            newUpdateUserUseCase(userRepo)
        ),
        newDeleteUserController(
            newDeleteUserUseCase(userRepo)
        ),
        newCreateOrderController(
            newCreateOrderUseCase(orderRepo, foodRepo)
        )
    );

    app.use(morgan("short", { stream: requestLogStreamer }));
    app.use("/api/v1/", userV1Router);
})();

export default app;