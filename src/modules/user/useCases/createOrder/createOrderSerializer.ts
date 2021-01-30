import { Order } from "../../domain/entity/order";
import { CreateOrderControllerResponseDTO } from "./createOrderDTO";

export class CreateOrderUserSerializer {
    public static serialize(order: any | null, message: string | null, error: any): CreateOrderControllerResponseDTO {
        if (order) {
            return {
                data: order,
                message: message,
                error: error,
            };
        }
        return {
            message: message ? message : error ? error.message ? error.message : null : null,
            data: null,
            error: error,
        };
    }
}