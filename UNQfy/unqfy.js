
const picklify = require('picklify'); // para cargar/guarfar unqfy
const fs = require('fs'); // para cargar/guarfar unqfy
const rp = require('request-promise');
const Track = require('./track.js');
const PlayList = require('./playList.js');
const Artist = require('./artist.js');
const Album = require('./album.js');
const MusixMatch = require('./musixmatch.js');
const errors = require('./UNQfyApiErrors.js');

class UNQfy {

  constructor() 
  {
    this.artists = [];
    this.playlists = [];
    this.ids = 0;
    this.token = 'BQD7davBCkN-Z39J6sz467cv9Ff_0JtYVcwIDptwAqfdD2x1-qOJnQUX6H70b36oM6kyFGoPF9HbtRNsY_x38F6UW3xvs3RQZFD4zNCXy79e0wq4fcyp9xxtL3W-C-jf6h4aM5pdCheotygnqYK8C_E5CcDlkot7M60RrI8VXcJ9NaK62UHT';
  }
  // returna: Una identificación irrepetible.
  getId()
  {
    this.ids++;
    return this.ids;
  }

  // retorna: Todos los artistas.
  getArtists()
  {
    return this.artists;
  }

  // retorna: Todas las playlist.
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
    const newArtist = new Artist(this.getId(),artistData.name,artistData.country);

    if (this.hasArtistToAdd(newArtist))
    {
      throw new errors.ArtistHasAlreadyBeenRegistered(artistData.name);
      // throw new Error('El artista ' + newArtist.getName() + ' ya fue registrado');
    }
    else // No es necesario que este en el Else, puede estar afuera.
    {
      this.artists.push(newArtist);
      return newArtist;
    }
  }

  // retorna: True si el artista artistToAdd se encuentra registrado.
  hasArtistToAdd(artistToAdd)
  {
    return this.getAllNameArtists().includes(artistToAdd.getName());
  }

  // retorna: todos los nombres de los artistas.
  getAllNameArtists()
  {
    return this.artists.map(artist => artist.getName());
  }

  // retorna: El artista con el nombre name
  findArtist(name)
  {
    return this.getArtists().find(artist => artist.isArtist(name));
  }
  // Elimina el artista con el nombre name, si el artista no existe informa el error ocurrido.
  // También elimina todo los albums y playlist del artista.
  removeArtist(name)
  {
    const artistToRemove = this.findArtist(name);

    if (artistToRemove === undefined) // Si artistToRemove no se encontró...
    {
      throw new Error('No se encontró el artista ' + name);
    }
    const albumsToRemove = artistToRemove.getAlbums();
    const tracksToRemove = this.getAllTracksFromAlbums(albumsToRemove);
    
    this.removeTracksFromPlaylists(tracksToRemove);
    //this.getPlaylist().forEach(playlist => playlist.filterTracks(this.getTracksMatchingArtist(name)));
    
    const indexToRemove = this.getArtists().indexOf(artistToRemove);
    this.artists.splice(indexToRemove,1);

    console.log('El artista ' + name + ' ha sido eliminado con exito.');
  }

  // Elimina un track de todas las playlist.
  removeTracksFromPlaylists(tracksToRemove) 
  {
    this.getPlaylist().forEach(pl => pl.filterTracks(tracksToRemove));
  }

  // retorna: todos los tracks de los albums albumList.
  getAllTracksFromAlbums(albumList)
  {
    // [].concat.aply([], Array.map(lambda)) -> Simula un flatmap
    const allTracks = [].concat.apply([], albumList.map(album => album.getTracks())); 
    return allTracks;
  }

  // albumData: objeto JS con los datos necesarios para crear un album
  //   albumData.name (string)
  //   albumData.year (number)
  // retorna: el nuevo album creado
  addAlbum(artistId, albumData) 
  {
    const newAlbum = new Album(this.getId(), albumData.name, parseInt(albumData.year));
    this.getArtistById(parseInt(artistId)).addAlbum(newAlbum);
    console.log(newAlbum);
    return newAlbum;
  }

  // Elimina el album con el nombre albumName del artista artistName
  // Si artista o el album no existen se informa el error ocurrido
  removeAlbum (artistName, albumName)
  {
    const artist = this.findArtist(artistName);
    if (artist === undefined)
    {
      throw new Error('No se pudo encontrar al artista ' + artistName);
    }
    const albumToRemove = this.getAlbumFromArtist(artist, albumName);
    const tracksToRemove = albumToRemove.getTracks();

    this.removeTracksFromPlaylists(tracksToRemove);

    artist.removeAlbum(albumToRemove);
    
    console.log('Se ha eliminado el album ' + albumToRemove.getName() + ' del artista ' + artist.getName() + ' con exito.');
  }


  // return: el album de nombre albumName del artista artist.
  getAlbumFromArtist(artist, albumName)
  {
    return artist.getAlbums().find(album => album.hasName(albumName));
  }

  // retorna: todos los albumes de todos los artistas.
  getAllAlbums()
  {  
    const albumsList = this.artists.map(artist => artist.getAlbums());
    const albums = albumsList.reduce ((a,b) => { 
      return a.concat(b);
    }, []);

    return albums;
  }


  // retorna: el album con la id, si no existe muestra el error.
  getAlbumById(id) 
  {
    const result = this.getAllAlbums().find(album => album.isId(id));
    if (result === undefined)
    {
      throw new errors.AlbumIdNotFoundException(id);
      // throw new Error('No existe un album con la identificacion: ' + id);
    }
    return result;
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
    const newTrack = new Track (this.getId(), trackData.name, parseInt(trackData.duration), trackData.genres);
    //this.ids = this.id+1;
    this.getAlbumById(parseInt(albumId)).addNewTrack(newTrack);
    return newTrack;
  }

  
  // Elimina el track trackName del album albumName
  // Además se elimina de playlists->tracks
  removeTrack(artistName, albumName, trackName)
  {
    const artist = this.findArtist(artistName);
    if (artist === [])
    {
      throw new Error('No se encontro un artista con el nombre ' + artistName);
    }
    const album = artist.getAlbumByName(albumName);
    const trackToRemove = album.searchTrack(trackName);
    this.playlists.forEach(playlist => playlist.removeTrack(trackToRemove));
    album.removeTrack(trackToRemove);
    console.log('Se ha eliminado el track ' + trackName + ' del album ' + albumName + ' con exito.');
  }

  // retorn: El album con el nombre name, si no existe informa el error.
  findAlbum(name)
  {
    const result = this.getAllAlbums().find(album => album.hasName(name));
    if (result === undefined)
    {
      throw new Error('No se encontro el album con el nombre: ' + name);
    }
    return result;
  }


  // retorna: El artista con la id, si no existe muestra el error.
  getArtistById(id) 
  {
    const result = this.getArtistByIdNotError(id);
    if (result === undefined)
    {
      throw new errors.ArtistIdNotFoundException(id);
      // throw new Error('No se encontro un artista con la identificacion: ' + id);
    }
    return result;
  }

  // retorna: El artista con la id, si no existe devuelve undefined.
  getArtistByIdNotError(id) 
  {
    return this.artists.find(artista => artista.hasId(id));
  }

  // retorna: El track con la identificacion id, si no existe muestra el error.
  getTrackById(id) 
  {
    const result = this.getAllTracks().find(track => track.isTrack(id));
    if (result === undefined)
    {
      throw new errors.TrackIdNotFoundException(id);
      // throw new Error('No existe un track con la identificación: ' + id);
    }
    
    return result;
  }

  // retorna: Una lista con todos los tracks de los albumes
  getAllTracks()
  {
    const tracksLists = this.getAllAlbums().map(album => album.getTracks());
    const tracks = tracksLists.reduce( (a,b) => { 
      return a.concat(b); 
    });
    return tracks;
  }

  // retorna: La playlist con identificacion id, si no existe muestro el error.
  getPlaylistById(id) 
  {
    const result= this.playlists.find(playlist => playlist.isId(id));
    // NOTA: Falta implementar isId en Playlist que dado una id, pregunta si esa id le pertenece.
    if (result === undefined)
    {
      throw new Error('No existe una lista de reproduccion con la identificacion: ' + id);
    }
    return result;
  }

  // genres: array de generos(strings)
  // retorna: los tracks que contenga alguno de los generos en el parametro genres
  getTracksMatchingGenres(genres) 
  {
    const allTracks = this.getAllTracks();
    return allTracks.filter(track => track.hasAnyGenre(genres));
  }

  // artistName: nombre de artista(string)
  // retorna: los tracks interpredatos por el artista con nombre artistName
  getTracksMatchingArtist(artistName) 
  {
    const albumsFromArtist = this.getAlbumByArtist(artistName);
    return this.getAllTracksFromAlbums(albumsFromArtist);
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
    const tracksToInlude = this.getTracksMatchingGenres(genresToInclude).filter(track => track.hasMaxDuration(maxDuration));
    const newPlaylist = new PlayList(name, tracksToInlude);
    this.playlists.push(newPlaylist);
    return newPlaylist;
  }

  // retorna: todos los albums del artista
  getAlbumByArtist(artistName)
  {
    const artist = this.findArtist(artistName);
    return artist.getAlbums();
  }

  // name: nombre del album (string)
  // retorna: los tracks del album name
  getTracksByAlbum(name)
  {
    return this.findAlbum(name).getTracks();
  }

  // retorna: todos los artistas cuyos nombres macheen con el nombre dado.
  searchArtistsByName(name)
  {
    return this.artists.filter(artist => artist.isPartOfName(name));
  }
  // retorna: todos los albumes cuyos nombres macheen con el nombre dado.
  searchAlbumsByName(name)
  {
    return this.getAllAlbums().filter(album => album.isPartOfName(name));
  }

  // retorna: todos los tracks, albums, artistas y playlista cuyos nombres macheen con name.
  searchByName(name)
  {
    const tracksL = this.getAllTracks().filter(track => track.isPartOfName(name));
    const albums = this.searchAlbumsByName(name);
    const artists = this.searchArtistsByName(name);
    const playListsL = this.playlists.filter(playList => playList.isPartOfName(name));
    
    return {
      artists: artists,
      albums: albums,
      tracks: tracksL,
      playlists: playListsL,
    };
  }

  //artistName: Nombre del artista (String)
  // retorna: una lista con los nombres de los albumes de ese artista.
  getAlbumsForArtist(artistName)
  {
    return this.getAlbumByArtist(artistName).forEach(album =>album.getName());
  }

  // retorna: el artista perteneciente al track
  getArtistFromTrack(trackId)
  {
    console.log('buscando artista...');
    const artist = this.artists.find(artist => artist.hasTrack(trackId));
    // NOTA: Todos los tracks tienen un artista relacionado.
    if (artist === undefined)
    {
      throw new errors.TrackIdNotFoundException(trackId);
    }
    return artist;
  }

  // retorna: el artista perteneciente al album
  getArtistFromAlbum(album)
  {
    const artist = this.artists.find(a => a.hasAlbumId(album.getId()));
    // NOTA: Todos los albums tienen un artista relacionado.
    if (artist === undefined)
    {
      throw new errors.AlbumIdNotFoundException(album.name());
    }
    return artist;
  }


  getLyric(aTrack, artistName)
  {
    console.log('Buscando letra del track ' + aTrack.getName() + ' en musixmatch... ');
    const musixmatch = new MusixMatch();
    return musixmatch.searchLyric(aTrack.getName(), artistName).then(newlyric => 
    {
      aTrack.lyrics = newlyric;
      return 'Letra encontrada';
    }).catch(err => console.log(err));
  }

  // trackName: El nombre el track (String)
  // artistName: nombre del artista (String)
  // retorna: El track del artista
  getTrackFromArtist(trackName, artistName)
  {
    const artistTracks = this.getAlbumByArtist(artistName).map(a => a.getTracks()).reduce( (a,b) => { 
      return a.concat(b); 
    });
    const result = artistTracks.find(t => t.getName() === trackName);
    if (result === undefined)
    {
      new Error('No se encontró el track ' + trackName + ' del artista ' + artistName);
    }
    return result;
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
    const classes = [UNQfy, Track, PlayList, Artist, Album];
    return picklify.unpicklify(JSON.parse(serializedData), classes);
  }
  
  getArtistIDByNameSpotify(artistName)
  {
    const options = {
      url: `https://api.spotify.com/v1/search?q=${artistName}&type=artist&limit=1`,
      headers: { Authorization: 'Bearer ' + this.token},
      json: true,
    };
    return rp.get(options).then((response) => 
    {
      console.log('Artist founded...');
      return response.artists.items[0];
    }).catch((error) => console.log('Something went wrong, the artist problably does not exist', error));
  }
  
  getAlbumsFromArtistSpotify(artistId, id){
    const options = {
      url: `https://api.spotify.com/v1/artists/${artistId}/albums?market=ES&limit=5`,
      headers: { Authorization: 'Bearer ' + this.token},
      json: true,
    };
    return rp.get(options).then((response) => 
    {
      console.log('Getting albums...');
      return response.items.forEach(album => this.addAlbum(id, album));
    }).catch((error) => console.log('Something went wrong, the artist problably does not exist'));  
  }

  populateAlbumsForArtist(artistName)
  {
    const artistId = this.findArtist(artistName).getId();
    return this.getArtistIDByNameSpotify(artistName)
      .then((artist) => this.getAlbumsFromArtistSpotify(artist.id, artistId));
  }
}

// COMPLETAR POR EL ALUMNO: exportar todas las clases que necesiten ser utilizadas desde un modulo cliente
module.exports = {
  UNQfy, 
};
