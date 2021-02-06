const imageContainer = document.getElementById('image-container')
const loader = document.getElementById('loader')

let photosArray = [];

// Unsplash Api
const count = 10;
const apiKey = 'kTg3iAklI34HqW6oiTo2r1LH8pxzSK79Rdt2EG2I6t8'
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`


// helper function to set attributes on dom elements
function setAttributes(element, attributes){
    for (const key in attributes){
        element.setAtrribute(key, attribute[key]);
    }
}

// create Elements for links & photos, add to dom
function displayPhotos(){
    // run function for each object in photosArray
    photosArray.forEach((photo) => {
        // Create <a> to link to unsplash
        const item = document.createElement('a');
        // item.setAttribute('href', photo.links.html)
        // item.setAttribute('target', '_blank');
        // create img for photo
        setAttributes(item,{
            href: photo.links.html,
            target: '_blank',
        });
        const img = document.createElement('img')
        // img.setAttribute('src', photo.urls.regular);
        // img.setAttribute('alt', photo.alt_description);
        // img.setAttribute('title', photo.alt_description);
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        })
        // put img inside a anchor then put both inside imageContainer Element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

//  get photos from unsplash
async function getPhotos(){
    try{
        const res = await fetch(apiUrl);
        photosArray = await res.json();
        displayPhotos();
    } catch (error){
        // Catch error here
    }
}

// On load
getPhotos();