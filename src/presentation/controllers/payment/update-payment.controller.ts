import { Controller } from "../controller";

import { Context } from "../../../infrastructure/http/server";

import { UpdatePaymentInputDTO } from "../../../application/dtos/payment/update-payment.dto";

import { UpdatePaymentUsecase } from "../../../application/usecases/payment/update-payment.usecase";

export class UpdatePaymentController implements Controller {
    constructor(private readonly url: string, private readonly method: string, private readonly updatePaymentUsecase: UpdatePaymentUsecase) {}

    public static create(updatePaymentUsecase: UpdatePaymentUsecase): UpdatePaymentController {
        return new UpdatePaymentController("/api/v1/payment/update", "POST", updatePaymentUsecase);
    }

    public getUrl(): string {
        return this.url;
    }

    public getMethod(): string {
        return this.method;
    }

    public async handler(context: Context): Promise<void> {
        const body = context.getBody<UpdatePaymentInputDTO>();
        const result = await this.updatePaymentUsecase.execute(body);
        context.send(200, result);
    }
}
