class Suscription 
{
    constructor(id)
    {
      this.artist = id; // id del artista
      this.users = [];
    }

    // Agrega un suscriptor, si ya esta agregado, no hace nada.
    suscribed(email)
    {
        if (! this.hasUser(email))
        {
            this.users.push(email);
        }
    }

    // Elimina un suscriptor, si no esta agregado, no hace nada.
    unsubscribe(email)
    {
        if (this.hasUser(email)) // Si esta suscripto
        {
            const indexToRemove = this.users.indexOf(email);
            this.users.splice(indexToRemove,1);
        }
    }

    // retorna: True si el id artistId es al mismo que el artista.
    hasArtist(artistId)
    {
        return this.artist === artistId;
    }

    // retorna: True si el usuario del email esta suscripto al artista.
    hasUser(email)
    {
        return this.users.includes(email);
    }

}  

module.exports = Suscription;