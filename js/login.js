const input = document.querySelector('.login_input_player1');
const input2 = document.querySelector('.login_input_player2');
const button = document.querySelector('.login_button');
const form = document.querySelector('.login_form');
const level = document.querySelector('.difficult');
const popup = document.querySelector('.bubble');
const speech = document.querySelector('.speech');
const imgError = document.querySelector('#level_error_img');

var contador = 0;
var levelErrorText = '';
var text = 'strings/strings.xml';
fetch(text).then(async (res) => {
    res.text().then((xml) => {
        let parser = new DOMParser();
        let xmlDOM = parser.parseFromString(xml, 'application/xml');
        let strings = xmlDOM.querySelectorAll('string');

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
            imgError.setAttribute('src', 'images/angryRick.png');
            speech.innerHTML = levelErrorText[randomNumber(6, 11)].innerHTML;
        }else if(contador >= 1){
            speech.innerHTML = levelErrorText[randomIndex].innerHTML;
        }else {
            speech.innerHTML = levelErrorText[contador].innerHTML;
        }
        contador++;
        setTimeout(() => {
            popup.classList.remove('mostrar');
        },2000);
    }else {
        localStorage.setItem('player 1', input.value);
        localStorage.setItem('player 2', input2.value);
        localStorage.setItem('dificuldade', level.value);
        window.location = 'pages/game.html';
    }
}

input.addEventListener('input', validateInput);
input2.addEventListener('input', validateInput);
form.addEventListener('submit', handleSubmit);
level.addEventListener('select', handleSubmit);
