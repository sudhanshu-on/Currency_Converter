class RockPaperScissors {
    constructor() {
        this.playerScore = 0;
        this.computerScore = 0;
        this.choices = {
            rock: { emoji: '✊', beats: 'scissors' },
            paper: { emoji: '✋', beats: 'rock' },
            scissors: { emoji: '✌️', beats: 'paper' }
        };
        
        this.initializeElements();
        this.bindEvents();
    }
    
    initializeElements() {
        this.playerScoreEl = document.getElementById('player-score');
        this.computerScoreEl = document.getElementById('computer-score');
        this.playerChoiceEl = document.getElementById('player-choice');
        this.computerChoiceEl = document.getElementById('computer-choice');
        this.resultEl = document.getElementById('result');
        this.resetBtn = document.getElementById('reset-btn');
        this.choiceBtns = document.querySelectorAll('.btn[data-choice]');
    }
    
    bindEvents() {
        this.choiceBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const playerChoice = e.currentTarget.getAttribute('data-choice');
                this.playRound(playerChoice);
            });
        });
        
        this.resetBtn.addEventListener('click', () => {
            this.resetGame();
        });
    }
    
    getComputerChoice() {
        const choices = Object.keys(this.choices);
        const randomIndex = Math.floor(Math.random() * choices.length);
        return choices[randomIndex];
    }
    
    playRound(playerChoice) {
        const computerChoice = this.getComputerChoice();
        const result = this.determineWinner(playerChoice, computerChoice);
        
        this.updateDisplay(playerChoice, computerChoice, result);
        this.updateScore(result);
        this.animateChoices();
    }
    
    determineWinner(playerChoice, computerChoice) {
        if (playerChoice === computerChoice) {
            return 'tie';
        }
        
        if (this.choices[playerChoice].beats === computerChoice) {
            return 'win';
        }
        
        return 'lose';
    }
    
    updateDisplay(playerChoice, computerChoice, result) {
        // Update choice displays
        this.playerChoiceEl.textContent = this.choices[playerChoice].emoji;
        this.computerChoiceEl.textContent = this.choices[computerChoice].emoji;
        
        // Update result message and styling
        this.resultEl.className = `result ${result}`;
        
        switch (result) {
            case 'win':
                this.resultEl.textContent = 'You Win! 🎉';
                this.playerChoiceEl.classList.add('winner');
                this.computerChoiceEl.classList.remove('winner');
                break;
            case 'lose':
                this.resultEl.textContent = 'You Lose! 😢';
                this.computerChoiceEl.classList.add('winner');
                this.playerChoiceEl.classList.remove('winner');
                break;
            case 'tie':
                this.resultEl.textContent = "It's a Tie! 🤝";
                this.playerChoiceEl.classList.remove('winner');
                this.computerChoiceEl.classList.remove('winner');
                break;
        }
    }
    
    updateScore(result) {
        if (result === 'win') {
            this.playerScore++;
            this.playerScoreEl.textContent = this.playerScore;
        } else if (result === 'lose') {
            this.computerScore++;
            this.computerScoreEl.textContent = this.computerScore;
        }
    }
    
    animateChoices() {
        // Add a small animation to the choice displays
        [this.playerChoiceEl, this.computerChoiceEl].forEach(el => {
            el.style.transform = 'scale(1.1)';
            setTimeout(() => {
                el.style.transform = 'scale(1)';
            }, 200);
        });
    }
    
    resetGame() {
        this.playerScore = 0;
        this.computerScore = 0;
        
        this.playerScoreEl.textContent = '0';
        this.computerScoreEl.textContent = '0';
        
        this.playerChoiceEl.textContent = '❓';
        this.computerChoiceEl.textContent = '❓';
        
        this.resultEl.textContent = 'Choose your weapon!';
        this.resultEl.className = 'result';
        
        this.playerChoiceEl.classList.remove('winner');
        this.computerChoiceEl.classList.remove('winner');
    }
}

// Initialize the game when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    new RockPaperScissors();
});