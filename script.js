// ===============================
// Danchega Builders Ltd Script
// ===============================

// --- DOM Helpers ---
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

// --- Mobile Navigation Toggle ---
const navToggle = $('#nav-toggle');
const navList = $('#nav-list');

if (navToggle) {
  navToggle.addEventListener('click', () => {
    const isOpen = navList.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen);
  });
}

// Close mobile nav when a link is clicked
$$('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navList.classList.remove('open');
    navToggle?.setAttribute('aria-expanded', 'false');
  });
});

// --- Highlight Active Nav Link ---
function setActiveNav() {
  const currentPage = location.pathname.split('/').pop() || 'index.html';
  $$('.nav-link').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    }
  });
}
setActiveNav();

// --- Scroll Reveal Animation ---
const revealElements = $$('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealElements.forEach(el => observer.observe(el));

// --- Scroll-to-Top Button ---
const scrollTopBtn = $('#scrollTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    scrollTopBtn.style.display = 'block';
  } else {
    scrollTopBtn.style.display = 'none';
  }
});

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// --- Contact Form Handling (Formspree Integration) ---
const form = $('#contact-form');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const spinner = $('#spinner');
    const successMessage = $('#success-message');
    spinner.classList.remove('hidden');

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });

      spinner.classList.add('hidden');

      if (response.ok) {
        successMessage.classList.remove('hidden');
        form.reset();

        // Hide success message after a delay
        setTimeout(() => {
          successMessage.classList.add('hidden');
        }, 6000);
      } else {
        alert('⚠️ Something went wrong. Please try again.');
      }
    } catch (error) {
      spinner.classList.add('hidden');
      alert('⚠️ Network error. Please check your internet connection and try again.');
    }
  });
}
