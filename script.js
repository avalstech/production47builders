// script.js

// Smooth scroll for internal links
document.addEventListener("click", function (e) {
  const target = e.target;
  if (target.tagName === "A" && target.getAttribute("href")?.startsWith("#")) {
    const id = target.getAttribute("href").slice(1);
    const el = document.getElementById(id);
    if (el) {
      e.preventDefault();
      window.scrollTo({
        top: el.offsetTop - 60,
        behavior: "smooth",
      });
    }
  }
});

// Simple contact form handler placeholder
const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

if (contactForm && formMessage) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    formMessage.textContent =
      "Thank you. Your project details have been received. A 47Builders specialist will contact you shortly.";
    contactForm.reset();
  });
}

// Chatbot toggle logic
const chatbotToggle = document.getElementById("chatbotToggle");
const chatbotWidget = document.getElementById("chatbotWidget");
const chatbotClose = document.getElementById("chatbotClose");
const chatbotForm = document.getElementById("chatbotForm");
const chatbotInput = document.getElementById("chatbotInput");
const chatbotBody = document.querySelector(".chatbot-body");

function openChatbot() {
  if (!chatbotWidget) return;
  chatbotWidget.style.display = "flex";
  chatbotWidget.setAttribute("aria-hidden", "false");
}

function closeChatbot() {
  if (!chatbotWidget) return;
  chatbotWidget.style.display = "none";
  chatbotWidget.setAttribute("aria-hidden", "true");
}

if (chatbotToggle) {
  chatbotToggle.addEventListener("click", function () {
    if (!chatbotWidget) return;
    const visible = chatbotWidget.style.display === "flex";
    if (visible) {
      closeChatbot();
    } else {
      openChatbot();
    }
  });
}

if (chatbotClose) {
  chatbotClose.addEventListener("click", function () {
    closeChatbot();
  });
}

// Simple mock reply for chatbot placeholder
if (chatbotForm && chatbotInput && chatbotBody) {
  chatbotForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const text = chatbotInput.value.trim();
    if (!text) return;

    const userMsg = document.createElement("p");
    userMsg.className = "chatbot-message";
    userMsg.textContent = text;
    chatbotBody.appendChild(userMsg);

    const reply = document.createElement("p");
    reply.className = "chatbot-message bot";
    reply.textContent =
      "Thanks for your question. This is a demo AI assistant. In production, I’ll help you match with verified builders, estimate costs, and understand your project options.";
    chatbotBody.appendChild(reply);

    chatbotBody.scrollTop = chatbotBody.scrollHeight;
    chatbotInput.value = "";
  });
}
// MOBILE NAV TOGGLE
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });
}

// Close nav when clicking a link (mobile)
document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
  });
});
