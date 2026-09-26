// 全7問の設問データ
// A: 安定・自律（フラット）
// B: 献身・共感（サポート）
// C: 情熱・直感（ロマンス）
// D: 慎重・観察（パーソナルスペース）
const questions = [
  {
    text: "理想とするパートナーとの関係性に最も近いものは？",
    options: [
      { label: "お互いに自立していて、親友のように何でも話せる対等な関係", type: "A" },
      { label: "いつも味方でいてくれて、お互いを深く思いやり支え合う関係", type: "B" },
      { label: "一緒にいると刺激的で、いつでもドキドキや楽しさを共有できる関係", type: "C" },
      { label: "無理に干渉しすぎず、それぞれの時間やペースを守れる穏やかな関係", type: "D" }
    ]
  },
  {
    text: "LINEやメッセージのやり取りで、一番心地よいペースは？",
    options: [
      { label: "用事や話したいことがあれば送る。返信の遅さは気にならない", type: "A" },
      { label: "日常の些細な出来事や体調の気遣いなど、こまめにやり取りしたい", type: "B" },
      { label: "テンポよくラリーが続いて、感情がストレートに伝わるやり取り", type: "C" },
      { label: "必要最低限の連絡が基本。ダラダラ続くよりたまにで十分", type: "D" }
    ]
  },
  {
    text: "休日のデートプランを決めるとき、あなたのスタイルは？",
    options: [
      { label: "お互いに行きたい場所をすり合わせ、ゆるく散策やカフェを楽しむ", type: "A" },
      { label: "相手が楽しめそうな場所や行きたがっていたスポットを優先する", type: "B" },
      { label: "話題のテーマパークや新しい体験など、テンションが上がる場所へ行く", type: "C" },
      { label: "静かで混雑していない場所や、落ち着いて過ごせる空間を選ぶ", type: "D" }
    ]
  },
  {
    text: "相手に対して「ちょっとモヤッ」としたとき、どう対応することが多い？",
    options: [
      { label: "感情的にならず、タイミングを見て冷静に「どう思う？」と話し合う", type: "A" },
      { label: "自分が我慢すれば丸く収まるなら、まずは相手の様子を伺う", type: "B" },
      { label: "態度や表情に出てしまうことが多く、早めに白黒ハッキリさせたい", type: "C" },
      { label: "一度一人になって頭を冷やし、本当に伝えるべきか吟味する", type: "D" }
    ]
  },
  {
    text: "相手から言われて一番グッとくる（嬉しい）言葉は？",
    options: [
      { label: "「あなたと話してると本当に落ち着くし、友達みたいに楽しい」", type: "A" },
      { label: "「いつも優しく気遣ってくれてありがとう。本当に助かってる」", type: "B" },
      { label: "「やっぱりあなたといる時が一番楽しいし、特別！」", type: "C" },
      { label: "「無理に合わせなくていいよ。あなたのペースで大丈夫」", type: "D" }
    ]
  },
  {
    text: "恋愛において、自分が「無意識に苦手だな」と感じるシチュエーションは？",
    options: [
      { label: "どちらか一方に依存されたり、束縛されること", type: "A" },
      { label: "感謝やリアクションが薄く、何を考えているか見えないこと", type: "B" },
      { label: "マンネリ化して、退屈やルーティンになってしまうこと", type: "C" },
      { label: "まだ親しくない段階で、プライベートに踏み込まれすぎること", type: "D" }
    ]
  },
  {
    text: "ふたりで過ごす時間で、最も大切にしたいことは？",
    options: [
      { label: "飾らない素の自分のままで、自然体で笑い合えること", type: "A" },
      { label: "お互いの悩みや嬉しかったことを優しく共有し合えること", type: "B" },
      { label: "ワクワクする思い出や、感情が大きく動く特別な体験を作ること", type: "C" },
      { label: "沈黙が流れても気まずくならず、お互いにリラックスできること", type: "D" }
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
    // 最多得点判定
    let highestType = "A";
    let maxScore = -1;

    for (const key of ["A", "B", "C", "D"]) {
      if (scores[key] > maxScore) {
        maxScore = scores[key];
        highestType = key;
      }
    }

    const typeNames = {
      A: "安定・自律型（フラットパートナー）",
      B: "献身・共感型（寄り添いサポーター）",
      C: "情熱・直感型（エモーショナルロマンチスト）",
      D: "慎重・観察型（パーソナルスペースガード）"
    };

    // localStorage保存（マイページ対応）
    const resultData = {
      testId: "love-style",
      testTitle: "恋愛コミュニケーション傾向診断",
      resultType: highestType,
      resultName: typeNames[highestType],
      scores: scores,
      completedAt: new Date().toISOString()
    };
    localStorage.setItem("result_love_style", JSON.stringify(resultData));

    // 結果ページへ遷移
    window.location.href = `result-${highestType.toLowerCase()}.html`;
  }
}

// 実行開始
renderQuestion();
