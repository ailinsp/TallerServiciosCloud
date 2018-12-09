// En este caso se utlizó el endpoint ​artist.search ​para buscar los artistas que tengan el string “Queen”.
const fs = require('fs');
const rp = require('request-promise');

const BASE_URL = 'http://localhost:8080/api';

const options = 
{
    url: BASE_URL + '/artists/' + 25, // id 25 = Lady Gaga
    json: true, // Automatically parses the JSON string in the response
};

rp.get(options).then((response) => 
{
    const artistSub = response;
    console.log(artistSub);
}).catch((error) => 
{ 
    console.log('algo salio mal', error);
});