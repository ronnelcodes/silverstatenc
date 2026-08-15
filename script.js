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
const formShell = document.getElementById("appointment-form-shell");
const thankYouPanel = document.getElementById("appointment-thank-you");
const formMessage = document.getElementById("form-message");
const submitButton = document.getElementById("appointment-submit");

function encodeFormData(formData) {
  return new URLSearchParams(formData).toString();
}

if (form) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const originalButtonText = submitButton ? submitButton.textContent : "";

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Submitting…";
    }

    if (formMessage) {
      formMessage.textContent = "Submitting your appointment request…";
      formMessage.classList.remove("form-error");
    }

    try {
      const formData = new FormData(form);

      // Netlify requires the form-name value for AJAX submissions.
      formData.set("form-name", form.getAttribute("name"));

      const response = await fetch("/", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: encodeFormData(formData)
      });

      if (!response.ok) {
        throw new Error(`Submission failed with status ${response.status}`);
      }

      form.reset();
      form.hidden = true;

      if (thankYouPanel) {
        thankYouPanel.hidden = false;
        thankYouPanel.focus();
      }
    } catch (error) {
      console.error("Appointment form submission error:", error);

      if (formMessage) {
        formMessage.textContent =
          "We could not submit your request. Please try again, or contact us at 702-389-1063 or info@silverstatenc.com.";
        formMessage.classList.add("form-error");
      }

      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
      }
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
