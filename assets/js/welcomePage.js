const goOnIfChecked = () => {
  const checkBox = document.getElementById("customCheck");
  const botton = document.getElementById("proceed");
  if (checkBox.checked) {
    location.href = "testpage.html";
  } else {
    location.href = "#";
  }
};
