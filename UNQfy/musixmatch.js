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

  searchLyric(trackName) 
  {
    const trackId= this.searchTrackId(trackName);
    return this.getLyric(trackId);
  }

  searchTrackId(trackName) 
  {
    const options = this.options('/track.search?q_track=' + trackName);
    
    return rp.get(options).then(response => 
    {
      const header = response.message.header; // El encabezado contiene el estado de la respuesta de la query
      const body = response.message.body; // El cuerpo contiene la respuesta a nuestra query

      if (header.status_code !== 200) // Detectamos si hubo un error antes de utilizar el body
      {
        throw new Error('status code != 200');
      }

      // https://developer.musixmatch.com/documentation/api-reference/track-search
      const trackResult = body.track_list[0]; // Sacamos el track econtrado en la primera posicion. (por enunciado)
      const trackID = trackResult.track.track_id; //... obtenemos su Id para buscar su letra.
      
      return trackID;
    }).catch((error) => { console.log('Algo salio mal: No se pudo encontrar el id del track ' + trackName, error);});
  }

  getLyric(trackId)
  {
    const options = this.options('/track.lyrics.get?track_id=' + trackId);

    return rp.get(options).then(response => 
    {
    // https://developer.musixmatch.com/documentation/api-reference/track-lyrics-get
      const lyricData = response.message.body.lyrics; // Sacamos el campo de la respuesta donde se encuentra los datos del lyric.
      // No es necesario preguntar por el estado de la respuesta de la query, siempre se realizará correctamente.
      // Si anteriormente encontramos el id del tema es porque tiene su letra.
      const lyric = lyricData.lyrics_body; //... obtenemos la letra del track.
      return lyric;
    }).catch((error) => { console.log('Algo salio mal: No se pudo encontrar la letra del track con id ' + trackId, error);});
  }

}

module.exports = {
  MusixMatch,
};