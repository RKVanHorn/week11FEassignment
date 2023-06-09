/**What do I need to make this game work
 * switch turns
 * assign boxes based on click
 * array that has room for each square - so length = 9 to check for winner
 * target boxes
 * target button
 * target status text
 * check for winner
 * declare winner
 * restart the game on click for button
 * start game function that sets up my game
 * boolean for if game is going so I can stop players from clicking after a win
 */

// const header = $(".display-1");
// console.log(header);
const boxes = document.querySelectorAll("#box"); //$("#box");   //target boxes
//console.log(boxes);
const statusText = document.querySelector("#statusText"); //$("#statusText"); //target status text
//console.log(statusText);
const startButton = document.querySelector("#startButton"); //$("#startButton"); //target button
//console.log(startButton); //checking to make sure I targeted button correctly

//so I can check if a player can add an x or o to the square and also to check for win/draw
let squareOptions = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
//boolean for if game is going so I can stop players from clicking after a win
let gameOn = false;

beginGame();

//start game function that sets up my game
function beginGame() {
  //add an event listener to each box so that is updates when clicked
  boxes.forEach((box) => box.addEventListener("click", boxClicked)); //have to make boxClicked function
  //add event listener to startButton to restart game when finished
  startButton.addEventListener("click", restartGame);
  statusText.textContent = `${currentPlayer}'s Turn!`;
  gameOn = true;
}
//assign boxes based on click, add to the squareOptions array
function boxClicked() {
  const boxIndex = this.getAttribute("boxIndex");
  if (squareOptions[boxIndex] != "" || !gameOn) {
    //validate to make sure box is empty and game is going
    return;
  }
  updateBox(this, boxIndex); //updateBox (pass in the box that has been clicked and it's index)
  checkWinner(); //have to make still
  this.classList.add("animate"); //to add in the animation when a box is filled
}

function updateBox(box, index) {
  box.textContent = currentPlayer; //adds x or o to box
  squareOptions[index] = currentPlayer; //adds x or o to squareOptions array
}

//switch turns
function changePlayer() {
  // if (currentPlayer == "X") {
  //   currentPlayer = "O";
  // } else {
  //   currentPlayer = "X";
  // }
  currentPlayer = currentPlayer == "X" ? "O" : "X";
  //console.log("Changing player new player is", currentPlayer);
  statusText.textContent = `${currentPlayer}'s Turn!`;
}

//check for a winner
function checkWinner() {
  let winningCombos = [];
  //put X or O in the array so can keep track and see if anyone won
  winningCombos.push(squareOptions[0] + squareOptions[1] + squareOptions[2]);
  winningCombos.push(squareOptions[3] + squareOptions[4] + squareOptions[5]);
  winningCombos.push(squareOptions[6] + squareOptions[7] + squareOptions[8]);
  winningCombos.push(squareOptions[0] + squareOptions[3] + squareOptions[6]);
  winningCombos.push(squareOptions[1] + squareOptions[4] + squareOptions[7]);
  winningCombos.push(squareOptions[2] + squareOptions[5] + squareOptions[8]);
  winningCombos.push(squareOptions[0] + squareOptions[4] + squareOptions[8]);
  winningCombos.push(squareOptions[2] + squareOptions[4] + squareOptions[6]);

  console.log(winningCombos);

  if (winningCombos.includes("XXX")) {
    //console.log("X wins");
    statusText.textContent = `${currentPlayer} wins!`;
    gameOn = false;
  } else if (winningCombos.includes("OOO")) {
    //console.log("O wins");
    statusText.textContent = `${currentPlayer} wins!`;
    gameOn = false;
  } else if (!squareOptions.includes("")) {
    //console.log("Its a draw");
    statusText.textContent = `It's a Draw!`;
    gameOn = false;
  } else {
    //console.log("Keep playing");
    changePlayer();
  }
}

function restartGame() {
  //console.log("I've been clicked");
  location.reload();
  beginGame();
}
