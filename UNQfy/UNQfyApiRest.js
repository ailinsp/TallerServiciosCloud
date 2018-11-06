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

// ErrorHandler
function errorHandler(err, req, res, next) {
  console.error(err.name); // se imprime error en consola
  //actuamos dependiento el tipo de error 
  if (err instanceof ApiError){
    res.status(err.status);
    res.json({status: err.status, errorCode: err.errorCode});
  } else if (err.type === 'entity.parse.failed'){
  // body-parser error para JSON invalido
    res.status(err.status);
    res.json({status: err.status, errorCode: 'BAD_REQUEST'});
  } else {
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
  try
  {
    // Lanzar error si no se ingresaron los parámetros correctos.
    if (data.name === undefined || data.country === undefined)
    {
      throw new errors.MissingParameters;
    }
    const newArtist = unqfy.addArtist(data);
    res.json({status: 200, data: JSON.stringify(newArtist)});
  }
  catch(err)
  {
    res.json({status:err.status, error:err.errorCode});
  }
  saveUNQfy(unqfy);
});

// Obtener un Artista por su id.
router.route('/artists/:id').get(function (req, res)
{
  const idArtist = parseInt(req.params.id);
  const unqfy = getUNQfy();
  try
  {
    const artist = unqfy.getArtistById(idArtist);
    res.json({status: 200, data: JSON.stringify(artist)});
  }
  catch(err)
  {
    res.json({status:err.status, error:err.errorCode});
  }
});



// Eliminar un Artista por su id.
router.route('/artists/:id').delete(function (req, res)
{
  const idArtist = parseInt(req.params.id);
  const unqfy = getUNQfy();
  try
  {
    unqfy.removeArtist(unqfy.getArtistById(idArtist).getName());
    res.json({status: 204});
  }
  catch(err)
  {
    res.json({status:err.status, error:err.errorCode});
  }
  saveUNQfy(unqfy);
});


// Buscar artistas que coincidan con la busqueda.
router.route('/artists').get(function (req, res)
{
  const search = req.query.name;
  const unqfy = getUNQfy();
  try
  {
    if (search !== undefined)
    {
      artists = unqfy.searchArtistsByName(search);
    }
    else // Si no se ingreso ninguna busqueda...
    {
      artists = unqfy.searchArtistsByName(''); //... listar todos los artistas.
    }
    res.json({status: 200, data: JSON.stringify(artists)});
  }
  catch(err)
  {
    res.json({status:err.status, error:err.errorCode});
  }
});

// --- ALBUMES ---

// Agregar un Album a un Artista.
router.route('/albums').post(function (req, res)
{
  const data = req.body;
  const unqfy = getUNQfy();
  try
  {
    // Si o se pasaron los parametros correspondientes, lanzo una excepcion.
    if (data.name === undefined || data.year === undefined)
    {
      throw new errors.MissingParameters;
    }
    const albumData = {name:data.name, year: data.year};
    const newAlbum = unqfy.addAlbum(data.artistId, albumData);
    res.json({status: 200, data: JSON.stringify(newAlbum)});
  }
  catch(err)
  {
    res.json({status:err.status, error:err.errorCode});
  }
  saveUNQfy(unqfy);
});


// Obtener un Album por su id.
router.route('/albums/:id').get(function (req, res)
{
  const idAlbums = parseInt(req.params.id);
  const unqfy = getUNQfy();
  try
  {
    const album = unqfy.getAlbumById(idAlbums);
    res.json({status: 200, data: JSON.stringify(album)});
  }
  catch(err)
  {
    res.json({status:err.status, error:err.errorCode});
  }
});


// Eliminar un Album por su id.
router.route('/albums/:id').delete(function (req, res)
{
  const idAlbum = parseInt(req.params.id);
  const unqfy = getUNQfy();
  try
  {
    const album = unqfy.getAlbumById(idAlbum);
    const artist = unqfy.getArtistFromAlbum(album);
    // unqfy.removeAlbumById(idAlbum);
    unqfy.removeAlbum(artist.getName(), album.getName());
    res.json({status: 204});
  }
  catch(err)
  {
    res.json({status:err.status, error:err.errorCode});
  }
  saveUNQfy(unqfy);
});


// Buscar los Albumes que coincidan con la busqueda.
router.route('/albums').get(function (req, res)
{
  const search = req.query.name;
  const unqfy = getUNQfy();
  try
  {
    if (search !== undefined)
    {
      albums = unqfy.searchAlbumsByName(search);
    }
    else // Si no se definio nada en la busqueda...
    {
      albums = unqfy.searchAlbumsByName(''); //... listar todos los albumes.
    }
    res.json({status: 200, data: JSON.stringify(albums)});
  }
  catch(err)
  {
    res.json({status:err.status, error:err.errorCode});
  }
});


// Buscar la letra de un track.
router.route('/lyrics').get(function async (req, res)
{
  const trackId = parseInt(req.query.trackId);
  const unqfy = getUNQfy();
  try
  {
    const track =unqfy.getTrackById(trackId);
    const artist = unqfy.getArtistFromTrack(track);
    if (track.hasLyrics())
    {
      const lyricData = {name: track.getName(), lyrics: track.getLyrics()};
      res.json({status: 200, data: lyricData});
    }
    else
    {
      unqfy.getLyric(track, artist.getName()).then(() => 
      {
        saveUNQfy(unqfy);
        const lyricData = {name: track.getName(), lyrics: track.getLyrics()};
        res.json({status: 200, data: lyricData});
      });
    }
  }
  catch(err)
  {
    res.json({status:err.status, error:err.errorCode});
  }
  saveUNQfy(unqfy);
});