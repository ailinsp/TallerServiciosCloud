class ApiError extends Error
{
  constructor(name, status, errorCode, meassage = null)
  {
    super(meassage || name);
    this.name = name;
    this.status = status;
    this.errorCode = errorCode;
  }
}

class InvalidOrUnexistingURLError extends ApiError
{
  constructor(){
    super('URL invalida o inexistente', 404, 'RESOURCE_NOT_FOUND');    
  }
}

class UnexpectedFailureError extends ApiError{
  constructor(){
    super('Fallo inesperado.', 500 , 'INTERNAL_SERVER_ERROR');    
  }
}

class NotificationFailureError extends ApiError{
    constructor(){
      super('Fallo el envio de la notificacion.', 500 , 'INTERNAL_SERVER_ERROR');    
    }
  }

class MissingParametersError extends ApiError
{
  constructor()
  {
    super('Se envio un JSON invalido en el BODY.', 400, 'BAD_REQUEST');
  }
}

module.exports = {
  ApiError,
  InvalidOrUnexistingURLError,
  UnexpectedFailureError,
  NotificationFailureError,
  MissingParametersError,
};