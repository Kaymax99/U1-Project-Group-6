let data = anychart.data.set([
  ["Wrong Answers", 33.3],
  ["Right Answers", 66.7],
]);

let chart = anychart.pie(data);
chart.innerRadius("75%");
var palette = anychart.palettes.distinctColors();
palette.items([{ color: "#c2128d" }, { color: "#00ffff" }]);
chart.palette(palette);
chart.background("none");
anychart.utils.hideTooltips();

chart.labels().format("{%x} — {%y}%").fontSize(16);
chart.legend(false);
chart.tooltip().format("Percentage: {%PercentValue}%");

var label = anychart.standalones.label();
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
chart.draw();
