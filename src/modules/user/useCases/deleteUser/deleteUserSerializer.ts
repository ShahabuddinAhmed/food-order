import { User } from "../../domain/entity/user";
import { DeleteUserControllerResponseDTO } from "./deleteDTO";

export class DeleteUserSerializer {
    public static serialize(user: User | null, message: string | null, error: any): DeleteUserControllerResponseDTO {
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