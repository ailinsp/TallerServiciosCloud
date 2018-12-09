
const picklify = require('picklify'); // para cargar/guarfar notifier
const fs = require('fs'); // para cargar/guarfar notifier
const rp = require('request-promise');
// const errors = require('./notifierApiErrors.js');
const ServiceUNQfy = require('./serviceUNQfy.js');
const ServiceGmail = require('./serviceGmail.js');
const Suscription = require('./suscription.js');

class Notifier {

  constructor() 
  {
    this.subscriptions = [];
    this.unqfy = new ServiceUNQfy();
    this.gmail = new ServiceGmail();
  }

  addSuscriptor(idArtist, email)
  {
    const artist = this.findArtistUNQfy(idArtist);
    if (artist === undefined)
    {
      throw new Error("No existe un artista con la identificacion " + idArtist);
    }
    return this.suscribed(idArtist, email)
  }

  // retorna: El artista con id idArtist en UNQfy.
  findArtistUNQfy(idArtist)
  {
    return this.unqfy.findArtist(parseInt(idArtist));
  }

  // retorna: True si el email ya esta sucripto al artista artistId.
  hasSuscription(artistId, email)
  {
    const suscription = this.findArtistSuscription(parseInt(artistId));
    return suscription.hasUser(email);
  }

  // Retorn la suscripcion perteneciente a idArtist
  findArtistSuscription(idArtist)
  {
    return this.subscriptions.find(susc => susc.hasArtist(parseInt(idArtist)) );
  }

  // retorna: Suscribe un usuario al artista artistId
  suscribed (artistId, email)
  {
    const suscription = this.findArtistSuscription(parseInt(artistId));
    if (suscription === undefined) // Si no se encontro una suscripcion para artistId
    {
      const newSuscription = new Suscription(parseInt(artistId)); // Creo una nueva suscripcion
      newSuscription.suscribed(email); // ... le agrego un suscriptor
      this.subscriptions.push(newSuscription); // Agrego una suscripcion nueva
      return newSuscription;
    }
    else
    {
      suscription.suscribed(email) // Solo le agrego un nuevo suscriptor
      return suscription;
    }
  }

  removeSuscription(artistName, email)
  {
    const idArtist = // consultar el servicio UNQfy por el id del artista artistName
    this.unsubscribe(idArtist, email)
  }

  unsubscribe (idArtist, email)
  {
    const suscriptionArtist = this.findArtistSuscription(parseInt(idArtist)); // Busco la suscripcion del idArtista
    if(suscriptionArtist === undefined)
    {
      throw new Error("No existe una suscripcion del artista con identificacion " + idArtist);
    }
    suscriptionArtist.unsubscribe(email);
  }

  // Manda un mail de notificacion a los usuarios suscriptos al artista artistId con las especificaciones:
  // subject: asunto del email
  // message: el contenido del email
  // from: el emisor del email
  notify (artistId, subject, message, from)
  {
    const suscription = this.findArtistSuscription(parseInt(artistId));
    console.log(suscription);
    suscription.notifySubscripber(this.gmail, subject, message, from);
  }

  // retorna: Todos los suscriptores del artista idArtist.
  getSubscribersFromArtist(idArtist)
  {
    const suscription = this.findArtistSuscription(parseInt(idArtist));
    if (suscription === undefined) // Si aun no hay suscripcion del artista
    {
      return []; // retorno una lista vacía.
    }
    return suscription.getUsers();
  }

  // Elimina todas las suscripciones del artista idArtist
  removeAllSuscriptions(idArtist)
  {
    const suscript = this.findArtistSuscription(parseInt(idArtist));
    if (suscript !== undefined) // Si existe la suscripcion...
    {
      const indexToRemove = this.subscriptions.indexOf(suscript);
      this.subscriptions.splice(indexToRemove,1); // Se elimina.
    }
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
    const classes = [Notifier, ServiceUNQfy, ServiceGmail, Suscription];
    return picklify.unpicklify(JSON.parse(serializedData), classes);
  }
  
}

// COMPLETAR POR EL ALUMNO: exportar todas las clases que necesiten ser utilizadas desde un modulo cliente
module.exports = {
    Notifier, 
};