let correctAns = localStorage.getItem("Correct"),
  wrongAns = localStorage.getItem("Wrong"),
  totalQuestions = localStorage.getItem("Total");
console.log("You got: ", correctAns, wrongAns);
let correctPcnt = (correctAns * 100) / totalQuestions;
let wrongPcnt = (wrongAns * 100) / totalQuestions;

window.onload = () => {
  let finalCorrectPercentage = document.getElementById("correctPercentage");
  let finalWrongtPercentage = document.getElementById("wrongPercentage");
  let finalCorrectAsw = document.getElementById("correctAsw");
  let finalWrongAsw = document.getElementById("wrongAsw");
  finalCorrectPercentage.innerText = Math.round(correctPcnt * 10) / 10 + "%";
  finalWrongtPercentage.innerText = Math.round(wrongPcnt * 10) / 10 + "%";
  finalCorrectAsw.innerText = correctAns + "/" + totalQuestions + " questions";
  finalWrongAsw.innerText = wrongAns + "/" + totalQuestions + " questions";

  let testOutcome = document.getElementById("chartText");
  let testOutcome2 = document.getElementById("chartText");

  const checkPassOrFail = () => {
    if (correctPcnt >= 60) {
      testOutcome.innerHTML = `<p id='certificate'>
      <span id='testOutcomeMessage'>Congratulations!</span><br /><span id='examPass'>You passed the exam.</span><br /><br /><span id='testOutcomeText'
        >We'll send you the certificate<br />
        in a few minutes.<br />
        Check your email (including<br />
        promotions/spam folder)</span
      >
    </p>`;
    } else {
      testOutcome2.innerHTML = `<p id='certificate'>
      <span id='testOutcomeMessage'>Ops!</span><br /><span id='examPass'>You did not pass the exam.</span><br /><br /><span id='testOutcomeText'>
    </p>`;
    }
  };
  checkPassOrFail();

  // setup
  const data = {
    labels: ["Wrong", "Right"],
    datasets: [
      {
        label: "Test Results",
        data: [wrongPcnt, correctPcnt],
        backgroundColor: ["#c2128d", "#00ffff"],
        borderWidth: 0,
        hoverOffset: 4,
        cutout: "72%",
      },
    ],
  };

  // centerText plugin
  const centerText = {
    id: "centerText",
    afterDatasetsDraw(chart, args, options) {
      const {
        ctx,
        chartArea: { top, right, bottom, left, width, height },
      } = chart;
      ctx.save();
      console.log(top);
      ctx.font = "bolder 30px Arial";
      ctx.fillStyle = "#c2128d";
      ctx.textAlign = "center";
      ctx.fillText("Sales:", 200, 200);
    },
  };

  // config
  const config = {
    type: "doughnut",
    data: data,
    options: {
      plugins: {
        text: [centerText],
        legend: {
          display: false,
        },
        tooltip: {
          enabled: false,
        },
      },
    },
  };
  // render initial block
  const myChart = new Chart(document.getElementById("myChart"), config);
};

redirectReview = () => {
  location.href = "reviewPage.html";
};

let rateUsButton = document.getElementById("rateUsButton");
rateUsButton.addEventListener("click", redirectReview);
