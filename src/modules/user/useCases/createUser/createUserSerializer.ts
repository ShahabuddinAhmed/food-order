import { User } from "../../domain/entity/user";
import { CreateUserControllerResponseDTO } from "./createUserDTO";

export class CreateUserSerializer {
    public static serialize(user: User | null, message: string | null, error: any): CreateUserControllerResponseDTO {
        if (user) {
            return {
                data: {
                    name: user.name,
                    mobileNumber: user.mobileNumber,
                    email: user.email,
                    address: user.address
                },
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