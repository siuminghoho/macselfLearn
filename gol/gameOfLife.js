const unitLength = 20;
let boxColor;
const strokeColor = 50;
let columns; /* To be determined by window width */
let rows; /* To be determined by window height */
let currentBoard;
let nextBoard;



//extra variables
let fr = 5;
// let MIN_ALIVE_NEIGHBORS = 2;
// let MAX_ALIVE_NEIGHBORS = 3;
// let REPRODUCTION_NEIGHBORS = 3;
let isGameRunning = false;
let selectedPattern;
let cursorX = 0;
let cursorY = 0;
let isDrawingEnabled = false;
let clickedField;
const colorBlindToggle = document.getElementById('colorBlindToggle')

const heightOutput = document.querySelector("#height");
const widthOutput = document.querySelector("#width");



function setup() {
  frameRate(fr);

  /* Set the canvas to be under the element #canvas*/
  const canvas = createCanvas(windowWidth * .8, windowHeight * .4);
  canvas.parent(document.querySelector("#canvas"));

  /*Calculate the number of columns and rows */
  columns = floor(width / unitLength);
  rows = floor(height / unitLength);

  /*Making both currentBoard and nextBoard 2-dimensional matrix that has (columns * rows) boxes. */
  currentBoard = [];
  nextBoard = [];
  for (let i = 0; i < columns; i++) {
    currentBoard[i] = [];
    nextBoard[i] = [];
  }
  // Now both currentBoard and nextBoard are array of array of undefined values.
  init(); // Set the initial values of the currentBoard and nextBoard
}



function init(randomize = true) {

  // Initialize the board with random values.
  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
      currentBoard[i][j] = 0;
      nextBoard[i][j] = 0;
      if (randomize) {
        currentBoard[i][j] = random() > 0.8 ? 1 : 0; // one line if
      } else {
        currentBoard[i][j] = 0;
      }
      nextBoard[i][j] = 0;
      // board[i][j] = floor(random(2));
      // next[i][j] = 0;
    }
  }

  loop()
  isGameRunning = true;
  flag.innerHTML = isGameRunning

}



function cursorPreview() {


  const x = Math.floor(mouseX / unitLength);
  const y = Math.floor(mouseY / unitLength);
  cursorX = x;
  cursorY = y;
  console.log("previewing")
  if (!isGameRunning) { draw() }

  stroke('red');
  strokeWeight(5);
  noFill();
  rect(x * unitLength, y * unitLength, unitLength, unitLength);
}


function mouseMoved() {
  if (mouseX > unitLength * columns || mouseY > unitLength * rows || mouseX < 0 || mouseY < 0) {
    return;
  }

  if (selectedPattern) {
    const x = Math.floor(mouseX / unitLength);
    const y = Math.floor(mouseY / unitLength);
    cursorX = x;
    cursorY = y;
    previewPattern(selectedPattern,cursorX,cursorY)
  } else {
    cursorPreview()
  }

}
// for debugging use
let flag = document.querySelector("#flag-running")

function draw() {

  background(255);
  if (isGameRunning) {
    generate();
  }

  const isColorBlindMode = colorBlindToggle.checked

  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {


      let neighbors = 0;
      for (let x of [-1, 0, 1]) {
        for (let y of [-1, 0, 1]) {
          if (x == 0 && y == 0) {
            continue;
          }
          neighbors +=
            currentBoard[(i + x + columns) % columns][(j + y + rows) % rows];
        }
      }
      if (currentBoard[i][j] == 1) {
        if (neighbors == 3) {
          isColorBlindMode ? fill(0, 100, 150) : fill(100); // Color for cells that came to life due to having exactly 3 neighbors
        } else if (neighbors == 2) {
          isColorBlindMode ? fill(0, 150, 200) : fill(150); // Color for cells that are alive and have exactly 2 neighbors (they stay alive)
        } else {
          let boxColor = isColorBlindMode
            ? `rgb(${Math.floor(Math.random() * 150)},${Math.floor(Math.random() * 200)},${Math.floor(Math.random() * 255)})`
            : `rgb(${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)})`;
          fill(boxColor); // Alive color (replace 'boxColor' with the variable or value you're using)
        }
      } else {
        fill(255); // Dead color
      }

      stroke(strokeColor);
      strokeWeight(1);
      rect(i * unitLength, j * unitLength, unitLength, unitLength);

    }
  }
  // if (isDrawingEnabled) {
  //   handleKeyboardInput();
  // }

}


// function handleKeyboardInput() {

// }




function applyRules(currentBoard, x, y, minAliveNeighbors, maxAliveNeighbors, reproductionNeighbors) {
  let neighbors = 0;
  for (let i of [-1, 0, 1]) {
    for (let j of [-1, 0, 1]) {
      if (i == 0 && j == 0) {
        continue;
      }
      neighbors += currentBoard[(x + i + columns) % columns][(y + j + rows) % rows];
    }
  }

  if (currentBoard[x][y] == 1 && (neighbors < minAliveNeighbors || neighbors > maxAliveNeighbors)) {
    return 0;
  } else if (currentBoard[x][y] == 0 && neighbors == reproductionNeighbors) {
    return 1;
  } else {
    return currentBoard[x][y];
  }
}



function generate() {
  //Loop over every single box on the board
  const minAliveNeighbors = parseInt(document.getElementById("minAliveNeighbors").value);
  const maxAliveNeighbors = parseInt(document.getElementById("maxAliveNeighbors").value);
  const reproductionNeighbors = parseInt(document.getElementById("reproductionNeighbors").value);

  for (let x = 0; x < columns; x++) {
    for (let y = 0; y < rows; y++) {
      nextBoard[x][y] = applyRules(currentBoard, x, y, minAliveNeighbors, maxAliveNeighbors, reproductionNeighbors);
    }
  }
  // Swap the nextBoard to be the current Board
  // [currentBoard, nextBoard] = [nextBoard, currentBoard];

  [currentBoard, nextBoard] = [nextBoard, currentBoard];
}




//When mouse is dragged

function mouseDragged() {
  if (mouseX > unitLength * columns || mouseY > unitLength * rows) {
    return;
  }
  const x = Math.floor(mouseX / unitLength);
  const y = Math.floor(mouseY / unitLength);

  if (selectedPattern) {
    placePattern(selectedPattern, x, y);
  } else {
    currentBoard[x][y] = 1;
    fill('gold');
    stroke(strokeColor);
    strokeWeight(1)
    rect(x * unitLength, y * unitLength, unitLength, unitLength);
  }
}

//When mouse is pressed

function mouseClicked() {
  clickedField = getFieldFromCoordinates(mouseX, mouseY);
  if (clickedField !== null) {
    isDrawingEnabled = true;
  }
}

function mousePressed() {
  if (mouseX > unitLength * columns || mouseY > unitLength * rows || mouseX < 0 || mouseY < 0) {
    return;
  }
  console.log("mouse pressed");
  // noLoop();
  isGameRunning = false;
  flag.innerHTML = isGameRunning
  mouseDragged();
}


//When mouse is released

function mouseReleased() {
  if (mouseX > unitLength * columns || mouseY > unitLength * rows || mouseX < 0 || mouseY < 0) {
    return;
  }
  console.log("mouse released");
  loop();
  isGameRunning = true;
  flag.innerHTML = isGameRunning
}

function handleSpeedChange() {
  const sliderValue = parseInt(document.getElementById('framerateSlider').value);
  console.log("check slider value", sliderValue)
  fr = sliderValue;
  frameRate(fr);
}

// stop button 

const stopButton = document.querySelector("#stopButton");

stopButton.addEventListener("click", () => {
  console.log("stop button clicked");
  noLoop();
  //change game running status
  isGameRunning = false;
  flag.innerHTML = isGameRunning

});

const resumeButton = document.querySelector("#resumeButton");

resumeButton.addEventListener("click", () => {
  loop();
  //change game running status
  isGameRunning = true;
  flag.innerHTML = isGameRunning
});

const clearButton = document.querySelector("#clearButton");
clearButton.addEventListener("click", () => {
  // loop();


  init(randomize = false);

  noLoop();
  isGameRunning = false;
  flag.innerHTML = isGameRunning
});




const GLIDER = `.O
..O
OOO`

const LWSS = `.O..O
O
O...O
OOOO`;



const GOSPER_GLIDER_GUN = `........................O
......................O.O
............OO......OO............OO
...........O...O....OO............OO
OO........O.....O...OO
OO........O...O.OO....O.O
..........O.....O.......O
...........O...O
............OO`;


document.getElementById('glider').addEventListener('click', (event) => {
  event.preventDefault();
  console.log('glider')
  selectedPattern = GLIDER;
});

document.getElementById('lwss').addEventListener('click', (event) => {
  event.preventDefault();
  selectedPattern = LWSS;
});

document.getElementById('gosperGliderGun').addEventListener('click', (event) => {
  event.preventDefault();
  selectedPattern = GOSPER_GLIDER_GUN;
});




// Initialize cursor position
// let cursorX = Math.floor(columns / 2);
// let cursorY = Math.floor(rows / 2);

// Event listener for keyboard input use p5 keyPressed

function keyPressed() {
  if (keyCode === ENTER) { // Enter space
    isGameRunning = !isGameRunning;
    flag.innerHTML = isGameRunning

    if (isGameRunning) {
      console.log('going')
      loop();
    } else {
      console.log('stopping')
      noLoop();
    }
  }
  if (keyCode === 38) {

    cursorY = (cursorY - 1 + rows) % rows;
    // currentBoard[x][y] = 1
    // value = 'yellow'
    console.log("up")
  } else if (keyCode === 40) {

    cursorY = (cursorY + 1 + rows) % rows;
    // currentBoard[x][y] = 1
    // value = 'yellow'
    console.log("down")
  } else if (keyCode === 37) {

    cursorX = (cursorX - 1 + columns) % columns;
    // currentBoard[x][y] = 1
    // value = 'yellow'
    console.log("left")
  } else if (keyCode === 39) {

    cursorX = (cursorX + 1 + columns) % columns;
    // currentBoard[x][y] = 1
    // value = 'yellow'
    console.log("right")
  }
  if (keyCode === 73) {
    currentBoard[cursorX][cursorY] = 1
    stroke('yellow');
    strokeWeight(1);
    fill('yellow')
    rect(cursorX * unitLength, cursorY * unitLength, unitLength, unitLength);
  }


  if (!isGameRunning) { draw() }

  stroke('red');
  strokeWeight(5);
  noFill();
  rect(cursorX * unitLength, cursorY * unitLength, unitLength, unitLength);


}


// function reportWindowSize() {
//   heightOutput.textContent = window.innerHeight;
//   widthOutput.textContent = window.innerWidth;
// }


function getFieldFromCoordinates(x, y) {
  const column = floor(x / unitLength);
  const row = floor(y / unitLength);

  // Check if the coordinates are within the valid range
  if (column >= 0 && column < columns && row >= 0 && row < rows) {
    return { column, row };
  } else {
    return null; // Coordinates outside the valid range
  }
}

function mouseDoubleClicked() {
  isDrawingEnabled = true;
}


function windowResized() {
  // resizeCanvas(windowWidth, windowHeight);
  setup();
}


// location.reload()

function placePattern(pattern, offsetX, offsetY) {
  console.log('placing pattern', pattern)
  const processed = pattern.split("\n")

  let startX = offsetX;
  let startY = offsetY;
  //number of col
  let x = 0
  //number of row
  let y = 0
  for (let instruction of processed) {
    x = 0
    for (let signal of instruction) {
      if (signal == 'O') {
        // console.log("insert 1!", `${x + startX}|${y + startY}`)

        currentBoard[(x + startX + columns) % columns][(y + startY + rows) % rows] = 1
      }

      x++
    }
    y++
  }
}


function previewPattern(pattern, offsetX, offsetY) {
  console.log('previewing pattern', pattern)
  const processed = pattern.split("\n")

  let startX = offsetX;
  let startY = offsetY;
  //number of col
  let x = 0
  //number of row
  let y = 0
  if (!isGameRunning) { draw() }
  for (let instruction of processed) {
    x = 0
    for (let signal of instruction) {
      if (signal == 'O') {
        // console.log("insert 1!", `${x + startX}|${y + startY}`)console.log("previewing")
        console.log("place preview")
        stroke('red');
        strokeWeight(5);
        noFill();
        rect(((x + startX + columns) % columns) * unitLength, ((y + startY + rows) % rows) * unitLength, unitLength, unitLength);

      }

      x++
    }
    y++
  }
}





// <-------------------------------------------------------------------->



