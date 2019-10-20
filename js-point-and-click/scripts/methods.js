function initializeGameBoard(timeLeft, numberOfCards) {
    
    var cardMap = new Map();
    var cardPairMap = new Map();
    var cardColorMap = new Map();

    document.getElementById("menu").style.display = "none";
    document.getElementById("game-board").style.display = "flex";

    var cardHolder = document.getElementById("card-holder");
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
        var text = document.createTextNode((i + 1) + "");
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

    gameBoard = new GameBoard(timeLeft, 10, numberOfCards, cardMap, cardPairMap, cardColorMap);
}

function revealCard(event) {
    if (!isRevealCardEventListenerActive) {
        return;
    }

    let cardElement = event.srcElement
    let cardHashcode = cardElement.id;
    let card = gameBoard.cardMap.get(cardHashcode);

    if (!revealedCardHashcode) {
        revealedCardHashcode = cardHashcode;
        cardElement.style.backgroundColor = gameBoard.cardColorMap.get(cardHashcode);
    } else {
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
                cardElement.style.backgroundColor = "#f1f1f1";
                document.getElementById(revealedCardHashcode).style.backgroundColor = "#f1f1f1";
            }
            revealedCardHashcode = undefined;
            isRevealCardEventListenerActive = true;
        }, 1000);
    }

    console.log(cardHashcode);

    if(gameBoard.numberOfCardsLeft === 0) {
        finishGame();
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

function finishGame() {
    return;
}

function pauseGame() {
    isRevealCardEventListenerActive = false;
    document.getElementById("pause-window").style.display = "block";
}

function resumeGame() {
    isRevealCardEventListenerActive = true;
    document.getElementById("pause-window").style.display = "none";
}