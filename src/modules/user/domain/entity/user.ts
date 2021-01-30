import { UniqueEntityID } from "../../../../shared/domain/UniqueEntityID";
import { Result } from "../../../../shared/core/Result";
import { Entity } from "../../../../shared/domain/Entity";
import config from "../../../../config/config";
import { UserID } from "./userID";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export interface UserProps {
    name: string;
    email: string;
    password: string;
    mobileNumber: string;
    address: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
}

export class User extends Entity<UserProps> {
    private constructor(props: UserProps, id?: UniqueEntityID) {
        super(props, id);
    }

    get userID(): UserID {
        return UserID.create(this._id).getValue();
    }

    get name(): string {
        return this.props.name;
    }

    get email(): string {
        return this.props.email;
    }

    get password(): string {
        return this.props.password;
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

    public static async hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 10);
    };

    public static async verifyPassword(password: string, hash: string): Promise<boolean> {
        return bcrypt.compare(password, hash);
    };

    public static async generateAuthToken(userID: number, email: string): Promise<string> {
        const token = jwt.sign(
            { userID, email },
            config.JWT_SECRET_KEY,
            { expiresIn: config.ACCESS_TOKEN_EXPIRATION }
        );
    
        return token;
    };

    public static async verifyAuthToken(token: string): Promise<string | object> {
        return jwt.verify(token, config.JWT_SECRET_KEY);
     };
}