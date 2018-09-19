var genres = [];
var id = 0;
var name = "";
var duration = 0;
var author = "";

class Track{
    constructor(id, name, duration, genres){
        this.id = id;
        this.name = name;
        this.duration = duration;
        this.genres = genres;
        //this.author = author;
    }

    /*agrega un nuevo genero al Track */
    addGenre(newGenre){
      if(this.genres.indexOf(newGenre) == -1){
        this.genres.push(newGenre);
      }
    }

    /*elimina el genero pasado como parametro como genreToDelete */
    removeGenre(genreToDelete){
    let indexToDelete = this.genres.indexOf(genreToDelete) ;
      if(indexToDelete > -1){
        this.genres.splice(indexToDelete,1);
      }
    } 

    /*retorna si el genero existe en el track*/
    hasGenre(genre){
      return this.genres.includes(genre);
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
      return this.duration < segundos;
    }
}


module.exports = Track;



