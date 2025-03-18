import { Payment as MPayment } from "mercadopago";

import { ServiceException } from "../../application/errors/service.error";

import { PaymentGateway } from "../../domain/payment/gateway/payment.gateway";

import { GetMercadopagoInputDTO, GetMercadopagoOutputDTO } from "../../application/dtos/mercadopago/get-mercadopago.dto";

import { CreateMercadopagoInputDTO, CreateMercadopagoOutputDTO } from "../../application/dtos/mercadopago/create-mercadopago.dto";

export class PaymentGatewayMercadoPago implements PaymentGateway {
    private readonly instance = new MPayment({
        accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN || "",
    });

    public isApproved(status: string): boolean {
        return status === "approved";
    }

    public async get(input: GetMercadopagoInputDTO): Promise<GetMercadopagoOutputDTO> {
        const result = await this.instance.get({ id: input.id });
        if (result.api_response.status !== 200) {
            throw new ServiceException("Não foi possível buscar o pagamento.");
        }

        return {
            status: result.status || "invalid",
            reference: result.external_reference || "",
        };
    }

    public async create(input: CreateMercadopagoInputDTO): Promise<CreateMercadopagoOutputDTO> {
        const request = {
            requestOptions: {
                idempotencyKey: input.id,
            },
            body: {
                payer: {
                    email: input.email,
                },
                payment_method_id: "pix",
                external_reference: input.id,
                transaction_amount: input.price,
            },
        };

        if (process.env.API_URL !== "http://localhost:3000") {
            request.body.notification_url = `${process.env.API_URL}/api/v1/payment/update`;
        }

        const result = await this.instance.create(request);
        if (result.api_response.status !== 201) {
            throw new ServiceException("Não foi possível criar o pagamento.");
        }

        return {
            qr_code: result?.point_of_interaction?.transaction_data?.qr_code || "",
            qr_code_base64: result?.point_of_interaction?.transaction_data?.qr_code_base64 || "",
        };
    }
}
