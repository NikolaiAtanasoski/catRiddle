var grid = document.getElementById("grid");
var boxMap = new Map();

var currentRow = 1;
var numberOfboxes;

var lastSelectedBox;
var lastSelectedIcon;

class Cat {

    constructor(currentPos) {
        this.currentPos = currentPos;
    }

    getNextPositions() {
        if (this.currentPos == numberOfboxes) {
            return [this.currentPos - 1];
        }
        else if (this.currentPos == 1) {
            return [this.currentPos + 1];
        }
        else {
            return [this.currentPos + 1, this.currentPos - 1];
        }
    }
}


function getNextCatPostions(cats) {
    positions = [];
    cats.forEach(cat => {
        cat.getNextPositions().forEach(position => {
            if (!positions.includes(position)) {
                positions.push(position);
            }
        });
    });
    console.log(positions);
    return positions;
}

function drawNextCats(positions) {
    boxes = boxMap.get(currentRow + 1);
    boxes.forEach(box => {
        box.addEventListener("click", select);
        if (positions.includes(getPositionOfBox(box))) {
            box.innerHTML = "C";
        }
    });
}

function removeListenersFromOldRow() {
    boxes = boxMap.get(currentRow);
    boxes.forEach(box => {
        box.removeEventListener("click", select);
    });
}

function fillGrid() {
    for (i = 1; i <= 15; i++) {
        let boxes = [];
        for (j = 1; j < numberOfboxes + 1; j++) {

            box = document.createElement("div");
            box.id = "box_row_" + i + "_number_" + j;
            box.className = "box";
            boxes.push(box);

            grid.appendChild(box);
        }
        boxMap.set(i, boxes)
    }
}

function select(event) {
    box = event.srcElement;
    if (lastSelectedBox == undefined) {
        lastSelectedIcon = box.innerHTML;
        lastSelectedBox = box;
        box.innerHTML = "I";
    }
    else if (box.innerHTML == "I") {
        box.innerHTML = lastSelectedIcon;
        resetLastSelectedBoxAndIcon();
    }
    else {
        lastSelectedBox.innerHTML = lastSelectedIcon;
        lastSelectedIcon = box.innerHTML;
        lastSelectedBox = box;
        box.innerHTML = "I";
    }
}

function resetLastSelectedBoxAndIcon(){
    lastSelectedBox = undefined;
    lastSelectedIcon = undefined;
}

function initCats() {
    boxes = boxMap.get(currentRow);
    boxes.forEach(element => {
        element.addEventListener("click", select);
        element.innerHTML = "C";
    });

}

function getPositionOfBox(element) {
    return parseInt(element.id.split("_")[4]);
}

function getAllRemainingCats() {
    currentCats = [];
    boxes = boxMap.get(currentRow);
    boxes.forEach(box => {
        if (box.innerHTML == "C") {
            cat = new Cat(getPositionOfBox(box));
            currentCats.push(cat);
        }
    });
    return currentCats;
}

function next(event) {
    if (event.keyCode === 13) {
        console.log("enter");

        cats = getAllRemainingCats();

        if (cats.length < 1) {
            alert("done, row number:" + parseInt(currentRow));
            return;
        }

        positions = getNextCatPostions(cats);

        removeListenersFromOldRow();

        drawNextCats(positions);

        resetLastSelectedBoxAndIcon();

        currentRow += 1;

    }
}

function main() {
    numberOfboxes = 5;

    fillGrid()

    initCats();

    window.addEventListener("keydown", next);
}



main();