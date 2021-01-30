import { User } from "../../domain/entity/user";
import { UpdateUserControllerResponseDTO } from "./updateUserDTO";

export class UpdateUserSerializer {
    public static serialize(user: User | null, message: string | null, error: any): UpdateUserControllerResponseDTO {
        if (user) {
            return {
                data: null,
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