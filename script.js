const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".primary-nav");

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

document.querySelectorAll(".accordion-button").forEach((button) => {
  button.addEventListener("click", () => {
    const item = button.closest(".accordion-item");
    const isOpen = item.classList.toggle("open");
    button.setAttribute("aria-expanded", String(isOpen));
  });
});

const form = document.getElementById("appointment-form");
const formMessage = document.getElementById("form-message");
if (form) {
  form.addEventListener("submit", () => {
    if (formMessage) {
      formMessage.textContent = "Submitting your appointment request…";
      formMessage.style.color = "#1A3154";
    }
  });
}
const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

const modalLinks = document.querySelectorAll('a[href="#disclaimer"], a[href="#privacy"], a[href="#terms"]');

function openModal(id) {
  const modal = document.querySelector(id);
  if (!modal) return;
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
}

function closeModal(modal) {
  if (!modal) return;
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

modalLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    openModal(link.getAttribute("href"));
  });
});

document.querySelectorAll("[data-close-modal]").forEach((element) => {
  element.addEventListener("click", () => closeModal(element.closest(".modal")));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    document.querySelectorAll('.modal[aria-hidden="false"]').forEach(closeModal);
  }
});
