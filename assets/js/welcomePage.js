const goOnIfChecked = () => {
  const checkBox = document.getElementById("customCheck");
  const botton = document.getElementById("proceed");
  if (checkBox.checked) {
<<<<<<< Updated upstream
    location.href = "testpage.html";
=======
    location.href = "testPage.html";
>>>>>>> Stashed changes
  } else {
    location.href = "#";
  }
};
