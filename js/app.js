/*
The Pig Game

by Joey Harig

GAME RULES:

-2 players that play in rounds
-In each round, a player rolls the dice as many times as they wish. Each roll adds to their Round Score.
-IF the player rolls a 1, his Round Score is lost and it is the next players turn.
-The player may hold their Round Score and by doing so, stop their turn and add that round's score to their GLBAL score. It is then the next player's turn.
-The first player to reach 100 GLBL points wins.

*/

var scores, roundScore, activePlayer, gamePlaying, cpu, colors;

colors = ['#48DB64', '#9648DB', '#4857DB', '#DB7048', '#DB4848', '#DB48C4', '#48DBCE'];

let root = document.documentElement;

// hide the game
document.querySelector('#game').style.visibility = 'hidden';

function colorReset() {
	var color0 = colors[Math.floor(Math.random()*colors.length)];
	var color1 = colors[Math.floor(Math.random()*colors.length)];

	if (color0 === color1) {
		var color1 = colors[Math.floor(Math.random()*colors.length)];
	}

	root.style.setProperty('--player-0', color0);
	root.style.setProperty('--player-1', color1);
}

colorReset();

//CPU player logic controller
function cpuLogic() {
	var cpuProb;
	var win;

	if (roundScore + scores[1] < 100){
		win = true;
	} else {
		win =false;
	}

	if (roundScore <= 10 && win === true){
		rollDice()
	}
	else if (roundScore > 10 && roundScore <= 15 && win === true){
		cpuProb = Math.floor(Math.random() * 4) + 1;
		if (cpuProb !== 1){rollDice()} else {hold()}
	}
	else if (roundScore > 15 && roundScore <= 20 && win === true){
		cpuProb = Math.floor(Math.random() * 3) + 1;
		if (cpuProb !== 1){rollDice()} else {hold()}
	}
	else if (roundScore > 20 &&  roundScore <= 25 && win === true){
		cpuProb = Math.floor(Math.random() * 3) + 1;
		if (cpuProb === 1){rollDice()} else {hold()}
	}
	else if (roundScore > 25 &&  roundScore <= 30 && win === true){
		cpuProb = Math.floor(Math.random() * 4) + 1;
		if (cpuProb === 1){rollDice()} else {hold()}
	}
	else if (roundScore > 30 && win === true){
		cpuProb = Math.floor(Math.random() * 5) + 1;
		if (cpuProb === 1){rollDice()} else {hold()}
	} else {hold()}
}

// change player
function changePlayer(){
		document.getElementById('current-' + activePlayer).textContent = '0';

		// show the player's current box whos turn it is
		if (activePlayer === 0) {
			activePlayer = 1;
			document.querySelector('#box-0').style.visibility = 'hidden';
			document.querySelector('#box-1').style.visibility = 'visible';
		} else {
			activePlayer = 0;
			document.querySelector('#box-1').style.visibility = 'hidden';
			document.querySelector('#box-0').style.visibility = 'visible';
		}
		// reset round score and switch the background color
		roundScore = 0;
		document.querySelector('.player-0-panel').classList.toggle('active');
		document.querySelector('.player-1-panel').classList.toggle('active');
		document.getElementById('body').classList.toggle('body-0');
		document.getElementById('body').classList.toggle('body-1');
		hideDice();
		gamePlaying = true;
		if (activePlayer === 1 && cpu === true){
			setTimeout(cpuLogic, 1000);
		}
}

// hide the dice
function hideDice() {
	document.querySelector('#dice1').style.display = 'none';
	document.querySelector('#dice2').style.display = 'none';
}

//roll dice
function rollDice() {

		if (gamePlaying === true){
				//1. Generate a random number
				var dice1 = Math.floor(Math.random() * 6) + 1;
				var dice2 = Math.floor(Math.random() * 6) + 1;
				//2. Display the result
				var diceDOM1 = document.querySelector('#dice1');
				diceDOM1.style.display = 'block';
				diceDOM1.src = 'img/dice-' + dice1 + '.png';

				var diceDOM2 = document.querySelector('#dice2');
				diceDOM2.style.display = 'block';
				diceDOM2.src = 'img/dice-' + dice2 + '.png';

				//3. Update the round score IF the rolled number is Not 1
				if (dice1 !== 1 & dice2 !== 1) {
					// Add the score
					roundScore = roundScore + dice1 + dice1;
					document.querySelector('#current-' + activePlayer).textContent = roundScore;
				}else {
					// Next player's turn
					setTimeout(changePlayer, 1500);
					gamePlaying = false;
				}
				// Activate cpu roll
				if (activePlayer === 1 && cpu === true){
					setTimeout(cpuLogic, 1000);
				}
		}
}

//start the game
function startGame(){
	scores = [0,0];
	roundScore = 0;
	activePlayer = 0;
	gamePlaying = true;

	hideDice();

	document.getElementById('body').classList.remove('body-0');
	document.getElementById('body').classList.remove('body-1');
	document.getElementById('body').classList.add('body-0');
	document.getElementById('score-0').textContent = '0';
	document.getElementById('score-1').textContent = '0';
	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';
	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('active');
	document.querySelector('#game').style.visibility = 'visible';
	document.querySelector('#intro').style.visibility = 'hidden';
	document.querySelector('#box-1').style.visibility = 'hidden';
	document.querySelector('#box-0').style.visibility = 'visible';
}

function newGame() {
	startGame();
	colorReset();
}

// hold scores
function hold() {
	if (gamePlaying === true){

		//add round score to player's score
		scores[activePlayer] += roundScore;

		document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];

		//Check to see if the player won
		if (scores[activePlayer] >= 100) {
			document.getElementById('name-' + activePlayer).textContent = 'WINNER!';
			document.querySelector('.player-' + activePlayer + '-panel').classList.toggle('active');
			document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
			document.getElementById('current-' + activePlayer).textContent = '0';
			hideDice();
			gamePlaying = false;
		} else {
			changePlayer();
		}
	}
}

//1 player btn
document.querySelector('.btn-1-player').addEventListener('click', function () {
	cpu = true;
	document.querySelector('#name-1').textContent = 'CPU';
	startGame();
} );

// 2 player button
document.querySelector('.btn-2-player').addEventListener('click', function () {
	cpu = false;
	startGame();
} );

//roll btn
document.querySelector('.btn-roll').addEventListener('click', function (){
	if (activePlayer === 0 || cpu === false){
		rollDice();
	}
});

//hold btn
document.querySelector('.btn-hold').addEventListener('click', hold);

//new game btn
document.querySelector('.btn-new').addEventListener('click', newGame);
