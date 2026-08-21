import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';

@Catch()
export class AllExceptionsFilter
  implements ExceptionFilter
{
  private readonly logger =
    new Logger(
      AllExceptionsFilter.name,
    );

  catch(
    exception: unknown,
    host: ArgumentsHost,
  ) {
    if (
      !(exception instanceof HttpException)
    ) {
      this.logger.error(exception);
    }

    const ctx = host.switchToHttp();

    const request = ctx.getRequest();
    const response = ctx.getResponse();

    const isDevelopment =
      process.env.NODE_ENV ===
      'development';

    let status =
      HttpStatus.INTERNAL_SERVER_ERROR;

    let message:
      string | string[] =
      'Error interno del servidor';

    if (
      exception instanceof HttpException
    ) {
      status = exception.getStatus();

      const exceptionResponse =
        exception.getResponse();

      if (
        typeof exceptionResponse ===
        'string'
      ) {
        message = exceptionResponse;
      } else if (
        typeof exceptionResponse ===
          'object' &&
        exceptionResponse !== null
      ) {
        const errorResponse =
          exceptionResponse as Record<
            string,
            unknown
          >;

        const responseMessage =
          errorResponse.message;

        message = Array.isArray(
          responseMessage,
        )
          ? responseMessage
          : String(responseMessage);
      }
    }

    response.status(status).json({
      statusCode: status,
      timestamp:
        new Date().toISOString(),
      path: request.url,
      method: request.method,
      message,
      ...(isDevelopment &&
        exception instanceof Error && {
          error: exception.message,
        }),
    });
  }
}