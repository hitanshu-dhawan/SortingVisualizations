
var n = 499;

var array = [];
for (i = 0; i < n; i++) {
    array.push(i + 1);
}
array = shuffle(array);

var steps_index = 0;
var steps = [];

bubbleSort();

// function onFrame(event) {
//     for (i = 0; i < n; i++) {
//         var width = view.size.width / n;
//         var height = array[i] * (view.size.height / n);

//         drawRectangle(
//             i * width,
//             view.size.height,
//             i * width + width,
//             view.size.height - height
//         );
//     }
// }
function onFrame(event) {
    if (typeof steps[steps_index] === "undefined") {
        location.reload(); // reload after some 2 seconds (todo)
        return;
    }

    // clear canvas
    if (project.activeLayer.hasChildren()) {
        project.activeLayer.removeChildren();
    }

    var arr = steps[steps_index++]
    console.log(arr);

    for (i = 0; i < n; i++) {
        var width = view.size.width / n;
        var height = arr[i] * (view.size.height / n);

        drawRectangle(
            i * width,
            view.size.height,
            i * width + width,
            view.size.height - height
        );
    }
}

function bubbleSort() {
    steps.push(array.slice());
    for (i = 0; i < n; i++) {
        for (j = 0; j < n - i - 1; j++) {
            if (array[j] > array[j + 1]) {
                swap(array, j, j + 1);
                steps.push(array.slice());
            }
        }
    }
}

function swap(arr, firstIndex, secondIndex) {
    var temp = arr[firstIndex];
    arr[firstIndex] = arr[secondIndex];
    arr[secondIndex] = temp;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////

function shuffle(array) {
    var copy = [], n = array.length, i;
    // While there remain elements to shuffle
    while (n) {
        // Pick a remaining element…
        i = Math.floor(Math.random() * array.length);
        // If not already shuffled, move it to the new array.
        if (i in array) {
            copy.push(array[i]);
            delete array[i];
            n--;
        }
    }
    return copy;
}

function drawRectangle(x1, y1, x2, y2) {
    var rectangle = new Rectangle(new Point(x1, y1), new Point(x2, y2));
    var path = new Path.Rectangle(rectangle);
    path.fillColor = 'white';
}

function sleep(milliseconds) {
    var start = new Date().getTime();
    for (i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
}