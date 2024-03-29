const ROUTES = [
  {
    route: 'page-info',
    navigate: () => {
      showTabById('info')
    },
  },
  {
    route: 'page-quiz',
    navigate: () => {
      showTabById('quiz')
      nextQuestion()
    },
  },
]

const THE_CODE = {
  active: false,
  pos: 0,
  code: [
    'ArrowUp',
    'ArrowUp',
    'ArrowDown',
    'ArrowDown',
    'ArrowLeft',
    'ArrowRight',
    'ArrowLeft',
    'ArrowRight',
    'b',
    'a',
  ],
}

window.addEventListener('load', () => {
  document.querySelector('body').classList.add('display-none')
  const route = window.location.hash.slice(1)
  const validRoute = ROUTES.find((e) => e.route === route)
  if (typeof validRoute !== 'undefined') validRoute.navigate()

  document.querySelector('body').classList.remove('display-none')
})

function handleKeys(e) {
  if (window.location.hash.length > 1) {
    return
  } else {
    const visiblePages = Array.from(
      document.getElementsByTagName('article')
    ).filter((el) => !el.classList.contains('display-none'))
    if (visiblePages.length > 0) {
      return
    }
  }
  THE_CODE.pos = e.key === THE_CODE.code[THE_CODE.pos] ? THE_CODE.pos + 1 : 0
  if (THE_CODE.pos === THE_CODE.code.length) {
    THE_CODE.active = true
    document.querySelector(
      'h1'
    ).innerHTML = `Let's cheat with <span class="qb-word green">Questing Beast</span>!`
    window.removeEventListener('keydown', handleKeys)
  }
}

window.addEventListener('keydown', handleKeys)

function navigateTo(anchor = '', reload = true) {
  window.location.hash = anchor
  if (reload === true) window.location.reload()
}

function toggleDetails() {
  const detailsElement = document.getElementById('details')
  detailsElement.classList.toggle('hidden')
  document.querySelectorAll('.btn-default span').forEach((el) => {
    el.classList.toggle('display-none')
  })
  if (!detailsElement.classList.contains('hidden')) {
    window.scrollTo({
      left: 0,
      top: detailsElement.offsetTop,
      behavior: 'smooth',
    })
  }
}

function toggleMenuState() {
  document.querySelectorAll('.menu').forEach((el) => {
    el.classList.toggle('display-none')
  })
}

function showTabById(id) {
  window.location.hash = 'page-' + id
  toggleMenuState()
  document.getElementById(id).classList.toggle('display-none')
}

// Quiz
function Yes(q) {
  if (typeof q === 'undefined') throw Error("Missing parameter 'q'")
  this.ability = q
  this.answer = true
}
function No(q) {
  if (typeof q === 'undefined') throw Error("Missing parameter 'q'")
  this.ability = q
  this.answer = false
}

const QUESTIONS = [
  new Yes('Vigilance'),
  new Yes('Deathtouch'),
  new Yes('Haste'),
  new Yes('Questing Beast can’t be blocked by creatures with power 2 or less.'),
  new Yes(
    'Combat damage that would be dealt by creatures you control can’t be prevented.'
  ),
  new Yes(
    'Whenever Questing Beast deals combat damage to an opponent, it deals that much damage to target planeswalker that player controls.'
  ),
  new No('Other creatures you control have deathtouch.'),
  new No(
    'Whenever Questing Beast deals combat damage to an opponent, destroy target enchantment or artifact that player controls.'
  ),
  new No('Questing Beast can’t be blocked by creatures with power 3 or more.'),
  new No('Trample'),
  new No('Trample over Planeswalkers'),
  new No('Planeswalker deathtouch'),
  new No('Whenever this creature is dealt damage, put a +1/+1 counter on it.'),
  new No(
    'Whenever a creature you control becomes tapped, you may put a quest counter on Questing Beast.'
  ),
  new No(
    'G: Questing Beast gets +1/+1 until end of turn. Target opponent creates a 1/1 green Beast creature token.'
  ),
  new No('Green spells you control can’t be countered.'),
  new No(
    '4GG: Until end of turn, each creature you control has base power and toughness 5/5 and becomes a Beast in addition to its other creature types.'
  ),
]

const ANSWERED = []

function nextQuestion() {
  const quiz = document.getElementById('quiz')
  if (!quiz) return

  const resultElement = document.getElementById('result')
  resultElement.classList.add('display-none')

  if (ANSWERED.length === QUESTIONS.length) {
    const summary = document.getElementById('summary')
    summary.classList.remove('display-none')
    quiz.replaceChildren(summary)
    showQuizSummary()
    return
  }

  const answersElement = document.getElementById('answers')
  answersElement.classList.remove('display-none')

  const questionTextElement = document.querySelector('#question > .text')
  const oldId = parseInt(questionTextElement.dataset.id)
  let newId = Math.floor(Math.random() * QUESTIONS.length)
  while (newId === oldId) {
    newId = Math.floor(Math.random() * QUESTIONS.length)
  }
  while (ANSWERED.find((e) => e.id === newId)) {
    newId = Math.floor(Math.random() * QUESTIONS.length)
  }
  const question = QUESTIONS[newId]
  questionTextElement.dataset.id = newId.toString()
  questionTextElement.innerText = question.ability
  if (THE_CODE.active === true) {
    const bg = question.answer ? 'bg-green' : 'bg-red'
    questionTextElement.insertAdjacentHTML(
      'beforeend',
      `<div id="hint" class="${bg}">${question.answer}</div>`
    )
  }
  document.querySelector('#question > .text').replaceWith(questionTextElement)
}

function giveAnswer(a) {
  if (typeof a !== 'boolean') throw Error('You know what you did.')
  const answersElement = document.getElementById('answers')
  const questionTextElement = document.querySelector('#question > .text')
  const id = parseInt(questionTextElement.dataset.id)
  const resultElement = document.getElementById('result')
  const resultTextElement = resultElement.querySelector('.text')
  const correct = QUESTIONS.at(id).answer === a

  document.getElementById('hint')?.classList.add('display-none')
  answersElement.classList.add('display-none')
  resultTextElement.innerText = correct
    ? 'You are correct!'
    : "Whoops, that's wrong!"
  resultTextElement.classList.remove('green', 'red')
  resultTextElement.classList.add(correct ? 'green' : 'red')
  ANSWERED.push({
    id: parseInt(questionTextElement.dataset.id),
    correct: correct,
  })
  document.getElementById('quiz-progress').classList.remove('display-none')
  document.getElementById('questions-left').innerText =
    ANSWERED.length.toString() + '/' + QUESTIONS.length.toString()
  resultElement.classList.remove('display-none')
}

function showQuizSummary() {
  document.getElementById('summary-progress').style.width = 'calc(0% - 1rem)'
  setTimeout(async () => {
    const correctTotal = ANSWERED.filter((e) => e.correct === true)
    const progress = (correctTotal.length / QUESTIONS.length).toFixed(2) * 100
    document.getElementById('summary-progress').style.width =
      'calc(' + progress + '% - 1rem)'
    const stepDelta = (3 / progress) * 1000
    const summaryLabel = document.getElementById('summary-label')
    summaryLabel.classList.remove('hidden')
    for (let i = 1; i - 1 < progress; i++) {
      document.getElementById('summary-percentage').innerText = i.toString()
      await sleep(stepDelta)
    }
    if (progress === 100) {
      document.getElementById('summary-bar').classList.add('winner')
      document
        .getElementById('seizure-warning')
        .classList.remove('display-none')
      const button = document.getElementById('retry-button')
      button.innerText = 'Toggle Party!'
      button.onclick = () => {
        document.querySelector('html').classList.toggle('party')
      }
    } else {
      document.getElementById('summary-bar').classList.remove('winner')
    }
  }, 100)
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
