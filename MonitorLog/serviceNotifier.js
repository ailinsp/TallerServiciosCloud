const picklify = require('picklify');
const fs = require('fs');
const rp = require('request-promise');

class ServiceNotifier
{
  constructor() 
  {
    this.baseURL = 'http://localhost:8081/api';
  }

  // Obtiene el status de Notifier.
  getStatus()
  {
    const options = {
      method: 'GET', // Si no se especifica, invoca el GET
      uri: this.baseURL + '/status',
      json: true // Automatically parses the JSON string in the response
    };

    return rp(options).then((response) => 
    {
      console.log('Las notificaciones se han enviado con exito.');
      console.log(response.status);
      return response.status;
    }).catch((error) => 
    { 
      console.log('Error al intentar comunicarse con Notifier.');
    });
    
  }

}

module.exports = ServiceNotifier;