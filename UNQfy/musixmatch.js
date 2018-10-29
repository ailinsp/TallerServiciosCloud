const fs = require('fs');
const rp = require('request-promise');

class MusixMatch 
{
  constructor() 
  {
    this.baseURL = 'http://api.musixmatch.com/ws/1.1';
    this.apikey = '580dbbcf5bf023438d13b8612a7a2b5b';
  }

  options(endpoint)
  {
    return {
      uri: this.baseURL + endpoint,
      qs: {
        apikey: this.apikey,
      },
      json: true // Automatically parses the JSON string in the response
    };
  }

  searchLyric(trackName, artistName)
  {
    return this.searchTrackId(trackName, artistName).then(trackId => 
    {
      return this.getLyric(trackId);
    });
  }

  searchTrackId(trackName, artistName)
  {
    console.log('Buscando id del track ' + trackName + ' del artista ' + artistName + '...');
    const options = this.options('/track.search?q_track=' + trackName);
    return rp.get(options).then(response => 
    {
      const header = response.message.header; // El encabezado contiene el estado de la respuesta de la query
      const body = response.message.body; // El cuerpo contiene la respuesta a nuestra query
      if (header.status_code !== 200) // Detectamos si hubo un error antes de utilizar el body
      {
        throw new Error('Status code != 200');
      }

      // https://developer.musixmatch.com/documentation/api-reference/track-search
      const trackList = body.track_list; // Obtenemos la lista de tracks del cuerpo de la respuesta.
      const trackResult = trackList.map(t => t.track).find(t => t.artist_name === artistName); // Buscamos el track que corresponde al artista.

      if(trackResult === undefined) // Si el track del artista buscado no se encuentra...
      {
        return trackList.map(t => t.track)[0].track_id; // Devolvemos el id del track encontrado en la primera posicion. (por enunciado)
      }

      return trackResult.track_id;//... obtenemos su Id para buscar su letra.
    });
  }

  getLyric (trackId)
  {
    const options = this.options('/track.lyrics.get?track_id=' + trackId);

    return rp.get(options).then(response => 
    {
      const header = response.message.header; // El encabezado contiene el estado de la respuesta de la query
      const body = response.message.body; // El cuerpo contiene la respuesta a nuestra query

      if (header.status_code !== 200) // Detectamos si hubo un error antes de utilizar el body
      {
        throw new Error('status code != 200');
      }
      // https://developer.musixmatch.com/documentation/api-reference/track-lyrics-get
      const lyricData = body.lyrics; // Sacamos el campo de la respuesta donde se encuentra los datos del lyric.
      return lyricData.lyrics_body; //... obtenemos la letra del track.
    });
  }
}


module.exports = MusixMatch;