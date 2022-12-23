//----------------------------------------------- Timer -----------------------------------------------------
let timerInterval;
const TIME_LIMIT = 30;
const timerDiv = document.getElementById("timer");

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
timerDiv.classList.add("hide");

function onTimesUp() {
  clearInterval(timerInterval);
  startTimer(TIME_LIMIT);
  setTimeout(function () {
    if (selectedQuestions.length > currentQuestionIndex + 1) {
      wrongAnswers++;
      currentQuestionIndex++;
      /*       console.log("Wrong:", wrongAnswers); */
      setNextQuestion();
    } else {
      wrongAnswers++;
      /*       console.log("Wrong:", wrongAnswers); */
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
  return `<div id= "seconds">SECONDS<br><div id="countdown">${minutes}:${seconds}<div><div id="remaining">REMAINING<div>`;
}
// Divides time left by the defined time limit.
function calculateTimeFraction() {
  const rawTimeFraction = timeLeft / TIME_LIMIT;
  return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
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
window.onload = () => {
  const buttonDiff = document.getElementsByClassName("test-choices");
  Array.from(buttonDiff).forEach((button) =>
    button.addEventListener("click", selectTestDifficulty)
  );
};

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const rndInt = randomIntFromInterval(6, 10);
/* console.log(rndInt); */

const questionContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");

let shuffledQuestions, currentQuestionIndex;
let correctAnswers = 0;
let wrongAnswers = 0;
let totalQuestions = 0;

const startGame = () => {
  shuffledQuestions = difficulty.sort(() => Math.random() - 0.5);
  selectedQuestions = shuffledQuestions.slice(0, rndInt);
  /* console.log(selectedQuestions); */
  currentQuestionIndex = 0;
  timerDiv.classList.remove("hide");
  startTimer(TIME_LIMIT);
  calculateTimeFraction();
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
  currentQuestion.innerText = "QUESTION " + (currentQuestionIndex + 1);
  maxQuestions.innerText = " / " + selectedQuestions.length;
  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("test-choices");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    answerButtonsElement.appendChild(button);
    button.addEventListener("click", selectAnswer);
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
  const correct = selectedButton.dataset.correct;
  Array.from(answerButtonsElement.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
  });
  if (selectedQuestions.length > currentQuestionIndex + 1) {
    if (correct == "true") {
      incrementCorrect();
      /*       console.log("Correct", correctAnswers); */
    } else {
      incrementWrong();
      /*       console.log("Wrong", wrongAnswers); */
    }
    Array.from(answerButtonsElement.children).forEach((button) => {
      button.removeEventListener("click", selectAnswer);
    });
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

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}

function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("hover");
  element.classList.remove("wrong");
}

const setAnswers = () => {
  let finalCorrect = correctAnswers;
  let finalWrong = wrongAnswers;
  localStorage.clear();
  let correctAns = localStorage.setItem("Correct", correctAnswers);
  let wrongAns = localStorage.setItem("Wrong", wrongAnswers);
  let totalQuestions = localStorage.setItem("Total", selectedQuestions.length);
  /* console.log("Correct:", finalCorrect);
  console.log("Wrong:", finalWrong);
  console.log("Total", selectedQuestions.length); */
  location.href = "resultsPage.html";
};

selectTestDifficulty = (e) => {
  const selectedButton = e.target;
  if (selectedButton.innerText === "Easy") {
    fetchQuestionsEasy();
  } else if (selectedButton.innerText === "Medium") {
    fetchQuestionsMedium();
  } else {
    fetchQuestionsHard();
  }
};
fetchQuestionsEasy = () => {
  difficulty = questions.filter((question) => question.difficulty === "easy");
  startGame();
};
fetchQuestionsMedium = () => {
  difficulty = questions.filter((question) => question.difficulty === "medium");
  startGame();
};
fetchQuestionsHard = () => {
  difficulty = questions.filter((question) => question.difficulty === "hard");
  startGame();
};

//--------------------------------------------------- Questions Array ------------------------------------------

const questions = [
  // --------------------------------- Easy ---------------------------------
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
    type: "boolean",
    difficulty: "easy",
    question: "Javascript is a portable version of Java",
    answers: [
      { text: "False", correct: true },
      { text: "True", correct: false },
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
    type: "multiple",
    difficulty: "easy",
    question: "How can I create a checkbox in HTML?",
    answers: [
      { text: `<input type = "check">`, correct: false },
      { text: `<input type = "button">`, correct: false },
      { text: `<input type = "checkbox">`, correct: true },
      { text: `<checkbox>`, correct: false },
    ],
  },

  // --------------------------------- Medium ---------------------------------
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "medium",
    question: "The HTML5 standard was published in 2014.",
    answers: [
      { text: "True", correct: true },
      { text: "False", correct: false },
    ],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "medium",
    question:
      "The common software-programming acronym 'I18N' comes from the term Interlocalization.",
    answers: [
      { text: "True", correct: false },
      { text: "False", correct: true },
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "medium",
    question:
      "What does AD stand for in relation to Windows Operating Systems? ",
    answers: [
      { text: "Automated Database", correct: false },
      { text: "Active Directory", correct: true },
      { text: "Alternative Drive", correct: false },
      { text: "Active Department", correct: false },
    ],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "medium",
    question: "The open source program Redis is a relational database server.",
    answers: [
      { text: "False", correct: true },
      { text: "True", correct: false },
    ],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "medium",
    question: "AMD created the first consumer 64-bit processor.",
    answers: [
      { text: "True", correct: true },
      { text: "False", correct: false },
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "medium",
    question:
      "What is the name of the default theme that is installed with Windows XP?",
    answers: [
      { text: "Bliss", correct: false },
      { text: "Whistler", correct: false },
      { text: "Neptune", correct: false },
      { text: "Luna", correct: true },
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "medium",
    question: "What is the main CPU is the Sega Mega Drive / Sega Genesis?",
    answers: [
      { text: "Yamaha YM2612", correct: false },
      { text: "Zilog Z80", correct: false },
      { text: "Motorola 68000", correct: true },
      { text: "Intel 8088", correct: false },
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "medium",
    question: "When did the online streaming service 'Mixer' launch?",
    answers: [
      { text: "2013", correct: false },
      { text: "2016", correct: true },
      { text: "2009", correct: false },
      { text: "2011", correct: false },
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "medium",
    question: "How many bytes are in a single Kibibyte?",
    answers: [
      { text: "1024", correct: true },
      { text: "2400", correct: false },
      { text: "1000", correct: false },
      { text: "1240", correct: false },
    ],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "medium",
    question: "A Boolean value of '0' represents which of these words?",
    answers: [
      { text: "False", correct: true },
      { text: "True", correct: false },
    ],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "medium",
    question: " RAM stands for Random Access Memory.",
    answers: [
      { text: "False", correct: false },
      { text: "True", correct: true },
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "medium",
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
    difficulty: "medium",
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
    difficulty: "medium",
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
    type: "boolean",
    difficulty: "medium",
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
    difficulty: "medium",
    question:
      "The series of the Intel HD graphics generation succeeding that of the 5000 and 6000 series (Broadwell) is called:",
    answers: [
      { text: "HD Graphics 700", correct: false },
      { text: "HD Graphics 500", correct: true },
      { text: "HD Graphics 600", correct: false },
      { text: "HD Graphics 7000", correct: false },
    ],
  },

  // --------------------------------- Hard ---------------------------------
  {
    category: "General Knowledge",
    type: "multiple",
    difficulty: "hard",
    question: "What does the fox say?",
    answers: [
      { text: "Let me out and set me free", correct: false },
      { text: "Ding ding ding", correct: true },
      { text: "Baby don't hurt me, no more", correct: false },
      { text: "Never gonna give you up", correct: false },
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "hard",
    question:
      "The Harvard architecture for micro-controllers added which additional bus?",
    answers: [
      { text: "Instruction", correct: true },
      { text: "Address", correct: false },
      { text: "Control", correct: false },
      { text: "Data", correct: false },
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "hard",
    question:
      "The internet domain .fm is the country-code top-level domain for which Pacific Ocean island nation?",
    answers: [
      { text: "Marshall Islands", correct: false },
      { text: "Fiji", correct: false },
      { text: "Tuvalu", correct: false },
      { text: "Micronesia", correct: true },
    ],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "hard",
    question: "DHCP stands for Dynamic Host Configuration Port.",
    answers: [
      { text: "False", correct: true },
      { text: "True", correct: false },
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "hard",
    question:
      "Which of these was the name of a bug found in April 2014 in the publicly available OpenSSL cryptography library?",
    answers: [
      { text: "Shellshock", correct: false },
      { text: "Heartbleed", correct: true },
      { text: "Corrupted Blood", correct: false },
      { text: "Shellscript", correct: false },
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "hard",
    question: "What vulnerability ranked #1 on the OWASP Top 10 in 2013?",
    answers: [
      { text: "Insecure Direct Object References", correct: false },
      { text: "Broken Authentication", correct: false },
      { text: "Cross-Site Scripting", correct: false },
      { text: "Injection", correct: true },
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "hard",
    question: "The acronym 'RIP' stands for which of these?",
    answers: [
      { text: "Routing Information Protocol", correct: true },
      { text: "Runtime Instance Processes", correct: false },
      { text: "Regular Interval Processes", correct: false },
      { text: "Routine Inspection Protocol", correct: false },
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "hard",
    question:
      "Which of these is not a layer in the OSI model for data communications?",
    answers: [
      { text: "Application Layer", correct: false },
      { text: "Connection Layer", correct: true },
      { text: "Transport Layer", correct: false },
      { text: "Physical Layer", correct: false },
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "hard",
    question:
      "Which of the following computer components can be built using only NAND gates?",
    answers: [
      { text: "Register", correct: false },
      { text: "CPU", correct: false },
      { text: "RAM", correct: false },
      { text: "ALU", correct: true },
    ],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "hard",
    question:
      "The T-Mobile Sidekick smartphone is a re-branded version of the Danger Hiptop.",
    answers: [
      { text: "True", correct: true },
      { text: "False", correct: false },
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "hard",
    question: "Who is the founder of Palantir?",
    answers: [
      { text: "Jack Dorsey", correct: false },
      { text: "Marc Benioff", correct: false },
      { text: "Peter Thiel", correct: true },
      { text: "Mark Zuckerberg", correct: false },
    ],
  },
];
