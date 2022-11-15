function crashScryfall(elem) {
  document.getElementById("questingbeast").removeAttribute("src");
  const crashedDiv = document.createElement("div");
  crashedDiv.innerText = "Scryfall successfully crashed!";
  crashedDiv.classList.add("center");
  elem.replaceWith(crashedDiv);
}
