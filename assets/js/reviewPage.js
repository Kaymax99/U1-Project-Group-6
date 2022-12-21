const starWrapper = document.querySelector(".stars");
const stars = document.querySelectorAll(".stars a");

stars.forEach((star, clickedIdx) => {
  star.addEventListener("click", () => {
    starWrapper.classList.add("disabled");
    stars.forEach((otherStar, otherIdx) => {
      if (otherIdx <= clickedIdx) {
        otherStar.classList.add("active");
      }
    });
  });
});

const sendMail = (event) => {
  const feedback = document.getElementById("changeText").value;
  if (event.key === "Enter") {
    if (feedback === "") {
      alert("non lasciare vuoto");
    } else {
      alert("feedback inviato!");
    }
  }
};

const webSite = document.getElementById("goToEpicode");
webSite.addEventListener("click", () => {
  window.open("https://epicode.com/it/");
});
