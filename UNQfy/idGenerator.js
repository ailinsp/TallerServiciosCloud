class IdGenerator
{
    constructor(){
        this.idTracks = 0;
        this.idAlbum = 0;
        this.idArtist = 0;
    }

    // retorna: un id para los albums
    getIdTracks()
    {
        let id = this.idTracks;
        idTracks++; 
        return id;
    }

    getIdAlbums()
    {
        let id = this.idAlbum;
        idAlbum++; 
        return id;
    }

    getIdArtist()
    {
        let id = this.idArtist;
        idArtist++; 
        return id;
    }

}