// Unsplash Api
const count = 10;
const apiKey = 'kTg3iAklI34HqW6oiTo2r1LH8pxzSK79Rdt2EG2I6t8'
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`

//  get photos from unsplash
async function getPhotos(){
    try{
        const res = await fetch(apiUrl);
        const data = await res.json();
        console.log(data)
    } catch (error){
        // Catch error here
    }
}

// On load
getPhotos();