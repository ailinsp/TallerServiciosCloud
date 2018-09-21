const Album = require('./album.js');
let albums =[];

class Artist {
    
    constructor(id, name, country) {
        this.id = id;
        this.name = name;
       // this.year = new Date();
        this.country = country;
        this.albums = albums;
    }

  isArtist(name){
    return this.name === name;
  }

  hasId(id){
    return this.id === id;
  }

  addAlbum(album){
      this.albums.push(album);
  } 

  removeAlbum(name){
      albums.splice(albums.findIndex(album => album.getName === name), 1);
  } 

  editCountry(newCountry){
      this.country = newCountry;
  }
  
  getTracks(){
      let tracks= [];
      //return this.albums.forEach(album => album.getTracks());
        for(let i=0;i<this.albums.length;i++){
           tracks= tracks.concat(this.albums[i].getTracksAlbum());
        }
        return tracks;
  } 
  
  getAlbums(){
      return this.albums;
  }
  
  isPartOfName(nameArtist){
    return this.name.includes(nameArtist);
  }

  getName(){
      return this.name;
  }
}



module.exports = Artist;
