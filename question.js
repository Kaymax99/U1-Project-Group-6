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
        question: "What does CPU stand for?",
        choice1: "Central Process Unit",
        choice2: "Computer Personal Unit",
        choice3: "Central Processor Unit",
        choice4: "Central Processing Unit",

        answer: "Central Processing Unit"

    },

    {
        question: "In the programming language Java, which of these keywords would you put on a variable to make sure it doesn&#039;t get modified?",
        choice1: "Static",
        choice2: "Private",
        choice3: "Final",
        choice4: "Public",

        answer: "Final"

    },

    {
        question: "What is the most preferred image format used for logos in the Wikimedia database?",
        choice1: ".svg",
        choice2: ".png",
        choice3: ".jpeg",
        choice4: ".gif",

        answer: ".svg"

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