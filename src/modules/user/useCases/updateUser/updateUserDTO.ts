export interface UpdateUserUseCaseRequestDTO {
    name?: string;
    mobileNumber?: string;
    address?: string;
    email: string;
}


export interface UpdateUserControllerResponseDTO {
    message: string | null;
    data: null;
    error: any;
}