class Card {
    constructor(contentHash, imageId) {
        this.contentHash = contentHash;
        this.imageId = imageId;
        this.isRevealed = false;
    }
}

class GameBoard {
    constructor(timeLeft, timeIncrement, numberOfCardsLeft, cardMap, cardPairMap, cardColorMap) {
        this.moves = 0;
        this.score = 0;
        this.timeLeft = timeLeft;
        this.timeIncrement = timeIncrement;
        this.numberOfCardsLeft = numberOfCardsLeft;
        this.cardMap = cardMap;
        this.cardPairMap = cardPairMap;
        this.cardColorMap = cardColorMap;
    }
}