export type UpdatePaymentInputDTO = {
    action: string;
    data: {
        id: string;
    };
};

export type UpdatePaymentOutputDTO = {
    success: boolean;
};
