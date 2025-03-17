import { Controller } from "../controller";

import { Context } from "../../../infrastructure/http/server";

import { CreatePaymentInputDTO } from "../../../application/dtos/payment/create-payment.dto";

import { CreatePaymentUseCase } from "../../../application/usecases/payment/create-payment.usecase";

export class CreatePaymentController implements Controller {
    constructor(private readonly url: string, private readonly method: string, private readonly createPaymentUseCase: CreatePaymentUseCase) {}

    public static create(createPaymentUseCase: CreatePaymentUseCase): CreatePaymentController {
        return new CreatePaymentController("/api/v1/payment", "POST", createPaymentUseCase);
    }

    public getUrl(): string {
        return this.url;
    }

    public getMethod(): string {
        return this.method;
    }

    public async handler(context: Context): Promise<void> {
        const body = context.getBody<CreatePaymentInputDTO>();
        const result = await this.createPaymentUseCase.execute(body);
        context.send(201, result);
    }
}
