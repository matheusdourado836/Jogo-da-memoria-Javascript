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

var jsonString = `
{
    "resources": {
      "string": [
        "Parece que voce não escolheu uma dificuldade amigão!",
        "Vamos logo amigao escolhe uma dificuldade aí",
        "Voce não quer jogar sem escolher uma dificuldade né",
        "Acho que voce esqueceu de escolher a dificuldade",
        "Eu nao jogaria sem antes escolher uma dificuldade",
        "I'M PICKLE RIIIIIIICK!!!!! (escolhe uma dificuldade ai)",
        "Voce tem que escolher uma dificuldade para jogar!",
        "E serio que a gente ta fazendo isso",
        "Voce sabe que nao vai conseguir jogar se nao escolher",
        "Nao to achando graca",
        "Serio ja deu, escolhe uma dificuldade ai",
        "Posso ficar aqui o dia todo"
      ]
    }
  }
`;

var jsonObject = JSON.parse(jsonString);

var listaDeStrings = jsonObject.resources.string;

levelErrorText = listaDeStrings;

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
            imgError.setAttribute('src', './public/images/angryRick.png');
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

input.addEventListener('input', validateInput);
input2.addEventListener('input', validateInput);
form.addEventListener('submit', handleSubmit);
level.addEventListener('select', handleSubmit);
