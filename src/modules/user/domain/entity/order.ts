import { UniqueEntityID } from "../../../../shared/domain/UniqueEntityID";
import { Result } from "../../../../shared/core/Result";
import { Entity } from "../../../../shared/domain/Entity";
import { Discount } from "../value/discountType";
import { OrderStatus } from "../value/orderStatus";
import { PaymentStatus } from "../value/paymentStatus";

export interface OrderProps {
    actualAmount: number;
    totalAmount: number;
    discountType: Discount;
    discount: number;
    couponCode: string;
    couponValue: number;
    orderStatus: OrderStatus;
    paymentStatus: PaymentStatus;
    orderCode: string;
    restaurantAddress: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
}

export class Order extends Entity<OrderProps> {
    private constructor(props: OrderProps, id?: UniqueEntityID) {
        super(props, id);
    }

    get actualAmount(): number {
        return this.props.actualAmount;
    }

    get totalAmount(): number {
        return this.props.totalAmount;
    }

    get discountType(): Discount {
        return this.props.discountType;
    }

    get discount(): number {
        return this.props.discount;
    }

    get couponCode(): string {
        return this.props.couponCode;
    }

    get couponValue(): number {
        return this.props.couponValue;
    }

    get orderStatus(): OrderStatus {
        return this.props.orderStatus;
    }

    get paymentStatus(): PaymentStatus {
        return this.props.paymentStatus;
    }

    get orderCode(): string {
        return this.props.orderCode;
    }
    
    get restaurantAddress(): string {
        return this.props.restaurantAddress;
    }

    get createdAt(): Date | string | undefined {
        return this.props.createdAt;
    }

    get updatedAt(): Date | string | undefined {
        return this.props.updatedAt;
    }

    public static create(props: OrderProps, id?: UniqueEntityID): Result<Order> {
        return Result.ok<Order>(new Order(props, id));
    }
}