// ===== Scroll Animation =====
const animItems = document.querySelectorAll('.animate');

function showOnScroll() {
  const triggerBottom = window.innerHeight * 0.85;
  animItems.forEach(item => {
    const boxTop = item.getBoundingClientRect().top;
    if (boxTop < triggerBottom) {
      item.classList.add('visible');
    }
  });
}

window.addEventListener('scroll', showOnScroll);
window.addEventListener('load', showOnScroll);

// ===== Dynamic Typing Effect (H2 - Role Description) =====
const typingText = document.querySelector('.hero-text h2');
if (typingText) {
  const messages = [
    "Aspiring Full-Stack Developer",
    "Cloud Enthusiast",
    "Lifelong Learner"
  ];
  let messageIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeEffect() {
    const currentMessage = messages[messageIndex];

    if (!isDeleting) {
      typingText.textContent = currentMessage.substring(0, charIndex + 1);
      charIndex++;
      if (charIndex === currentMessage.length) {
        isDeleting = true;
        setTimeout(typeEffect, 1500);
        return;
      }
    } else {
      typingText.textContent = currentMessage.substring(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        isDeleting = false;
        messageIndex = (messageIndex + 1) % messages.length;
      }
    }
    setTimeout(typeEffect, isDeleting ? 50 : 100);
  }

  typeEffect();
}

// ===== Welcome Message Typing Effect (New) =====
const welcomeElement = document.getElementById('welcomeMessage');
if (welcomeElement) {
    const welcomeMessage = "Welcome to My Portfolio 👋";
    let wCharIndex = 0;

    function typeWelcome() {
        if (wCharIndex < welcomeMessage.length) {
            welcomeElement.textContent += welcomeMessage.charAt(wCharIndex);
            wCharIndex++;
            setTimeout(typeWelcome, 70); // Fast typing speed
        }
    }

    // Start the welcome message typing effect immediately on load
    window.addEventListener('load', () => {
        // Delay slightly so it appears after initial screen paint
        setTimeout(typeWelcome, 500); 
    });
}

// ===== Dynamic Footer Year =====
const footer = document.querySelector("footer p");
if (footer) {
  const year = new Date().getFullYear();
  footer.textContent = `© ${year} Vignesh Raj V | All Rights Reserved`;
}

// ===== Certificate Modal Viewer =====
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("cert-link") || e.target.closest(".cert-link")) {
    e.preventDefault();
    const link = e.target.closest(".cert-link");
    const imgSrc = link.getAttribute("href");

    // Create modal
    const modal = document.createElement("div");
    modal.classList.add("modal");
    modal.innerHTML = `
      <div class="modal-content">
        <span class="close">&times;</span>
        <img src="${imgSrc}" alt="Certificate">
      </div>
    `;
    document.body.appendChild(modal);

    // Close modal
    modal.querySelector(".close").onclick = () => modal.remove();
    modal.onclick = (event) => {
      if (event.target === modal) modal.remove();
    };
  }
});

// ===== Contact Form Handling =====
const form = document.getElementById("contactForm");
const formStatus = document.getElementById("form-status");

if (form) {
  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    formStatus.textContent = "⏳ Sending...";

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        formStatus.textContent = "✅ Thank you! Your message has been sent.";
        form.reset();
      } else {
        formStatus.textContent = "❌ Something went wrong. Please try again.";
      }
    } catch (error) {
      formStatus.textContent = "⚠️ Network error. Please try again.";
    }
  });
}

// ===== Sidebar Toggle Logic =====
const sidebar = document.getElementById('sidebar');
const sidebarToggle = document.getElementById('sidebarToggle');
const closeSidebar = document.getElementById('closeSidebar');
const sidebarLinks = document.querySelectorAll('.sidebar-links a');

if (sidebar && sidebarToggle && closeSidebar) {
  sidebarToggle.addEventListener('click', () => {
    sidebar.style.width = '300px'; 
  });

  closeSidebar.addEventListener('click', () => {
    sidebar.style.width = '0'; 
  });

  // Close sidebar when a link is clicked
  sidebarLinks.forEach(link => {
      link.addEventListener('click', () => {
          // Add a small delay for smoother transition before closing
          setTimeout(() => {
             sidebar.style.width = '0';
          }, 300);
      });
  });
}
