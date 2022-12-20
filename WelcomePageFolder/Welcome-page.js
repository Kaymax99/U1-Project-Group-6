const goOnIfChecked = () => {
  const checkBox = document.getElementById("customCheck");
  const botton = document.getElementById("proceed");
  if (checkBox.checked) {
    location.href = "https://www.geeksforgeeks.org/";
  } else {
    location.href = "#";
  }
};
