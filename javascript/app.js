const ACCESS_KEY = 'y3c0XtvLz3mNxzIRLyqws0Lwo6dywBT8Toa4A2eODFE';
const WILD_URL = `https://api.unsplash.com/search/photos/?per_page=10&query=wild&client_id=${ACCESS_KEY}`;
const NATURE_URL = `https://api.unsplash.com/search/photos/?per_page=10&query=Nature&client_id=${ACCESS_KEY}`;
const FOREST_URL = `https://api.unsplash.com/search/photos/?per_page=10&query=forest&client_id=${ACCESS_KEY}`;

const searchTermIn = document.getElementById('search_term');

const natureSection = document.querySelector('#nature');
const wildSection = document.querySelector('#wild');
const forestSection = document.querySelector('#tech');
const mainElement = document.querySelector('main');

const dataArray = [];

console.log(natureSection);
let searchedData = [];
console.log(mainElement);
let counter = 0;
let tempSection;
const loadData = () => {
    let wild = fetch(WILD_URL);
    let nature = fetch(NATURE_URL);
    let tech = fetch(FOREST_URL);
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
        tempSection = forestSection;
    }
    counter++;
    extractImgsData(data);
};
loadData();
const getSearchDataHandler = event => {
    console.log('In serached data');
    if (event.keyCode === 13) {
        let inputSearchValue = event.target.value;
        fetch(
            `https://api.unsplash.com/search/photos/?per_page=16&query=${inputSearchValue}&client_id=${ACCESS_KEY}`,
        )
            .then(res => res.json())
            .then(data => {
                data.results.map(item => {
                    searchedData.push(item.urls.small);
                });
                sessionStorage.setItem('SearchItems', JSON.stringify(searchedData));
                window.location = 'search.html';
                // tempSection = mainElement;
                // printImgs(searchedData);
            })
            .catch(err => {
                console.log(err);
            });
    } else {
    }
};

// SetupEvent Listerners
searchTermIn.addEventListener('keydown', getSearchDataHandler);
