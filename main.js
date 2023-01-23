// все варианты ответа
const option1 = document.querySelector('.option1'),
    option2 = document.querySelector('.option2'),
    option3 = document.querySelector('.option3'),
    option4 = document.querySelector('.option4');


// все ответы

const optionElements = document.querySelectorAll('.option');
const question = document.getElementById('question'); /* сам вопрос */
const numberOfQuestion = document.getElementById('number-of-question'); /* номер вопроса*/
const numberOfAllQuestions = document.getElementById('number-of-all-questions'); // количество всех вопросов

let indexOfQuestion,  // индекс текущего вопроса
    indexOfPage = 0;  //индекс страницы

const answersTracker = document.getElementById('answers-tracker'); // Обертка для трекера
const btnNext = document.getElementById('btn-next'); // кнопка далее

let score = 0; // итоговый результат викторины

const correctAnswer = document.getElementById('correct-answer'); // количество правильных ответов
const numberOfAllQuestions2 = document.getElementById('number-of-all-questions-2'); // количество вопросов в модальном окне
const btnTryAgain = document.getElementById('btn-try-again'); //начать викторину заново

const questions = [
    {
        question: 'Как в JavaScript вычислить процент от числа?',
        options: [
            'Так в JavaScript нельзя сделать',
            'Оператор: %',
            'Умножить на кол-во процентов и разделить на 100',
            'Вызвать метод findPrecent()',
        ],
        rightAnswer: 2
    },
    {
        question: '1?',
        options: [
            '1',
            '2',
            '3',
            '4',
        ],
        rightAnswer: 1
    },
    {
        question: '2?',
        options: [
            '1',
            '2',
            '3',
            '4',
        ],
        rightAnswer: 2
    },
];

numberOfAllQuestions.innerHTML =questions.length;
 // выводим кол-во вопросов
const load = () => {
    question.innerHTML = questions[indexOfQuestion].question; //сам вопрос
    // мапим ответы
    option1.innerHTML = questions[indexOfQuestion].options[0];
    option2.innerHTML = questions[indexOfQuestion].options[1];
    option3.innerHTML = questions[indexOfQuestion].options[2];
    option4.innerHTML = questions[indexOfQuestion].options[3];


    numberOfQuestion.innerHTML = indexOfPage + 1; // установка номера текущей стр
    indexOfPage++; // увеличение индекса страницы
};

let completedAnswers = [] // массив для уже заданных вопросов


const randomQuestion = () => {
    let randomNumber = Math.floor(Math.random() *questions.length);
    let hitDuplicate = false; // якорь для проверки одинаковых вопросов
    if(indexOfPage == questions.length) {
        quizOver()
    }else {
        if (completedAnswers.length > 0) {
            completedAnswers.forEach(item => {
                if(item == randomNumber) {
                    hitDuplicate = true;
                }
            });
            if(hitDuplicate) {
                randomQuestion();
            } else {
                indexOfQuestion = randomNumber;
                load();
            }
        }
        if(completedAnswers.length ==0) {
            indexOfQuestion = randomNumber;
            load();
        };
    }
    completedAnswers.push(indexOfQuestion);
};

const checkAnswer = el => {
    if(el.target.dataset.id == questions[indexOfQuestion].rightAnswer) {
        el.target.classList.add('correct');
        updateAnswersTracker('correct');
        score++;
    } else {
        el.target.classList.add('wrong');
        updateAnswersTracker('wrong');
    }
    disabledOptions();
}

for(option of optionElements) {
    option.addEventListener('click', e => checkAnswer(e));
}

const disabledOptions = () => {
    optionElements.forEach(item => {
        item.classList.add('disabled');
        if(item.dataset.id == questions[indexOfQuestion].rightAnswer) {
            item.classList.add('correct');
        };
        
    })
}

//удаление всех классов со всех ответов
const enabledOptions = () => {
    optionElements.forEach(item => {
        item.classList.remove('disabled', 'correct', 'wrong');
    })
};

const answerTracker = () => {
    questions.forEach(()=> {
        const div = document.createElement('div');
        answersTracker.appendChild(div);
    })
};


const updateAnswersTracker = status => {
    answersTracker.children[indexOfPage - 1].classList.add(`${status}`);
}

const validate = () => {
    if(!optionElements[0].classList.contains('disabled')) {
       alert('Вам нужно выбрать один из вариантов');
    }else {
        randomQuestion();
        enabledOptions();
    }
}

const quizOver = () => {
    document.querySelector('.quiz-over-modal').classList.add('active')
    correctAnswer.innerHTML = score;
    numberOfAllQuestions2.innerHTML= questions.length;
};

const tryAgain = () => {
    window.location.reload();
};

btnTryAgain.addEventListener('click', tryAgain);

btnNext.addEventListener('click', () => {
    validate();
})

window.addEventListener('load', () => {
    randomQuestion();
    answerTracker();
});






