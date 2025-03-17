type CreateInputRequest = {
    id: string;
    price: number;
    email: string;
};

type CreateInputResponse = {
    qr_code: string;
    qr_code_base64: string;
};

type GetInputRequest = {
    id: string;
};

type GetInputResponse = {
    status: string;
    reference: string;
};

export interface PaymentGateway {
    create(input: CreateInputRequest): Promise<CreateInputResponse>;
    get(input: GetInputRequest): Promise<GetInputResponse>;
    isApproved(status: string): boolean;
}
