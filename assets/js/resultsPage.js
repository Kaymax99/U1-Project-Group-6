/* let data = anychart.data.set([
  ["Wrong Answers", 33.3],
  ["Right Answers", 66.7],
]);

let chart = anychart.pie(data);
chart.innerRadius("75%");
let palette = anychart.palettes.distinctColors();
palette.items([{ color: "#c2128d" }, { color: "#00ffff" }]);
chart.palette(palette);
chart.background("none");
anychart.utils.hideTooltips();

chart.labels().format("{%x} — {%y}%").fontSize(16);
chart.legend(false);
chart.tooltip().format("Percentage: {%PercentValue}%");

let label = anychart.standalones.label();
label
  .useHtml(true)
  .text(
    `<div class="testOutcome">
  <h3>Congratulations!<br /><span>You passed the exam.<br>
  </span></h3><p id="certificate">We'll send you the certificate<br> in a few minutes.
  Check your email<br> (including promotions/spam folder)
  </p>
</div>`
  )
  .position("center")
  .anchor("center")
  .hAlign("center")
  .vAlign("middle")
  .fontColor("white");
chart.center().content(label);

chart.container("chartContainer");
chart.draw(); */

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
