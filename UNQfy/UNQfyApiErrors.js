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

class UnexpectedFailureError extends ApiError{
  constructor(){
    super('Fallo inesperado.', 500 , 'INTERNAL_SERVER_ERROR');    
  }
}

class MissingParameters extends ApiError
{
  constructor()
  {
    super('Falta ingresar parametros.', 400, 'BAD_REQUEST');
  }
}

class ArtistHasAlreadyBeenRegistered extends ApiError
{
  constructor(artistName)
  {
    super('El artista ' + artistName + ' ya fue registrado.', 409, 'RESOURCE_ALREADY_EXISTS');
  }
}

class AlbumHasAlreadyBeenRegistered extends ApiError
{
  constructor(albumtName)
  {
    super('El album ' + albumtName + ' ya fue registrado.', 409, 'RESOURCE_ALREADY_EXISTS');
  }
}

class ArtistIdNotFoundException extends ApiError
{
  constructor(id)
  {
    super('No se encontro un artista con la identificacion ' + id, 404, 'RESOURCE_NOT_FOUND');
  }
}

class CantAddAlbumToUnexistingArtistError extends ApiError{
  constructor(){
    super('No se puede agregar un album a un artista inexistente.', 404, 'RELATED_RESOURCE_NOT_FOUND');    
  }
}

class TrackIdNotFoundException extends ApiError
{
  constructor(id)
  {
    super('No se encontro un track con la identificacion ' + id, 404, 'RESOURCE_NOT_FOUND');
  }
}

class AlbumIdNotFoundException extends ApiError
{
  constructor(id)
  {
    super('No se encontro un album con la identificacion ' + id, 404, 'RESOURCE_NOT_FOUND');
  }
}

module.exports = {
  ApiError,
  ArtistIdNotFoundException,
  ArtistHasAlreadyBeenRegistered,
  MissingParameters,
  AlbumIdNotFoundException,
  TrackIdNotFoundException,
  AlbumHasAlreadyBeenRegistered,
  UnexpectedFailureError,
  CantAddAlbumToUnexistingArtistError,
};