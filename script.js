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

    let searchResult = document.querySelector("#search-result");
    if (searchResult == null) {
        searchResult = "";
    }
    let conservationStatus = document.querySelector("#conservation-filter").value.toLowerCase();
    let otherFilter = document.querySelector("#other-filter").value.toLowerCase();

    let birdlist = [];
    for (let bird of data) {
        let validNames = getValidNames(bird);
        if (true) { // check if the search result is in the list of names validNames.includes(searchResult)
            if (conservationStatus == "all") { // check if the conservation status matched the birds conservation status || conservationStatus.includes(conservationStatus)
                birdlist.push(bird);
            }
        }
    }

    //show bird counter
    let counter = document.getElementById("bird-counter");
    counter.textContent = "Showing " + birdlist.length + " of 68 birds.";
    counter.classList.add("filter-label");

    //sort by other filter...

    //display birds
    for (let bird of birdlist) {
        createAndDisplayBird(bird);
    }
}

function getValidNames(bird) {
    validNames = [];
    validNames.push(bird.common_name.toLowerCase());
    validNames.push(bird.scientific_name.toLowerCase());
    validNames.push(bird.common_name.toLowerCase());
    //add other names later
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


    // let span2 = document.createElement("span");
    // span2.className = "bird-circle";
    // span2.style = "--circle-color: " + getConserVationColor(bird.conservation_status) + ";";

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

    let conservationStatusValue = document.createElement("span");
    conservationStatusValue.className = "data-value";
    conservationStatusValue.textContent = bird.status;

    let getConserVationColor = getStausColor(bird.status);

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
    textSection.appendChild(conservationStatusName);
    textSection.appendChild(conservationStatusValue);
    textSection.appendChild(document.createElement("p"));
    //weight and height
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
        case "":
            return "#";
        case "":
            return "#";
        case "":
            return "#";
        case "":
            return "#";
        case "":
            return "#";
        case "":
            return "#";
        case "":
            return "#";
        default:
            return "grey";
    }
}


setUp();

/*

  <section class="grid-container">
            <article class="rectangular-element">
                <div class="image-container">
                    <img src="data/images/bellbird-4.jpg" alt="Image Description">
                </div>
                <span class="bird-name">Bird name</span>
                <span class="bird-circle" style="--circle-color: red;"></span>
                <div class="text-container">
                    <span class="data-label">Image Credit:</span>
                    <span class="data-value">Photographer's Name</span>  
                </div>
            </article>
        </section

*/

