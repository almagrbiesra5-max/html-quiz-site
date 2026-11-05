
const questions = [
  {
    question: "ما المقصود بالواقع الافتراضي VR؟",
    answers: [
      "عالم رقمي افتراضي ثلاثي الأبعاد",
      "برنامج لكتابة النصوص",
      "شبكة للتواصل الاجتماعي",
      "جهاز للطباعة"
    ],
    correct: 0
  },
  {
    question: "ما المقصود بالواقع المعزز AR؟",
    answers: [
      "إلغاء العالم الحقيقي",
      "إضافة عناصر رقمية إلى العالم الحقيقي",
      "تشغيل الألعاب فقط",
      "تصفح الإنترنت"
    ],
    correct: 1
  },
  {
    question: "أي جهاز يُستخدم غالباً لتجربة الواقع الافتراضي؟",
    answers: [
      "الطابعة",
      "لوحة المفاتيح",
      "نظارة الواقع الافتراضي",
      "الماسح الضوئي"
    ],
    correct: 2
  },
  {
    question: "ما الفرق الأساسي بين VR و AR؟",
    answers: [
      "لا يوجد فرق",
      "VR ينشئ عالماً افتراضياً وAR يضيف عناصر للعالم الحقيقي",
      "كلاهما للطباعة",
      "AR يمنع استخدام الكاميرا"
    ],
    correct: 1
  },
  {
    question: "أين يمكن استخدام الواقع الافتراضي؟",
    answers: [
      "التعليم والتدريب",
      "الطب",
      "الألعاب",
      "جميع ما سبق"
    ],
    correct: 3
  },
  {
    question: "أي تقنية تسمح برؤية مجسم رقمي داخل الغرفة الحقيقية؟",
    answers: [
      "الواقع المعزز AR",
      "معالج النصوص",
      "البريد الإلكتروني",
      "نظام التشغيل"
    ],
    correct: 0
  },
  {
    question: "ما إحدى فوائد الواقع الافتراضي في التعليم؟",
    answers: [
      "منع التعلم",
      "تجربة بيئات تعليمية افتراضية",
      "إيقاف الأجهزة",
      "حذف المعلومات"
    ],
    correct: 1
  },
  {
    question: "ما دور الكاميرا في بعض تطبيقات الواقع المعزز؟",
    answers: [
      "عرض النصوص فقط",
      "التقاط العالم الحقيقي لإضافة عناصر رقمية إليه",
      "إيقاف الإنترنت",
      "تشغيل الطابعة"
    ],
    correct: 1
  },
  {
    question: "ماذا تعني كلمة VR؟",
    answers: [
      "Virtual Reality",
      "Visual Radio",
      "Video Record",
      "Virtual Reading"
    ],
    correct: 0
  },
  {
    question: "ماذا تعني كلمة AR؟",
    answers: [
      "Automatic Reading",
      "Augmented Reality",
      "Audio Record",
      "Advanced Radio"
    ],
    correct: 1
  }
];

const info = {
  vr: {
    emoji: "🥽",
    tag: "VIRTUAL REALITY",
    title: "الواقع الافتراضي VR",
    description: "الواقع الافتراضي هو تقنية تنشئ بيئة رقمية ثلاثية الأبعاد، تسمح للمستخدم بالانغماس داخل عالم افتراضي والتفاعل معه باستخدام أجهزة مثل نظارات الواقع الافتراضي.",
    uses: ["🎮 الألعاب", "🎓 التعليم", "🏥 التدريب الطبي", "🏗️ الهندسة"]
  },
  ar: {
    emoji: "🌍",
    tag: "AUGMENTED REALITY",
    title: "الواقع المعزز AR",
    description: "الواقع المعزز هو تقنية تضيف عناصر رقمية مثل الصور والمجسمات والمعلومات إلى العالم الحقيقي، ويمكن مشاهدتها من خلال الهاتف أو الأجهزة الذكية.",
    uses: ["📱 تطبيقات الهواتف", "🛍️ التسوق", "🎓 التعليم", "🏛️ المتاحف"]
  }
};

let currentQuestion = 0;
let score = 0;
let answered = false;

function showScreen(id) {
  document.querySelectorAll(".screen").forEach(screen => {
    screen.classList.remove("active");
  });

  document.getElementById(id).classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function goHome() {
  showScreen("home");
}

function showInfo(type) {
  const data = info[type];

  document.getElementById("infoEmoji").textContent = data.emoji;
  document.getElementById("infoTag").textContent = data.tag;
  document.getElementById("infoTitle").textContent = data.title;
  document.getElementById("infoDescription").textContent = data.description;

  const uses = document.getElementById("infoUses");
  uses.innerHTML = "";

  data.uses.forEach(item => {
    const span = document.createElement("span");
    span.textContent = item;
    uses.appendChild(span);
  });

  showScreen("info");
}

function startQuiz() {
  currentQuestion = 0;
  score = 0;
  showScreen("quiz");
  showQuestion();
}

function showQuestion() {
  answered = false;

  const q = questions[currentQuestion];

  document.getElementById("questionNumber").textContent =
    `السؤال ${currentQuestion + 1} من ${questions.length}`;

  document.getElementById("scoreLabel").textContent =
    `⭐ ${score} نقطة`;

  document.getElementById("progressBar").style.width =
    `${(currentQuestion / questions.length) * 100}%`;

  document.getElementById("questionText").textContent = q.question;
  document.getElementById("feedback").textContent = "";

  document.getElementById("nextBtn").classList.add("hidden");

  const answersBox = document.getElementById("answers");
  answersBox.innerHTML = "";

  q.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.className = "answer-btn";
    button.textContent = answer;

    button.addEventListener("click", () => selectAnswer(index));

    answersBox.appendChild(button);
  });
}

function selectAnswer(selectedIndex) {
  if (answered) return;

  answered = true;

  const q = questions[currentQuestion];
  const buttons = document.querySelectorAll(".answer-btn");
  const feedback = document.getElementById("feedback");

  buttons.forEach((button, index) => {
    button.disabled = true;

    if (index === q.correct) {
      button.classList.add("correct");
    }
  });

  if (selectedIndex === q.correct) {
    score++;
    feedback.textContent = "🎉 إجابة صحيحة! أحسنتِ يا مبدعة.";
    feedback.style.color = "#9bffd0";
  } else {
    buttons[selectedIndex].classList.add("wrong");
    feedback.textContent = "💗 إجابة غير صحيحة، حاولي في السؤال القادم.";
    feedback.style.color = "#ffc1df";
  }

  document.getElementById("scoreLabel").textContent =
    `⭐ ${score} نقطة`;

  document.getElementById("nextBtn").classList.remove("hidden");
}

function nextQuestion() {
  currentQuestion++;

  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  showScreen("result");

  document.getElementById("progressBar").style.width = "100%";
  document.getElementById("finalScore").textContent = score;

  let message;
  let description;

  if (score === 10) {
    message = "يا لها من نتيجة مذهلة! 👑";
    description = "أنتِ نجمة كوكب التكنولوجيا، أجبتِ عن جميع الأسئلة!";
  } else if (score >= 7) {
    message = "رائعة يا مستكشفة! 💎";
    description = "لديك معرفة ممتازة بعالم الواقع الافتراضي والمعزز.";
  } else if (score >= 5) {
    message = "أحسنتِ! 🌸";
    description = "أنتِ في الطريق الصحيح، واصلي اكتشاف هذا العالم.";
  } else {
    message = "لا تستسلمي يا بطلة! 💗";
    description = "راجعي المعلومات وحاولي مرة أخرى، فالمعرفة مغامرة.";
  }

  document.getElementById("resultMessage").textContent = message;
  document.getElementById("resultDescription").textContent = description;
}

function restartQuiz() {
  startQuiz();
}
