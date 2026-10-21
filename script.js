
const slides = document.querySelectorAll(".slide");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const progress = document.getElementById("progress");
const counter = document.getElementById("counter");

let currentSlide = 0;

function showSlide(index) {
  currentSlide = Math.max(0, Math.min(index, slides.length - 1));

  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === currentSlide);
    slide.setAttribute(
      "aria-hidden",
      i === currentSlide ? "false" : "true"
    );
  });

  prevBtn.disabled = currentSlide === 0;
  nextBtn.disabled = currentSlide === slides.length - 1;

  progress.style.width =
    `${((currentSlide + 1) / slides.length) * 100}%`;

  counter.textContent =
    `${String(currentSlide + 1).padStart(2, "0")} / ` +
    `${String(slides.length).padStart(2, "0")}`;
}

prevBtn.addEventListener("click", () => {
  showSlide(currentSlide - 1);
});

nextBtn.addEventListener("click", () => {
  showSlide(currentSlide + 1);
});

document.addEventListener("keydown", (event) => {
  if (["ArrowRight", "PageDown", " "].includes(event.key)) {
    event.preventDefault();
    showSlide(currentSlide + 1);
  }

  if (["ArrowLeft", "PageUp"].includes(event.key)) {
    event.preventDefault();
    showSlide(currentSlide - 1);
  }

  if (event.key.toLowerCase() === "f") {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  }

  if (event.key === "Home") {
    showSlide(0);
  }

  if (event.key === "End") {
    showSlide(slides.length - 1);
  }
});

showSlide(0);
