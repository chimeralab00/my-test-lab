// 全7問の設問データ
// スコア: 高いほどドパガキ度が高い (2点 / 1点 / 0点)
const questions = [
  {
    text: "朝起きて最初にすることは？",
    options: [
      { label: "スマホを開いてSNSやショート動画を見る", score: 2 },
      { label: "アラームを止めて一度二度寝する", score: 1 },
      { label: "カーテンを開けて日光を浴びる", score: 0 }
    ]
  },
  {
    text: "動画を見るとき、よくやる行動は？",
    options: [
      { label: "1.5倍速以上、または10秒スキップを連打する", score: 2 },
      { label: "気になる部分だけ飛ばし見する", score: 1 },
      { label: "等倍で最初から最後までじっくり見る", score: 0 }
    ]
  },
  {
    text: "電車や信号待ちなど、数分のスキマ時間があると？",
    options: [
      { label: "無意識にポケットからスマホを取り出している", score: 2 },
      { label: "通知があれば確認する程度", score: 1 },
      { label: "ぼーっと外の景色や人間観察をする", score: 0 }
    ]
  },
  {
    text: "食事中の過ごし方は？",
    options: [
      { label: "片手にスマホを持ち、画面を見ながら食べる", score: 2 },
      { label: "テレビや動画を流し見しながら食べる", score: 1 },
      { label: "食事そのものの味や会話に集中して食べる", score: 0 }
    ]
  },
  {
    text: "「やるべき作業」があるのに、別のことを始めてしまう頻度は？",
    options: [
      { label: "日常茶飯事。気づけば1〜2時間溶けている", score: 2 },
      { label: "たまに脱線するが、締め切り前には戻れる", score: 1 },
      { label: "計画通りに集中して一気に終わらせる", score: 0 }
    ]
  },
  {
    text: "何もすることがない「完全な暇」な時間ができたら？",
    options: [
      { label: "強烈なソワソワ感や不安を感じ、すぐに刺激を探す", score: 2 },
      { label: "少し退屈だが、ゴロゴロ休むことができる", score: 1 },
      { label: "思考を整理したり、リラックスして過ごせる", score: 0 }
    ]
  },
  {
    text: "夜、ベッドに入ってから眠るまでの過ごし方は？",
    options: [
      { label: "眠気限界までスマホを握りしめて画面を見ている", score: 2 },
      { label: "少しアラーム設定や連絡返信をしてから置く", score: 1 },
      { label: "スマホは遠くに置き、すぐに目を閉じて眠る", score: 0 }
    ]
  }
];

let currentIndex = 0;
let totalScore = 0;

const questionEl = document.getElementById("question-text");
const optionsEl = document.getElementById("options-container");
const progressEl = document.getElementById("progress");

const introView = document.getElementById("intro-view");
const quizView = document.getElementById("quiz-view");
const startBtn = document.getElementById("start-btn");

function renderQuestion() {
  const current = questions[currentIndex];
  progressEl.textContent = `質問 ${currentIndex + 1} / ${questions.length}`;
  questionEl.textContent = current.text;
  optionsEl.innerHTML = "";

  current.options.forEach(opt => {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.textContent = opt.label;
    btn.addEventListener("click", () => {
      btn.blur();
      handleAnswer(opt.score);
    });
    optionsEl.appendChild(btn);
  });
}

function handleAnswer(score) {
  totalScore += score;
  currentIndex++;

  if (currentIndex < questions.length) {
    renderQuestion();
  } else {
    // スコア判定 (最大14点)
    // 10点以上: 重度 (A)
    // 5〜9点: 中程度 (B)
    // 4点以下: 健全 (C)
    let resultType = "c";
    let resultName = "脳内クリーン健全タイプ";

    if (totalScore >= 10) {
      resultType = "a";
      resultName = "重度のドパガキタイプ";
    } else if (totalScore >= 5) {
      resultType = "b";
      resultName = "そこそこドパガキタイプ";
    }

    // localStorage保存（マイページ機能対応）
    const resultData = {
      testId: "dopagaki",
      testTitle: "ドパガキ度診断",
      resultType: resultType.toUpperCase(),
      resultName: resultName,
      score: totalScore,
      maxScore: 14,
      completedAt: new Date().toISOString()
    };
    localStorage.setItem("result_dopagaki", JSON.stringify(resultData));

    // 結果ページへリダイレクト
    window.location.href = `result-${resultType}.html`;
  }
}

// 診断開始ボタンのイベント登録
if (startBtn && introView && quizView) {
  startBtn.addEventListener("click", () => {
    introView.style.display = "none";
    quizView.style.display = "block";
    renderQuestion();
  });
} else {
  // 説明画面がない場合の後方互換
  renderQuestion();
}

// --- 診断開始ボタンの制御 ---
if (startBtn && introView && quizView) {
  startBtn.addEventListener("click", () => {
    shuffleArray(questions); // ★ ここで設問順をランダムにシャッフル！
    introView.style.display = "none";
    quizView.style.display = "block";
    renderQuestion();
  });
} else {
  // 説明画面がない場合の後方互換
  shuffleArray(questions);
  renderQuestion();
}
