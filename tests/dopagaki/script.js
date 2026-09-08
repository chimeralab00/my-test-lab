// 設問データ（質問文と選択肢ごとのスコア）
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

// 質問の描画
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

// 回答処理・画面遷移
function handleAnswer(score) {
  totalScore += score;
  currentIndex++;

  if (currentIndex < questions.length) {
    renderQuestion();
  } else {
    // 診断結果をブラウザのLocalStorageに保存（将来のマイページ連携用）
    const resultSummary = {
      testId: "dopagaki",
      testTitle: "ドパガキ度診断",
      score: totalScore,
      completedAt: new Date().toISOString()
    };
    localStorage.setItem("result_dopagaki", JSON.stringify(resultSummary));

    // 結果ページへ遷移（まずはテスト用にresult-a.htmlへ飛ばします）
    window.location.href = "result-a.html";
  }
}

// 初回実行
renderQuestion();
