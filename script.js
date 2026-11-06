const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");

const questionContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const scoreContainerElement = document.getElementById("score");
const scoreElement = document.getElementById("right-answers");
const totalScoreContainerElement = document.getElementById("total-score-container");
const totalScoreElement = document.getElementById("total-score");

let shuffledQuestions, currentQuestionIndex;
let quizScore = 0;

startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
});

function startGame() {
  if (startButton.innerText === "أعد الاختبار") {
    quizScore = 0;
    currentQuestionIndex = 0;
  startButton.innerText = "ابدأ الاختبار";
    scoreContainerElement.style.display = "none";
    nextButton.classList.add("hide");
    totalScoreContainerElement.style.display = "none";
  }
  startButton.classList.add("hide");
  scoreContainerElement.style.display = "flex";
  scoreElement.innerText = quizScore;
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove("hide");
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerText = question.question;

  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");

    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }

    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add("hide");

  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;

  Array.from(answerButtonsElement.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
  });

  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hide");
  } else {
    startButton.innerText = "Restart";
    startButton.classList.remove("hide");
    questionContainerElement.classList.add("hide");
    totalScoreContainerElement.style.display = "flex";
    scoreContainerElement.style.display = "none";
  }

  if (correct) {
    quizScore++;
  }

  scoreElement.innerText = quizScore;
  totalScoreElement.innerText = `${quizScore}/${shuffledQuestions.length}`;
}

function setStatusClass(element, correct) {
  clearStatusClass(element);

  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}

function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}

const questions = [
{
  question: "ما هو الحاسوب؟",
  answers: [
    { text: "جهاز لمعالجة البيانات", correct: true },
    { text: "جهاز للطباعة فقط", correct: false },
    { text: "جهاز لتشغيل الألعاب فقط", correct: false },
    { text: "جهاز لحفظ الصور فقط", correct: false },
  ],
},
 {
  question: "ما هي المكونات الأساسية للحاسوب؟",
  answers: [
    { text: "المكونات المادية والبرمجية", correct: true },
    { text: "الشاشة فقط", correct: false },
    { text: "لوحة المفاتيح فقط", correct: false },
    { text: "الطابعة والفأرة فقط", correct: false },
  ],
},
 {
  question: "ما وظيفة وحدة المعالجة المركزية (CPU)؟",
  answers: [
    { text: "تنفيذ العمليات ومعالجة البيانات", correct: true },
    { text: "عرض الصور", correct: false },
    { text: "طباعة المستندات", correct: false },
    { text: "تشغيل الصوت فقط", correct: false },
  ],
},
 {
  question: "ما وظيفة ذاكرة RAM؟",
  answers: [
    { text: "تخزين البيانات مؤقتًا أثناء التشغيل", correct: true },
    { text: "حفظ الملفات بشكل دائم", correct: false },
    { text: "عرض الصور على الشاشة", correct: false },
    { text: "طباعة المستندات", correct: false },
  ],
},
{
  question: "ما وظيفة نظام التشغيل؟",
  answers: [
    { text: "إدارة موارد الحاسوب وتشغيل البرامج", correct: true },
    { text: "تصميم الصور فقط", correct: false },
    { text: "كتابة النصوص فقط", correct: false },
    { text: "تصفح الإنترنت فقط", correct: false },
  ],
},
];
