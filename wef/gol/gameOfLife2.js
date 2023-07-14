let canvas;
let board, nextBoard;
let gridSize = 40;
let cellSize = 20;
let aliveColor = "#4CAF50";
let deadColor = "#F44336";

let minAliveNeighbors = 2;
let maxAliveNeighbors = 3;
let reproductionNeighbors = 3;

function setup() {
  canvas = createCanvas(gridSize * cellSize, gridSize * cellSize);
  canvas.parent("canvas");
  board = create2DArray(gridSize, gridSize);
  nextBoard = create2DArray(gridSize, gridSize);
  init();
  frameRate(10);
}

function init(event, minAlive = 2, maxAlive = 3, reproduction = 3) {
  if (event) {
    event.preventDefault();
  }

  minAliveNeighbors = parseInt(minAlive);
  maxAliveNeighbors = parseInt(maxAlive);
  reproductionNeighbors = parseInt(reproduction);

  for (let x = 0; x < gridSize; x++) {
    for (let y = 0; y < gridSize; y++) {
      board[x][y] = floor(random(2));
    }
  }
}

function draw() {
  background(255);
  generate();
  displayBoard();
}

function create2DArray(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

function displayBoard() {
  for (let x = 0; x < gridSize; x++) {
    for (let y = 0; y < gridSize; y++) {
      let cell = board[x][y];

      stroke(200);
      fill(cell ? aliveColor : deadColor);
      rect(x * cellSize, y * cellSize, cellSize - 1, cellSize - 1);
    }
  }
}

function applyRules(x, y, minAlive, maxAlive, reproduction) {
  let aliveNeighbors = 0;
  let state = board[x][y];

  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i === 0 && j === 0) continue;
      let newX = (x + i + gridSize) % gridSize;
      let newY = (y + j + gridSize) % gridSize;
      aliveNeighbors += board[newX][newY];
    }
  }

  if (state) {
    return aliveNeighbors >= minAlive && aliveNeighbors <= maxAlive;
  } else {
    return aliveNeighbors === reproduction;
  }
}

function generate() {
  for (let x = 0; x < gridSize; x++) {
    for (let y = 0; y < gridSize; y++) {
      nextBoard[x][y] = applyRules(x, y, minAliveNeighbors, maxAliveNeighbors, reproductionNeighbors);
    }
  }
  [board, nextBoard] = [nextBoard, board];
}

function mouseDragged() {
  if (mouseX >= 0 && mouseX < width && mouseY >= 0 && mouseY < height) {
    let x = floor(mouseX / cellSize);
    let y = floor(mouseY / cellSize);
    board[x][y] = 1;
  }
}

function mousePressed() {
  if (mouseX >= 0 && mouseX < width && mouseY >= 0 && mouseY < height) {
    let x = floor(mouseX / cellSize);
    let y = floor(mouseY / cellSize);
    board[x][y] = 1;
  }
}

function mouseReleased() {
  if (mouseX >= 0 && mouseX < width && mouseY >= 0 && mouseY < height) {
    let x = floor(mouseX / cellSize);
    let y = floor(mouseY / cellSize);
    board[x][y] = 1;
  }
}

function handleSpeedChange() {
  const slider = document.getElementById("framerateSlider");
  frameRate(slider.value);
}