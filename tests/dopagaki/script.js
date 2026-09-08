// 1. 設問データ
const questions = [
  {
    text: "朝起きて最初にすることは？",
    options: [
      { label: "スマホを開いてSNSやショート動画を見る", score: 3 },
      { label: "アラームを止めて一度二度寝する", score: 1 },
      { label: "カーテンを開けて日光を浴びる", score: 0 }
    ]
  },
  {
    text: "動画を観るとき、再生速度はどうしている？",
    options: [
      { label: "常に1.5〜2倍速、またはスキップしまくる", score: 3 },
      { label: "たまに早送りする", score: 1 },
      { label: "通常速度のまま楽しむ", score: 0 }
    ]
  },
  {
    text: "少しでも待ち時間や退屈な時間があると？",
    options: [
      { label: "1秒も耐えられず無意識にスマホを手に取る", score: 3 },
      { label: "たまにスマホを見る", score: 1 },
      { label: "ぼーっと景色を眺めたり考え事をする", score: 0 }
    ]
  }
];

let currentIndex = 0;
let totalScore = 0;

const questionEl = document.getElementById("question-text");
const optionsEl = document.getElementById("options-container");
const progressEl = document.getElementById("progress");

// 2. 質問の描画関数
function renderQuestion() {
  const current = questions[currentIndex];
  progressEl.textContent = `質問 ${currentIndex + 1} / ${questions.length}`;
  questionEl.textContent = current.text;
  optionsEl.innerHTML = "";

  current.options.forEach(opt => {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.textContent = opt.label;
    btn.addEventListener("click", () => handleAnswer(opt.score));
    optionsEl.appendChild(btn);
  });
}

// 3. 回答処理・結果分岐
function handleAnswer(score) {
  totalScore += score;
  currentIndex++;

  if (currentIndex < questions.length) {
    renderQuestion();
  } else {
    let resultType = "C";
    let targetPage = "result-c.html";

    if (totalScore >= 7) {
      resultType = "A";
      targetPage = "result-a.html";
    } else if (totalScore >= 3) {
      resultType = "B";
      targetPage = "result-b.html";
    }

    const resultSummary = {
      testId: "dopagaki",
      testTitle: "ドパガキ度診断",
      score: totalScore,
      resultType: resultType,
      completedAt: new Date().toISOString()
    };
    localStorage.setItem("result_dopagaki", JSON.stringify(resultSummary));

    window.location.href = targetPage;
  }
}

// 4. 初回実行（これがないと「読み込み中...」のまま止まります）
renderQuestion();
