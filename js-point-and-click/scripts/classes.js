class Card {
    constructor(contentHash, imageId) {
        this.contentHash = contentHash;
        this.imageId = imageId;
        this.isRevealed = false;
    }
}

class Settings {
    constructor(difficultyLevel, numberOfCards) {
        this.difficultyLevel = difficultyLevel;
        this.numberOfCards = numberOfCards;
    }
}

class GameBoard {
    constructor(settings) {
        this.score = 0;
        this.numberOfCardsLeft = settings.numberOfCards;
    }
}