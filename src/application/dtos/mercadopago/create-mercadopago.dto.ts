export type CreateMercadopagoInputDTO = {
    id: string;
    price: number;
    email: string;
};

export type CreateMercadopagoOutputDTO = {
    qr_code: string;
    qr_code_base64: string;
};
