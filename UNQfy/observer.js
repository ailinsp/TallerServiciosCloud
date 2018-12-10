const picklify = require('picklify');
const rp = require('request-promise');
const NotifierService = require('./notifierService.js');

class Observer
{
  constructor()
  {
    this.artists = [];
    this.notifier = new NotifierService();
  }

  // Actualiza los cambios realizados a la lista de artistas observados.
  // (Cuande se agregan/borran artistas)
  updateArtist(artists)
  {
    this.artists = artists;

  }

  // Notifica de un nuevo album de un artista.
  notifyNewAlbum(artist, albumName)
  {
    this.notifier.notifyNewAlbum(artist.getId(), artist.getName(), albumName);
  }

  // Notifica de que un artista será eliminado.
  notifyDeleteArtist(artistsUpdate, artist)
  {
    this.updateArtist(artistsUpdate);
    this.notifier.notifyRemoveArtist(artist.getId(), artist.getName());
  }


}

module.exports = Observer;