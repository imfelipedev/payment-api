export type PaymentStatus = "PENDING" | "REFUNDED" | "COMPLETED" | "CANCELLED";

export const PaymentStatus = {
    PENDING: "PENDING" as PaymentStatus,
    REFUNDED: "REFUNDED" as PaymentStatus,
    COMPLETED: "COMPLETED" as PaymentStatus,
    CANCELLED: "CANCELLED" as PaymentStatus,
} as const;

export type PaymentProps = {
    id: string;
    owner: number;
    email: string;
    document: string;
    price: number;
    status: PaymentStatus;
};

export class Payment {
    constructor(private readonly props: PaymentProps) {}

    public static create(id: string, owner: number, email: string, document: string, price: number): Payment {
        return new Payment({
            id: id,
            owner: owner,
            email: email,
            document: document,
            price: price,
            status: PaymentStatus.PENDING,
        });
    }

    public static reconstruct(props: PaymentProps): Payment {
        return new Payment(props);
    }

    public get id(): string {
        return this.props.id;
    }

    public get owner(): number {
        return this.props.owner;
    }

    public get email(): string {
        return this.props.email;
    }

    public get document(): string {
        return this.props.document;
    }

    public get price(): number {
        return this.props.price;
    }

    public get status(): PaymentStatus {
        return this.props.status;
    }

    public complete(): void {
        this.props.status = PaymentStatus.COMPLETED;
    }

    public cancel(): void {
        this.props.status = PaymentStatus.CANCELLED;
    }

    public refund(): void {
        this.props.status = PaymentStatus.REFUNDED;
    }

    public isCompleted(): boolean {
        return this.props.status === PaymentStatus.COMPLETED;
    }
}
