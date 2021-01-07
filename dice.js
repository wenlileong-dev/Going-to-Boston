let gameStart = 0;
let player1End = 0;

let playerTable = 3;

let playerTableA = [];

let player1Score = 0;
let player2Score = 0;

newGame();

//when the button is clicked, check whether the game is new game
function newGame() {
  $("#game-button").click(() => {
    if (gameStart === 0) {
      console.log("gameStart");
      gameStart = 1;
      $("#game-button").text("Roll Dice");
      $(".score1").text(0);
      $(".score2").text(0);
      $(".winner").text("");
    } else {
      playerGame();
    }
  });
}

function playerGame() {
  if (playerTable >= 1) {
    rollDice(playerTable);
    console.log(playerTableA);
    if (player1End === 0) {
      //player 1 turns not finished, roll dice for player 1
      playerDice(1);
    } else {
      //player 1 turns finished, roll dice for player 2
      playerDice(2);
    }
  } else {
    if (player1End === 0) {
      //player 1 turns just finished, switch player
      playerTable = 3;
      player1End = 1;
      $("#game-button").text("Roll Dice");
    } else {
      //Both players finished their turns, game end
      gameEnd();
    }
  }
}

function gameEnd() {
  console.log("game end");
  $("#game-button").text("Restart");
  if (player1Score > player2Score) {
    $(".winner").html('<h2><i class="fas fa-flag"></i> Player 1 Wins</h2>');
  } else if (player2Score > player1Score) {
    $(".winner").html('<h2>Player 2 Wins <i class="fas fa-flag"></i></h2>');
  } else {
    $(".winner").html("<h2>Draw</h2>");
  }
  player1End = 0;
  playerTable = 3;
  player1Score = 0;
  player2Score = 0;
  gameStart = 0;
  $(".player-dice").remove();
}

//take input of how many dice left on the table and roll the dices
function rollDice(table) {
  playerTableA = [];
  for (i = 0; i < table; i++) {
    n = Math.floor(Math.random() * 6 + 1);
    playerTableA.push(n);
  }
  displayDice();
  playerTable--;
}

//display the dice and change the content of the button when switch player or game end
function displayDice() {
  $(".table-dice").remove();
  playerTableA.forEach((dice) => {
    $(".table-d").append(
      `<img class="table-dice" src="/diceGame/dice-${dice}.svg" alt="dice 6" />`
    );
  });
  if (playerTable === 1 && player1End === 0) {
    $("#game-button").text("Change Player");
  } else if (playerTable === 1 && player1End === 1) {
    $("#game-button").text("Check out winner");
  }
}

//find the maximum value from each round of the dice is roll, and add to the particular player's score
function playerDice(n) {
  let max = 1;
  playerTableA.forEach((dice) => {
    if (dice > max) {
      max = dice;
    }
  });
  if (n === 1) {
    $(".player1-dice").append(
      `<img class="player-dice" src="/diceGame/dice-${max}.svg" alt="dice 6" />`
    );
    player1Score += max;
    $(".score1").text(player1Score);
  } else {
    $(".player2-dice").append(
      `<img class="player-dice" src="/diceGame/dice-${max}.svg" alt="dice 6" />`
    );
    player2Score += max;
    $(".score2").text(player2Score);
  }
}
