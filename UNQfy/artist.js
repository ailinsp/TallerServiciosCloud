const Album = require('./album.js');
const errors = require('./UNQfyApiErrors.js');
// const albums =[];

class Artist {

  constructor(id, name, country) {
    this.id = id;
    this.name = name;
    // this.year = new Date();
    this.country = country;
    this.albums = [];
  }

  getId()
  {
    return this.id;
  }

  isArtist(name){
    return this.name === name;
  }

  hasId(id){
    return this.id === id;
  }

  addAlbum(album)
  {
    const search = this.albums.find(a => a.hasName(album.getName()) );
    if (search !== undefined)
    {
      throw new errors.AlbumHasAlreadyBeenRegistered(album.getName());
    }
    this.albums.push(album);
  } 
 
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
    return this.albums.map(album => album.getTracks()).reduce((a,b) => {return a.concat(b);});
  } 
  
  getAlbums(){
    return this.albums;
  }
  
  isPartOfName(artistName){
    return this.getName().toLowerCase().includes(artistName.toLowerCase());
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

  // pregunta si tiene algun album con la id albumId
  hasAlbumId(albumId)
  {
    const result = this.albums.find(album => album.isId(albumId));
    return (result !== undefined);
  }
}



module.exports = Artist;
