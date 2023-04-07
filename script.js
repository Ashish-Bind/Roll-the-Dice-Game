'use strict';

const player1 = document.querySelector('.player--0');
const player2 = document.querySelector('.player--1');
const score1 = document.querySelector('#score--0');
const score2 = document.querySelector('#score--1');
const current1 = document.querySelector('#current--0');
const current2 = document.querySelector('#current--1');
const dice = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

score1.textContent = 0;
score2.textContent = 0;
dice.classList.add('hidden')

let scores, currentScore = 0, activePlayer = 0;
let playing = true;

const generateRandom = () => Math.trunc(Math.random() * 6) + 1;

const initialize = () => {
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    score1.textContent = 0;
    score2.textContent = 0;
    current1.textContent = 0;
    current2.textContent = 0;

    document.querySelector(`.player--0`).classList.remove('player--winner');
    document.querySelector(`.player--1`).classList.remove('player--winner');
    document.querySelector(`.player--0`).classList.add('player--active');
    document.querySelector(`.player--1`).classList.remove('player--active');
}

const switchPlayer = () => {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player1.classList.toggle('player--active');
    player2.classList.toggle('player--active');
}

// INITIALIZING VARIBLES
initialize();

// ROLL BUTTON
btnRoll.addEventListener('click', () => {
    if (playing) {
        let randomNumber = generateRandom();
        dice.classList.remove('hidden');
        dice.src = `Images/dice-${randomNumber}.png`;

        if (randomNumber !== 1) {
            currentScore += randomNumber;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        } else {
            switchPlayer();
        }
    }
})

// HOLD BUTTON
btnHold.addEventListener('click', () => {
    if (playing) {
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
        if (scores[activePlayer] >= 100) {
            playing = false;
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
            dice.classList.add('hidden');
        }
        switchPlayer();
    }
})

// NEW GAME BUTTON
btnNew.addEventListener('click', initialize);