//----------------------------------------------- Timer -----------------------------------------------------

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const rndInt = randomIntFromInterval(10, 15);
console.log(rndInt);

let timerInterval;
const text1 = "Seconds";
const text2 = "remaining";
const TIME_LIMIT = 7;

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
</div>`;

function onTimesUp() {
  clearInterval(timerInterval);
  startTimer(TIME_LIMIT);
  setTimeout(function () {
    if (selectedQuestions.length > currentQuestionIndex + 1) {
      wrongAnswers++;
      currentQuestionIndex++;
      console.log("Wrong:", wrongAnswers);
      setNextQuestion();
    } else {
      wrongAnswers++;
      console.log("Wrong:", wrongAnswers);
      setAnswers();
    }
  }, 1000);

  function resetClick() {
    clearInterval(timerInterval);
    startTimer(TIME_LIMIT);
  }
}

function startTimer(time) {
  timerInterval = setInterval(timer, 1000);
  function timer() {
    // The amount of time passed increments by one
    timePassed = timePassed += 1;
    timeLeft = time--;

    // The time left label is updated
    document.getElementById("base-timer-label").innerHTML =
      formatTimeLeft(timeLeft);

    setCircleDasharray(time - 1);
    if (timeLeft === 0) {
      onTimesUp();
    }
  }
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

// -------------------------------------------- Questions --------------------------------------------

const questionContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");

let shuffledQuestions, currentQuestionIndex;
let correctAnswers = 0;
let wrongAnswers = 0;
let totalQuestions = 0;

startTimer(TIME_LIMIT);
function calculateTimeFraction() {
  const rawTimeFraction = timeLeft / TIME_LIMIT;
  return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
}

const startGame = () => {
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  selectedQuestions = shuffledQuestions.slice(0, rndInt);
  /* console.log(selectedQuestions); */
  currentQuestionIndex = 0;
  setNextQuestion();
};

const setNextQuestion = () => {
  resetState();
  showQuestion(selectedQuestions[currentQuestionIndex]);
};

const currentQuestion = document.getElementById("currentQuestion");
const maxQuestions = document.getElementById("maxQuestions");

const showQuestion = (question) => {
  questionElement.innerText = question.question;
  currentQuestion.innerText = currentQuestionIndex + 1;
  maxQuestions.innerText = " / " + selectedQuestions.length;
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

incrementCorrect = () => {
  correctAnswers++;
};
incrementWrong = () => {
  wrongAnswers++;
};

const selectAnswer = (e) => {
  const selectedButton = e.target;
  /*  console.log(selectedButton.innerText); */
  const correct = selectedButton.dataset.correct;
  if (selectedQuestions.length > currentQuestionIndex + 1) {
    if (correct == "true") {
      incrementCorrect();
      console.log("Correct", correctAnswers);
    } else {
      incrementWrong();
      console.log("Wrong", wrongAnswers);
    }
    currentQuestionIndex++;
    clearInterval(timerInterval);
    startTimer(TIME_LIMIT);
    setTimeout(function () {
      setNextQuestion();
    }, 1000);
  } else {
    if (correct == "true") {
      incrementCorrect();
    } else {
      incrementWrong();
    }
    setAnswers();
  }
};

const setAnswers = () => {
  let finalCorrect = correctAnswers;
  let finalWrong = wrongAnswers;
  localStorage.clear();
  let correctAns = localStorage.setItem("Correct", correctAnswers);
  let wrongAns = localStorage.setItem("Wrong", wrongAnswers);
  let totalQuestions = localStorage.setItem("Total", selectedQuestions.length);
  /*   console.log("Correct:", finalCorrect);
  console.log("Wrong:", finalWrong);
  console.log("Total", selectedQuestions.length); */
  location.href = "resultsPage.html";
};

//--------------------------------------------------- Questions Array ------------------------------------------

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
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "What kind of language is HTML?",
    answers: [
      { text: "Coding", correct: false },
      { text: "Styling", correct: false },
      { text: "Global", correct: false },
      { text: "Markup", correct: true },
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "What does the computer software acronym JVM stand for?",
    answers: [
      { text: "Just Virtual Machine", correct: false },
      { text: "Java Visual Machine", correct: false },
      { text: "Java Virtual Machine", correct: true },
      { text: "Java Vendor Machine", correct: false },
    ],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question: " RAM stands for Random Access Memory.",
    answers: [
      { text: "False", correct: false },
      { text: "True", correct: true },
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "In computing, what does LAN stand for?",
    answers: [
      { text: "Local Area Network", correct: true },
      { text: "Long Antenna Node", correct: false },
      { text: "Light Access Node", correct: false },
      { text: "Land Address Navigation", correct: false },
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "The series of the Intel HD graphics generation succeeding that of the 5000 and 6000 series (Broadwell) is called:",
    answers: [
      { text: "HD Graphics 700", correct: false },
      { text: "HD Graphics 500", correct: true },
      { text: "HD Graphics 600", correct: false },
      { text: "HD Graphics 7000", correct: false },
    ],
  },
];
window.onload = () => {
  startGame();
};
