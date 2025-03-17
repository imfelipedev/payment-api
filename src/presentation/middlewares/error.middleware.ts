import { FastifyError, FastifyRequest, FastifyReply } from "fastify";

import { ServiceException } from "../../application/errors/service.error";

import { NotfoundException } from "../../application/errors/notfound.error";

import { ValidationException } from "../../application/errors/validation.error";

export function errorHandler(error: FastifyError, _request: FastifyRequest, reply: FastifyReply) {
    if (error instanceof ServiceException) {
        return reply.status(503).send({
            message: error.message,
        });
    }

    if (error instanceof ValidationException) {
        return reply.status(400).send({
            message: error.message,
        });
    }

    if (error instanceof NotfoundException) {
        return reply.status(404).send({
            message: error.message,
        });
    }

    return reply.status(500).send({
        message: error.message || "Internal Server Error",
    });
}
