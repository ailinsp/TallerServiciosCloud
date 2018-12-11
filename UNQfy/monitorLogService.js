const picklify = require('picklify');
const fs = require('fs');
const rp = require('request-promise');

class MonitorLogService
{
  constructor() 
  {
    this.baseURL = 'http://localhost:8082/api';
  }

  log(mensaje)
  {
    const options = {
      method: 'POST', // Si no se especifica, invoca el GET
      uri: this.baseURL + '/log',
      body: 
      {
        message: mensaje
      },
      json: true // Automatically parses the JSON string in the response
    };

    rp(options).then((response) => 
    {
      console.log('Se han realizado el log con el servicio de Monitoreo y Log con exito.');
    }).catch((error) => 
    { 
      console.log('Error al intentar conectarse con el servicio de Monitoreo y Log.', error);
    });
    
  }

}

module.exports = MonitorLogService;