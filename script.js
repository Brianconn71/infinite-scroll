const imageContainer = document.getElementById('image-container')
const loader = document.getElementById('loader')

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash Api
const count = 30;
const apiKey = 'kTg3iAklI34HqW6oiTo2r1LH8pxzSK79Rdt2EG2I6t8'
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`


//check if all images were loaded
function imageLoaded(){
    imagesLoaded++;
    if (imagesLoaded=== totalImages){
        ready = true;
        loader.hidden = true;
    }
}

// helper function to set attributes on dom elements
function setAttributes(element, attributes){
    for (const key in attributes){
        element.setAtrribute(key, attributes[key]);
    }
}

// create Elements for links & photos, add to dom
function displayPhotos(){
    imagesLoaded = 0;
    totalImages = photosArray.length;
    // run function for each object in photosArray
    photosArray.forEach((photo) => {
        // Create <a> to link to unsplash
        const item = document.createElement('a');
        item.setAttribute('href', photo.links.html)
        item.setAttribute('target', '_blank');
        // create img for photo
        // setAttributes(item,{
        //     href: photo.links.html,
        //     target: '_blank',
        // });
        const img = document.createElement('img')
        img.setAttribute('src', photo.urls.regular);
        img.setAttribute('alt', photo.alt_description);
        img.setAttribute('title', photo.alt_description);
        // setAttributes(img, {
        //     src: photo.urls.regular,
        //     alt: photo.alt_description,
        //     title: photo.alt_description,
        // })
        // event listener, check when each is finished loading
        img.addEventListener('load', imageLoaded)
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

// Check to see if scrolling near bottom of page, Load more photos
window.addEventListener('scroll', () =>{
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){   
        ready = false;
        getPhotos()
    }
    })

// On load
getPhotos();