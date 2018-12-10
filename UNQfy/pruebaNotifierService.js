const fs = require('fs');
const rp = require('request-promise');

const BASE_URL = 'http://localhost:8081/api';

const options = {
  method: 'GET',
  uri: BASE_URL + '/subscriptions?artistId',
  qs: {
    artistId: '25'
  },
  json: true,
};

rp(options).then((response) => 
{
  const header = response.message.header;
  const body = response.message.body;
  if (header.status_code !== 200)
  {
    throw new Error('status code != 200');
  }
  console.log(body);
}).catch((error) => { console.log('algo salio mal', error);
});