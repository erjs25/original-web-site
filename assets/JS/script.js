document.addEventListener("DOMContentLoaded", function () {
  // すべての .cell を取得
  const cells = document.querySelectorAll(".cell");

  cells.forEach((cell) => {
    const sliderContainer = cell.querySelector(".slider-container");
    if (!sliderContainer) return; // slider-container がない場合はスキップ

    const imageContainer = sliderContainer.querySelector(".image-container");
    const images = imageContainer.querySelectorAll("img");
    const navContainer = sliderContainer.querySelector(".nav-container");
    const totalImages = images.length;
    let imageIndex = 0;
    let interval;

    // 画像の数だけナビゲーションボタンを作成
    for (let i = 0; i < totalImages; i++) {
      const button = document.createElement("button");
      button.classList.add("nav-btn");
      navContainer.appendChild(button);
    }

    // ボタン取得
    const buttons = sliderContainer.querySelectorAll(".nav-btn");

    // ボタンにクリックイベント追加
    buttons.forEach((button, index) => {
      button.addEventListener("click", () => {
        imageIndex = index;
        updateSlider();
        resetInterval();
      });
    });

    // スライダー更新
    function updateSlider() {
      images.forEach((img) => img.classList.remove("active"));
      buttons.forEach((btn) => btn.classList.remove("active"));
      images[imageIndex].classList.add("active");
      buttons[imageIndex].classList.add("active");
    }

    // 次の画像へ切り替え
    function nextImage() {
      imageIndex = (imageIndex + 1) % totalImages;
      updateSlider();
    }

    // 自動再生開始
    function autoPlay() {
      interval = setInterval(nextImage, 3000);
    }

    // 自動再生リセット
    function resetInterval() {
      clearInterval(interval);
      autoPlay();
    }

    // 初期化
    updateSlider();
    autoPlay();
  });
});

// jQuery スライダー設定
$(function () {
  $(".slider").slick({
    autoplay: true,
    dots: true,
  });
});

// Naver マップリンクのクリックイベント
document.querySelectorAll(".naver-map-link").forEach((img) => {
  img.addEventListener("click", function () {
    let locationUrl = this.getAttribute("data-location");
    window.open(locationUrl, "_blank");
  });
});

// スムーズスクロール処理
document.addEventListener("DOMContentLoaded", function () {
  const images = document.querySelectorAll(".slick-img img");

  images.forEach((img) => {
    img.addEventListener("click", function () {
      const targetId = this.getAttribute("data-target");
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const footer = document.querySelector(".footer");
  const headerButton = document.querySelector(".header-button");
  const section7 = document.querySelector("#section7");

  if (!footer || !headerButton || !section7) {
    console.warn("フッター、ヘッダーボタン、またはセクション7が見つかりません");
    return;
  }

  // 初期状態で非表示
  footer.style.opacity = "0";
  footer.style.pointerEvents = "none";
  headerButton.style.opacity = "0";
  headerButton.style.pointerEvents = "none";

  document.addEventListener("scroll", function () {
    const sectionTop = section7.getBoundingClientRect().top;
    const sectionBottom = section7.getBoundingClientRect().bottom;
    const windowHeight = window.innerHeight;

    console.log("セクション7の位置:", sectionTop, "ウィンドウ高さ:", windowHeight);

    if (sectionTop < windowHeight / 2 && sectionBottom > windowHeight / 2) {
      // セクション7が画面の中央付近にあるとき表示
      footer.style.opacity = "1";
      footer.style.pointerEvents = "auto";

      headerButton.style.opacity = "1";
      headerButton.style.pointerEvents = "auto";
    } else {
      // 画面外に出たら非表示
      footer.style.opacity = "0";
      footer.style.pointerEvents = "none";

      headerButton.style.opacity = "0";
      headerButton.style.pointerEvents = "none";
    }
  });
});
