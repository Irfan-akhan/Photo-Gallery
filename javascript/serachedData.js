// Functions
const getSearchDataHandler = event => {
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
                tempSection = mainElement;
                printImgs(searchedData);
            })
            .catch(err => {
                console.log(err);
            });
    } else {
    }
};
