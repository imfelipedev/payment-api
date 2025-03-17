import { UseCase } from "../usecase";

import { NotfoundException } from "../../errors/notfound.error";

import { ValidationException } from "../../errors/validation.error";

import { PaymentGateway } from "../../../domain/payment/gateway/payment.gateway";

import { PaymentRepository } from "../../../domain/payment/repositories/payment.repository";

import { UpdatePaymentInputDTO, UpdatePaymentOutputDTO } from "../../dtos/payment/update-payment.dto";

export class UpdatePaymentUsecase implements UseCase<UpdatePaymentInputDTO, UpdatePaymentOutputDTO> {
    constructor(private readonly paymentRepository: PaymentRepository, private readonly paymentGateway: PaymentGateway) {}

    public async execute(input: UpdatePaymentInputDTO): Promise<UpdatePaymentOutputDTO> {
        if (input.action !== "payment.update" && input.action !== "payment.created") {
            throw new ValidationException("Ação inválida, verifique os campos e tente novamente.");
        }

        const data = await this.paymentGateway.get({ id: input.data.id });
        if (!this.paymentGateway.isApproved(data.status)) {
            throw new ValidationException("Pagamento não aprovado, tente novamente mais tarde.");
        }

        const entity = await this.paymentRepository.getFromId(data.reference);
        if (!entity) {
            throw new NotfoundException("Não foi possível encontrar o pagamento em nosso sistema.");
        }

        if (entity.isCompleted()) {
            throw new ValidationException("Esse pagamento já foi completado.");
        }

        entity.complete();
        await this.paymentRepository.update(entity);
        return {
            success: true,
        };
    }
}
