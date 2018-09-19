class IdGenerator
{
    constructor(){
        this.idTracks = 1;
        this.idAlbum = 1;
        this.idArtist = 1;
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