const starWrapper = document.querySelector(".stars");
// const stars = document.querySelectorAll(".stars a");

/*
stars.forEach((star, clickedIdx) => {
  star.addEventListener("click", () => {
    starWrapper.classList.add("disabled");
    stars.forEach((otherStar, otherIdx) => {
      if (otherIdx <= clickedIdx) {
        otherStar.classList.add("active");
      } else if (otherIdx <= clickedIdx) {
        otherStar.classList.remove("active");
      }
    });
  });
});
*/

const stars = document.querySelectorAll(".stars a");
stars.forEach((star, index1) => {
  star.addEventListener("click", () => {
    stars.forEach((star, index2) => {
      index1 >= index2
        ? star.classList.add("active")
        : star.classList.remove("active");
    });
  });
});

const sendMail = (event) => {
  const feedback = document.getElementById("changeText").value;
  if (event.key === "Enter") {
    if (feedback === "") {
      const modal = document.getElementById("myModal");
      const span = document.getElementsByClassName("close")[0];
      modal.style.display = "block";
      span.onclick = function () {
        modal.style.display = "none";
      };
      window.onclick = function (event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
      };
    } else {
      const modal2 = document.getElementById("myModal2");
      const span2 = document.getElementsByClassName("close2")[0];
      modal2.style.display = "block";
      span2.onclick = function () {
        modal2.style.display = "none";
      };
      window.onclick = function (event) {
        if (event.target == modal2) {
          modal2.style.display = "none";
        }
      };
    }
  }
};

const webSite = document.getElementById("goToEpicode");
webSite.addEventListener("click", () => {
  window.open("https://epicode.com/it/");
});
