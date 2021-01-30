import { Result } from "../../../../shared/core/Result";
import { ValueObject } from "../../../../shared/domain/ValueObject";

interface OrderStatusProps {
    purpose: string;
}

export enum OrderStatusType {
    PROCESSING = "Processing",
    DELIVERED = "Delivered",
    CANCELLED = "Cancelled"
}

export class OrderStatus extends ValueObject<OrderStatusProps> {
    get value(): string {
        return this.props.purpose;
    }

    get isProcessing(): boolean {
        return this.props.purpose === OrderStatusType.PROCESSING;
    }

    get isDelivered(): boolean {
        return this.props.purpose === OrderStatusType.DELIVERED;
    }

    get isCanceled(): boolean {
        return this.props.purpose === OrderStatusType.CANCELLED;
    }

    public static create(purpose: string): Result<OrderStatus> {
        if (purpose !== OrderStatusType.PROCESSING && purpose !== OrderStatusType.DELIVERED && purpose !== OrderStatusType.CANCELLED) {
            return Result.fail<OrderStatus>("Must provide an valid Order Status Type");
        }
        return Result.ok<OrderStatus>(new OrderStatus({ purpose: purpose }));
    }
}