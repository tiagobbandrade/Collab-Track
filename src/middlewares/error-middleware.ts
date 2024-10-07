import { FastifyReply, FastifyRequest } from "fastify";

export function errorMiddleware(
  err: unknown,
  _: FastifyRequest,
  res: FastifyReply
) {
  let statusCode: number;

  if (err instanceof Error) {
    switch (err.message) {
      case "User already exists":
        statusCode = 400;
        break;
      case "Project name is required!":
        statusCode = 400;
        break;
      case "Start date must be after atual date":
        statusCode = 400;
        break;
      case "Start date must be before end date":
        statusCode = 400;
        break;
      case "Start date and end date must be different":
        statusCode = 400;
        break;
      default:
        statusCode = 500;
        break;
    }

    res.status(statusCode).send({
      status: statusCode,
      message: err.message,
    });
  }
}
