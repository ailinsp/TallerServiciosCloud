const Track = require('./track.js');
const IdGenerator = require('./idGenerator.js');


class Album {

    constructor(id, name,year){
        this.id = id;
        this.year = year;
        this.name = name;
        this.tracks = [];
    }

    addNewTrack(track){
        this.tracks.push(track);
    }

    searchTrack(trackName){
        let searchedTrack = this.getTracksAlbum().find(track => track.isTrack(trackName));
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
        return this.name === albumName;   
    }

    isId(albumId){
        return this.id === albumId;    
    }
    
    getTracksAlbum(){
        return this.tracks;
    }
    getName(){
        return this.name;
    }

    isPartOfName(nameAlbum){
        return this.name.includes(nameAlbum);
      }
}

module.exports = Album;

