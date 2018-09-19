const picklify = require('picklify'); // para cargar/guarfar unqfy
const fs = require('fs'); // para cargar/guarfar unqfy
const Track = require('./track.js');
const PlayList = require('./playList.js');
const Artist = require('./artist.js');
const Album = require('./album.js');
const IdGenerator = require('./idGenerator.js');
var ids = 0;

class UNQfy {

  constructor() 
  {
    this.artists = [];
    this.playlists = [];
    //this.idGenerator = new IdGenerator();
  }

  getAllAlbums(){
    let result = [];
    let albums = this.artists.map(artist => artist.getAlbums());
    albums.forEach(listAlbums => result.concat(listAlbums));
    /*
    while(!albums === [])
    {
      albumsList = albumsList + albums.pop();
    }
    */
    return result;
  }

  getArtists()
  {
    return this.artists;
  }

  getPlaylist()
  {
    return this.playlists;
  }

  // artistData: objeto JS con los datos necesarios para crear un artista
  //   artistData.name (string)
  //   artistData.country (string)
  // retorna: el nuevo artista creado
  addArtist(artistData) 
  {
  // Crea un artista y lo agrega a unqfy.
  /*
  El objeto artista creado debe soportar (al menos):
    - una propiedad name (string)
    - una propiedad country (string)
  */
    let newArtist = new Artist(ids,artistData.name,artistData.country);
    ids++;
    this.artists.push(newArtist);
    return newArtist;
  }

  // Elimina el artista con el nombre name, si el artista no existe informa el error ocurrido.
  // 
  removeArtist(name)
  {
    let artistToRemove = findArtist(name);
    if (artistToRemove === undefined) // Si artistToRemove no se encontró...
    {
      throw new Error("No se encontró el artista " + name);
    }
    let indexToRemove = this.getArtists().indexOf(artistToRemove);
    let artistRemoved = this.artists.splice(indexToRemove,1);

    this.getPlaylist().forEach(playlist => playlist.filterTracks(this.getTracksMatchingArtist(name)));
    // IMPLEMENTAR: filterTracks([tracks]) en Playlist que, dado una lista de tracks, los elimina de la playlist
    console.log("El artista " + name + " ha sido eliminado con exito.");
  }

  // retorna: El artista con el nombre name
  findArtist(name)
  {
    return this.getArtists().find(artist => artist.isArtist(name));
    // IMPLEMENTAR: isArtist en Artist
    // artist.hasName(name)
  }

  // albumData: objeto JS con los datos necesarios para crear un album
  //   albumData.name (string)
  //   albumData.year (number)
  // retorna: el nuevo album creado
  addAlbum(artistId, albumData) {
  /* Crea un album y lo agrega al artista con id artistId.
    El objeto album creado debe tener (al menos):
     - una propiedad name (string)
     - una propiedad year (number)
  */
    let newAlbum = new Album(ids, albumData.name, albumData.year);
    ids++;
    this.getArtistById(artistId).addAlbum(newAlbum);
    // IMPLEMENTAR: addAlbum(album) en Artist que, dado un album, lo gregue a su lista de albums
    return newAlbum;
  }

  // Elimina el album con el nombre albumName del artista artistName
  // Si artista o el album no existen se informa el error ocurrido
  removeAlbum (artistName, albumName)
  {
    let artist = this.findArtist(artisName);
    if (artist == undefined)
    {
      throw new Error("No se pudo encontrar al artista " + artistName);
    }
    artist.removeAlbum(albumName);
    // IMPLEMENTAR: removeAlbum(name) en Artist que elimina el album de nombre name
    // ... si el album name no se encuentra, lanza un error.
    this.getPlaylist().forEach(playlist => playlist.filterTracks(this.getTracksByAlbum(albumName)));
    console.log("Se ha eliminado el album " + albumName + " con exito.");
  }


  // trackData: objeto JS con los datos necesarios para crear un track
  //   trackData.name (string)
  //   trackData.duration (number)
  //   trackData.genres (lista de strings)
  // retorna: el nuevo track creado
  addTrack(albumId, trackData) 
  {
  /* Crea un track y lo agrega al album con id albumId.
  El objeto track creado debe tener (al menos):
      - una propiedad name (string),
      - una propiedad duration (number),
      - una propiedad genres (lista de strings)
  */
    let newTrack = new Track(ids, trackData.name, trackData.duration, trackData.genres);
    ids++;
    this.getAlbumById(albumId).addNewTrack(newTrack);
    return newTrack;
  }

  
  // Elimina el track trackName del album albumName
  // Además se elimina de playlists->tracks
  removeTrack(albumName, trackName)
  {
    let trackToRemove = findAlbum(albumName).searchTrack(trackName);
    // IMPLEMENTAR: searchTrack(trackName) en Album que, dado un nombre devuelve el track con ese nombre
    //... si no lo encuentra lo informa por consola.
    this.getPlaylist.forEach(playlist => playlist.removeTrack(trackToRemove));
    // IMPLEMENTAR: removeTrack en Playlist que, dado un track lo elimina de sus tracks
    //... si no lo tiene, no hace nada.
    album.removeTrack(trackToRemove);
    // IMPLEMENTAR: removeTrack en Album que, dado un track lo elimina de sus tracks
    // ... si no lo tiene informa el error.
    console.log("Se ha eliminado el track " + trackName + " del album " + albumName + " con exito.");
  }

  // retorn: El album con el nombre name, si no existe informa el error.
  findAlbum(name)
  {
    let result = this.getAllAlbums().find(album => album.hasName(name));
    // IMPLEMENTAR: hasName(albumName) en Album que, dado un nombre pregunta si le pertenece.
    if (result === undefined)
    {
      throw new Error("No se encontro el album con el nombre: " + name);
    }
    return reault;
  }


  // retorna: El artista con la id, si no existe muestra el error.
  getArtistById(id) 
  {
    let result = this.getArtists().find(artista => artista.hasId(id))
    if (result === undefined)
    {
      throw new Error("No se encontro un artista con la identificacion: " + id);
    }
    return result;
  }

  // retorna: el album con la id, si no existe muestra el error.
  getAlbumById(id) 
  {
    let result = this.getAllAlbums().find(album => album.isId(id));
    if (result === undefined)
    {
      throw new Error("No existe un album con la identificacion: " + id)
    }
    return result;
  }


  // retorna: El track con la identificacion id, si no existe muestra el error.
  getTrackById(id) 
  {
    let result = this.getAllTracks().find(track => track.isTrack(id))
    if (result === undefined)
    {
      throw new Error("No existe un track con la identificación: " + id);
    }
    return result;
  }

  // retorna: Una lista con todos los tracks de los albumes
  getAllTracks()
  {
    let tracksList = [];
    let tracks = this.getAllAlbums().map(album => album.getTracks());
    while(!tracks === [])
    {
      tracksList = tracksList + (tracks.pop());
    }
    return tracksList;
  }

  // retorna: La playlist con identificacion id, si no existe muestro el error.
  getPlaylistById(id) 
  {
    let result= this.playlists.find(playlist => playlist.isId(id));
      // NOTA: Falta implementar isId en Playlist que dado una id, pregunta si esa id le pertenece.
    if (result === undefined)
    {
      throw new Error("No existe una lista de reproduccion con la identificacion: " + id);
    }
    return result;
  }

  // genres: array de generos(strings)
  // retorna: los tracks que contenga alguno de los generos en el parametro genres
  getTracksMatchingGenres(genres) 
  {
    return this.getAllTracks().filter(track => track.hasAnyGenre(genres))
    // IMPLEMENTAR: hasAnyGenre([string]) en Track, donde recibe una lista de generos y...
    // pregunta si el track tiene algún género de la lista.
  }

  // artistName: nombre de artista(string)
  // retorna: los tracks interpredatos por el artista con nombre artistName
  getTracksMatchingArtist(artistName) 
  {
    let foundTracks = [];
    let artist = findArtist(artistName);
    if (! artist === undefined)
    {
      foundTracks = artist.getTracks();
      // IMPLEMENTAR: getTracks() en Artist que retorna los tracks pertenecientes al artista.
    }
    return foundTracks;
  }


  // name: nombre de la playlist
  // genresToInclude: array de generos
  // maxDuration: duración en segundos
  // retorna: la nueva playlist creada
  createPlaylist(name, genresToInclude, maxDuration) 
  {
  /*** Crea una playlist y la agrega a unqfy. ***
    El objeto playlist creado debe soportar (al menos):
      * una propiedad name (string)
      * un metodo duration() que retorne la duración de la playlist.
      * un metodo hasTrack(aTrack) que retorna true si aTrack se encuentra en la playlist.
  */
    let tracksToInlude = getTracksMatchingGenres(genresToInclude).filter(track => track.hasMaxDuration(maxDuration))
    // NOTA: Falta implementar hasMaxDuration(number) en Track, que dado una duración en segundos..
    // pregunte si el track dura menos(o igual) que esos segundos.
    let newPlaylist = new Playlist(name, tracksToInlude);
    this.playlists.push(newPlaylist);
    return newPlaylist;
  }

  // name: nombre del artista (string)
  // retorna: todos los albums del artista
  getAlbumByArtist(name)
  {
    let artist = this.findArtist(name);
    if (artist === undefined)
    {
      throw new Error("No se pudo encontrar el artista " + name);
    }
    return artist.getAlbums();
    // IMPLEMENTAR: getAlbums() en Artist que, retorna los albums del artista.
  }

  // name: nombre del album (string)
  // retorna: los tracks del album name
  getTracksByAlbum(name)
  {
    return this.findAlbum(name).getTracks();
    // IMPLEMENTAR: getTracks() en Albums que retorna sus tracks
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
    const classes = [UNQfy, Track, PlayList, Artist, Album, IdGenerator];
    return picklify.unpicklify(JSON.parse(serializedData), classes);
  }
}

// COMPLETAR POR EL ALUMNO: exportar todas las clases que necesiten ser utilizadas desde un modulo cliente
module.exports = {
  UNQfy, 
};

