import { Order } from "../../domain/entity/order";
import { OrderUserControllerResponseDTO } from "./orderUserDTO";

export class OrderUserSerializer {
    public static serialize(orders: Order[], message: string | null, error: any): OrderUserControllerResponseDTO {
        if (orders.length) {
            const data = orders.map(order => {
                return {
                    total: order.totalAmount
                }
            })
            return {
                data: [],
                message: message,
                error: error,
            };
        }
        return {
            message: message ? message : error ? error.message ? error.message : null : null,
            data: [],
            error: error,
        };
    }
}