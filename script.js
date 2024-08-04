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
    console.log("creating bird");
    let main = document.getElementById("image-content");

    let section = document.createElement("section"); 
    section.className = "grid-container";
    //main.appendChild(section);

    let article = document.createElement("article");
    article.className = "rectangular-element";
    //section.appendChild(article);

    let div1 = document.createElement("div");
    div1.className = "image-container";
    //article.appendChild(div1);

    let img = document.createElement("img");
    img.src = bird.photo.source;
    img.alt = bird.name;
    //div1.appendChild(img);

    let span1 = document.createElement("span");
    span1.className = "bird-name";
    span1.textContent = bird.common_name;
    //article.appendChild(span1);

    let span2 = document.createElement("span");
    span2.className = "bird-circle";
    //span2.style = "--circle-color: " + getConserVationColor(bird.conservation_status) + ";";
    //article.appendChild(span2);

    let div2 = document.createElement("div");
    div2.className = "text-container";
    //article.appendChild(div2);
    
    let span3 = document.createElement("span");
    span3.className = "data-label";
    span3.textContent = "Image Credit: ";
    //article.appendChild(span3);

    let span4 = document.createElement("span");
    span4.className = "data-value";
    span4.textContent = bird.photo.credit;
    //article.appendChild(span4);
    console.log(img);
    console.log(span1);
    console.log(span2);
    console.log(span3);
    console.log(span4);
    console.log(div1);
    console.log(div2);
    console.log(article);
    console.log(section);


    div1.appendChild(img);
    article.appendChild(div1);
    article.appendChild(span1);
    article.appendChild(span2);
    div2.appendChild(span3);
    div2.appendChild(span4);
    article.appendChild(div2);
    section.appendChild(article);
    main.appendChild(section);
}

function getConserVationColor(status) {
    switch(status) {
        case "At Risk":
            return "red";
        case "Recovering":
            return "orange";
        case "Not Threatened":
            return "green";
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

