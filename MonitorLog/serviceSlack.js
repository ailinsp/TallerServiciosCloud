// En este caso se utlizó el endpoint ​artist.search ​para buscar los artistas que tengan el string “Queen”.
const fs = require('fs');
const rp = require('request-promise');

class ServiceSlack 
{
  constructor() 
  { 
    // MENSAJE DE PRUEBA PARA MANDAR AL GRUPO DE SLACK-NOTIFICATION
    //curl -X POST -H 'Content-type: application/json' --data '{"text":"Hello,World!"}' https://hooks.slack.com/services/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
  }

  log(message)
  {
    const options = 
    {
        method: 'POST',
        uri: 'https://hooks.slack.com/services/TCD2F8CMP/BEAC55LBX/oKvQsu2qUi44JA4X1mWKpjd',
        body: 
        {
            text: message
        },
        json: true,
    }

    rp(options).then((response) => 
    {
        console.log("Se ha enviado una notificacion a Slack con exito.");
    });
  }

}
module.exports = ServiceSlack;