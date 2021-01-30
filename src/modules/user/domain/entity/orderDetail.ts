import { UniqueEntityID } from "../../../../shared/domain/UniqueEntityID";
import { Result } from "../../../../shared/core/Result";
import { Entity } from "../../../../shared/domain/Entity";

export interface OrderProps {
    title: string;
    price: number;
    quantity: number;
    userID: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
}

export class Order extends Entity<OrderProps> {
    private constructor(props: OrderProps, id?: UniqueEntityID) {
        super(props, id);
    }

    get title(): string {
        return this.props.title;
    }

    get price(): number {
        return this.props.price;
    }

    get quantity(): number {
        return this.props.quantity;
    }

    get userID(): number {
        return this.props.userID;
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