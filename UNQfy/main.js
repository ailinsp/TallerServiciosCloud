

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

//dar de alta
function addArtist(unqfy, params) {
  unqfy.addArtist(params);
  console.log("Artist successfully added.");
}

function addTrack(unqfy, params) {
  unqfy.addTrack(params);
  console.log("Track successfully added."); 
}

function addAlbum(unqfy, params) {
  unqfy.addAlbum(params);
  console.log("Album successfully added.");
}
//dar de baja
function removeArtist(unqfy, params) {
  unqfy.removeArtist(params);
  console.log("Artist successfully removed.");
}

function removeTrack(unqfy, params) {
  unqfy.addTrack(params);
  console.log("Track successfully removed."); 
}

function removeAlbum(unqfy, params) {
  unqfy.removeAlbum(params);
  console.log("Album successfully removed.");
}
///////////
/*
 En esta funcion deberán interpretar los argumentos pasado por linea de comandos
 e implementar los diferentes comandos.

  Se deberán implementar los comandos:
    - Alta y baja de Artista DONE
    - Alta y Baja de Albums  DONE
    - Alta y Baja de tracks  DONE

    - Listar todos los Artistas
    - Listar todos los albumes de un artista
    - Listar todos los tracks de un album

    - Busqueda de canciones intepretadas por un determinado artista
    - Busqueda de canciones por genero

    - Dado un string, imprimmir todas las entidades (artistas, albums, tracks, playlists) que coincidan parcialmente
    con el string pasado.

    - Dada un nombre de playlist, una lista de generos y una duración máxima, crear una playlist que contenga
    tracks que tengan canciones con esos generos y que tenga como duración máxima la pasada por parámetro.

  La implementacion de los comandos deberá ser de la forma:
   1. Obtener argumentos de linea de comando
   2. Obtener instancia de UNQfy (getUNQFy)
   3. Ejecutar el comando correspondiente en Unqfy
   4. Guardar el estado de UNQfy (saveUNQfy)

*/

function main() {
  
  console.log('arguments: ');
  process.argv.forEach(argument => console.log(argument));
}

main();
