const slides = document.querySelectorAll('.slide');
const slider = document.querySelector('.slider');
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');

let currentIndex = 0;

// Di dalam function showSlide(index), tambahkan:
function showSlide(index) {
  if (index < 0) index = 0;
  if (index >= slides.length) index = slides.length - 1;

  // Reset semua slide
  slides.forEach((slide, i) => {
    slide.classList.remove("active");
    // Reset animasi dengan menghapus dan menambahkan kembali class animasi
    const h1 = slide.querySelector('h1');
    if (h1) {
      h1.style.animation = 'none';
      void h1.offsetWidth; // Trigger reflow
    }

    
  });

  // Tampilkan slide yang sesuai
  slides[index].classList.add("active");
  currentIndex = index;

  // Trigger animasi untuk slide aktif
  const activeH1 = slides[index].querySelector('h1');
  if (activeH1) {
    // Dapatkan nama animasi dari CSS
    let animationName = '';
    switch(index) {
      case 0: animationName = 'bounceIn'; break;
      case 1: animationName = 'fadeInRotate'; break;
      case 2: animationName = 'slideUp'; break;
      case 3: animationName = 'heartBeat'; break;
      case 4: animationName = 'rocketLaunch'; break;
      case 5: animationName = 'photoFlash'; break;
      case 6: animationName = 'zoomIn'; break;
      case 7: animationName = 'crownShine'; break;
      case 8: animationName = 'rainbowFade'; break;
      case 9: animationName = 'spaceIn'; break;
      case 10: animationName = 'typewriter'; break;
      case 11: animationName = 'glowPulse'; break;
      case 12: animationName = 'micPop'; break;
      case 13: animationName = 'envelopeDrop'; break;
    }
    
    if (animationName) {
      activeH1.style.animation = `${animationName} ${index < 5 ? '1s' : '1.5s'} ease-out forwards`;
    }
  }

  // Efek puisi hanya di slide 15 (index 14)
  if (index === 14 && !puisiSudahDimunculkan) {
    ketikPuisi();
  }

  // Reset puisi jika keluar
  if (index !== 14) {
    puisiSudahDimunculkan = false;
    document.getElementById("puisi-text").innerHTML = "";
    puisiTimeouts.forEach(clearTimeout);
    puisiTimeouts = [];
  }
}


nextBtn.addEventListener('click', () => {
  showSlide(currentIndex + 1);
});

prevBtn.addEventListener('click', () => {
  showSlide(currentIndex - 1);
});

// Optional: Keyboard control
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') showSlide(currentIndex + 1);
  if (e.key === 'ArrowLeft') showSlide(currentIndex - 1);
});


// ----------------------------
// Efek puisi: ketik per kata (anti klik cepat)
// ----------------------------
const puisiKata = [
  "Di", "hari", "ulang", "tahunmu,", "yang", "ke", "dua", "puluh,", 
  "aku", "tak", "membawa", "kado", "mewah,", 
  "hanya", "kata", "sederhana", "penuh", "makna,", 
  "dan", "harapan", "yang", "tulus", "dari", "hati,", 
  "agar", "hidupmu", "selalu", "penuh", "arti.", 
  ""
];

let puisiTimeouts = []; // menyimpan timeout IDs
let puisiSudahDimunculkan = false;

function ketikPuisi() {
  const target = document.getElementById("puisi-text");
  target.innerHTML = "";
  puisiTimeouts.forEach(clearTimeout);
  puisiTimeouts = [];

  let delay = 0;
  for (let i = 0; i < puisiKata.length; i++) {
    // Add extra delay for line breaks
    if (puisiKata[i] === "") {
      delay += 1000; // Add 1 second pause for line breaks
      continue;
    }

    const timeoutId = setTimeout(() => {
      const span = document.createElement("span");
      span.className = "kata";
      span.textContent = puisiKata[i] + " "; // Add space after each word
      span.style.animationDelay = "0.2s"; // Slight delay before fade in
      span.style.animationDuration = "1s"; // Slower fade in
      target.appendChild(span);
    }, delay);
    
    delay += 500; // Increased from 400ms to 600ms per word
    puisiTimeouts.push(timeoutId);
  }

  puisiSudahDimunculkan = true;
}



// Audio Control
const bgMusic = document.getElementById('bgMusic');
const musicToggle = document.getElementById('musicToggle');
let isMusicPlaying = false;

// Fungsi untuk memutar/menjeda musik
function toggleMusic() {
  if (isMusicPlaying) {
    bgMusic.pause();
    musicToggle.textContent = '🔇';
    musicToggle.classList.add('muted');
  } else {
    bgMusic.play();
    musicToggle.textContent = '🔊';
    musicToggle.classList.remove('muted');
  }
  isMusicPlaying = !isMusicPlaying;
}

// Event listener untuk tombol musik
musicToggle.addEventListener('click', toggleMusic);

// Mulai musik otomatis (dengan interaksi pengguna terlebih dahulu)
document.body.addEventListener('click', function initAudio() {
  if (!isMusicPlaying) {
    bgMusic.volume = 0.3; // Set volume rendah
    bgMusic.play()
      .then(() => {
        isMusicPlaying = true;
        musicToggle.textContent = '🔊';
      })
      .catch(e => console.log("Autoplay prevented:", e));
  }
  document.body.removeEventListener('click', initAudio);
}, { once: true });