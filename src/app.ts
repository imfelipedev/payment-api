import { Server } from "./infrastructure/http/server";

import { prisma } from "./infrastructure/database/prisma";

import { PaymentRepositoryPrisma } from "./infrastructure/repositories/payment.repository.prisma";

import { CreatePaymentUseCase } from "./application/usecases/payment/create-payment.usecase";

import { UpdatePaymentUsecase } from "./application/usecases/payment/update-payment.usecase";

import { PaymentGatewayMercadoPago } from "./infrastructure/gateway/payment.gateway.mercadopago";

import { CreatePaymentController } from "./presentation/controllers/payment/create-payment.controller";

import { UpdatePaymentController } from "./presentation/controllers/payment/update-payment.controller";

function bootstrap() {
    const paymentGateway = new PaymentGatewayMercadoPago();
    const paymentRepository = new PaymentRepositoryPrisma(prisma);
    const createPaymentUseCase = new CreatePaymentUseCase(paymentRepository, paymentGateway);
    const updatePaymentUseCase = new UpdatePaymentUsecase(paymentRepository, paymentGateway);
    const createPaymentController = CreatePaymentController.create(createPaymentUseCase);
    const updatePaymentController = UpdatePaymentController.create(updatePaymentUseCase);
    const server = new Server([createPaymentController, updatePaymentController]);
    server.start(3000);
}

bootstrap();
