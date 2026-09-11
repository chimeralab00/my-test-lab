// 全10問の設問データ
// type: 'A'(論理・戦略), 'B'(直感・創発), 'C'(推進・実行), 'D'(共感・協調)
const questions = [
  {
    text: "新しいプロジェクトを任されたとき、最初に取り掛かることは？",
    options: [
      { label: "全体の構造や前提条件を整理・リサーチする", type: "A" },
      { label: "枠にとらわれない新しいアイデアをブレストする", type: "B" },
      { label: "まずは手を動かしてプロトタイプや骨子を作る", type: "C" },
      { label: "関わるメンバーの状況や役割分担を確認する", type: "D" }
    ]
  },
  {
    text: "仕事や作業で一番モチベーションが上がる瞬間は？",
    options: [
      { label: "複雑な問題の原因をロジカルに解明したとき", type: "A" },
      { label: "誰も思いつかなかったユニークな企画が生まれたとき", type: "B" },
      { label: "目標を前倒しで達成したり、形ある成果物が出たとき", type: "C" },
      { label: "チーム全員が納得し、感謝されたとき", type: "D" }
    ]
  },
  {
    text: "議論が紛糾したとき、あなたが自然にとる立ち回りは？",
    options: [
      { label: "データや前提定義に立ち返り、論点を整理する", type: "A" },
      { label: "まったく別角度からのブレイクスルー案を投げる", type: "B" },
      { label: "「とりあえずやってみて決めよう」と前進させる", type: "C" },
      { label: "双方の言い分を傾聴し、折衷案を探る", type: "D" }
    ]
  },
  {
    text: "休日に旅行の計画を立てるなら？",
    options: [
      { label: "移動ルートや費用対効果を徹底的に比較検討する", type: "A" },
      { label: "直感で面白そうなマイナースポットを散策する", type: "B" },
      { label: "行きたい主要スポットを決めたら即座に予約して出発する", type: "C" },
      { label: "一緒に行く人が全員楽しめるプランを一緒に練る", type: "D" }
    ]
  },
  {
    text: "人から評価されたとき、一番嬉しい褒め言葉は？",
    options: [
      { label: "「分析が的確で説得力があるね」", type: "A" },
      { label: "「着眼点が尖っていて面白い！」", type: "B" },
      { label: "「仕事が速くて本当に頼りになる」", type: "C" },
      { label: "「あなたがいるとチームの安心感が違う」", type: "D" }
    ]
  },
  {
    text: "作業を進める中で一番ストレスを感じる状況は？",
    options: [
      { label: "根拠や整合性のない決定に従わされること", type: "A" },
      { label: "定型ルールやマニュアルにガチガチに縛られること", type: "B" },
      { label: "議論ばかり長引いて一向に行動に移らないこと", type: "C" },
      { label: "ギスギスした雰囲気や対立が放置されていること", type: "D" }
    ]
  },
  {
    text: "本や記事を読むとき、惹かれやすいテーマは？",
    options: [
      { label: "仕組みの解説、科学、歴史、ロジック本", type: "A" },
      { label: "アート、SF、思想、新奇なトレンド本", type: "B" },
      { label: "即実践できるハック、ビジネス成功事例、行動術", type: "C" },
      { label: "人間ドラマ、心理学、エッセイ、対人関係の本", type: "D" }
    ]
  },
  {
    text: "トラブルが発生したとき、真っ先に頭に浮かぶことは？",
    options: [
      { label: "「なぜ起きたのか？根本原因を特定しよう」", type: "A" },
      { label: "「ピンチを逆手にとって面白い展開にできないか？」", type: "B" },
      { label: "「今すぐ被害を食い止めるために何をすべきか？」", type: "C" },
      { label: "「巻き込まれた人や周囲のフォローはどうなっているか？」", type: "D" }
    ]
  },
  {
    text: "自分の弱点を強いて挙げるなら？",
    options: [
      { label: "慎重になりすぎて分析に時間をかけすぎることがある", type: "A" },
      { label: "気分にムラがあり、ルーティン作業にすぐ飽きる", type: "B" },
      { label: "拙速になりすぎて細かい詰めを見落とすことがある", type: "C" },
      { label: "他人の顔色を窺いすぎて自分の主張を抑えがち", type: "D" }
    ]
  },
  {
    text: "理想とする働き方の環境は？",
    options: [
      { label: "静かで邪魔が入らず、じっくり思考を深められる環境", type: "A" },
      { label: "自由度が高く、実験や試行錯誤が歓迎される環境", type: "B" },
      { label: "テンポよく成果が評価され、スピード感のある環境", type: "C" },
      { label: "心理的安全性が高く、温かい仲間と支え合える環境", type: "D" }
    ]
  }
];

let currentIndex = 0;
const scores = { A: 0, B: 0, C: 0, D: 0 };

const questionEl = document.getElementById("question-text");
const optionsEl = document.getElementById("options-container");
const progressEl = document.getElementById("progress");

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
      handleAnswer(opt.type);
    });
    optionsEl.appendChild(btn);
  });
}

function handleAnswer(type) {
  scores[type]++;
  currentIndex++;

  if (currentIndex < questions.length) {
    renderQuestion();
  } else {
    // 最多得点タイプを判定
    let highestType = "A";
    let maxScore = -1;

    for (const key of ["A", "B", "C", "D"]) {
      if (scores[key] > maxScore) {
        maxScore = scores[key];
        highestType = key;
      }
    }

    const typeNames = {
      A: "論理・戦略型（軍師タイプ）",
      B: "直感・創発型（クリエイタータイプ）",
      C: "推進・実行型（突破役タイプ）",
      D: "共感・協調型（調和役タイプ）"
    };

    // 結果の保存（マイページ対応）
    const resultData = {
      testId: "career-thinking",
      testTitle: "適職・思考特性診断",
      resultType: highestType,
      resultName: typeNames[highestType],
      scores: scores,
      completedAt: new Date().toISOString()
    };
    localStorage.setItem("result_career_thinking", JSON.stringify(resultData));

    // 結果ページへ遷移（result-a.html など）
    window.location.href = `result-${highestType.toLowerCase()}.html`;
  }
}

// 初回実行
renderQuestion();
