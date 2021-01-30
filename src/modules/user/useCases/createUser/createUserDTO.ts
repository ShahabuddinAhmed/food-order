export interface CreateUserUseCaseRequestDTO {
    name: string;
    mobileNumber: string;
    email: string;
    password: string;
    address: string;
}


export interface CreateUserControllerResponseDTO {
    message: string | null;
    data: {
        name: string;
        mobileNumber: string;
        email: string;
        address: string;
    } | null;
    error: any;
}