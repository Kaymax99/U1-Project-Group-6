const questionContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");

let shuffledQuestions, currentQuestionIndex;

const startGame = () => {
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  setNextQuestion();
};

const setNextQuestion = () => {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
};

const currentQuestion = document.getElementById("currentQuestion");

const showQuestion = (question) => {
  questionElement.innerText = question.question;
  currentQuestion.innerText = currentQuestionIndex + 1;
  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("test-choices");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
  });
};

const resetState = () => {
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
};

const selectAnswer = (e) => {
  const selectedButton = e.target;
  let correctAnswers = 0;
  const correct = selectedButton.dataset.correct;
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    currentQuestionIndex++;
    setNextQuestion();
    timer.restart(reloadTimeOut());
  } else {
    /* location.href = "https://google.com"; */
    console.log(correctAnswers);
  }
};

const reloadTimeOut = () => {
  if (timeLeft == 0 || selectAnswer(e)) {
    timer.restart(reloadTimeOut());
  }
};

/* if ((correct = questions.answer.correct)) {
  correctAnswers++;
}
 */
//----------------------------------------------- Timer -----------------------------------------------------

let timerInterval = null;
const text1 = "Seconds";
const text2 = "remaining";
const TIME_LIMIT = 20;

// Initially, no time has passed, but this will count up
// and subtract from the TIME_LIMIT
let timePassed = 0;
let timeLeft = TIME_LIMIT;

const COLOR_CODES = {
  info: {
    color: "green",
  },
};

let remainingPathColor = COLOR_CODES.info.color;

document.getElementById("timer").innerHTML = `
<div class="base-timer">
  <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <g class="base-timer__circle">
      <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45" />
      <path
        id="base-timer-path-remaining"
        stroke-dasharray="283"
        class="base-timer__path-remaining ${remainingPathColor}"
        d="
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        "
      ></path>
    </g>
  </svg>
  <span id="base-timer-label" class="base-timer__label">
  ${formatTimeLeft(timeLeft)}
  </span>
</div>
`;
startTimer();

function onTimesUp() {
  clearInterval(timerInterval);
}

function startTimer() {
  timerInterval = setInterval(() => {
    // The amount of time passed increments by one
    timePassed = timePassed += 1;
    timeLeft = TIME_LIMIT - timePassed;

    // The time left label is updated
    document.getElementById("base-timer-label").innerHTML =
      formatTimeLeft(timeLeft);

    setCircleDasharray();
    if (timeLeft === 0) {
      onTimesUp();
    }
  }, 1000);
}
// Start with an initial value of 20 seconds

function formatTimeLeft(time) {
  // The largest round integer less than or equal to the result of time divided being by 60.
  const minutes = Math.floor(time / 60);

  // Seconds are the remainder of the time divided by 60 (modulus operator)
  let seconds = time % 60;

  // If the value of seconds is less than 10, then display seconds with a leading zero
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  // The output in MM:SS format
  return `${minutes}:${seconds}`;
}
// Divides time left by the defined time limit.
function calculateTimeFraction() {
  return timeLeft / TIME_LIMIT;
}
const FULL_DASH_ARRAY = 283;
// Update the dasharray value as time passes, starting with 283
function setCircleDasharray() {
  const circleDasharray = `${(
    calculateTimeFraction() * FULL_DASH_ARRAY
  ).toFixed(0)} 283`;
  document
    .getElementById("base-timer-path-remaining")
    .setAttribute("stroke-dasharray", circleDasharray);
}

const questions = [
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "What does CPU stand for?",
    answers: [
      { text: "Central Processing Unit", correct: true },
      { text: "Central Process Unit", correct: false },
      { text: "Computer Personal Unit", correct: false },
      { text: "Central Processor Unit", correct: false },
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "In the programming language Java, which of these keywords would you put on a variable to make sure it doesn't get modified?",
    answers: [
      { text: "Public", correct: false },
      { text: "Static", correct: false },
      { text: "Final", correct: true },
      { text: "Private", correct: false },
    ],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question: "The logo for Snapchat is a Bell.",
    answers: [
      { text: "False", correct: true },
      { text: "True", correct: false },
    ],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question:
      "Pointers were not used in the original C programming language; they were added later on in C++.",
    answers: [
      { text: "False", correct: true },
      { text: "True", correct: false },
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "What is the most preferred image format used for logos in the Wikimedia database?",
    answers: [
      { text: ".gif", correct: false },
      { text: ".jpeg", correct: false },
      { text: ".png", correct: false },
      { text: ".svg", correct: true },
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "In web design, what does CSS stand for?",
    answers: [
      { text: "Computer Style Sheet", correct: false },
      { text: "Corrective Style Sheet", correct: false },
      { text: "Cascading Style Sheet", correct: true },
      { text: "Counter Strike: Source", correct: false },
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "What is the code name for the mobile operating system Android 7.0?",
    answers: [
      { text: "Marshmallow", correct: false },
      { text: "Nougat", correct: true },
      { text: "Jelly Bean", correct: false },
      { text: "Ice Cream Sandwich", correct: false },
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "On Twitter, what is the character limit for a Tweet?",
    answers: [
      { text: "140", correct: true },
      { text: "120", correct: false },
      { text: "160", correct: false },
      { text: "100", correct: false },
    ],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question: "Linux was first created as an alternative to Windows XP.",
    answers: [
      { text: "True", correct: false },
      { text: "False", correct: true },
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "Which programming language shares its name with an island in Indonesia?",
    answers: [
      { text: "Java", correct: true },
      { text: "Python", correct: false },
      { text: "C", correct: false },
      { text: "Jakarta", correct: false },
    ],
  },
];
window.onload = () => {
  startGame();
};