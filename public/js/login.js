const input = document.querySelector('.login_input_player1');
const input2 = document.querySelector('.login_input_player2');
const button = document.querySelector('.login_button');
const specialQuest = document.querySelector('.round_button');
const form = document.querySelector('.login_form');
const level = document.querySelector('.difficult');
const popup = document.querySelector('.bubble');
const speech = document.querySelector('.speech');
const imgError = document.querySelector('#level_error_img');

var contador = 0;
var timer;
var levelErrorText = [];
var text = '../strings/strings.json';
fetch(text).then(async (res) => {
    await res.json().then((json) => {
        let strings = json.resources.string;    
        levelErrorText = strings;
    })
})

function randomNumber(a, b) {
    return Math.floor(Math.random() * (b - a + 1)) + a
}

const validateInput = ({ target }) => {
    if(target.value.length != 0 && input2.value.length != 0) {
        button.removeAttribute('disabled');
    }else {
        button.setAttribute('disabled', '');
    }
}

const handleSubmit = (event) => {
    event.preventDefault();
    const randomIndex = randomNumber(1, 6);

    if(level.value == '') {
        popup.classList.add('mostrar');
        if(contador > 4) {
            imgError.setAttribute('src', './images/angryRick.png');
            speech.innerHTML = levelErrorText[randomNumber(6, 11)];
        }else if(contador >= 1){
            speech.innerHTML = levelErrorText[randomIndex];
        }else {
            speech.innerHTML = levelErrorText[contador];
        }
        contador++;
        setTimeout(() => {
            popup.classList.remove('mostrar');
        },2000);
    }else {
        localStorage.setItem('player 1', input.value);
        localStorage.setItem('player 2', input2.value);
        localStorage.setItem('dificuldade', level.value);
        window.location = 'public/pages/game.html';
    }
}

function getRandomPosition() {
  var screenWidth = window.innerWidth;
  var screenHeight = window.innerHeight * 0.5;
  var buttonWidth = 100;
  var buttonHeight = 100;
  
  var maxX = screenWidth - buttonWidth;
  var maxY = screenHeight - buttonHeight;
  
  var randomX = Math.floor(Math.random() * maxX);
  var randomY = Math.floor(Math.random() * maxY);
  
  return { x: randomX, y: randomY };
}
  
function setRandomPosition() {
  var button = document.getElementById('btn');
  var position = getRandomPosition();
  
  button.style.left = position.x + 'px';
  button.style.top = position.y + 'px';
}
  
function toggleButton() {
    var button = document.getElementById('btn');
    button.style.display = button.style.display === 'none' ? 'block' : 'none';
    setRandomPosition();
    timer = setTimeout(toggleButton, 1000);
}

function stopToggle() {
    clearTimeout(timer);
}
  
toggleButton();

function openSpecialQuest() {
    stopToggle();
    window.location = 'public/pages/quest1.html';
}

input.addEventListener('input', validateInput);
input2.addEventListener('input', validateInput);
form.addEventListener('submit', handleSubmit);
level.addEventListener('select', handleSubmit);
specialQuest.addEventListener('submit', openSpecialQuest);
