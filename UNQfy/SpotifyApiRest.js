const rp = require('request-promise');
// Ejemplo de cómo tener las nombres de los albums de un artista de identificación: 1vCWHaC5f2uS3yhpwWbIA6

const options = 
    {
	  // url: 'https://api.spotify.com/v1/artists/' + '1vCWHaC5f2uS3yhpwWbIA6' + '/albums',
	  url: 'https://api.spotify.com/v1/search?q=' + 'Rosalia' + '&type=artist&limit=1',
      headers: { Authorization: 'Bearer ' + 'BQB82B1QifeUx7_AaxI6wbYyCjc46nOOgn4RMjtEQVT9JdD9-hhSztDgvp2eXvWiJyrkvJm6rRaLX8OV0szB1Tyd-s_z78NtYLLepgwSTSQVIN9mdLhlDgzX8WNE2Nv7CNbTPquPClX3P0gN52Jg_WBwOej91h3J7szt5Ga6uLZBIAeaWa-h' },
      json: true,
    };
    
rp.get(options).then((response) => //hacer algo con response
{
  // const albums = response.items.map(i => i.name);

  // console.log(albums);
  console.log(response.artists.items[0].id) ;
}).catch((error) => { console.log('algo salio mal', error);
});