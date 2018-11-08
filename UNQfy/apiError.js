
class ApiError extends Error{
  constructor(name, status, errorCode, meassage = null){
    super(meassage || name);
    this.name = name;
    this.status = status;
    this.errorCode = errorCode;
  }

}

class DuplicatedAlbumOrArtistError extends ApiError{
  constructor(){
    super('DuplicatedAlbumOrArtistError', 409, 'RESOURCE_ALREADY_EXISTS');    
  }

}

class CantAddAlbumToUnexistingArtistError extends ApiError{
  constructor(){
    super('CantAddAlbumToUnexistingArtistError', 404, 'RELATED_RESOURCE_NOT_FOUND');    
  }
}

class InvalidOrUnexistingURLError extends ApiError{
  constructor(){
    super('InvalidOrUnexistingURLError', 404, 'RESOURCE_NOT_FOUND');    
  }
}

class DeleteOrFindUnexistingArtistOrAlbumError extends ApiError{
  constructor(){
    super('DeleteOrFindUnexistingArtistOrAlbumError', 404, 'RESOURCE_NOT_FOUND');    
  }
}

class InvalidJsonError extends ApiError{
  constructor(){
    super('InvalidJsonError', 400, 'BAD_REQUEST');    
  }
}

class MissingArgumentOnJsonToAddAnArtistOrAlbumError extends ApiError{
  constructor(){
    super('MissingArgumentOnJsonToAddAnArtistOrAlbumError', 400, 'BAD_REQUEST');    
  }
}

class UnexpectedFailureError extends ApiError{
  constructor(){
    super('UnexpectedFailureError', 500 , 'INTERNAL_SERVER_ERROR');    
  }
}

class UnexistingSongError extends ApiError{
  constructor(){
    super('UnexistingSongError', 404, 'RESOURCE_NOT_FOUND');    
  }
}

module.exports = {
  ApiError,
  DuplicatedAlbumOrArtistError,
  CantAddAlbumToUnexistingArtistError,
  InvalidOrUnexistingURLError,
  DeleteOrFindUnexistingArtistOrAlbumError,
  InvalidJsonError,
  MissingArgumentOnJsonToAddAnArtistOrAlbumError,
  UnexpectedFailureError,
  UnexistingSongError,
};