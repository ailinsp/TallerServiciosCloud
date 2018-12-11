const picklify = require('picklify');
const rp = require('request-promise');
const NotifierService = require('./notifierService.js');
const MonitorLog = require('./monitorLogService.js');

class Observer
{
  constructor()
  {
    this.artists = [];
    this.notifier = new NotifierService();
    this.monitorLog = new MonitorLog();
  }

  // Actualiza los cambios realizados a la lista de artistas observados.
  // (Cuande se agregan/borran artistas)
  updateArtist(artists)
  {
    this.artists = artists;

  }

  notifyNewArtist(artistsUpdate, artist)
  {
    this.updateArtist(artistsUpdate);
    this.sendLog('Artista creado: ' + artist.getName());
  }

  // Notifica de un nuevo album de un artista.
  notifyNewAlbum(artist, album)
  {
    this.notifier.notifyNewAlbum(artist.getId(), artist.getName(), album.getName());
    this.sendLog('Album creado: ' + album.getName());
  }

  // Notifica de que un artista será eliminado.
  notifyRemoveArtist(artistsUpdate, artist)
  {
    this.updateArtist(artistsUpdate);
    this.notifier.notifyRemoveArtist(artist.getId(), artist.getName());
    this.sendLog('Artista eliminado: ' + artist.getName());
  }

  // Notifica de que un album fue eliminado.
  notifyRemoveAlbum(albumName)
  {
    this.sendLog('Album eliminado: ' + albumName);
  }

  // Notifica de que un track fue agregado.
  notifyNewTrack(newTrack)
  {
    this.sendLog('Track creado: ' + newTrack.getName());
  }

  // Notifica de que un track fue eliminado.
  notifyRemoveTrack(trackToRemove)
  {
    this.sendLog('Track eliminado: ' + trackToRemove.getName());
  }

  // Manda un mensaje de log a Slack.
  sendLog(message)
  {
    this.monitorLog.log(message);
  }

}

module.exports = Observer;