const Track = require('./track.js');



class Album {

  constructor(id, name,year){
    this.id = id;
    this.year = year;
    this.name = name;
    this.tracks = [];
  }

  getId()
  {
    return this.id;
  }

  addNewTrack(track){
    this.tracks.push(track);
  }

  searchTrack(trackName)
  {
    const searchedTrack = this.tracks.find(track => track.hasName(trackName));
    if (searchedTrack === undefined){
      throw new Error('No se encontro el track ' + trackName);
    }     
    return searchedTrack;
  }
  /*
    removeTrack(trackName){
        let removedTrack = this.searchTrack(trackName);
        if (removedTrack === undefined){
            throw new Error("No se encontro el track " + trackName);
        }   
        this.tracks.splice(this.tracks.findIndex(track => track.getId === removedTrack.getId), 1);
    } 
    */

  removeTrack(trackToRemove)
  {
    const index = this.tracks.indexOf(trackToRemove);
    if (index < 0)
    {
      throw new Error('El album ' + this.getName() + ' no posee el track ' + trackToRemove.getName());
    }
    this.tracks.splice(index,1);
  }
    
  hasName(albumName){
    return this.name === albumName;   
  }

  isId(albumId){
    return this.id === albumId;    
  }
    
  getTracks(){
    return this.tracks;
  }
  getName(){
    return this.name;
  }

  isPartOfName(nameAlbum){
    return this.getName().toLowerCase().includes(nameAlbum.toLowerCase());
  }

  // pregunta si el album contiene un track con el id trackId
  hasTrack(trackId)
  {
    const track = this.tracks.find(track => track.isTrack(trackId));
    return (track !== undefined);
  }

}

module.exports = Album;

