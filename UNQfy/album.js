class Album {

    constructor(){
        this.name = name;
        this.tracks = [];
    }

    addTrack(track){
        this.tracks.push(track);
        return track;
    }
    searchTrack(trackName){
        //TODO: falta manejar el error si no lo encuentra
        return this.getTracks().find(track => track.isTrack(trackName));
    }

    removeTrack(trackEliminar){
        //TODO: falta manejar el error si no lo tiene
        tracks.splice(tracks.findIndex(track => track.getId === trackEliminar.getId), 1);
    } 
    
    hasName(albumName){
        //TODO    
    }
    
    getTracks(){
        return this.tracks;
    }
    getName(){
        return this.name;
    }
}