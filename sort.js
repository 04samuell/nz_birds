function handleBirdData(bird) {
    addLengthProperty(bird);
    addWeightProperty(bird);
}

function addLengthProperty(bird) {
    let dataString = bird.length;
    let length;
    if(birdString.contains("male")) {
        let maleAndFemaleData = birdString.split(";");
        numbers = [extractNumeric(maleAndFemaleData[0]), extractNumeric(maleAndFemaleData[1])];
        length = average(numbers[0], numbers[1]);
    } else {
        length = extractNumeric(birdString);
    }

    bird["lengthRaw"] = length;
}

function addWeightProperty(bird) {
    
}

// Given a string, extract the numeric value from it.
function extractNumeric(str) {
    const numericString = str.replace(/\D/g, '');
    return numericString ? Number(numericString) : NaN;
}

// Given two numbers, return their average.
function average(a, b) {
    return (a + b) / 2;
}