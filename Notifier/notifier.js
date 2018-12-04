
const picklify = require('picklify'); // para cargar/guarfar notifier
const fs = require('fs'); // para cargar/guarfar notifier
const rp = require('request-promise');
// const errors = require('./notifierApiErrors.js');
const ServiceUNQfy = require('./serviceUNQfy.js');
const ServiceGmail = require('./serviceGmail.js');

class Notifier {

  constructor() 
  {
    this.subscriptions = [];
    this.serviceUNQfy = new ServiceUNQfy();
    this.serviceGmail = new ServiceGmail();
  }

  addSuscriptor(artistName, email)
  {
    const idArtist = this.serviceUNQfy.findIdArtist(artistName);
    // IMPLEMENTAR findIdArtist EN EL SERVICIO DE UNQFY
    // consulta el servicio UNQfy por el id del artista artistName
    this.suscribed(idArtist, email)
  }

  suscribed (idArtist, email)
  {
    const suscription = this.findArtistSuscription(idArtist); 
    // IMPLEMENTAR findArtistSuscription  en suscription
    // Busca suscripcion de idArtists

    if (suscription === undefined)
    {
      suscription = new Suscription(idArtist); // Creo una nueva suscripcion
      suscription.suscribed(email); // ... le agrego un suscriptor
      this.subscriptions.push(suscription); // Agrego una suscripcion nueva
    }
    else
    {
      suscription.suscribed(email)
    }
  }

  removeSuscription(artistName, email)
  {
    const idArtist = // consultar el servicio UNQfy por el id del artista artistName
    this.desuscribed(idArtist, email)
  }

  desuscribed (idArtist, email)
  {
    const suscriptionArtist = this.findArtistSuscription(idArtist); // Busco la suscripcion del idArtista
    const mySuscription = suscriptionArtist.findUser(email); // Buscar suscripcion de email en la suscripcion suscriptionArtist
    if (! mySuscription === undefined) // Si estoy suscripto
    {
      suscriptionArtist.desuscribed(email); // me desuscribo :D
    }
  }

  notify (idArtist)
  {
    const mails = this.subscriptions.getMailsSuscriptors(idArtist);
    // IMPLEMENTAR getMailsSuscriptors en suscription
    // obtiene los mail correspondientes a idArtist

    mails.forEach(mail => this.serviceGmail.notifySuscriptor(mail)); 
    // IMPLEMENTAR notifySuscriptor en serviceGmail
    // Manda un mail por gmail
  }

  // Elimina todas las suscripciones del artista idArtist
  removeAllSuscriptions(idArtist)
  {
    const suscript = this.findArtistSuscription(idArtist);
    if (! suscript === undefined)
    {
      const index = this.subscriptions.indexOf(suscript);
      this.subscriptions(index);
    }
  }

  // Retorn la suscripcion perteneciente a idArtist
  findArtistSuscription(idArtist)
  {
    this.subscriptions.find(susc => susc.hasArtist(idArtist));
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
    const classes = [Notifier,];
    return picklify.unpicklify(JSON.parse(serializedData), classes);
  }
  
}

// COMPLETAR POR EL ALUMNO: exportar todas las clases que necesiten ser utilizadas desde un modulo cliente
module.exports = {
    Notifier, 
};