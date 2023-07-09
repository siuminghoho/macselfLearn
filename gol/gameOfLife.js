const unitLength = 20;
const boxColor = 150;
const strokeColor = 50;
let columns; /* To be determined by window width */
let rows; /* To be determined by window height */
let currentBoard;
let nextBoard;

//extra variables
let fr = 10;
let MIN_ALIVE_NEIGHBORS = 2;
let MAX_ALIVE_NEIGHBORS = 3;
let REPRODUCTION_NEIGHBORS = 3;



function setup() {

  /* Set the canvas to be under the element #canvas*/
  const canvas = createCanvas(800, 600);
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

//setup();

// <-------------try to set width and height based on the 
// const canvasContainer = document.getElementsByClassName(canvas1);
// const canvasWidth = canvas1.offsetWidth;
// const canvasHeight = canvas1.offsetHeight;
// const minSize = Math.min(canvasWidth, canvasHeight);
// const canvas = createCanvas(minSize, minSize);
// canvas.parent('canvasContainer');
// canvas.style('border', '10px solid black');
// frameRate(fr);

// columns = floor(width / unitLength);
// rows = floor(height / unitLength);

//   currentBoard = createEmptyBoard();
//   nextBoard = createEmptyBoard();
//   initBoard();
// }

/**
 * Initialize/reset the board state
 */


function init(event, minAlive, maxAlive, reproduction) {
  if(event){
    event.preventDefault();
  }

  // Check if values are provided, and if not, use default values.
  minAliveNeighbors = minAlive ? parseInt(minAlive) : MIN_ALIVE_NEIGHBORS;
  maxAliveNeighbors = maxAlive ? parseInt(maxAlive) : MAX_ALIVE_NEIGHBORS;
  reproductionNeighbors = reproduction ? parseInt(reproduction) : REPRODUCTION_NEIGHBORS;

  // Initialize the board with random values.
  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
      currentBoard[i][j] = random() > 0.8 ? 1 : 0; // one line if
      nextBoard[i][j] = 0;
      // board[i][j] = floor(random(2));
      // next[i][j] = 0;
    }
  }
  MIN_ALIVE_NEIGHBORS = parseInt(minAliveNeighbors);
  MAX_ALIVE_NEIGHBORS = parseInt(maxAliveNeighbors);
  REPRODUCTION_NEIGHBORS = parseInt(reproductionNeighbors);
}



function draw() {
  background(255);
  generate();
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
          fill(255, 105, 180); // Color for cells that came to life due to having exactly 3 neighbors
        } else {
          fill(boxColor); // Alive color (replace 'boxColor' with the variable or value you're using)
        }
      } else {
        fill(255); // Dead color
      }

      stroke(strokeColor);
      rect(i * unitLength, j * unitLength, unitLength, unitLength);
    }
  }
}

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

// function draw() {
//   background(255);
//   generate();
//   drawBoard();
// }

function generate() {
  //Loop over every single box on the board
  const minAliveNeighbors = parseInt(document.getElementById("minAliveNeighbors").value);
  const maxAliveNeighbors = parseInt(document.getElementById("maxAliveNeighbors").value);
  const reproductionNeighbors = parseInt(document.getElementById("reproductionNeighbors").value);
  // for (let x = 0; x < columns; x++) {
  //   for (let y = 0; y < rows; y++) {
  //     // Count all living members in the Moore neighborhood(8 boxes surrounding)
  //     let neighbors = 0;
  //     for (let i of [-1, 0, 1]) {
  //       for (let j of [-1, 0, 1]) {
  //         if (i == 0 && j == 0) {
  //           // the cell itself is not its own neighbor
  //           continue;
  //         }
  //         // The modulo operator is crucial for wrapping on the edge
  //         neighbors +=
  //           currentBoard[(x + i + columns) % columns][(y + j + rows) % rows];
  //       }
  //     }
  //-Allow users to change the rules of survival.
  // Rules of Life

  //   if (currentBoard[x][y] == 1 && neighbors < 2) {
  //     // Die of Loneliness
  //     nextBoard[x][y] = 0;
  //   } else if (currentBoard[x][y] == 1 && neighbors > 3) {
  //     // Die of Overpopulation
  //     nextBoard[x][y] = 0;
  //   } else if (currentBoard[x][y] == 0 && neighbors == 3) {
  //     //nextBoard[x][y].fill(024)
  //     // New life due to Reproduction
  //     nextBoard[x][y] = 1;
  //   } else {
  //     // Stasis
  //     nextBoard[x][y] = currentBoard[x][y];
  //   }
  // }
  // }
  for (let x = 0; x < columns; x++) {
    for (let y = 0; y < rows; y++) {
      nextBoard[x][y] = applyRules(currentBoard, x, y, minAliveNeighbors, maxAliveNeighbors, reproductionNeighbors);
    }
  }

  [currentBoard, nextBoard] = [nextBoard, currentBoard];
}

// Swap the nextBoard to be the current Board
// [currentBoard, nextBoard] = [nextBoard, currentBoard];





/**
 * When mouse is dragged
 */
function mouseDragged() {
  /**
   * If the mouse coordinate is outside the board
   */
  if (mouseX > unitLength * columns || mouseY > unitLength * rows) {
    return;
  }
  const x = Math.floor(mouseX / unitLength);
  const y = Math.floor(mouseY / unitLength);
  currentBoard[x][y] = 1;
  fill(boxColor);
  stroke(strokeColor);
  rect(x * unitLength, y * unitLength, unitLength, unitLength);
}

/**
 * When mouse is pressed
 */
function mousePressed() {
  noLoop();
  mouseDragged();
}

/**
 * When mouse is released
 */
function mouseReleased() {
  loop();
}

function handleSpeedChange() {
  const sliderValue = parseInt(document.getElementById('framerateSlider').value);
  fr = sliderValue;
  frameRate(fr);
}

