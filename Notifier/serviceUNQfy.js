// En este caso se utlizó el endpoint ​artist.search ​para buscar los artistas que tengan el string “Queen”.
const fs = require('fs');
const rp = require('request-promise');
const errors = require('./notifierApiErrors.js'); // api de errores

class ServiceUNQfy 
{
  constructor() 
  {
    this.baseURL = 'http://localhost:8080/api';
  }

  options(endpoint)
  {
    return {
      url: this.baseURL + endpoint,
      json: true // Automatically parses the JSON string in the response
    };
  }

  findArtist(artistId)
  {
    const options = this.options('/artists/' + artistId);
    return rp.get(options).then((response) => 
    {
        return response;
    });
  }

}

module.exports = ServiceUNQfy;