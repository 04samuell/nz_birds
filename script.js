const URL = "https://altitude.otago.ac.nz/leesa178/cosc203/-/raw/main/nzbird.json?ref_type=heads" // Data file
const token = "eE_SztQH1R9VYRHFdtDg" // Personal access token

function retrieveData() {
    fetch(URL, {
        method: 'GET',
        header: {
            authorization: token
        }
    })
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
    for (let bird of birds) {
        //console.log(emoji);
    }
    console.log(birds.length)
    console.log(birds[0]);
}

// callback for when a fetch error occurs
function fetchErrorCallback(error) {
    //alert("An error occured when fetching the bird data. Please try again later.");
    console.log(error)
}

console.log("Hello")
retrieveData();