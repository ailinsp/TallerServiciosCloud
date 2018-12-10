const picklify = require('picklify');
const fs = require('fs');
const rp = require('request-promise');

class NotifierService
{
  constructor() 
  {
    this.baseURL = 'http://localhost:8081/api';
  }

  notifyNewAlbum (id, artistName, albumName)
  {
    const options = {
      method: 'POST', // Si no se especifica, invoca el GET
      uri: this.baseURL + '/notify',
      body: 
      {
        artistId: id,
        subject: 'Nuevo Album para artista ' + artistName,
        message: 'Se ha agregado el album ' + albumName + ' al artista ' + artistName,
        from: 'UNQfy <UNQfy.notifications@gmail.com>',
      },
      json: true // Automatically parses the JSON string in the response
    };

    rp(options).then((response) => 
    {
      console.log('Las notificaciones se han enviado con exito.');
    }).catch((error) => 
    { 
      console.log('Error al intentar notificar a los usuarios del nuevo album.', error);
    });
    
  }

  notifyRemoveArtist (id, artistName)
  {
    const options = {
      method: 'DELETE', // Si no se especifica, invoca el GET
      uri: this.baseURL + '/subscriptions',
      body: 
      {
        artistId: id,
      },
      json: true // Automatically parses the JSON string in the response
    };

    rp(options).then((response) => 
    {
      console.log('Se ha notificado la eliminacion de '+ artistName + ' con exito.');
    }).catch((error) => 
    { 
      console.log('Error al intentar notificar la eliminacion de un artista a los usuarios.', error);
    });
    
  }
}

module.exports = NotifierService;