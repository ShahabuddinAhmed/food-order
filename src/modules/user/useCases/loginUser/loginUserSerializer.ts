import { User } from "../../domain/entity/user";
import { LoginUserControllerResponseDTO } from "./loginUserDTO";

export class LoginUserSerializer {
    public static serialize(user: User | null, message: string | null, error: any): LoginUserControllerResponseDTO {
        if (user) {
            return {
                data: user,
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