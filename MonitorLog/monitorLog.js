
const picklify = require('picklify'); // para cargar/guarfar notifier
const fs = require('fs'); // para cargar/guarfar notifier
const rp = require('request-promise');
// const errors = require('./notifierApiErrors.js');
const ServiceSlack = require('./serviceSlack.js');
const ServiceUNQfy = require('./serviceUNQfy.js');
const ServiceNotifier = require('./serviceNotifier.js');

class MonitorLog {

  constructor() 
  {
    this.statusLog = false;
    this.slack = new ServiceSlack();
    this.unqfy = new ServiceUNQfy();
    this.notifier = new ServiceNotifier();
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

  // Manda una peticion de busqueda de artistas en UNQfy para monitorear si esta activo o no.
  monitorUNQfy()
  {
    return this.unqfy.getStatus();
  }

  // Manda una peticion del estado de Notifier para monitorear si esta activo o no.
  // 0 = inactivo
  // 1 = activo
  monitorNotifier()
  {
    return this.notifier.getStatus();
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
    const classes = [MonitorLog, ServiceSlack,ServiceUNQfy, ServiceNotifier];
    return picklify.unpicklify(JSON.parse(serializedData), classes);
  }
  
}

// COMPLETAR POR EL ALUMNO: exportar todas las clases que necesiten ser utilizadas desde un modulo cliente
module.exports = {
  MonitorLog, 
};