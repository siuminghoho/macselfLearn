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
  const canvas = createCanvas(windowWidth, windowHeight - 400);
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



function init(event, minAlive, maxAlive, reproduction) {
  if (event) {
    event.preventDefault();
  }

  //Check if values are provided, and if not, use default values.
  // minAliveNeighbors = minAlive ? parseInt(minAlive) : MIN_ALIVE_NEIGHBORS;
  // maxAliveNeighbors = maxAlive ? parseInt(maxAlive) : MAX_ALIVE_NEIGHBORS;
  // reproductionNeighbors = reproduction ? parseInt(reproduction) : REPRODUCTION_NEIGHBORS;

  // Initialize the board with random values.
  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
      currentBoard[i][j] = 0;
      nextBoard[i][j] = 0;
      currentBoard[i][j] = random() > 0.8 ? 1 : 0; // one line if
      nextBoard[i][j] = 0;
      // board[i][j] = floor(random(2));
      // next[i][j] = 0;
    }
  }
  // MIN_ALIVE_NEIGHBORS = parseInt(minAliveNeighbors);
  // MAX_ALIVE_NEIGHBORS = parseInt(maxAliveNeighbors);
  // REPRODUCTION_NEIGHBORS = parseInt(reproductionNeighbors);
}



function draw() {
  background(255);
  generate();

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
      rect(i * unitLength, j * unitLength, unitLength, unitLength);



    }
  }
  if (isDrawingEnabled) {
    handleDrawingInput();
 
  }
  // Draw the cursor
  stroke('yellow');
  strokeWeight(1);
  noFill();
  rect(cursorX * unitLength, cursorY * unitLength, unitLength, unitLength);
}


function handleDrawingInput(){
  if (keyCode === 38) {

    cursorY = (cursorY - 1 + rows) % rows;
    currentBoard[x][y] = 1
    // value = 'yellow'
    console.log(38)
  } else if (keyCode === 40) {

    cursorY = (cursorY + 1 + rows) % rows;
    currentBoard[x][y] = 1
    // value = 'yellow'
    console.log(40)
  } else if (keyCode === 37) {

    cursorX = (cursorX - 1 + columns) % columns;
    currentBoard[x][y] = 1
    // value = 'yellow'
    console.log(37)
  } else if (keyCode === 39) {

    cursorX = (cursorX + 1 + columns) % columns;
    currentBoard[x][y] = 1
    // value = 'yellow'
    console.log(39)
  }
}


// function keyPressed() {
//   if (keyCode === ENTER) {
//     isGameRunning = !isGameRunning;

//     if (isGameRunning) {
//       console.log('going');
//       loop();
//     } else {
//       console.log('stopping');
//       noLoop();
//     }
//   }
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
  console.log("mouse pressed");
  noLoop();
  mouseDragged();
}


//When mouse is released

function mouseReleased() {
  console.log("mouse released");
  loop();
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

});

const resumeButton = document.querySelector("#resumeButton");

resumeButton.addEventListener("click", () => {
  loop();
  //change game running status
  isGameRunning = true;
});




const GLIDER = [
  [0, 1, 0],
  [0, 0, 1],
  [1, 1, 1]
];

const LWSS = [
  [0, 1, 1, 1, 1],
  [1, 0, 0, 0, 1],
  [0, 0, 0, 0, 1],
  [1, 0, 0, 1, 0]
];

const GOSPER_GLIDER_GUN = [
  [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];





document.getElementById('glider').addEventListener('click', (event) => {
  event.preventDefault();
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

  // if (keyCode === 38) {

  //   cursorY = (cursorY - 1 + rows) % rows;
  //   currentBoard[x][y] = 1
  //   // value = 'yellow'
  //   console.log(38)
  // } else if (keyCode === 40) {

  //   cursorY = (cursorY + 1 + rows) % rows;
  //   currentBoard[x][y] = 1
  //   // value = 'yellow'
  //   console.log(40)
  // } else if (keyCode === 37) {

  //   cursorX = (cursorX - 1 + columns) % columns;
  //   currentBoard[x][y] = 1
  //   // value = 'yellow'
  //   console.log(37)
  // } else if (keyCode === 39) {

  //   cursorX = (cursorX + 1 + columns) % columns;
  //   currentBoard[x][y] = 1
  //   // value = 'yellow'
  //   console.log(39)
  } if (keyCode === ENTER) { // Enter space
     isGameRunning = !isGameRunning;

    if (isGameRunning) {
      console.log('going')
      loop();
    } else {
      console.log('stopping')
      noLoop();
    }
    // if (!isGameRunning) {
    //   redraw();
    // }
  }
// }

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
  resizeCanvas(windowWidth, windowHeight);
}


// location.reload()

function placePattern(pattern, offsetX, offsetY) {
  for (let i = 0; i < pattern.length; i++) {
    for (let j = 0; j < pattern[i].length; j++) {
      if (i + offsetX < columns && j + offsetY < rows) {
        currentBoard[i + offsetX][j + offsetY] = pattern[i][j];
      }
    }
  }
}

window.onresize = reportWindowSize;
