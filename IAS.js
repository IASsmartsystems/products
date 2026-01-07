const modal = document.getElementById("productModal");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalLink = document.getElementById("modalLink");
const closeBtn = document.querySelector(".close");

document.querySelectorAll(".product-card").forEach(card => {
  card.addEventListener("click", () => {
    modalTitle.textContent = card.dataset.title;
    modalDescription.textContent = card.dataset.description;
    modalLink.href = card.dataset.link;
    modal.style.display = "block";
  });
});

closeBtn.onclick = () => modal.style.display = "none";

window.onclick = (e) => {
  if (e.target === modal) modal.style.display = "none";
};


const sections = document.querySelectorAll(".section");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, { threshold: 0.2 });

sections.forEach(section => observer.observe(section));


const form = document.getElementById("contactForm");
const status = document.getElementById("formStatus");

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  const data = new FormData(form);

  try {
    const response = await fetch("https://formspree.io/f/xpqwgnbe", {
      method: "POST",
      body: data,
      headers: {
        "Accept": "application/json"
      }
    });

    if (response.ok) {
      form.reset();
      status.textContent = "Message sent successfully!";
      status.style.color = "#4CAF50";
    } else {
      status.textContent = "Something went wrong. Please try again.";
      status.style.color = "red";
    }
  } catch (error) {
    status.textContent = "Network error. Please try later.";
    status.style.color = "red";
  }
});


const serviceModal = document.getElementById("serviceModal");
const serviceTitle = document.getElementById("serviceTitle");
const serviceDescription = document.getElementById("serviceDescription");
const serviceImage = document.getElementById("serviceImage");
const serviceClose = document.getElementById("serviceClose");

let images = [];
let currentIndex = 0;
let slideInterval = null;

document.querySelectorAll(".service-card").forEach(card => {
  card.addEventListener("click", () => {
    serviceTitle.textContent = card.dataset.title;
    serviceDescription.textContent = card.dataset.description;

    images = JSON.parse(card.dataset.images);
    currentIndex = 0;

    serviceImage.src = images[currentIndex];

    startSlideshow();
    serviceModal.style.display = "block";
  });
});

function startSlideshow() {
  stopSlideshow(); // safety

  slideInterval = setInterval(() => {
    nextSlide();
  }, 3000); // 3 seconds
}

function stopSlideshow() {
  if (slideInterval) {
    clearInterval(slideInterval);
    slideInterval = null;
  }
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % images.length;
  serviceImage.src = images[currentIndex];
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  serviceImage.src = images[currentIndex];
}

document.getElementById("nextSlide").onclick = () => {
  nextSlide();
  startSlideshow(); // reset timer
};

document.getElementById("prevSlide").onclick = () => {
  prevSlide();
  startSlideshow(); // reset timer
};

serviceClose.onclick = () => {
  serviceModal.style.display = "none";
  stopSlideshow();
};

window.addEventListener("click", (e) => {
  if (e.target === serviceModal) {
    serviceModal.style.display = "none";
    stopSlideshow();
  }
});

