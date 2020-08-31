const mainElement = document.querySelector('main');
let tempSection;

// Functions
const createImgs = imgUrl => {
    let imgEl = document.createElement('img');
    imgEl.src = imgUrl;
    imgEl.classList.add('img_style');
    tempSection.firstElementChild.appendChild(imgEl);
};
const printImgs = imagesUrls => {
    imagesUrls.forEach(imgUrl => {
        createImgs(imgUrl);
    });
};

const loadImags = () => {
    console.log('In load');
    let imagesUrls = JSON.parse(sessionStorage.getItem('SearchItems'));
    tempSection = mainElement;
    printImgs(imagesUrls);
};
loadImags();
