const URL = "nzbird.json" // Data file

function setUp() {
    let button = document.getElementById("filter-button");
    button.addEventListener("click", function(event) {
        event.preventDefault(); // Prevent the form from submitting
        retrieveAndDisplayData();
    });

    retrieveAndDisplayData();
}

function retrieveAndDisplayData() {
    fetch(URL)
        .then(responseCallback) //processes server response (checks for status code == 200 => Success)
        .then(dataReadyCallback)
        .catch(fetchErrorCallback);
}

function responseCallback(response) {
    if (response.status != 200) {
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

    let searchElement = document.getElementById("search-bar");
    let searchResult = searchElement.value;
    if (searchResult === null) {
        searchResult = "";
    }
    let conservationStatus = document.querySelector("#conservation-filter").value.trim().toLowerCase();
    let otherFilter = document.querySelector("#other-filter").value.trim().toLowerCase();

    let birdlist = [];
    for (let bird of data) {
        let validNames = getValidNames(bird);
        console.log(searchResult)
        if (searchResult === "" || containsName(validNames, searchResult)) { // check if the search result is in the list of names validNames
            let status = bird.status.replaceAll(" ", "").toLowerCase();
            if (conservationStatus === "all" || conservationStatus.localeCompare(status) == 0) { // check if the conservation status matched the birds conservation status || conservationStatus.includes(conservationStatus)
                birdlist.push(bird);
            }
        }
    }

    //show bird counter
    let counter = document.getElementById("bird-counter");
    counter.textContent = "Showing " + birdlist.length + " of 68 birds.";
    counter.classList.add("filter-label");

    //sort by other filter...

    let main = document.getElementById("image-content");
    main.innerHTML = "";

    //display birds
    for (let bird of birdlist) {
        createAndDisplayBird(bird);
    }

    if(birdlist.length == 0){
        displayNoBirdsFound();
    }
}

function displayNoBirdsFound(){
    let main = document.getElementById("image-content");
    let h2 = document.createElement("h2");
    h2.textContent = "No results";
    h2.classList.add("no-birds-found");
    main.appendChild(document.createElement("h2"));
    main.appendChild(h2);
}

function containsName(names, searchResult) {
    for (let name of names) {
        if (name.includes(searchResult)) {
            return true;
        }
    }

    return false;
}

function getValidNames(bird) {
    //noramlize all these?
    validNames = [];
    validNames.push(bird.common_name.toLowerCase().normalize("NFC"));
    validNames.push(bird.scientific_name.toLowerCase().normalize("NFC"));
    validNames.push(bird.original_name.toLowerCase().normalize("NFC"));
    
    for(let name of bird.other_name){
        validNames.push(name.toLowerCase().normalize("NFC"));
    }

    return validNames;
}

function createAndDisplayBird(bird) {
    let main = document.getElementById("image-content");

    let section = document.createElement("section");
    section.className = "grid-container";

    let article = document.createElement("article");
    article.className = "rectangular-element";

    let imageSection = document.createElement("div");
    imageSection.className = "image-container";

    let img = document.createElement("img");
    img.src = bird.photo.source;
    img.alt = bird.name;

    let textSection = document.createElement("div");
    textSection.className = "text-container";

    let englishNameLabel = document.createElement("span");
    englishNameLabel.className = "data-label";
    englishNameLabel.textContent = "Name: ";

    let englishNameValue = document.createElement("span");
    englishNameValue.className = "data-value";
    englishNameValue.textContent = bird.common_name;

    let maoriNameLabel = document.createElement("span");
    maoriNameLabel.className = "data-label";
    maoriNameLabel.textContent = "Maori name: ";

    let maoriNameValue = document.createElement("span");
    maoriNameValue.className = "data-value";
    maoriNameValue.textContent = bird.original_name;

    let conservationStatusName = document.createElement("span");
    conservationStatusName.className = "data-label";
    conservationStatusName.textContent = "Conservation Status: ";

    let conservationColor = getStausColor(bird.status.toLowerCase());
    let statusCircle = document.createElement("span");
    statusCircle.className = "circle2";
    statusCircle.style = "--circle-color: " + conservationColor + ";";

    let weightLabel = document.createElement("span");
    weightLabel.className = "data-label";
    weightLabel.textContent = "Weight: ";

    let weightValue = document.createElement("span");
    weightValue.className = "data-value";
    weightValue.textContent = bird.weight;

    let lengthLabel = document.createElement("span");
    lengthLabel.className = "data-label";
    lengthLabel.textContent = "Length: ";

    let lengthValue = document.createElement("span");
    lengthValue.className = "data-value";
    lengthValue.textContent = bird.length;

    let imageCreditLabel = document.createElement("span");
    imageCreditLabel.className = "data-label";
    imageCreditLabel.textContent = "Image Credit: ";

    let imageCreditValue = document.createElement("span");
    imageCreditValue.className = "data-value";
    imageCreditValue.textContent = bird.photo.credit;

    imageSection.appendChild(img);
    article.appendChild(imageSection);
    textSection.appendChild(englishNameLabel);
    textSection.appendChild(englishNameValue);
    textSection.appendChild(document.createElement("p"));
    textSection.appendChild(maoriNameLabel);
    textSection.appendChild(maoriNameValue);
    textSection.appendChild(document.createElement("p"));
    textSection.appendChild(weightLabel);
    textSection.appendChild(weightValue);
    textSection.appendChild(document.createElement("p"));
    textSection.appendChild(lengthLabel);
    textSection.appendChild(lengthValue);
    textSection.appendChild(document.createElement("p"));
    textSection.appendChild(conservationStatusName);
    textSection.appendChild(statusCircle);
    textSection.appendChild(document.createElement("p"));
    textSection.appendChild(imageCreditLabel);
    textSection.appendChild(imageCreditValue);
    textSection.appendChild(document.createElement("p"));

    article.appendChild(textSection);
    section.appendChild(article);
    main.appendChild(section);
}

function getStausColor(status) {
    switch (status) {
        case "not threatened":
            return "#02a028";
        case "naturally uncommon":
            return "#649a31";
        case "relicit":
            return "#99cb68";
        case "recovering":
            return "#fecc33";
        case "declining":
            return "#fe9a01";
        case "nationally increasing":
            return "#c26967";
        case "nationally vulnerable":
            return "#9b0000";
        case "nationally endagered":
            return "#660032";
        case "nationally critical":
            return "#320033";
        case "extinct":
            return "black";
        case "data deficient":
            return "black";
        default:
            return "grey";
    }
}


setUp();