console.log(correctAnswers, wrongAnswers);

// setup
const data = {
  labels: ["Wrong", "Right"],
  datasets: [
    {
      label: "Test Results",
      data: [33.3, 66.7],
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
