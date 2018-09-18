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
        this.idTracks++; 
        return id;
    }

    getIdAlbums()
    {
        let id = this.idAlbum;
        this.idAlbum++; 
        return id;
    }

    getIdArtist()
    {
        let id = this.idArtist;
        this.idArtist++; 
        return id;
    }

}

module.exports = IdGenerator;