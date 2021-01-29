import { UniqueEntityID } from "../../../../shared/domain/UniqueEntityID";
import { Result } from "../../../../shared/core/Result";
import { Entity } from "../../../../shared/domain/Entity";

export interface UserProps {
    name: string;
    email: string;
    mobileNumber: string;
    address: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
}

export class User extends Entity<UserProps> {
    private constructor(props: UserProps, id?: UniqueEntityID) {
        super(props, id);
    }

    get name(): string {
        return this.props.name;
    }

    get email(): string {
        return this.props.email;
    }

    get mobileNumber(): string {
        return this.props.mobileNumber;
    }

    get address(): string {
        return this.props.address;
    }

    get createdAt(): Date | string | undefined {
        return this.props.createdAt;
    }
    
    get updatedAt(): Date | string | undefined {
        return this.props.updatedAt;
    }

    public static create(props: UserProps, id?: UniqueEntityID): Result<User> {
        return Result.ok<User>(new User(props, id));
    }
}