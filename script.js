// ==========================
// SLIDER LOGIC
// ==========================
const slides = document.querySelectorAll('.slide');
const slider = document.querySelector('.slider');
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');

let currentIndex = 0;
let puisiTimeouts = [];
let puisiSudahDimunculkan = false;

// Mapping animasi
const slideAnimations = [
  'bounceIn', 'fadeInRotate', 'slideUp', 'heartBeat', 'rocketLaunch',
  'photoFlash', 'zoomIn', 'crownShine', 'rainbowFade', 'spaceIn',
  'typewriter', 'glowPulse', 'micPop', 'envelopeDrop'
];

// Fungsi tampilkan slide
function showSlide(index) {
  if (slides.length === 0) return; // Antisipasi error
  index = Math.max(0, Math.min(index, slides.length - 1));

  slides.forEach(slide => {
    slide.classList.remove("active");
    const h1 = slide.querySelector('h1');
    if (h1) {
      h1.style.animation = 'none';
      void h1.offsetWidth; // Reset animasi
    }
  });

  slides[index].classList.add("active");
  currentIndex = index;

  const activeH1 = slides[index].querySelector('h1');
  if (activeH1 && slideAnimations[index]) {
    const duration = index < 5 ? '1s' : '1.5s';
    activeH1.style.animation = `${slideAnimations[index]} ${duration} ease-out forwards`;
  }

  // Efek puisi hanya di slide 15 (index 14)
  if (index === 14 && !puisiSudahDimunculkan) {
    ketikPuisi();
  } else if (index !== 14) {
    resetPuisi();
  }
}

// ==========================
// NAVIGATION
// ==========================
nextBtn?.addEventListener('click', () => showSlide(currentIndex + 1));
prevBtn?.addEventListener('click', () => showSlide(currentIndex - 1));

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') showSlide(currentIndex + 1);
  if (e.key === 'ArrowLeft') showSlide(currentIndex - 1);
});

// ==========================
// PUISI EFFECT
// ==========================
const puisiKata = [
  "Di", "hari", "ulang", "tahunmu,", "yang", "ke", "dua", "puluh,", 
  "aku", "tak", "membawa", "kado", "mewah,", 
  "hanya", "kata", "sederhana", "penuh", "makna,", 
  "dan", "harapan", "yang", "tulus", "dari", "hati,", 
  "agar", "hidupmu", "selalu", "penuh", "arti.", 
  ""
];

function ketikPuisi() {
  const target = document.getElementById("puisi-text");
  if (!target) return;

  target.innerHTML = "";
  puisiTimeouts.forEach(clearTimeout);
  puisiTimeouts = [];

  let delay = 0;
  puisiKata.forEach((kata) => {
    if (kata === "") {
      delay += 1000;
      return;
    }
    const timeoutId = setTimeout(() => {
      const span = document.createElement("span");
      span.className = "kata";
      span.textContent = kata + " ";
      target.appendChild(span);
    }, delay);
    delay += 500;
    puisiTimeouts.push(timeoutId);
  });

  puisiSudahDimunculkan = true;
}

function resetPuisi() {
  const target = document.getElementById("puisi-text");
  if (!target) return;
  puisiSudahDimunculkan = false;
  target.innerHTML = "";
  puisiTimeouts.forEach(clearTimeout);
  puisiTimeouts = [];
}

// ==========================
// MUSIC CONTROL
// ==========================
const bgMusic = document.getElementById('bgMusic');
const musicToggle = document.getElementById('musicToggle');
const musicPermissionModal = document.getElementById('musicPermissionModal');
const allowMusicBtn = document.getElementById('allowMusic');
const denyMusicBtn = document.getElementById('denyMusic');

let isMusicPlaying = false;
let musicPermissionAsked = false;

function showMusicPermission() {
  if (musicPermissionAsked || !musicPermissionModal) return;
  musicPermissionModal.style.display = 'block';
  musicPermissionModal.querySelector('.modal-content')?.style.setProperty('animation', 'slideDown 0.4s ease-out');
  musicPermissionAsked = true;
  if (musicToggle) musicToggle.style.display = 'none';
}

function hideMusicPermission() {
  if (musicPermissionModal) musicPermissionModal.style.display = 'none';
}

function toggleMusic() {
  if (!bgMusic) return;
  if (isMusicPlaying) {
    bgMusic.pause();
    musicToggle?.classList.add('muted');
    isMusicPlaying = false;
  } else {
    bgMusic.play()
      .then(() => {
        isMusicPlaying = true;
        musicToggle?.classList.remove('muted');
      })
      .catch(e => console.log("Playback prevented:", e));
  }
}

musicToggle?.addEventListener('click', toggleMusic);

allowMusicBtn?.addEventListener('click', () => {
  hideMusicPermission();
  if (musicToggle) musicToggle.style.display = 'block';
  if (bgMusic) bgMusic.volume = 0.3;

  document.body.addEventListener('click', function initAudio() {
    toggleMusic();
    document.body.removeEventListener('click', initAudio);
  }, { once: true });
});

denyMusicBtn?.addEventListener('click', () => {
  hideMusicPermission();
  if (musicToggle) musicToggle.style.display = 'block';
});

window.addEventListener('load', () => {
  setTimeout(showMusicPermission, 1000);
});

musicPermissionModal?.addEventListener('click', (e) => {
  if (e.target === musicPermissionModal) hideMusicPermission();
});
