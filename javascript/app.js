const ACCESS_KEY = 'y3c0XtvLz3mNxzIRLyqws0Lwo6dywBT8Toa4A2eODFE';
const BASE_URL = `https://api.unsplash.com/search/photos/?per_page=30&query=wild&client_id=${ACCESS_KEY}`;
let counter = 0;

const newSectionImgs = document.querySelector('#new div');
console.log(newSectionImgs);

const mainElement = document.querySelector('main');
console.log(mainElement);

console.log(BASE_URL);

const createImgs = imgUrl => {
    // newSectionImgs[counter].src = imgUrl;
    // counter++;
    let imgEl = document.createElement('img');
    imgEl.src = imgUrl;
    newSectionImgs.appendChild(imgEl);
    mainElement.appendChild(imgEl);
};
const printImgs = imagesUrls => {
    imagesUrls.forEach(imgUrl => {
        createImgs(imgUrl);
    });
};
const extractImgsData = data => {
    console.log(data);
    imageUrls = data
        .map(obj => {
            return obj.urls;
        })
        .map(url => url.small);
    console.log(imageUrls);
    printImgs(imageUrls);
};
fetch(BASE_URL)
    .then(res => res.json())
    .then(data => {
        console.log('my data', data);
        extractImgsData(data.results);
    });
