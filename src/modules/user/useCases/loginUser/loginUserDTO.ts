export interface LoginUserUseCaseRequestDTO {
    email: string;
    password: string;
}


export interface LoginUserControllerResponseDTO {
    message: string | null;
    data: {
        name: string;
        mobileNumber: string;
        email: string;
        address: string;
    } | null;
    error: any;
}