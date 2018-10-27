const Album = require('./album.js');
// const albums =[];

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
  } 
  /*
  removeAlbum(name){
      albums.splice(albums.findIndex(album => album.getName === name), 1);
  }
  */
 
  removeAlbum(album)
  {
    const indexToRemove = this.albums.indexOf(album);
    if (indexToRemove < 0)
    {
      throw new Error('El artista ' + this.getName() + 'no posee el album ' + album.getName());
    }
    this.albums.splice(indexToRemove, 1);
  }

  editCountry(newCountry){
    this.country = newCountry;
  }
  
  getAllTracks(){
    /*
    let tracks= [];
    //return this.albums.forEach(album => album.getTracks());
    for(let i=0;i<this.albums.length;i++){
      tracks= tracks.concat(this.albums[i].getTracksAlbum());
    }
    return tracks;
    */
    return this.albums.map(album => album.getTracks()).reduce((a,b) => {return a.concat(b);});
  } 
  
  getAlbums(){
    return this.albums;
  }
  
  isPartOfName(artistName){
    return this.getName().includes(artistName);
  }

  getName(){
    return this.name;
  }

  getAlbumByName(albumName)
  {
    const result = this.albums.filter(album => album.hasName(albumName)); 
    if (result === [])
    {
      throw new Error('El artista ' + this.getName() + ' no tiene un album llamado ' + albumName);
    }
    return result;
  }
}



module.exports = Artist;
