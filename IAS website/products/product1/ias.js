
  let currentSlide = 0;
  const slides = document.querySelectorAll(".slide");

  setInterval(() => {
    slides[currentSlide].classList.remove("active");
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add("active");
  }, 3000); // changes every 3 seconds