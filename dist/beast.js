function toggleDetails() {
  document.getElementById("details").classList.toggle("hidden");
  document.querySelectorAll(".btn-default span").forEach((el) => {
    el.classList.toggle("display-none");
  });
  if (!document.getElementById("details").classList.contains("hidden")) {
    window.scrollTo({
      left: 0,
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  }
}

function toggleMenuState() {
  document.querySelectorAll(".menu").forEach((el) => {
    el.classList.toggle("display-none");
  });
}

function showTabById(id) {
  toggleMenuState();
  document.getElementById(id).classList.toggle("display-none");
}

function reset() {
  location.reload();
}

// Quiz
function Yes(q) {
  if (typeof q === "undefined") throw Error("Missing parameter 'q'");
  this.ability = q;
  this.answer = true;
}
function No(q) {
  if (typeof q === "undefined") throw Error("Missing parameter 'q'");
  this.ability = q;
  this.answer = false;
}

const questions = [
  new Yes("Vigilance"),
  new Yes("Deathtouch"),
  new Yes("Haste"),
  new Yes("Questing Beast can’t be blocked by creatures with power 2 or less."),
  new Yes(
    "Combat damage that would be dealt by creatures you control can’t be prevented."
  ),
  new Yes(
    "Whenever Questing Beast deals combat damage to an opponent, it deals that much damage to target planeswalker that player controls."
  ),
];

function nextQuestion() {
  const quiz = document.getElementById("quiz");
  if (!quiz) return;
  const element = document.querySelector("#question span");
  const oldId = parseInt(element.dataset.id);
  let newId = Math.floor(Math.random() * questions.length);
  while (newId === oldId) {
    newId = Math.floor(Math.random() * questions.length);
  }
  const question = questions[newId];
  element.dataset.id = newId.toString();
  element.innerText = question.ability;
  document.querySelector("#question span").replaceWith(element);
}
