import app from "./app";
import http from "http";
import config from "../../config/config";
import newSequelize from "../../infra/db/sequelize";

const logger = console;

const gracefulShutdown = (server: http.Server, forcedTimeout: number) => {
    return function () {
        logger.info("Received SIGINT or SIGTERM. Shutting down gracefully...");
        server.close(async () => {
            logger.info("Closed out remaining connections.");
           
            try {
                await newSequelize().close();
                console.log("Database connection closed.");
                process.exit();
            } catch (err) {
                process.exit();
            }
        });

        setTimeout(() => {
            logger.error("Could not close connections in time, forcefully shutting down");
            process.exit();
        }, forcedTimeout);
    };
};


const server = http.createServer(app);


process.on("SIGTERM", gracefulShutdown(server, config.APP_FORCE_SHUTDOWN_SECOND));
process.on("SIGINT", gracefulShutdown(server, config.APP_FORCE_SHUTDOWN_SECOND));

server.listen(config.APPLICATION_SERVER_PORT, () => {
    logger.log("Food Order API is Running: " + config.APPLICATION_SERVER_PORT);
});
