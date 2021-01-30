import { Logger, createLogger, format, transports } from "winston";


export interface LoggerInterface {
    info(message: string, label: string, data: Record<string, unknown>): void;
    error(message: string, label: string, data: Record<string, unknown>): void;
    warn(message: string, label: string, data: Record<string, unknown>): void;
    debug(message: string, label: string, data: Record<string, unknown>): void;
}


export class LogManager implements LoggerInterface {
    client: Logger;

    constructor(client: Logger) {
        this.client = client;
    }

    info(message: string, label: string, data: Record<string, unknown>): void {
        this.client.info(message, { label, ...data });
    }

    debug(message: string, label: string, data: Record<string, unknown>): void {
        this.client.debug(message, { label, ...data });
    }

    warn(message: string, label: string, data: Record<string, unknown>): void {
        this.client.warn(message, { label, ...data });
    }

    error(message: string, label: string, data: Record<string, unknown>): void {
        this.client.error(message, { label, ...data });
    }

}

export const newLogManagerStreamer = (logManager: LoggerInterface): any => {
    return {
        write: function (message: any) {
            logManager.info(message, "request", {});
        }
    };
};

export const newLogManager = async (): Promise<LogManager> => {
    const { combine, timestamp, prettyPrint } = format;
    const logger = createLogger({
        format: combine(
            timestamp(),
            prettyPrint()
        ),
        transports: [new transports.Console()]
    });

    return new LogManager(logger);
};
