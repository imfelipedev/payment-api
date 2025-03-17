export class NotfoundException extends Error {
    constructor(message: string) {
        super(message);
        this.name = "NotfoundException";
    }
}
