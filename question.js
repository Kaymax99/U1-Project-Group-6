const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');

const scoreText = document.querySelector('#score');                              //forse non serve

const progressCount = document.querySelector('#progressCount');

let currentQuestion = {}
let acceptingAnswer = true
let score = 0
let questionCounter = 0
let availableQuestion = []

let questions = [
    {
        question:
            choice1:
        choice2:
            choice3:
        choice4:

            answer:

    },

    {
        question:
            choice1:
        choice2:
            choice3:
        choice4:

            answer:

    },

    {
        question:
            choice1:
        choice2:
            choice3:
        choice4:

            answer:

    },

    {
        question:
            choice1:
        choice2:
            choice3:
        choice4:

            answer:

    },

    {
        question:
            choice1:
        choice2:
            choice3:
        choice4:

            answer:

    },

    {
        question:
            choice1:
        choice2:
            choice3:
        choice4:

            answer:

    },

    {
        question:
            choice1:
        choice2:
            choice3:
        choice4:

            answer:

    },

    {
        question:
            choice1:
        choice2:
            choice3:
        choice4:

            answer:

    },

    {
        question:
            choice1:
        choice2:
            choice3:
        choice4:

            answer:

    },

    {
        question:
            choice1:
        choice2:
            choice3:
        choice4:

            answer:

    }
]


const SCORE_POINTS = 10
const MAX_QUESTIONS = 10

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if (availableQuestions.lenght === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('blablabla.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressCount.getElementsByClassName.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`

    const questionIndex = Math.floor(Math.random() * availableQuestions.lenght)
    currentQuestion = availableQuestions['number']
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswer = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswer) return
        acceptingAnswer = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' :
            'incorrect'

        if (classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        }, 1000)

    })
})

incrementScore = num => {
    score += num
    scoreText.innerText = score
}