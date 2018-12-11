/* eslint-disable no-undef */
/* eslint-disable prefer-arrow-callback */
const express = require('express'); // call express
const app = express(); // define our app using express
const router = express.Router();
const port = process.env.PORT || 8080; // set our port
const unqmod = require('./unqfy'); // importamos el modulo unqfy
const fs = require('fs'); // se necesita para guardar/cargar unqfy
const bodyParser = require('body-parser');
const errors = require('./UNQfyApiErrors.js'); // api de errores

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', router);
app.use(errorHandler); // Registramos un manejador de errores


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

// <*><*><*><*><*> IMPLEMENTACION SERVICIOS <*><*><*><*><*>

// Ruta inicial de nuestra API
router.get('/', (req, res) => 
{
  res.json({ message: 'hooray! welcome to our api!' });
});

app.use('/api', router);
app.listen(port);
console.log('Magic happens on port ' + port);

// Error de URL invalida
app.use((req, res, err) => {
  const error = new errors.InvalidOrUnexistingURLError();
  res.status(error.status);
  res.json({status: error.status, errorCode:error.errorCode});
});

// ErrorHandler
function errorHandler(err, req, res, next) {
  console.error(err.name); // se imprime error en consola
  //actuamos dependiendo el tipo de error 
  if (err instanceof errors.ApiError)
  {
    res.status(err.status);
    res.json({status: err.status, errorCode: err.errorCode});
  } 
  else if (err.type === 'entity.parse.failed')
  {
  // body-parser error para JSON invalido
    res.status(err.status);
    res.json({status: err.status, errorCode: 'BAD_REQUEST'});
  } 
  else 
  {
    // continua con el error handler por defecto
    next(err);
  }
}


// --- ARTISTAS ---

// Agregar un Artista.
router.route('/artists').post(function (req, res)
{
  const data = req.body;
  const unqfy = getUNQfy();

  // Lanzar error si no se ingresaron los parámetros correctos.
  if (data.name === undefined || data.country === undefined)
  {
    throw new errors.MissingParameters;
  }
  const newArtist = unqfy.addArtist(data);
  res.status(201);
  res.json(newArtist);
 
  saveUNQfy(unqfy);
});

// Obtener un Artista por su id.
router.route('/artists/:id').get(function (req, res)
{
  const idArtist = parseInt(req.params.id);
  const unqfy = getUNQfy();

  const artist = unqfy.getArtistById(idArtist);
  res.json(artist);
  res.status(200);
});



// Eliminar un Artista por su id.
router.route('/artists/:id').delete(function (req, res)
{
  const idArtist = parseInt(req.params.id);
  const unqfy = getUNQfy();

  unqfy.removeArtist(unqfy.getArtistById(idArtist).getName());
  saveUNQfy(unqfy);
  res.status(204);
  res.json();
});


// Buscar artistas que coincidan con la busqueda.
router.route('/artists').get(function (req, res)
{
  const search = req.query.name;
  const unqfy = getUNQfy();

  if (search !== undefined)
  {
    artists = unqfy.searchArtistsByName(search);
  }
  else // Si no se ingreso ninguna busqueda...
  {
    artists = unqfy.searchArtistsByName(''); //... listar todos los artistas.
  }
  res.json(artists);
  res.status(200);
  
});

// --- ALBUMES ---

// Agregar un Album a un Artista.
router.route('/albums').post(function (req, res)
{
  const data = req.body;
  const unqfy = getUNQfy();

  // Si o se pasaron los parametros correspondientes, lanzo una excepcion.
  if (data.artistId === undefined || data.name === undefined || data.year === undefined)
  {
    throw new errors.MissingParameters;
  }
  const albumData = {name:data.name, year: data.year};
  const artist = unqfy.getArtistByIdNotError(data.artistId);
  if(artist === undefined)
  {
    throw new errors.CantAddAlbumToUnexistingArtistError();
  }
  const newAlbum = unqfy.addAlbum(data.artistId, albumData);
  res.status(201);
  res.json(newAlbum);
 
  saveUNQfy(unqfy);
});



// Obtener un Album por su id.
router.route('/albums/:id').get(function (req, res)
{
  const idAlbums = parseInt(req.params.id);
  const unqfy = getUNQfy();
  
  const album = unqfy.getAlbumById(idAlbums);

  res.json(album);
  res.status(200);
 
});


// Eliminar un Album por su id.
router.route('/albums/:id').delete(function (req, res)
{
  const idAlbum = parseInt(req.params.id);
  const unqfy = getUNQfy();

  const album = unqfy.getAlbumById(idAlbum);
  const artist = unqfy.getArtistFromAlbum(album);
  unqfy.removeAlbum(artist.getName(), album.getName());
  saveUNQfy(unqfy);
  res.status(204);
  res.json();
});


// Buscar los Albumes que coincidan con la busqueda.
router.route('/albums').get(function (req, res)
{
  const search = req.query.name;
  const unqfy = getUNQfy();
 
  if (search !== undefined)
  {
    albums = unqfy.searchAlbumsByName(search);
  }
  else // Si no se definio nada en la busqueda...
  {
    albums = unqfy.searchAlbumsByName(''); //... listar todos los albumes.
  }
  res.json(albums);
  res.status(200);
 
});


// Buscar la letra de un track.
router.route('/lyrics').get(function async (req, res)
{
  const trackId = parseInt(req.query.trackId);
  const unqfy = getUNQfy();
 
  const track =unqfy.getTrackById(trackId);
  const artist = unqfy.getArtistFromTrack(trackId);
  if (track.hasLyrics())
  {
    const lyricData = {name: track.getName(), lyrics: track.getLyrics()};
    res.json({status: 200, data: lyricData});
    res.status(200);
    // Para crear una promesa:
    // Promise.resolve(data);
  }
  else
  {
    unqfy.getLyric(track, artist.getName()).then(() => 
    {
      saveUNQfy(unqfy);
      const lyricData = {name: track.getName(), lyrics: track.getLyrics()};
      res.json({status: 200, data: lyricData});
      res.status(200);
    });
  }
 
  saveUNQfy(unqfy);
});

// Obtener el estado del servicio.
router.route('/status').get(function (req, res)
{
  res.status(200);
  res.json({status:1});
});