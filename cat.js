var grid = document.getElementById("grid");
var buttonMap = new Map();
var currentRow = 0;
var numberOfButtons;
var currentCats = [];
var currentlySelected;

class Cat{

    constructor(currentPos){
        this.currentPos = currentPos;
    }

    getNextPositions(){
        if(this.currentPos === numberOfButtons){
            return currentPos -1;
        }
        else if(this.currentPos === 1){
            return this.currentPos + 1;
        }
        else{
            return this.currentPos +1, this.currentPos - 1;
        }
    }

}

function fillGrid(numberOfButtons) {
    for (i = 0; i <= 10; i++) {
        let buttons = [];
        for (j = 1; j < numberOfButtons +1; j++) {
        
            box = document.createElement("div");
            box.id = "box_row_" + i + "_number_" + j;
            box.className = "box";
            box.addEventListener("click", click);
            
            buttons.push(box);
            

            grid.appendChild(box);
        }
        buttonMap.set(i,buttons)
    }
}

function click(event) {
    console.log(event.srcElement);
    if (event.ctrlKey) {
        console.log("ctrl");
        event.srcElement.innerHTML = "I";
        currentlySelected = event.srcElement.id.split("_")[4];
    }
    else {
        console.log("hello");
        event.srcElement.innerHTML = "C";
    }
}

function addCats(){
    buttons = buttonMap.get(currentRow);
    buttons.forEach(element => {
        element.innerHTML = "C";
    });

    currentRow += 1;
}


function main(){
    numberOfButtons = 5;
    fillGrid(numberOfButtons)

    addCats();

}




main();