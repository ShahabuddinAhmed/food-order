import { Result } from "../../../../shared/core/Result";
import { ValueObject } from "../../../../shared/domain/ValueObject";

interface PaymentStatusProps {
    purpose: string;
}
export enum PaymentStatusType {
    PAID = "Paid",
    UNPAID = "UnPaid"
}

export class PaymentStatus extends ValueObject<PaymentStatusProps> {
    get value(): string {
        return this.props.purpose;
    }

    get isPaid(): boolean {
        return this.props.purpose === PaymentStatusType.PAID;
    }

    get isUnPain(): boolean {
        return this.props.purpose === PaymentStatusType.UNPAID;
    }

    public static create(purpose: string): Result<PaymentStatus> {
        if (purpose !== PaymentStatusType.PAID && purpose !== PaymentStatusType.UNPAID) {
            return Result.fail<PaymentStatus>("Must provide an valid Payment Status Type");
        }
        return Result.ok<PaymentStatus>(new PaymentStatus({ purpose: purpose }));
    }
}