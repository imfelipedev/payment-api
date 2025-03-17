import { PrismaClient } from "@prisma/client";

import { Payment, PaymentStatus } from "../../domain/payment/entities/payment.entity";

import { PaymentRepository } from "../../domain/payment/repositories/payment.repository";

export class PaymentRepositoryPrisma implements PaymentRepository {
    constructor(private readonly prisma: PrismaClient) {}

    public async save(payment: Payment): Promise<void> {
        await this.prisma.payment.create({
            data: {
                id: payment.id,
                owner: payment.owner,
                email: payment.email,
                document: payment.document,
                price: payment.price,
                status: payment.status,
            },
        });
    }

    public async update(payment: Payment): Promise<void> {
        await this.prisma.payment.update({
            where: {
                id: payment.id,
            },
            data: {
                status: payment.status,
            },
        });
    }

    public async delete(id: string): Promise<void> {
        await this.prisma.payment.delete({
            where: {
                id,
            },
        });
    }

    public async getFromId(id: string): Promise<Payment | null> {
        const result = await this.prisma.payment.findUnique({
            where: {
                id,
            },
        });

        if (!result) {
            return null;
        }

        // TODO: Refactor this, possible invasion of the domain layer
        return Payment.reconstruct({
            id: result.id,
            owner: result.owner,
            email: result.email,
            document: result.document,
            price: result.price,
            status: result.status as PaymentStatus,
        });
    }
}
