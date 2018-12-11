// En este caso se utlizó el endpoint ​artist.search ​para buscar los artistas que tengan el string “Queen”.
const fs = require('fs');
const rp = require('request-promise');

class ServiceUNQfy 
{
  constructor() 
  {
    this.baseURL = 'http://localhost:8080/api';
  }

  options(endpoint)
  {
    return {
      method: 'GET',
      url: this.baseURL + endpoint,
      json: true // Automatically parses the JSON string in the response
    };
  }

  // Responde si el servicio esta activo.
  getStatus()
  {
    const options = this.options('/status');
    return rp.get(options).then((response) => 
    {
        console.log('El servicio de UNQfy esta activado.');
        return response.status;
    }).catch((error) => 
    { 
      console.log('Error al intentar comunicarse con UNQfy.');
    });
  }
}

module.exports = ServiceUNQfy;