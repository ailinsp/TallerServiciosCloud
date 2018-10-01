

const fs = require('fs'); // necesitado para guardar/cargar unqfy
const unqmod = require('./unqfy'); // importamos el modulo unqfy

// Retorna una instancia de UNQfy. Si existe filename, recupera la instancia desde el archivo.
function getUNQfy(filename = 'data.json') {
  let unqfy = new unqmod.UNQfy();
  if (fs.existsSync(filename)) {
    unqfy = unqmod.UNQfy.load(filename);
  }
  return unqfy;
}

function saveUNQfy(unqfy, filename = 'data.json') {
  unqfy.save(filename);
}

function main() {
  
  console.log('arguments: ');
  process.argv.forEach(argument => console.log(argument));

  const args = process.argv.slice(2);

  //dar de alta
  if (args[0] === 'addArtist')
  {
    const unqfy = getUNQfy();
    unqfy.addArtist(
      {
        name: args[1],
        country: args[2],
      }
    );
    saveUNQfy(unqfy);
    console.log('Artist successfully added.');
  }

  if (args[0] === 'addAlbum'){
    const unqfy = getUNQfy();
    unqfy.addTrack(args[1],{
      name: args[2],
      year: args[3]});
    saveUNQfy(unqfy);
    console.log('Album successfully added.');
  }

  if (args[0] === 'addTrack'){
    const unqfy = getUNQfy();
    unqfy.addTrack(args[1],{
      name: args[2],
      duration: args[3],
      genres: args[4]});
    saveUNQfy(unqfy);
    console.log('Track successfully added.');
  }
  
  //dar de baja
  if (args[0] === "removeArtist"){
    const unqfy = getUNQfy();
    unqfy.removeArtist(args[1]);
    saveUNQfy(unqfy);
    console.log("Artist successfully removed.");
  }

  if (args[0] === "removeAlbum"){
    const unqfy = getUNQfy();
    unqfy.removeAlbum(args[1]);
    saveUNQfy(unqfy);
    console.log("Album successfully removed.");
  }

  if (args[0] === "removeTrack"){
    const unqfy = getUNQfy();
    unqfy.removeTrack(args[1]);
    saveUNQfy(unqfy);
    console.log("Track successfully removed.");
  }

  //listar todos los artistas
  if (args[0] === 'getArtists')
  {
    const unqfy = getUNQfy();
    unqfy.getArtists();
    console.log(unqfy.getArtists());
    saveUNQfy(unqfy);
  }
  
  //listar todos los albums de artista
  if (args[0] === 'getAlbumByArtist')
  {
    const unqfy = getUNQfy();
    unqfy.getAlbumByArtist(args[1]);
    console.log(unqfy.getAlbumByArtist(args[1]));
    saveUNQfy(unqfy);
  }

  //listar los tracks de un album
  if (args[0] === 'getTracksByAlbum'){
    const unqfy = getUNQfy();
    unqfy.getTracksByAlbum(args[1]);
    console.log(unqfy.getTracksByAlbum(args[1]));
    saveUNQfy(unqfy);
  }
  
  //Busqueda de canciones intepretadas por un determinado artista
  if (args[0] === 'getTracksByArtist'){
    const unqfy = getUNQfy();
    unqfy.getTracksMatchingArtist(args[1]);
    console.log(unqfy.getTracksMatchingArtist(args[1]));
    saveUNQfy(unqfy);
  }

  //Busqueda de canciones por genero
  if (args[0] === 'getTracksByGenres'){
    const unqfy = getUNQfy();
    unqfy.getTracksMatchingGenres(args[1]);
    console.log(unqfy.getTracksMatchingGenres(args[1]));
    saveUNQfy(unqfy);
  }

  //Dado un string, imprimmir todas las entidades (artistas, albums, tracks, playlists) que coincidan parcialmente
  //con el string pasado.
  if (args[0] === 'getEverythingByName'){
    const unqfy = getUNQfy();
    unqfy.searchByName(args[1]);
    console.log(unqfy.searchByName(args[1]));
    saveUNQfy(unqfy);
  }

  //Dada un nombre de playlist, una lista de generos y una duración máxima, crear una playlist que contenga
  //tracks que tengan canciones con esos generos y que tenga como duración máxima la pasada por parámetro.
  if (args[0] === 'createPlaylist'){
    const unqfy = getUNQfy();
    unqfy.createPlaylist(args[1], args[2], args[3]);
    saveUNQfy(unqfy);
    console.log(unqfy.createPlaylist(args[1], args[2], args[3]));
  }

}

main();
