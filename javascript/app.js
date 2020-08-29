const ACCESS_KEY = 'y3c0XtvLz3mNxzIRLyqws0Lwo6dywBT8Toa4A2eODFE';
const WILD_URL = `https://api.unsplash.com/search/photos/?per_page=2&query=wild&client_id=${ACCESS_KEY}`;
const NATURE_URL = `https://api.unsplash.com/search/photos/?per_page=2&query=Nature&client_id=${ACCESS_KEY}`;
const TECH_URL = `https://api.unsplash.com/search/photos/?per_page=2&query=tech&client_id=${ACCESS_KEY}`;

const natureSection = document.querySelector('#nature');
const wildSection = document.querySelector('#wild');
const techSection = document.querySelector('#tech');
console.log(natureSection);
const dataArray = [];
const mainElement = document.querySelector('main');
console.log(mainElement);
let counter = 0;
let tempSection;
const loadData = () => {
    let wild = fetch(WILD_URL);
    let nature = fetch(NATURE_URL);
    let tech = fetch(TECH_URL);
    Promise.all([tech, nature, wild])
        .then(responseArray => {
            responseArray.forEach(item => {
                process(item.json());
            });
        })
        .catch(err => {});
};
const process = data => {
    console.log('in process');
    data.then(res => {
        dataArray.push(res.results);
        printImages(res.results);
    });
};
const createImgs = imgUrl => {
    let imgEl = document.createElement('img');
    imgEl.src = imgUrl;
    imgEl.classList.add('img_style');
    tempSection.lastElementChild.appendChild(imgEl);
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
const printData = (list, section) => {
    tempSection = section;
    extractImgsData(list);
};
const printImages = data => {
    if (counter == 0) {
        tempSection = wildSection;
    } else if (counter == 1) {
        tempSection = natureSection;
    } else if (counter == 2) {
        tempSection = techSection;
    }
    counter++;
    extractImgsData(data);
};
loadData();
