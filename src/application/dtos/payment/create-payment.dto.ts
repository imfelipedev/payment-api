export type CreatePaymentInputDTO = {
    owner: number;
    price: number;
    email: string;
    document: string;
};

export type CreatePaymentOutputDTO = {
    id: string;
    qr_code: string;
    qr_code_base64: string;
};
