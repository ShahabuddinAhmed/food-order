export interface DeleteUserUseCaseRequestDTO {
    email: string;
}


export interface DeleteUserControllerResponseDTO {
    message: string | null;
    data: {
        name: string;
        mobileNumber: string;
    } | null;
    error: any;
}