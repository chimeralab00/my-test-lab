// 1. 設問データ（全7問 / 1問あたり0〜3点 / 最大21点）
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
  },
  {
    text: "ご飯を食べているときの過ごし方は？",
    options: [
      { label: "必ず動画や配信、SNSを見ながら食べる", score: 3 },
      { label: "たまにスマホを見ながら食べる", score: 1 },
      { label: "食事や会話に集中してスマホは見ない", score: 0 }
    ]
  },
  {
    text: "長文の記事や本を読むときの集中力は？",
    options: [
      { label: "数行読んだだけで飽きて別のアプリを開く", score: 3 },
      { label: "斜め読みなら最後まで目を通せる", score: 1 },
      { label: "まとまった時間を取ってじっくり読める", score: 0 }
    ]
  },
  {
    text: "スマホの通知が鳴っていないのに「鳴った」と感じることは？",
    options: [
      { label: "頻繁にある（幻聴・幻振動を感じる）", score: 3 },
      { label: "ごくたまにある", score: 1 },
      { label: "まったくない", score: 0 }
    ]
  },
  {
    text: "夜、布団に入ってから眠りにつくまでの行動は？",
    options: [
      { label: "眠気が限界に来るまで画面をスクロールし続ける", score: 3 },
      { label: "少しスマホを見てから置く", score: 1 },
      { label: "スマホを手の届かない場所に置いてすぐ寝る", score: 0 }
    ]
  }
];

let currentIndex = 0;
let totalScore = 0;

const questionEl = document.getElementById("question-text");
const optionsEl = document.getElementById("options-container");
const progressEl = document.getElementById("progress");

// 2. 質問の描画
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
      btn.blur(); // フォーカスを解除して次の設問への青色引き継ぎを防止
      handleAnswer(opt.score);
    });
    optionsEl.appendChild(btn);
  });
}

// 3. 回答処理・スコア判定
function handleAnswer(score) {
  totalScore += score;
  currentIndex++;

  if (currentIndex < questions.length) {
    renderQuestion();
  } else {
    // 7問・最大21点満点でのスコア分岐
    let resultType = "C";
    let targetPage = "result-c.html";

    if (totalScore >= 15) {
      // 15点以上：重度（刺激中毒タイプ）
      resultType = "A";
      targetPage = "result-a.html";
    } else if (totalScore >= 7) {
      // 7〜14点：中程度（現代人標準・予備軍）
      resultType = "B";
      targetPage = "result-b.html";
    }
    // 6点以下はデフォルトのC（脳内クリーン健全タイプ）

    // 診断結果をLocalStorageに保存
    const resultSummary = {
      testId: "dopagaki",
      testTitle: "ドパガキ度診断",
      score: totalScore,
      maxScore: 21,
      resultType: resultType,
      completedAt: new Date().toISOString()
    };
    localStorage.setItem("result_dopagaki", JSON.stringify(resultSummary));

    // 結果ページへ遷移
    window.location.href = targetPage;
  }
}

// 初回実行
renderQuestion();
