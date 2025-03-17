import { randomUUID } from "node:crypto";

import { UseCase } from "../usecase";

import { ValidationException } from "../../errors/validation.error";

import { Payment } from "../../../domain/payment/entities/payment.entity";

import { PaymentGateway } from "../../../domain/payment/gateway/payment.gateway";

import { PaymentRepository } from "../../../domain/payment/repositories/payment.repository";

import { CreatePaymentInputDTO, CreatePaymentOutputDTO } from "../../dtos/payment/create-payment.dto";

export class CreatePaymentUseCase implements UseCase<CreatePaymentInputDTO, CreatePaymentOutputDTO> {
    constructor(private readonly paymentRepository: PaymentRepository, private readonly paymentGateway: PaymentGateway) {}

    public async execute(input: CreatePaymentInputDTO): Promise<CreatePaymentOutputDTO> {
        if (!input.owner || !input.price || !input.email || !input.document) {
            throw new ValidationException("Dados inválidos, verifique os campos e tente novamente.");
        }

        const id = randomUUID();
        const payment = Payment.create(id, input.owner, input.email, input.document, input.price);
        const data = await this.paymentGateway.create({ id: id, price: payment.price, email: payment.email });
        await this.paymentRepository.save(payment);
        return {
            id: id,
            qr_code: data.qr_code,
            qr_code_base64: data.qr_code_base64,
        };
    }
}
