/* eslint-disable no-undef */
/* eslint-disable prefer-arrow-callback */
const express = require('express'); // call express
const app = express(); // define our app using express
const router = express.Router();
const port = process.env.PORT || 8082; // set our port
const mlmod = require('./monitorLog'); // importamos el modulo monitorLog
const fs = require('fs'); // se necesita para guardar/cargar monitorLog
const bodyParser = require('body-parser');
const errors = require('./monitorLogApiErrors.js'); // api de errores

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', router);
app.use(errorHandler); // Registramos un manejador de errores


// Retorna una instancia de MonitorLog. Si existe filename, recupera la instancia desde el archivo.
function getMonitorLog(filename = 'dataMonitorLog.json') {
  let monitorLog = new mlmod.MonitorLog();
  if (fs.existsSync(filename)) {
    monitorLog = mlmod.MonitorLog.load(filename);
  }
  return monitorLog;
}

function saveMonitorLog(monitorLog, filename = 'dataMonitorLog.json') {
  monitorLog.save(filename);
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


// Activar el servicio de log.
router.route('/activate').post(function (req, res)
{
  const monitorLog = getMonitorLog();

  monitorLog.activateLog();
  res.status(200);
  res.json();
  saveMonitorLog(monitorLog);
});


// Desactivar el servicio de log.
router.route('/deactivate').post(function (req, res)
{
  const monitorLog = getMonitorLog();
  
  monitorLog.deactivateLog();
  res.status(200);
  res.json();
  saveMonitorLog(monitorLog);
});


// Mandar un mensaje de log via Slack
// Tambien se puede hacer uno diferente por cada mensaje para ser más especifico.
router.route('/log').post(function(req, res)
{
  const data = req.body;
  if (data.message === undefined)
  {
    throw new errors.MissingParametersError
  }
  const monitorLog = getMonitorLog();
  
  monitorLog.sendLog(data.message);
	res.status(200);
	res.json();
		
})

// Informa si el servicio de UNQFy esta acivado o no.
  // 0 = inactivo
  // 1 = activo
router.route('/monitorUNQfy').post(function(req, res)
{
  const monitorLog = getMonitorLog();

  monitorLog.monitorUNQfy().then(response =>
  {
    var status = response;
    console.log("monitorLog: "  + status);
    if (parseInt(status) === 1)
    {
      console.log('El servicio de UNQfy esta activo.');
      res.status(200);
      res.json({status:"ACTIVO"});
    }
    else
    {
      console.log('El servicio de UNQfy esta inactivo.');
      res.status(200);
      res.json({status:"INACTIVO"});
    }
  });
		
})

// Informa si el servicio de Notifier esta activado o no.
  // 0 = inactivo
  // 1 = activo
router.route('/monitorNotifier').post(function(req, res)
{
  const monitorLog = getMonitorLog();

  monitorLog.monitorNotifier().then(response  =>
  {
    var status = response;
    console.log("monitorLog: "  + status);
    if (parseInt(status) === 1)
    {
      console.log('El servicio de Notifier esta activo.');
      res.status(200);
      res.json({status:"ACTIVO"});
    }
    else
    {
      console.log('El servicio de Notifier esta inactivo.');
      res.status(200);
      res.json({status:"INACTIVO"});
    }
  });
  
})
