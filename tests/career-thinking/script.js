// 全10問の設問データ
// A: 論理・戦略型（軍師）
// B: 直感・創発型（クリエイター）
// C: 推進・実行型（突破役）
// D: 共感・協調型（調和役）
const questions = [
  {
    text: "新しいプロジェクトを始めるとき、最初に行うことは？",
    options: [
      { label: "目的・KPI・全体のロードマップを緻密に組む", type: "A" },
      { label: "面白そうなアイデアをブレストし、全体像を自由に描く", type: "B" },
      { label: "まず手をつけてみて、走りながら課題を潰していく", type: "C" },
      { label: "メンバーの強みや懸念点を確認し、役割分担を整える", type: "D" }
    ]
  },
  {
    text: "仕事で最もモチベーションが上がる瞬間は？",
    options: [
      { label: "仮説通りのデータや成果が出て、仕組みが機能したとき", type: "A" },
      { label: "前例のないユニークな企画やアイデアを生み出したとき", type: "B" },
      { label: "目の前の困難なタスクを圧倒的なスピードで達成したとき", type: "C" },
      { label: "チーム全員がまとまり、感謝や達成感を共有できたとき", type: "D" }
    ]
  },
  {
    text: "意見の対立が発生したときのあなたのスタンスは？",
    options: [
      { label: "感情を切り離し、客観的な事実と数字に基づいて判断する", type: "A" },
      { label: "どちらの枠にも収まらない、第3の新しい切り口を提案する", type: "B" },
      { label: "議論を長引かせず、どちらが早く前進できるかで決める", type: "C" },
      { label: "双方の言い分や感情を丁寧に聞き、妥協点を探る", type: "D" }
    ]
  },
  {
    text: "日々のタスク管理で好むやり方は？",
    options: [
      { label: "優先度と依存関係を整理した論理的なタスクリスト", type: "A" },
      { label: "柔軟に順序を変えられる、余白を持たせたスケジュール", type: "B" },
      { label: "今日終わらせるべき重要事項に絞り込み、一気に片付ける", type: "C" },
      { label: "チームの進行状況に合わせ、助け合いながら進める", type: "D" }
    ]
  },
  {
    text: "周囲からよく言われる評価や印象は？",
    options: [
      { label: "「冷静で分析力が高い」「本質を捉えている」", type: "A" },
      { label: "「発想が自由で面白い」「独自の視点がある」", type: "B" },
      { label: "「行動力が抜群」「頼れる切り込み隊長」", type: "C" },
      { label: "「聞き上手で安心する」「空気を読むのがうまい」", type: "D" }
    ]
  },
  {
    text: "作業環境として最もストレスを感じるのは？",
    options: [
      { label: "筋の通らない指示や、根拠のないルールに縛られること", type: "A" },
      { label: "変化がなく、決まりきったルーティンワークばかりなこと", type: "B" },
      { label: "会議や承認待ちが多く、なかなか実際の行動に移せないこと", type: "C" },
      { label: "ギスギスした人間関係や、孤立して相談できない環境", type: "D" }
    ]
  },
  {
    text: "予想外のアクシデントが起きたときの行動は？",
    options: [
      { label: "根本原因を特定し、再発防止のフローを組み立てる", type: "A" },
      { label: "ピンチをチャンスに変える意外な抜け道をひらめく", type: "B" },
      { label: "頭を悩ませる前に、できる応急処置を即座に実行する", type: "C" },
      { label: "慌てている周囲を落ち着かせ、安心感を取り戻す", type: "D" }
    ]
  },
  {
    text: "休日の趣味や自由時間の過ごし方に近いものは？",
    options: [
      { label: "戦略ゲーム、調べ物、知識を深める読書や研究", type: "A" },
      { label: "創作活動、アート鑑賞、新しい体験や未知のスポット巡り", type: "B" },
      { label: "スポーツ、DIY、ドライブなど体を動かして成果を出すこと", type: "C" },
      { label: "気心の知れた友人との会話、まったりリラックスする時間", type: "D" }
    ]
  },
  {
    text: "人に何かを説明・プレゼンするときの癖は？",
    options: [
      { label: "理由や根拠をロジカルに組み立てて順序立てて話す", type: "A" },
      { label: "比喩やイメージを使って、ビジョンやワクワク感を伝える", type: "B" },
      { label: "要点だけを短く伝え、「次何をすべきか」を明確にする", type: "C" },
      { label: "聞き手の表情や反応を見ながら、共感を得られる言葉を選ぶ", type: "D" }
    ]
  },
  {
    text: "あなたが最も発揮したい「バリュー（価値）」は？",
    options: [
      { label: "再現性のある仕組みや戦略を築き、全体の成功率を上げること", type: "A" },
      { label: "これまでにない新しいコンセプトや価値を生み出すこと", type: "B" },
      { label: "圧倒的な実行スピードで成果を叩き出し、前線を押し上げること", type: "C" },
      { label: "人と人を繋ぎ、誰もが働きやすい強固な組織をつくること", type: "D" }
    ]
  }
];

let currentIndex = 0;
const scores = { A: 0, B: 0, C: 0, D: 0 };

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
      A: "論理・戦略型（軍師タイプ）",
      B: "直感・創発型（クリエイタータイプ）",
      C: "推進・実行型（突破役タイプ）",
      D: "共感・協調型（調和役タイプ）"
    };

    // localStorage保存（マイページ機能対応）
    const resultData = {
      testId: "career-thinking",
      testTitle: "適職・思考特性診断",
      resultType: highestType,
      resultName: typeNames[highestType],
      scores: scores,
      completedAt: new Date().toISOString()
    };
    localStorage.setItem("result_career_thinking", JSON.stringify(resultData));

    // 結果ページへ遷移
    window.location.href = `result-${highestType.toLowerCase()}.html`;
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
