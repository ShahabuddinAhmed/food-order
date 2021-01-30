export interface OrderUserUseCaseRequestDTO {
    userID: number;
    offset: number;
    limit: number;
}


export interface OrderUserControllerResponseDTO {
    message: string | null;
    data: {
        name: string;
        mobileNumber: string;
    } | [];
    error: any;
}