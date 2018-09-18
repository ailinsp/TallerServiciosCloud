const Album = require('./album.js');

class Artist {
    
    constructor(id, name, country) {
        this.id = id;
        this.name = name;
       // this.year = new Date();
        this.country = country;
        this.albums = [];
    }

  isArtist(name){
    return this.name === name;
  }

  hasId(id){
    return this.id === id;
  }

  addAlbum(album){
      this.albums.push(album);
      return album;
  } 

  removeAlbum(name){
      albums.splice(albums.findIndex(album => album.getName === name), 1);
  } 

  editCountry(newCountry){
      this.country = newCountry;
  }
  
  getTracks(){
      return this.albums.forEach(album => album.getTracks());
  } 
  
  getAlbums(){
      return this.albums;
  }

}

module.exports = Artist;
