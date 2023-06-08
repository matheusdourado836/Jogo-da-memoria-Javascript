var textElement = document.querySelector(".question");
var answer = document.getElementById("answer");
var pId = document.getElementById("p_id");
var questions = '';
var answers = '';
var indiceAtual = 0;
var questionIndex = 1;
var text = {
    "questions": [
        "Qual dia, mês e ano que seu digníssimo foi em sua residência conversar com seus pais?",
        "Qual foi o primeiro presente que você recebeu do seu amado? (sem contar o buquê)",
        "Qual foi o restaurante mais chique e mais refinado que vocês já foram?",
        "Qual foi o rolê mais caótico que vocês já deram?",
        "O que o seu consagrado mais gosta em você?"
    ],
    "answers": [
        "29/04/2022",
        "livro casal imperfeito",
        "restaurante da chefe Anna Sophia",
        "com os cachorros",
        "companhia e carinho"
    ]
};
let strings = text.questions;
let strings2 = text.answers;
    questions = strings;
    answers = strings2;

function nextPage() {
    var tela = document.querySelector(".container");
    var baloonSpeech = document.querySelector(".balloon-content");
  
  baloonSpeech.innerHTML = "Muito bem, o local do desafio é bem distante...<br><br>Espero que tenha trazido mantimentos";
  setTimeout(function () {
    tela.classList.add('hide');
    timerNextPage();
  }, 5000)
}

function timerNextPage() {
    setTimeout(function () {
        window.location = 'quest2.html';
        textElement.innerHTML = questions[0];
    }, 5000)
}


function nextQuestion() {
    if(answer.value.length > 0 && answer.value.toLowerCase() == answers[indiceAtual].toLowerCase()) {
        indiceAtual++;
        if (indiceAtual < questions.length) {
            questionIndex++;
            pId.innerHTML = (questionIndex) + '° enigma';
            answer.value = '';
            textElement.innerHTML = questions[indiceAtual];
        }else {
            window.location = 'quests_finished.html';
        }
    }else {
        answer.classList.add('wrong_answer')
        setTimeout(function () {
            answer.classList.remove('wrong_answer')
        }, 1000)
    }
}


var textoAnimado = document.querySelector('.text-animation p');
textoAnimado.addEventListener('animationend', function() {
  window.location = 'ending.html';
});
