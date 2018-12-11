
const picklify = require('picklify'); // para cargar/guarfar notifier
const fs = require('fs'); // para cargar/guarfar notifier
const rp = require('request-promise');
// const errors = require('./notifierApiErrors.js');
const ServiceSlack = require('./serviceSlack.js');

class MonitorLog {

  constructor() 
  {
    this.statusLog = false;
    this.slack = new ServiceSlack();
  }

  // Activa el servicio de notificacion a Slack.
  activateLog()
  {
    this.statusLog = true;
    console.log("El servicio de log se ha ACTIVADO.");
  }

  // Desactiva el servicio de notificacion a Slack.
  deactivateLog()
  {
    this.statusLog = false;
    console.log("El servicio de log se ha DESACTIVADO.");
  }

  // Manda un mensaje de log a Slack.
  sendLog(message)
  {
    if (this.statusLog)
    {
      this.slack.log(message);
    }
  }

  // Manda un mensaje de log a Slack de un artista creado.
  logArtistCreated(artistName)
  {
    this.sendLog("Artista creado: " + artistName);
  }

  // Manda un mensaje de log a Slack de un artista eliminado.
  logArtistRemoved(artistName)
  {
    this.sendLog("Artista eliminado: " + artistName);
  }

  // Manda un mensaje de log a Slack de un album creado.
  logAlbumCreated(albumName)
  {
    this.sendLog("Album creado: " + albumName);
  }

  // Manda un mensaje de log a Slack de un album eliminado.
  logAlbumRemoved(albumName)
  {
    this.sendLog("Album eliminado: " + albumName);
  }

  // Manda un mensaje de log a Slack de un track creado.
  logTrackCreated(trackName)
  {
    this.sendLog("Track creado: " + trackName);
  }

  // Manda un mensaje de log a Slack de un track eliminado.
  logTrackRemoved(trackName)
  {
    this.sendLog("Track eliminado: " + trackName);
  }



  save(filename) 
  {
    const listenersBkp = this.listeners;
    this.listeners = [];

    const serializedData = picklify.picklify(this);

    this.listeners = listenersBkp;
    fs.writeFileSync(filename, JSON.stringify(serializedData, null, 2));
  }

  static load(filename) {
    const serializedData = fs.readFileSync(filename, {encoding: 'utf-8'});
    //COMPLETAR POR EL ALUMNO: Agregar a la lista todas las clases que necesitan ser instanciadas
    const classes = [MonitorLog, ServiceSlack];
    return picklify.unpicklify(JSON.parse(serializedData), classes);
  }
  
}

// COMPLETAR POR EL ALUMNO: exportar todas las clases que necesiten ser utilizadas desde un modulo cliente
module.exports = {
  MonitorLog, 
};