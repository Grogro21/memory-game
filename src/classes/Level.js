import CardState from "./CardState.js";


export default class Level {
    constructor(cardSet, nbCards,id) {
        this.cardSet = cardSet
        this.timer = 0
        this.isFinished = false
        this.timerRunning = null
        this.nbCards = nbCards
        this.nbGuess = 0
        this.idLevel = id
        this.hideEverything()
    }

    hideEverything() {
        this.cardSet.cardSet.forEach(card => {
            card.state=CardState.HIDDEN
        });
    }
    startTimer() {
        this.timerRunning = setInterval(() => this.timer+=0.1, 100)
    }

    stopTimer() {
        clearInterval(this.timerRunning)
        this.timerRunning = null
    }

    getMinScore() {
        return this.nbCards / 2
    }

    selectCard(selectedPosition) {
        return this.cardSet.selectCard(selectedPosition)
    }


    async guess(position) {
        this.nbGuess++

        if (await this.cardSet.guessPair(position)) {
            return true
        }

        return false
    }

    shuffleLevelCardSet() {
        
        this.cardSet.shuffleSet()
    }
    endLevel() {
        for (const card of this.cardSet.cardSet) {
            if (card.state == CardState.HIDDEN) {
                return false
            }
        }
        this.stopTimer()
        this.isFinished = true
        return true
    }

    calcSuccessRate() {
        return 100 - ((this.nbGuess - this.getMinScore()) / this.nbGuess * 100).toFixed(1)
    }
}