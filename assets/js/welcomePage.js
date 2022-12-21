const goOnIfChecked = () => {
  const checkBox = document.getElementById("customCheck");
  const botton = document.getElementById("proceed");
  if (checkBox.checked) {
    location.href = "testPage.html";
  } else {
    location.href = "#";
  }
};
