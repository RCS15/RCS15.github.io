const slides = document.querySelectorAll('.slide');
const slider = document.querySelector('.slider');
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');

let currentIndex = 0;

function showSlide(index) {
  if (index < 0) index = 0;
  if (index >= slides.length) index = slides.length - 1;

  // Reset semua slide
  slides.forEach((slide, i) => {
    slide.classList.remove("active");
  });

  // Tampilkan slide yang sesuai
  slides[index].classList.add("active");
  currentIndex = index;

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