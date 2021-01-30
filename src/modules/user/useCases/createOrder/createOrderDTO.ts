export interface CreateOrderUseCaseRequestDTO {
    couponCode: string;
    userID: number;
    orders: {
        producrCode: string;
        quantity: number;
    }[]
}

export interface CreateOrderControllerResponseDTO {
    message: string | null;
    data: {
        name: string;
        mobileNumber: string;
    } | null;
    error: any;
}