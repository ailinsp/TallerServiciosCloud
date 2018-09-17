class Artist {
    
    constructor() {
        this.id = id;
        this.name = name;
        this.year = year;
        this.country = country;
        this.albums = [];
    }

  isArtist(){
      //TODO
  }

  isId(){
      //TODO
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