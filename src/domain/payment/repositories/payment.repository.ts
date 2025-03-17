import { Payment } from "../entities/payment.entity";

export interface PaymentRepository {
    save(payment: Payment): Promise<void>;
    getFromId(id: string): Promise<Payment | null>;
    update(payment: Payment): Promise<void>;
    delete(id: string): Promise<void>;
}
