// d4403ffd7e0653c2670e76534b3ad2a8

const rp = require('request-promise');
const BASE_URL = 'http://api.musixmatch.com/ws/1.1';
var options = {
    uri: BASE_URL + '/artist.search',
    qs: {
        apikey: '580dbbcf5bf023438d13b8612a7a2b5b',
        q_artist: 'Queen',
    }, json: true // Automatically parses the JSON string in the response
    };

rp.get( options).then((response) => 
    {
        var header = response.message.header;
        var body = response.message.body;
        if (header.status_code !== 200)
        {
            throw new Error('status code != 200');
        }
        var artistNames = body.artist_list.map((artist => artist.artist.artist_name));
        console.log(`Se econtraron ${artistNames.length} artistas`);
        console.log(artistNames);
    }).catch((error) => { console.log('algo salio mal', error);
});