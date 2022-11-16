function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  const data = ev.dataTransfer.getData("text");
  if (ev.target.id === "text_box") {
    ev.target.appendChild(document.getElementById(data));
  }
}

function check() {
  const box = document.getElementById("text_box");
  const abilities = document.getElementById("abilities");
  console.log(box);
  if (
    box.querySelector("#drag1") !== null &&
    box.querySelector("#drag2") !== null &&
    box.querySelector("#drag3") !== null &&
    box.querySelector("#drag4") !== null &&
    box.querySelector("#drag5") !== null &&
    box.querySelector("#drag6") !== null &&
    box.querySelector("#drag7") == null &&
    box.querySelector("#drag8") == null &&
    box.querySelector("#drag9") == null &&
    box.querySelector("#drag10") == null &&
    box.querySelector("#drag11") == null &&
    box.querySelector("#drag12") == null
  ) {
    abilities.style.cssText =
      "background-color: green; font-size: 2rem; text-align: center";
    abilities.textContent = "you got it!";
    console.log("✅");
  } else {
    abilities.style.cssText =
      "background-color: red; font-size: 2rem; text-align: center";
    abilities.textContent = "wrong!";
    console.log("⛔️");
  }
}
