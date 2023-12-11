/*
|--------------------------------------------------------------------------
| Http Exception Handler
|--------------------------------------------------------------------------
|
| AdonisJs will forward all exceptions occurred during an HTTP request to
| the following class. You can learn more about exception handling by
| reading docs.
|
| The exception handler extends a base `HttpExceptionHandler` which is not
| mandatory, however it can do lot of heavy lifting to handle the errors
| properly.
|
*/

import Logger from '@ioc:Adonis/Core/Logger'
import HttpExceptionHandler from '@ioc:Adonis/Core/HttpExceptionHandler'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ExceptionHandler extends HttpExceptionHandler {
  constructor() {
    super(Logger)
  }

  public async handle(error: any, ctx: HttpContextContract) {
    if (error.code === 'E_INVALID_CREDENTIALS') {
      return ctx.response.badRequest({
        status: 400,
        success: false,
        code: 'E_INVALID_CREDENTIALS',
        message: "Informations d'identification invalides",
      })
    }

    if (error.code === 'E_UNAUTHORIZED_ACCESS') {
      return ctx.response.unauthorized({
        status: 401,
        success: false,
        code: 'E_UNAUTHORIZED_ACCESS',
        message: 'Vous devez être connecté pour accéder à cette ressource',
      })
    }

    if (error.code === 'E_ROUTE_NOT_FOUND') {
      return ctx.response.notFound({
        status: 404,
        success: false,
        code: 'E_ROUTE_NOT_FOUND',
        message: "La ressource demandée n'existe pas",
      })
    }

    if (error.code === 'E_VALIDATION_FAILURE') {
      return ctx.response.badRequest({
        status: 400,
        success: false,
        code: 'E_VALIDATION_FAILURE',
        messages: error.messages.errors,
      })
    }

    if (error.code === 'E_ROW_NOT_FOUND') {
      return ctx.response.notFound({
        status: 404,
        success: false,
        code: 'E_ROW_NOT_FOUND',
        message: "La ressource demandée n'existe pas",
      })
    }

    return ctx.response.internalServerError({
      status: 500,
      path: ctx.request.url(),
      code: 'E_SERVER_INTERNAL_ERROR',
      message: 'Une erreur est survenue sur le serveur',
    })
  }

  public async report(error: any, _ctx: HttpContextContract) {
    if (this.shouldReport(error)) {
      Logger.error(error.message, error)
    }
  }
}
