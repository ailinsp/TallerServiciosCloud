const album = require('./album.js');
let id2 = 0;

class Artist {
    
    constructor(name,country) {
        id2++;
        this.id = id2;
        this.name = name;
       // this.year = new Date();
        this.country = country;
        this.albums = [];
    }

  isArtist(name){
    return this.name === name;
  }

  isId(id){
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
