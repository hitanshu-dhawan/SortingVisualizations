// Sorting Visualizations
// https://khan4019.github.io/front-end-Interview-Questions/sort.html

var array = [];
var arraySize = 100;

var steps = [];
var stepsIndex = 0;

prepareArray();
shuffleArray();

// bubbleSort();
// selectionSort();
insertionSort();


////////////////////////////////////////
////////// Sorting Algorithms //////////
////////////////////////////////////////

function bubbleSort() {
    saveStep();
    var length = array.length;
    for (var i = length - 1; i >= 0; i--) {
        for (var j = 1; j <= i; j++) {
            if (array[j - 1] > array[j]) {
                var temp = array[j - 1];
                array[j - 1] = array[j];
                array[j] = temp;
                saveStep([j]);
            }
        }
    }
    saveStep();
}

function selectionSort() {
    saveStep();
    var length = array.length;
    for (var i = 0; i < length; i++) {
        var minIndex = i;
        for (var j = i + 1; j < length; j++) {
            if (array[j] < array[minIndex]) {
                minIndex = j;
            }
            saveStep([minIndex, j]);
        }
        var temp = array[i];
        array[i] = array[minIndex];
        array[minIndex] = temp;
        saveStep([i, minIndex]);
    }
    saveStep();
}

function insertionSort() {
    saveStep();
    var length = array.length;
    for (var i = 1; i < length; i++) {
        var key = array[i];
        var j = i - 1;
        while (j >= 0 && array[j] > key) {
            array[j + 1] = array[j];
            j--;
            saveStep([j + 1]);
        }
        array[j + 1] = key;
        saveStep();
    }
    saveStep();
}

////////////////////////////////////////
///////// PaperScript functions ////////
////////////////////////////////////////

function onFrame(event) {
    if (typeof steps[stepsIndex] === "undefined") {
        // location.reload(); // todo : reload after 2 seconds (setTimeout)
        return;
    }

    // clear canvas
    if (project.activeLayer.hasChildren()) {
        project.activeLayer.removeChildren();
    }

    var markedIndexes = steps[stepsIndex].markedIndexes;
    var array = steps[stepsIndex].array;
    for (i = 0; i < arraySize; i++) {
        var width = view.size.width / arraySize;
        var height = array[i] * (view.size.height / arraySize);
        drawRectangle(
            i * width,
            view.size.height,
            i * width + width,
            view.size.height - height,
            contains(markedIndexes, i)
        );
    }

    stepsIndex++;
}

function drawRectangle(x1, y1, x2, y2, marked) {
    var rectangle = new Rectangle(new Point(x1, y1), new Point(x2, y2));
    var path = new Path.Rectangle(rectangle);
    path.fillColor = marked ? 'red' : 'white';
}

////////////////////////////////////////
//////////// Util functions ////////////
////////////////////////////////////////

function prepareArray() {
    for (i = 0; i < arraySize; i++) {
        array.push(i + 1);
    }
}

function shuffleArray() {
    var currentIndex = array.length;
    while (currentIndex !== 0) {
        var randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        var temp = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temp;
    }
}

function saveStep(markedIndexes) {
    steps.push({
        markedIndexes: markedIndexes,
        array: array.slice()
    });
}

function contains(array, element) {
    if (typeof array === "undefined")
        return;
    for (var i = 0; i < array.length; i++) {
        if (array[i] === element) {
            return true;
        }
    }
    return false;
}