// En este caso se utlizó el endpoint ​artist.search ​para buscar los artistas que tengan el string “Queen”.
const fs = require('fs');
const rp = require('request-promise');

const BASE_URL = 'http://api.musixmatch.com/ws/1.1';

const options = {
  // uri: BASE_URL + '/artist.search',
  uri: BASE_URL + '/track.lyrics.get?track_id',
  qs: {
    apikey: '580dbbcf5bf023438d13b8612a7a2b5b', // Cambiar esta apikey para usarlo
    //q_artist: 'Queen',
    track_id: '15445219',
  }, json: true // Automatically parses the JSON string in the response
};

rp.get( options).then((response) => 
{
  const header = response.message.header;
  const body = response.message.body;
  if (header.status_code !== 200)
  {
    throw new Error('status code != 200');
  }
  
  //const artistNames = body.artist_list.map((artist => artist.artist.artist_name));
  const artistNames = body.lyrics.lyrics_body;
  //console.log(`Se econtraron ${artistNames.length} artistas`);
  console.log(artistNames);
}).catch((error) => { console.log('algo salio mal', error);
});