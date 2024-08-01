const URL = "nzbird.json" // Data file

function setUp() {
    let button = document.getElementById("filter-button");
    button.addEventListener("click", retrieveAndDisplayData);

    retrieveAndDisplayData();
}

function retrieveAndDisplayData() {
    fetch(URL)
        .then(responseCallback) //processes server response (checks for status code == 200 => Success)
        .then(dataReadyCallback)
        .catch(fetchErrorCallback);
}

function responseCallback(response) {
    if(response.status != 200) {
        return; // something has gone wrong
    } else {
        return response.text(); // all good
    }

}

function dataReadyCallback(data) {
    let birds = JSON.parse(data);
    displayData(birds);
}

function fetchErrorCallback(error) {
    alert("An error occured when fetching the bird data. Please try again later.");
    console.log(error)
}

function displayData(data) {

    let searchResult = document.querySelector("#search-result");
    if(searchResult == null) {
        searchResult = "";
    }
    let conservationStatus = document.querySelector("#conservation-filter").value.toLowerCase();
    let otherFilter = document.querySelector("#other-filter").value.toLowerCase();
    
    let birdlist = [];
    for(let bird of data) {
        let validNames = getValidNames(bird);
        if(true) { // check if the search result is in the list of names validNames.includes(searchResult)
            if(conservationStatus == "all") { // check if the conservation status matched the birds conservation status || conservationStatus.includes(conservationStatus)
                birdlist.push(bird);
            }
        }
    }   

    //sort by other filter...

    for(let bird of birdlist) {
        let h2 = document.querySelector("#image-section");
        let img = document.createElement("img");
        img.src = bird.photo.source;
        img.alt = bird.name;
        h2.appendChild(img);
    }
}

function getValidNames(bird) {
    validNames = [];
    validNames.push(bird.common_name.toLowerCase());
    validNames.push(bird.scientific_name.toLowerCase());
    validNames.push(bird.common_name.toLowerCase());
    //add other names later
}


setUp();

