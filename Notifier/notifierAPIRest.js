/* eslint-disable no-undef */
/* eslint-disable prefer-arrow-callback */
const express = require('express'); // call express
const app = express(); // define our app using express
const router = express.Router();
const port = process.env.PORT || 8081; // set our port
const notimod = require('./notifier'); // importamos el modulo notifier
const fs = require('fs'); // se necesita para guardar/cargar notifier
const bodyParser = require('body-parser');
const errors = require('./notifierApiErrors.js'); // api de errores

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', router);
app.use(errorHandler); // Registramos un manejador de errores


// Retorna una instancia de Notifier. Si existe filename, recupera la instancia desde el archivo.
function getNotifier(filename = 'dataNotifier.json') {
  let notifier = new notimod.Notifier();
  if (fs.existsSync(filename)) {
    notifier = notimod.Notifier.load(filename);
  }
  return notifier;
}

function saveNotifier(notifier, filename = 'dataNotifier.json') {
  notifier.save(filename);
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


// Suscribir un usuario a un artista.
router.route('/subscribe').post(function (req, res)
{
  const data = req.body;
  const notifier = getNotifier();

  // Si no se pasaron los parametros correspondientes, lanzo una excepcion.
  if (data.artistId === undefined || data.email === undefined )
  { 
    throw new errors.MissingParametersError();
  }
  
  // Si el artista al que se intenta suscribir no existe en UNQfy, lanza una excepcion.

  notifier.findArtistUNQfy(data.artistId).then(() =>
  {
    const newSuscriptor = notifier.suscribed(data.artistId, data.email);
    console.log(newSuscriptor);
    res.status(200);
    res.json();
    saveNotifier(notifier);
  }).catch(error =>
    {
      throw new errors.NonExistentArtistError(data.artistId); 
    });

});

// Desuscribir un usuario de un artista.
router.route('/unsubscribe').post(function (req, res)
{
  const data = req.body;
  const notifier = getNotifier();

  // Si no se pasaron los parametros correspondientes, lanzo una excepcion.
  if (data.artistId === undefined || data.email === undefined )
  { 
    throw new errors.MissingParametersError();
  }
  
  // Si el artista al que se intenta desuscribir no existe en UNQfy, lanza una excepcion.
  notifier.findArtistUNQfy(data.artistId).then(() =>
  {
    console.log("Encontre al artista y estoy por desuscribir...");
    notifier.unsubscribe(data.artistId, data.email);
    console.log(notifier.findArtistSuscription(data.artistId));
    res.status(200);
    res.json();
    saveNotifier(notifier);
  }).catch(error =>
    {
      throw new errors.NonExistentArtistError(data.artistId); 
    });

});


// Notifica a los usuarios suscriptos via mail.
router.route('/notify').post(function (req, res)
{
  const data = req.body;
  const notifier = getNotifier();

  // Si no se pasaron los parametros correspondientes, lanzo una excepcion.
  if (data.artistId === undefined || data.subject === undefined || data.message === undefined || data.from === undefined)
  { 
    throw new errors.MissingParametersError();
  }
  
  // Si el artista al que se intenta desuscribir no existe en UNQfy, lanza una excepcion.
  notifier.findArtistUNQfy(data.artistId).then(() =>
  {
    console.log("Se encontro el artista en UNQfy...");
    notifier.notify(data.artistId, data.subject, data.message, data.from);
    console.log("Notificacion enviada con exito.");
    res.status(200);
    res.json();
  }).catch(error =>
    {
      throw new errors.NonExistentArtistError(data.artistId); 
    });

});