const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const spanPlayer2 = document.querySelector('.player2');
const pontosPlayer1 = document.querySelector('.score');
const pontosPlayer2 = document.querySelector('.score2');
const activePlayerHeader = document.querySelector('.player_header');
const restartButton = document.querySelector('.restart_button');
const dificuldade = localStorage.getItem('dificuldade');
const confete = document.querySelector('#my-canvas');

var confettiSettings = { target: 'my-canvas' };
var confetti = new ConfettiGenerator(confettiSettings);
confetti.render();
var firstCard = '';
var secondCard = '';
var activePlayer = true;

const cardsImages = [
    'card1',
    'card2',
    'card3',
    'card4',
    'card5',
    'card6',
    'card7',
    'card8',
    'card9',
    'card10',
    'card11',
    'card12',
    'card13',
    'card14',
    'card15'
];

const changePlayer = (activePl) => {
    if(activePl == true) {
        spanPlayer2.classList.remove('active_player');
        spanPlayer.classList.add('active_player');
        activePlayerHeader.innerHTML = spanPlayer.innerHTML + ' Esta Jogando';
    }else {
        spanPlayer.classList.remove('active_player');
        spanPlayer2.classList.add('active_player');
        activePlayerHeader.innerHTML = spanPlayer2.innerHTML + ' Esta Jogando';
    }
    
}

const incrementScore = (player) => {
    if(player == true) {
        const currentScoreP1 = +pontosPlayer1.innerHTML;
        pontosPlayer1.innerHTML = currentScoreP1 + 1;
    }else {
        const currentScoreP2 = +pontosPlayer2.innerHTML;
        pontosPlayer2.innerHTML = currentScoreP2 + 1;
    }
}

const checkEndGame = () => {
    const disabledCards = document.querySelectorAll('.disabled-card');
    const scoreP1 = +pontosPlayer1.innerHTML; 
    const scoreP2 = +pontosPlayer2.innerHTML;

    if(disabledCards.length == cardsImages.length*2) {
        confete.removeAttribute('hidden');
        if(scoreP1 > scoreP2) {
            activePlayerHeader.innerHTML = `${spanPlayer.innerHTML} Venceu o Jogo!`;
            activePlayerHeader.classList.add('winner_player');
        }else if(scoreP1 == scoreP2) {
            activePlayerHeader.innerHTML = `Jogo Empatado!`;
        }
        else {
            activePlayerHeader.innerHTML = `${spanPlayer2.innerHTML} Venceu o Jogo!`;
            activePlayerHeader.classList.add('winner_player');
        }
        restartButton.removeAttribute('hidden');
    }

}

const checkCards = () => {
    const firstCharacter = firstCard.getAttribute('data-cardName');
    const secondCharacter = secondCard.getAttribute('data-cardName');

    if(firstCharacter == secondCharacter) {
        firstCard.firstChild.classList.add('disabled-card');
        secondCard.firstChild.classList.add('disabled-card');

        firstCard = '';
        secondCard = '';

        incrementScore(activePlayer);
        checkEndGame();
    }else {
        setTimeout(() => {
            firstCard.classList.remove('reveal-card');
            secondCard.classList.remove('reveal-card');
            firstCard = '';
            secondCard = '';
            activePlayer = !activePlayer;
            changePlayer(activePlayer);
        }, 500);
    }
}

const restartGame = () => {
    pontosPlayer1.innerHTML = 0;
    pontosPlayer2.innerHTML = 0;
    activePlayerHeader.classList.remove('winner_player');
    activePlayerHeader.innerHTML = `${spanPlayer.innerHTML} Esta Jogando!`;
    activePlayer = true;
    changePlayer(activePlayer);
    confete.setAttribute('hidden', '');
    restartButton.setAttribute('hidden', '');
    const cartas = grid.querySelectorAll('.card');
    cartas.forEach((values) => {
        console.log('values ', values);
        values.classList.remove('reveal-card')
        values.firstChild.classList.remove('disabled-card');
        setInterval(() => {
            values.remove();
        }, 1000);
    });
    setTimeout(() => {
        loadGame();
    }, 1000)
}

const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

const revealCard = ({ target }) => {
    if(target.parentNode.className.includes('reveal-card')) {
        return;
    }

    if(firstCard == '') {
        target.parentNode.classList.add('reveal-card');
        firstCard = target.parentNode;
    }else if (secondCard == '') {
        target.parentNode.classList.add('reveal-card');
        secondCard = target.parentNode;

        checkCards();
    }
}

const createCard = (personagem) => {
    const card = createElement('div', 'card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');

    front.style.backgroundImage = `url('../images/${personagem}.jpg')`; 

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click', revealCard);
    card.setAttribute('data-cardName', personagem);

    return card;
}

const loadGame = () => {
    switch (dificuldade) {
        case 'facil':
            grid.classList.add('gridx10');
            cardsImages.length = 15;
            cardsImages.sort(() => Math.random() - 0.5);
            cardsImages.length = cardsImages.length - 10;
            break;
        case 'medio':
            cardsImages.length = 15;
            cardsImages.sort(() => Math.random() - 0.5);
            cardsImages.length = cardsImages.length - 3;
        default:
            if(window.innerWidth < 1100 && window.innerWidth > 750) {
                grid.classList.add('gridx30');
            }
            break;
    }
    //Spread Operator. Para espalhar o array nesse outro array
    const duplicateCards = [...cardsImages, ...cardsImages];
    const shuffledArray = duplicateCards.sort(() => Math.random() - 0.5);
    shuffledArray.forEach((cardImage) => {
        const card = createCard(cardImage);
        grid.appendChild(card);
    })
}

window.onload = () => {
    const player1Name = localStorage.getItem('player 1');
    const player2Name = localStorage.getItem('player 2');
    
    activePlayerHeader.innerHTML = player1Name + ' Esta Jogando!';
    spanPlayer.innerHTML = player1Name;
    spanPlayer2.innerHTML = player2Name;
    
    loadGame();
}
