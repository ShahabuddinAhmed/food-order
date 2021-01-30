import { Result } from "../../../../shared/core/Result";
import { ValueObject } from "../../../../shared/domain/ValueObject";

interface DiscountProps {
    purpose: string;
}
export enum DiscountType {
    PERCENTAGE = "Percentage",
    FLAT = "Flat"
}

export class Discount extends ValueObject<DiscountProps> {
    get value(): string {
        return this.props.purpose;
    }

    get isPercentage(): boolean {
        return this.props.purpose === DiscountType.PERCENTAGE;
    }

    get isFlat(): boolean {
        return this.props.purpose === DiscountType.FLAT;
    }

    public static create(purpose: string): Result<Discount> {
        if (purpose !== DiscountType.PERCENTAGE && purpose !== DiscountType.FLAT) {
            return Result.fail<Discount>("Must provide an valid Discount Type");
        }
        return Result.ok<Discount>(new Discount({ purpose: purpose }));
    }
}