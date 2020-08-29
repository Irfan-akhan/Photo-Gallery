const ACCESS_KEY = 'y3c0XtvLz3mNxzIRLyqws0Lwo6dywBT8Toa4A2eODFE';
const BASE_URL = `https://api.unsplash.com/photos/?client_id=${ACCESS_KEY}`;

const newSectionImgs = document
    .getElementById('new')
    .lastElementChild.querySelectorAll('img');
console.log(newSectionImgs);

let counter = 0;
console.log(BASE_URL);
const createImgs = imgUrl => {
    newSectionImgs[counter].src = imgUrl;
    counter++;
};
const printImgs = images => {
    images.forEach(imgUrl => {
        createImgs(imgUrl);
    });
};
const extractImgsData = data => {
    console.log(data);
    images = data
        .map(obj => {
            return obj.urls;
        })
        .map(url => url.regular);
    console.log(images);
    printImgs(images);
};
fetch(BASE_URL)
    .then(res => res.json())
    .then(data => extractImgsData(data));
