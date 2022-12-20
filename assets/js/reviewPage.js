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

const sendMail = () => {
  const feedback = document.getElementById("changeText").value;
  window.location.href = "mailto:sorrentmarco@gmail.com" + feedback;
};
