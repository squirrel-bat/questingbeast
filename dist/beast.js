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
  new No("Other creatures you control have deathtouch."),
  new No(
    "Whenever Questing Beast deals combat damage to an opponent, destroy target enchantment or artifact that player controls."
  ),
  new No("Questing Beast can’t be blocked by creatures with power 3 or more."),
  new No("Trample"),
  new No("Planeswalker deathtouch"),
];

function nextQuestion() {
  const quiz = document.getElementById("quiz");
  if (!quiz) return;

  const resultElement = document.getElementById("result");
  resultElement.classList.add("display-none");

  if (answered.length === questions.length) {
    console.log("💀");
    return;
  }

  const answersElement = document.getElementById("answers");
  answersElement.classList.remove("display-none");

  const element = document.querySelector("#question > .text");
  const oldId = parseInt(element.dataset.id);
  let newId = Math.floor(Math.random() * questions.length);
  while (newId === oldId) {
    newId = Math.floor(Math.random() * questions.length);
  }
  while (answered.find((e) => e === newId)) {
    newId = Math.floor(Math.random() * questions.length);
  }
  const question = questions[newId];
  answered.push(newId);
  element.dataset.id = newId.toString();
  element.innerText = question.ability;
  document.querySelector("#question > .text").replaceWith(element);
}

function giveAnswer(a) {
  if (typeof a !== "boolean") throw Error("You know what you did.");
  const answersElement = document.getElementById("answers");
  const questionTextElement = document.querySelector("#question > .text");
  const id = parseInt(questionTextElement.dataset.id);
  const resultElement = document.getElementById("result");
  const resultTextElement = resultElement.querySelector(".text");
  const correct = questions.at(id).answer === a;

  answersElement.classList.add("display-none");
  resultTextElement.innerText = correct
    ? "You are correct!"
    : "Whoops, that's wrong!";
  resultTextElement.classList.remove("green", "red");
  resultTextElement.classList.add(correct ? "green" : "red");

  resultElement.classList.remove("display-none");
}

const answered = [];
