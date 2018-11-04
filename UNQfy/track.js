const MusixMatch = require('./musixmatch.js');
const rp = require('request-promise');

class Track 
{
  constructor (id, name, duration, genres)
  {
    this.id = id;
    this.name = name;
    this.duration = duration;
    this.genres = genres;
    this.lyrics = undefined;
  }

  getId()
  {
    return this.id;
  }

  hasLyrics()
  {
    return (this.lyrics !== undefined);
  }

  getLyrics()
  {
    return this.lyrics;
  }

  getName()
  {
    return this.name;
  }

  getDuration()
  {
    return this.duration;
  }

  getGenres()
  {
    return this.genres;
  }

  /*agrega un nuevo genero al Track */
  addGenre(newGenre){
    if(this.genres.indexOf(newGenre) == -1){
      this.genres.push(newGenre);
    }
  }

  /*elimina el genero pasado como parametro como genreToDelete */
  removeGenre(genreToDelete){
    const indexToDelete = this.genres.indexOf(genreToDelete) ;
    if(indexToDelete > -1){
      this.genres.splice(indexToDelete,1);
    }
  } 

  /*retorna si el genero existe en el track*/
  hasGenre(genre){
    //console.log(this.getGenres().includes(genre));
    return this.getGenres().includes(genre);
  }

  /*retorna si el codigo que se pasa, pertenece al Id de la clase Track en el que se invoca */
  isTrack(codigo){
    return this.id == codigo; 
  }
    
  /*retorna bool si el artist del parametro, es el author del Track 
    hasArtist(artist){
     return this.author == artist;
    }
    */

  /*retorna un bool que corresponde si la duracion del track es menor a los "segundos" pasados por parametro*/
  hasMaxDuration(segundos){
    return this.duration <= segundos;
  }

  isPartOfName(nameTrack){
    return this.getName().includes(nameTrack);
  }

  hasAnyGenre(genresL){
    /*
    for (let i=0;i < genresL.lenght; i++){
      if(this.hasGenre(genresL[i])){
        return true;
      }
    }
    */
    const result = genresL.filter(genre => this.hasGenre(genre));
    let cant = 0;
    result.forEach(element => {
      cant++;
    });
    // result no reconoce la propiedad lenght
    // return result.lenght > 0; 
    return (cant > 0);
  }
  
}

module.exports = Track;