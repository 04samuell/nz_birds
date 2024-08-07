const URL = "nzbird.json" // Data file

function setUp() {
    let button = document.getElementById("filter-button");
    button.addEventListener("click", function (event) {
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
    let searchResult = normalizeString(searchElement.value).toLowerCase(); if (searchResult === null) searchResult = "";
    let minWeight = document.querySelector("#input-weight-min").value; if (minWeight === null) minWeight = "";
    let maxWeight = document.querySelector("#input-weight-max").value; if (maxWeight === null) maxWeight = "";
    let minLength = document.querySelector("#input-length-min").value; if (minLength === null) minLength = "";
    let maxLength = document.querySelector("#input-length-max").value; if (maxLength === null) maxLength = "";

    let conservationStatus = document.querySelector("#conservation-filter").value.trim().toLowerCase();
    let otherFilter = document.querySelector("#other-filter").value.trim().toLowerCase();

    let birdlist = [];
    for (let bird of data) {
        let validNames = getValidNames(bird);
        if (searchResult === "" || containsName(validNames, searchResult)) { // check if the search result is in the list of names validNames
            let status = bird.status.replaceAll(" ", "").toLowerCase();
            if (conservationStatus === "all" || conservationStatus.localeCompare(status) == 0) { // check if the conservation status matched the birds conservation status || conservationStatus.includes(conservationStatus)
                birdlist.push(bird);
            }
        }
    }

    //get metadata about bird length and weight
    for (let bird of birdlist) {
        handleBirdData(bird);
    }

    //filter birds based on user input
    birdlist = getBirdsInRangeLength(birdlist, minLength, maxLength);
    if (birdlist == null) return;
    birdlist = getBirdsInRangeWeight(birdlist, minWeight, maxWeight);
    if (birdlist == null) return;

    if (otherFilter.localeCompare("light-heavy") == 0) {
        birdlist = sortByWeight(birdlist);
    } else if (otherFilter.localeCompare("heavy-light") == 0) {
        birdlist = sortByWeight(birdlist).reverse();
    } else if (otherFilter.localeCompare("short-long") == 0) {
        birdlist = sortByLength(birdlist);
    } else {
        birdlist = sortByLength(birdlist).reverse();
    }

    //show bird counter
    let counter = document.getElementById("bird-counter");
    counter.textContent = "Showing " + birdlist.length + " of 68 birds.";
    counter.classList.add("filter-label");

    //clear previous birds
    let main = document.getElementById("image-content");
    main.innerHTML = "";

    //display birds
    for (let bird of birdlist) {
        createAndDisplayBird(bird);
    }

    //display error if no birds found
    if (birdlist.length == 0) {
        displayError("No birds found.");
    }
}

function displayError(message) {
    let main = document.getElementById("image-content");
    main.innerHTML = "";
    let h2 = document.createElement("h2");
    h2.textContent = message;
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
    validNames = [];
    validNames.push(normalizeString(bird.common_name.toLowerCase()));
    validNames.push(normalizeString(bird.scientific_name.toLowerCase()));
    validNames.push(normalizeString(bird.original_name.toLowerCase()));

    for (let name of bird.other_name) {
        validNames.push(normalizeString(name.toLowerCase()));
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

function normalizeString(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function handleBirdData(bird) {
    addLengthProperty(bird);
    addWeightProperty(bird);
}

function addLengthProperty(bird) {
    let birdString = bird.length;
    let length;
    let dash = birdString.includes("-");
    let minLength;
    let maxLength;
    if (birdString.includes("male")) {
        let maleAndFemaleData = birdString.split(",");
        if (dash) {
            let dashedArray1 = maleAndFemaleData[0].split("-");
            let dashedArray2 = maleAndFemaleData[1].split("-");
            let numbers1 = [extractNumeric(dashedArray1[0]), extractNumeric(dashedArray1[1])];
            let numbers2 = [extractNumeric(dashedArray2[0]), extractNumeric(dashedArray2[1])];
            minLength = average(numbers1[0], numbers1[1], numbers2[0], numbers2[1]);
            maxLength = average(numbers1[0], numbers1[1], numbers2[0], numbers2[1]);
            length = average(average(numbers1[0], numbers1[1]), average(numbers2[0], numbers2[1]));
        } else {
            let numbers = [extractNumeric(maleAndFemaleData[0]), extractNumeric(maleAndFemaleData[1])];
            minLength = Math.min(numbers[0], numbers[1]);
            maxLength = Math.max(numbers[0], numbers[1]);
            length = average(numbers[0], numbers[1]);
        }
    } else {
        if (dash) {
            let dashedArray = birdString.split("-");
            let numbers = [extractNumeric(dashedArray[0]), extractNumeric(dashedArray[1])];
            length = average(numbers[0], numbers[1]);
            minLength = Math.min(numbers[0], numbers[1]);
            maxLength = Math.max(numbers[0], numbers[1]);
        } else {
            length = extractNumeric(birdString);
            minLength = length;
            maxLength = length;
        }
    }

    bird["lengthAv"] = length;
    bird["minLength"] = minLength;
    bird["maxLength"] = maxLength;
}

function addWeightProperty(bird) {
    let birdString = bird.weight;
    let weight;
    let kg = birdString.includes("kg");
    let dash = birdString.includes("-");
    let comma = birdString.includes(",");
    let minWeight;
    let maxWeight;
    let dualData = birdString.includes("male") || birdString.includes("northern");
    if (dualData) {
        let dualDataArray;
        if (comma) {
            dualDataArray = birdString.split(",");
        } else {
            dualDataArray = birdString.split(";");
        }
        if (dash) {
            let dashedArray1 = dualDataArray[0].split("-");
            let dashedArray2 = dualDataArray[1].split("-");
            let numbers1 = [extractNumeric(dashedArray1[0]), extractNumeric(dashedArray1[1])];
            let numbers2 = [extractNumeric(dashedArray2[0]), extractNumeric(dashedArray2[1])];
            minWeight = Math.min(numbers1[0], numbers1[1], numbers2[0], numbers2[1]);
            maxWeight = Math.max(numbers1[0], numbers1[1], numbers2[0], numbers2[1]);
            weight = average(average(numbers1[0], numbers1[1]), average(numbers2[0], numbers2[1]));
        } else {
            let numbers = [extractNumeric(dualDataArray[0]), extractNumeric(dualDataArray[1])];
            minWeight = Math.min(numbers[0], numbers[1]);
            maxWeight = Math.max(numbers[0], numbers[1]);
            weight = average(numbers[0], numbers[1]);
        }
    } else if (dash) {
        let dashedArray = birdString.split("-");
        let numbers = [extractNumeric(dashedArray[0]), extractNumeric(dashedArray[1])];
        minWeight = Math.min(numbers[0], numbers[1]);
        maxWeight = Math.max(numbers[0], numbers[1]);
        weight = average(numbers[0], numbers[1]);
    } else {
        weight = extractNumeric(birdString);
        minWeight = weight;
        maxWeight = weight;
    }

    if (kg) {
        minWeight = minWeight * 1000;
        maxWeight = maxWeight * 1000;
        weight = weight * 1000;
    }

    bird["weightAv"] = weight;
    bird["minWeight"] = minWeight;
    bird["maxWeight"] = maxWeight;
}

function getBirdsInRangeLength(birds, minLength, maxLength) {
    if (minLength === "") {
        minLength = 0;
    } else {
        minLength = Number(minLength);
    }
    if (maxLength === "") {
        maxLength = Number.MAX_VALUE;
    } else {
        maxLength = Number(maxLength);
    }
    if (isNaN(minLength) || isNaN(maxLength)) {
        displayError("Error parsing length");
        return null;
    } else if (minLength < 0 || maxLength < 0) {
        displayError("Length must be a positive number");
        return null;
    } else if (minLength > maxLength) {
        temp = minLength;
        minLength = maxLength;
        maxLength = temp;
    }

    birdsResults = []
    for (bird of birds) {
        add = true;
        if (bird.minLength < minLength && bird.maxLength < minLength) {
            add = false;
        } else if (bird.minLength > maxLength && bird.maxLength > maxLength) {
            add = false;
        }
        if (add) {
            birdsResults.push(bird);
        }
    }

    return birdsResults;
}

function getBirdsInRangeWeight(birds, minWeight, maxWeight) {
    if (minWeight === "") {
        minWeight = 0;
    } else {
        minWeight = Number(minWeight);
    }
    if (maxWeight === "") {
        maxWeight = Number.MAX_VALUE;
    } else {
        maxWeight = Number(maxWeight);
    }
    if (isNaN(minWeight) || isNaN(maxWeight)) {
        displayError("Error parsing weight");
        return null;
    } else if (minWeight < 0 || maxWeight < 0) {
        displayError("Weight must be a positive number");
        return null;
    } else if (minWeight > maxWeight) {
        temp = minWeight;
        minWeight = maxWeight;
        maxWeight = temp;
    }

    birdsResults = []
    for (bird of birds) {
        add = true;
        if (bird.minWeight < minWeight && bird.maxWeight < minWeight) {
            add = false;
        } else if (bird.minWeight > maxWeight && bird.maxWeight > maxWeight) {
            add = false;
        }
        if (add) {
            birdsResults.push(bird);
        }
    }

    return birdsResults;
}

// Given a string, extract the numeric value from it and parse as a number.
function extractNumeric(str) {
    const numericString = str.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1'); // replaces all non-numeric characters apart from decimal points
    return numericString ? Number(numericString) : NaN;
}

// Given two numbers, return their average.
function average(a, b) {
    return (a + b) / 2;
}

function sortByLength(array) {
    return array.sort((a, b) => a.lengthAv - b.lengthAv);
}

function sortByWeight(array) {
    return array.sort((a, b) => a.weightAv - b.weightAv);
}

setUp();