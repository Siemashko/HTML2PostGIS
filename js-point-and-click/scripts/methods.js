function initializeGameBoard(timeLeft, numberOfCards) {

    var cardMap = new Map();
    var cardPairMap = new Map();
    var cardColorMap = new Map();


    document.getElementById("menu").style.display = "none";
    document.getElementById("game-board").style.display = "flex";
	document.getElementById("exit").style.display = "block";
	document.getElementById("pause").style.display = "block";
	document.getElementById("title").style.marginRight = "8%";

    var cardHolder = document.getElementById("card-holder");
    cardHolder.innerHTML = "";
    for (var i = 0; i < numberOfCards; i++) {
        var cardElement = document.createElement("div");
        var cardHashcode = randHex(16);

        cardElement.id = cardHashcode;
        var card = new Card(cardHashcode, 0);
        cardMap.set(cardHashcode, card);

        var updateCardElement = function (element) {
            element.className = "card";
            element.addEventListener("click", revealCard);
        }
        updateCardElement(cardElement);
        var text = document.createTextNode("");
        cardElement.append(text);
        cardHolder.append(cardElement);
    }

    var cardPairs = generatePairsFromCardMap(cardMap);

    cardPairs.forEach(function (pair) {
        var color = '#' + Math.random().toString(16).substr(-6);
        cardPairMap.set(pair[0], pair[1]);
        cardPairMap.set(pair[1], pair[0]);
        cardColorMap.set(pair[0], color);
        cardColorMap.set(pair[1], color);
    })

    gameBoard = new GameBoard(timeLeft, 5, numberOfCards, cardMap, cardPairMap, cardColorMap);
}


function startTimer() {
    interval = setInterval(function () {
        if (isTimeFlowing) {
			if(gameBoard) {
				timer = document.querySelector(".timer");
				timer.style.display = "block";
				var seconds = gameBoard.timeLeft;
				timer.innerHTML = "Time left: " + seconds + "secs";
				gameBoard.timeLeft--;
				if (Number(gameBoard.timeLeft) === -2) {
					timer.innerHTML = "Time left: " + seconds + "secs";
					clearInterval(interval);
					loseGame();
				}
			}
        }
    }, 1000);
}


function revealCard(event) {
    if (!isRevealCardEventListenerActive) {
        return;
    }
    moveCounter();
    let cardElement = event.srcElement
    let cardHashcode = cardElement.id;
    let card = gameBoard.cardMap.get(cardHashcode);

    if (!revealedCardHashcode) {
        revealedCardHashcode = cardHashcode;
		cardElement.style.backgroundImage = "none";
        cardElement.style.backgroundColor = gameBoard.cardColorMap.get(cardHashcode);
		
    } else {
		cardElement.style.backgroundImage = "none";
        cardElement.style.backgroundColor = gameBoard.cardColorMap.get(cardHashcode);
        isRevealCardEventListenerActive = false;
        setTimeout(function () {
            if (gameBoard.cardPairMap.get(cardHashcode) === revealedCardHashcode) {
                cardElement.style.border = "1px solid black";
                cardElement.removeEventListener("click", revealCard);
                document.getElementById(revealedCardHashcode).removeEventListener("click", revealCard);
                document.getElementById(revealedCardHashcode).style.border = "1px solid black";
                gameBoard.score += gameBoard.timeLeft;
                gameBoard.timeLeft += gameBoard.timeIncrement;
                gameBoard.numberOfCardsLeft -= 2;
            } else {
              cardElement.removeAttribute('style');
              document.getElementById(revealedCardHashcode).removeAttribute('style');
            }
            revealedCardHashcode = undefined;
            isRevealCardEventListenerActive = true;
			if (Number(gameBoard.numberOfCardsLeft) === 0.0) {
				console.log("Wygranko");
				finishGame();
    }
        }, 1000);
    }

    
}

function randHex(len) {
    var maxlen = 8,
        min = Math.pow(16, Math.min(len, maxlen) - 1)
    max = Math.pow(16, Math.min(len, maxlen)) - 1,
        n = Math.floor(Math.random() * (max - min + 1)) + min,
        r = n.toString(16);
    while (r.length < len) {
        r = r + randHex(len - maxlen);
    }
    return r;
};

function generatePairsFromCardMap(map) {
    var cardHashcodes = [...map.keys()];
    cardHashcodes.sort(() => Math.random() - 0.5);

    return cardHashcodes.reduce(function (result, value, index, array) {
        if (index % 2 === 0)
            result.push(array.slice(index, index + 2));
        return result;
    }, []);
}

function moveCounter() {
    gameBoard.moves++;
    var counter = document.querySelector(".counter");
    counter.innerHTML = "Moves: " + gameBoard.moves;
    if (gameBoard.moves == 1) {
        startTimer();
    }
}

function finishGame() {
	alert("Wygrałeś! Twój score: " + gameBoard.score);
	exitGame();
}

function loseGame() {
	alert("Przegrałeś, spróbuj jeszcze raz");
	exitGame();
}

function pauseGame() {
    isRevealCardEventListenerActive = false;
    isTimeFlowing = false;
    document.getElementById("pause-window").style.display = "block";
}

function resumeGame() {
    isRevealCardEventListenerActive = true;
    isTimeFlowing = true;
    document.getElementById("pause-window").style.display = "none";
}

function exitGame() {
    gameBoard = undefined;
    document.getElementById("move-counter").innerHTML = "Moves: 0";
    document.getElementById("timer").innerHTML = "";
    document.getElementById("menu").style.display = "flex";
    document.getElementById("game-board").style.display = "none";
	document.getElementById("exit").style.display = "none";
	document.getElementById("pause").style.display = "none";
	document.getElementById("title").style.marginRight = "0%";
}