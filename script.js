// INTRO SCREEN CONTROL
window.addEventListener("DOMContentLoaded", () => {
  const intro = document.getElementById("intro-screen");
  const startBtn = document.getElementById("startBtn");
  const audio = document.getElementById("bgm");

  startBtn.addEventListener("click", async () => {
    intro.classList.add("hide");
    document.body.classList.remove("not-loaded"); // mulai animasi bunga

    // mainkan musik dengan fade-in
    try {
      audio.volume = 0;
      audio.muted = false;
      await audio.play();
      let v = 0;
      const fade = setInterval(() => {
        if (v < 0.7) {
          v += 0.05;
          audio.volume = v;
        } else clearInterval(fade);
      }, 200);
    } catch (e) {
      console.warn("Autoplay gagal:", e);
    }
  });
});

// Lepas .not-loaded agar animasi berjalan
window.addEventListener("DOMContentLoaded", () => {
  document.body.classList.remove("not-loaded");
});

/* ========== TYPEWRITER "Hi, Nandaaa" ========== */
(function () {
  const el = document.getElementById("typed");
  const text = "Hi, Nandaaa ♡✧˚";
  const speed = 70; // ms per karakter
  let i = 0;
  function type() {
    if (i <= text.length) {
      el.textContent = text.slice(0, i++);
      setTimeout(type, speed);
    } else {
      setTimeout(() => {
        el.style.borderRightColor = "transparent";
      }, 600);
    }
  }
  type();
})();

/* ========== ROTATOR KALIMAT MANIS (tidak terlalu pacar) ========== */
(function () {
  const target = document.getElementById("subtxt");
  const phrases = [
    "Biar malam ini membilas sisa letihmu, pelan-pelan.",
    "Tenang… satu per satu beratnya akan luruh juga.",
    "Tarik napas—lepaskan. Biarkan hati dibasuh, mulai lagi.",
    "Kamu tidak sendirian; ada hangat yang merawat cemasmu.",
    "Hening juga bentuk perawatan—diam pun bisa menyembuhkan.",
    "Kalau sulit, cukup pelan. Pelan juga tetap maju.",
    "Walau semua terasa berat, tenang....",
    "Ada aku disini.....",
  ];
  const stay = 4200; // tampil tiap frase
  const gap = 800; // jeda antar fade
  let idx = 0;

  function showNext() {
    const txt = phrases[idx % phrases.length];
    target.classList.remove("fade-out");
    target.textContent = txt;
    target.classList.add("fade-in");

    setTimeout(() => {
      target.classList.remove("fade-in");
      target.classList.add("fade-out");
      idx++;
      setTimeout(showNext, gap);
    }, stay);
  }
  const typingDuration = 1100 + "Hi, Nandaaa".length * 70;
  setTimeout(showNext, typingDuration);
})();

/* ========== AUTOPLAY MP3 LOKAL + FALLBACK ========== */
(function () {
  const audio = document.getElementById("bgm");
  const ctrl = document.getElementById("musicCtrl");
  const btn = document.getElementById("playBtn");

  // Coba autoplay saat load; jika diblokir, tampilkan tombol
  const tryAutoplay = async () => {
    try {
      audio.volume = 0.7;
      await audio.play();
      ctrl.hidden = true;
    } catch (err) {
      ctrl.hidden = false;
      console.warn(
        "Autoplay diblokir oleh browser. Gunakan tombol ▶ untuk memulai audio."
      );
    }
  };

  if (
    document.readyState === "complete" ||
    document.readyState === "interactive"
  ) {
    setTimeout(tryAutoplay, 150);
  } else {
    document.addEventListener("DOMContentLoaded", () =>
      setTimeout(tryAutoplay, 150)
    );
  }

  // Fallback: tombol play/pause
  btn.addEventListener("click", async () => {
    try {
      if (audio.paused) {
        await audio.play();
        btn.querySelector("span").textContent = "⏸";
      } else {
        audio.pause();
        btn.querySelector("span").textContent = "▶";
      }
    } catch (e) {
      alert(
        "Gagal memutar audio. Pastikan file MP3 berada di ./assets/membasuh.mp3"
      );
    }
  });
})();
