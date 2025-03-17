import fastify, { FastifyInstance } from "fastify";

import { Controller } from "../../presentation/controllers/controller";

import { errorHandler } from "../../presentation/middlewares/error.middleware";

export interface Context {
    getBody<T>(): T;
    send(status: number, body: any): void;
}

export class Server {
    private readonly instance: FastifyInstance;

    constructor(private readonly controllers: Controller[]) {
        this.instance = fastify();
        this.instance.setErrorHandler(errorHandler);
        this.registerRouters();
    }

    public async start(port: number) {
        this.instance.listen({ port: port }, () => {
            console.log(`\x1b[32m[\x1b[1mSUCCESS]\x1b[0m - Server started at http://localhost:${port}/ 🚀`);
        });
    }

    private registerRouters() {
        for (const controller of this.controllers) {
            this.instance.route({
                url: controller.getUrl(),
                method: controller.getMethod(),
                handler: async (request, reply) => {
                    const context = {
                        getBody: <T>() => request.body as T,
                        send: (status: number, body: any) => reply.status(status).send(body),
                    };

                    await controller.handler(context);
                },
            });
        }
    }
}
