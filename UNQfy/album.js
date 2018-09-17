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
        let searchedTrack = this.getTracks().find(track => track.isTrack(trackName));
        if (searchedTrack === undefined){
            throw new Error("No se encontro el track " + trackName);
        }     
        return searchedTrack;
    }

    removeTrack(trackName){
        let removedTrack = this.searchTrack(trackName);
        if (removedTrack === undefined){
            throw new Error("No se encontro el track " + trackName);
        }   
        tracks.splice(tracks.findIndex(track => track.getId === removedTrack.getId), 1);
    } 
    
    hasName(albumName){
        return this.hasAttribute("albumName")   
    }
    
    getTracks(){
        return this.tracks;
    }
    getName(){
        return this.name;
    }
}
