document.addEventListener("DOMContentLoaded", () => {
  const card = document.getElementById("quiz-card");
  if (!card) return;

  // 1. 診断画面（設問回答中）の共通ヘッダー：トップへ戻るボタンを先頭に挿入
  const navHeader = document.getElementById("test-nav-header");
  if (navHeader) {
    navHeader.innerHTML = `
      <div style="margin-bottom: 12px;">
        <a href="../../" style="color: #94a3b8; font-size: 0.85rem; text-decoration: none; display: inline-flex; align-items: center; gap: 4px;">
          ← トップへ戻る
        </a>
      </div>
    `;
  }

  // 2. 結果画面の共通フッター：もう一度診断する ＆ 他の診断を見る リンクを生成
  const resultFooter = document.getElementById("test-result-footer");
  if (resultFooter) {
    resultFooter.innerHTML = `
      <div class="nav-links-row">
        <a href="index.html" class="sub-link">もう一度診断する</a>
        <span style="color: #cbd5e1;">|</span>
        <a href="../../" class="main-link">他の診断を見る（トップへ）</a>
      </div>
    `;
  }

  // 3. XシェアボタンのURL自動バインド
  const shareBtn = document.getElementById("share-btn");
  if (shareBtn) {
    const rawShareText = shareBtn.getAttribute("data-share-text") || "診断結果をチェック！";
    const currentUrl = encodeURIComponent(window.location.href);
    const shareText = encodeURIComponent(`${rawShareText}\n`);
    shareBtn.href = `https://twitter.com/intent/tweet?text=${shareText}&url=${currentUrl}`;
  }
});
