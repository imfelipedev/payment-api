import { Context } from "../../infrastructure/http/server";

export interface Controller {
    getUrl(): string;
    getMethod(): string;
    handler(context: Context): Promise<void>;
}
