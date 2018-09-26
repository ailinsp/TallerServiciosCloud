/*                                                PlayList                                                             */ 
const track = require('./track.js');

// let tracks= [];
// let namePlayList = "";

class Playlist{
    constructor (namePlayList, tracks){
        this.name = namePlayList;
        this.tracks = tracks;
    }

    getName()
    {
      return this.name;
    }
    
    /*cuenta la duracion de toda la PlayList, la misma es la suma de la duracion de todo los tracks que la componen */
    duration(){
      /*
    let count= this.tracks.length;
    let durationPL = 0;
    for(let i=0; i < count;i++) {
        durationPL += this.tracks[i].duration;
    }
    return durationPL;
    */
    let times = this.getTracks().map(track => track.getDuration());
    return times.reduceRight( (a,b) => {return a + b;});
    }
    
    /*retorna bool con respecto a la PlayList que se pregunta si tiene,
      el track que se pasa como parametro */
    /*track pasado como parametro se espera que sea de la clase Track */
    hasTrack(track){
       return this.tracks.includes(track);
    }

    /*saca de la lista de tracks de la PlayList,
      solo si lo encuentra, al track que se pasa como parametro */
    
    /*track pasado como parametro se espera que sea de la clase Track */
    removeTrack(track){
        let indexToDelete = this.tracks.indexOf(track);
        if(indexToDelete > -1){
            this.tracks.splice(indexToDelete,1);
        }
     }
    /*elimina a todos los tracks pasados por parametro */
     filterTracks(trackArray){
       let count=trackArray.length;
        for(let i=0; i<count; i++){
          this.removeTrack(trackArray[i]);
        }
     }
     
     /*retorna todos los tracks de la playlist(los retorna como objetos de la clase Track)*/
     getTracks(){
       return this.tracks;
     }

     isPartOfName(name){
      return this.getName().includes(name);
    }
}



module.exports = Playlist;
