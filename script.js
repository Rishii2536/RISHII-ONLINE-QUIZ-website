// Quiz questions: edit this array to add or change questions.
const questions = [
  {
    question: "Which part of a computer is often called its brain?",
    options: ["Monitor", "CPU", "Keyboard", "Mouse"],
    answer: 1,
    explanation: "The CPU processes instructions and controls many computer operations."
  },
  {
    question: "Which of these is an input device?",
    options: ["Printer", "Speaker", "Keyboard", "Monitor"],
    answer: 2,
    explanation: "A keyboard lets users enter text and commands into a computer."
  },
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Trainer Marking Language",
      "HyperText Markup Language",
      "HighText Machine Language",
      "Hyper Transfer Main Link"
    ],
    answer: 1,
    explanation: "HTML means HyperText Markup Language and structures web pages."
  },
  {
    question: "Which of these is an operating system?",
    options: ["Windows", "Google Search", "HTML", "Bluetooth"],
    answer: 0,
    explanation: "Windows is an operating system that manages computer hardware and software."
  },
  {
    question: "Which device is commonly used to display computer output?",
    options: ["Microphone", "Scanner", "Monitor", "Joystick"],
    answer: 2,
    explanation: "A monitor displays visual output such as text, pictures and videos."
  },
  {
    question: "What does URL identify?",
    options: ["A website or resource address", "A computer's battery", "A type of keyboard", "A programming loop"],
    answer: 0,
    explanation: "A URL is the address used to locate a resource on the internet."
  },
  {
    question: "Which language is mainly used to style a web page?",
    options: ["CSS", "SQL", "C", "Bash"],
    answer: 0,
    explanation: "CSS controls presentation such as colors, spacing, fonts and layout."
  },
  {
    question: "Which of these is a web browser?",
    options: ["Microsoft Excel", "Google Chrome", "Windows Defender", "Notepad"],
    answer: 1,
    explanation: "Google Chrome is a browser used to open and interact with websites."
  },
  {
    question: "What is the main purpose of a strong password?",
    options: ["Make a screen brighter", "Protect access to an account", "Increase internet speed", "Clean computer storage"],
    answer: 1,
    explanation: "A strong, unique password helps prevent unauthorized account access."
  },
  {
    question: "Which file extension is commonly used for a JavaScript file?",
    options: [".css", ".html", ".js", ".jpg"],
    answer: 2,
    explanation: "JavaScript source files commonly use the .js extension."
  }
];

const startButton = document.getElementById("start-button");
const exitButton = document.getElementById("exit-button");
const nextButton = document.getElementById("next-button");
const restartButton = document.getElementById("restart-button");
const homeButton = document.getElementById("home-button");

const quizSection = document.getElementById("quiz-section");
const quizPanel = document.getElementById("quiz-panel");
const resultsPanel = document.getElementById("results-panel");
const questionCounter = document.getElementById("question-counter");
const progressFill = document.getElementById("progress-fill");
const questionText = document.getElementById("question-text");
const optionsList = document.getElementById("options-list");
const answerMessage = document.getElementById("answer-message");

let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;
let userAnswers = [];

function startQuiz() {
  currentQuestion = 0;
  score = 0;
  selectedAnswer = null;
  userAnswers = [];
  quizSection.classList.add("hidden");
  resultsPanel.classList.add("hidden");
  quizPanel.classList.remove("hidden");
  showQuestion();
  quizPanel.scrollIntoView({ behavior: "smooth", block: "start" });
}

function showQuestion() {
  selectedAnswer = null;
  const item = questions[currentQuestion];

  questionCounter.textContent = `QUESTION ${currentQuestion + 1} OF ${questions.length}`;
  progressFill.style.width = `${(currentQuestion / questions.length) * 100}%`;
  questionText.textContent = item.question;
  optionsList.innerHTML = "";
  answerMessage.className = "answer-message hidden";
  answerMessage.textContent = "";
  nextButton.disabled = true;
  nextButton.innerHTML = currentQuestion === questions.length - 1
    ? 'See results <span>→</span>'
    : 'Next question <span>→</span>';

  item.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.className = "option-button";
    button.type = "button";
    button.innerHTML = `<span class="option-letter">${String.fromCharCode(65 + index)}</span><span></span>`;
    button.lastElementChild.textContent = option;
    button.addEventListener("click", () => chooseAnswer(index));
    optionsList.appendChild(button);
  });
}

function chooseAnswer(index) {
  if (selectedAnswer !== null) return;

  selectedAnswer = index;
  const item = questions[currentQuestion];
  const optionButtons = optionsList.querySelectorAll(".option-button");
  const isCorrect = index === item.answer;

  userAnswers.push(index);
  if (isCorrect) score++;

  optionButtons.forEach((button, optionIndex) => {
    button.disabled = true;
    if (optionIndex === item.answer) button.classList.add("correct");
    if (optionIndex === index && !isCorrect) button.classList.add("wrong");
  });

  answerMessage.textContent = `${isCorrect ? "Correct!" : "Not quite."} ${item.explanation}`;
  answerMessage.className = `answer-message ${isCorrect ? "good" : "bad"}`;
  nextButton.disabled = false;
}

function goToNextQuestion() {
  if (selectedAnswer === null) return;

  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showResults();
  }
}

function showResults() {
  quizPanel.classList.add("hidden");
  resultsPanel.classList.remove("hidden");

  const percentage = Math.round((score / questions.length) * 100);
  document.getElementById("score-number").textContent = score;
  document.getElementById("score-percent").textContent = `${percentage}% correct`;
  document.getElementById("result-fill").style.width = `${percentage}%`;

  let title = "Good effort!";
  let description = "Keep practising and you'll improve with every attempt.";
  let icon = "💪";

  if (percentage >= 80) {
    title = "Excellent work!";
    description = "You have a strong grasp of these computer basics.";
    icon = "🏆";
  } else if (percentage >= 50) {
    title = "Nice progress!";
    description = "You're on your way. Review the explanations and try again.";
    icon = "⭐";
  }

  document.getElementById("result-title").textContent = title;
  document.getElementById("result-description").textContent = description;
  document.getElementById("result-icon").textContent = icon;

  const reviewList = document.getElementById("review-list");
  reviewList.innerHTML = "";

  questions.forEach((item, index) => {
    const correct = userAnswers[index] === item.answer;
    const reviewItem = document.createElement("div");
    reviewItem.className = "review-item";

    const heading = document.createElement("strong");
    heading.textContent = `${index + 1}. ${item.question}`;

    const answer = document.createElement("div");
    answer.className = "review-answer";
    answer.textContent = `Correct answer: ${item.options[item.answer]}`;

    const status = document.createElement("span");
    status.className = `review-status ${correct ? "good" : "bad"}`;
    status.textContent = correct ? "YOUR ANSWER WAS CORRECT" : "REVIEW THIS ANSWER";

    reviewItem.append(heading, answer, status);
    reviewList.appendChild(reviewItem);
  });

  resultsPanel.scrollIntoView({ behavior: "smooth", block: "start" });
}

function goHome() {
  quizPanel.classList.add("hidden");
  resultsPanel.classList.add("hidden");
  quizSection.classList.remove("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

startButton.addEventListener("click", startQuiz);
nextButton.addEventListener("click", goToNextQuestion);
restartButton.addEventListener("click", startQuiz);
exitButton.addEventListener("click", goHome);
homeButton.addEventListener("click", goHome);
