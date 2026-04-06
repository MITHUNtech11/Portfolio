// Initialize Lucide Icons
window.lucide?.createIcons();

// Typewriter Effect
const roles = [
  "Software Engineer",
  "Python & Java Developer",
  "Data Engineer",
  "AI & ML Practitioner"
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typewriterElement = document.getElementById('typewriter');

function typeWriter() {
  if (!typewriterElement) return;

  const currentRole = roles[roleIndex];
  
  if (isDeleting) {
    typewriterElement.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typewriterElement.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;
  }

  let typeSpeed = isDeleting ? 50 : 100;

  if (!isDeleting && charIndex === currentRole.length) {
    typeSpeed = 2000; // Pause at end
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    typeSpeed = 500; // Pause before typing next
  }

  setTimeout(typeWriter, typeSpeed);
}

// Start typewriter
setTimeout(typeWriter, 1000);

// Scroll Reveal Animation
const revealElements = document.querySelectorAll('.reveal-up');

const revealCallback = (entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      observer.unobserve(entry.target); // Only animate once
    }
  });
};

const revealOptions = {
  threshold: 0.15,
  rootMargin: "0px 0px -50px 0px"
};

const revealObserver = new IntersectionObserver(revealCallback, revealOptions);

revealElements.forEach(el => {
  revealObserver.observe(el);
});

// Navbar Scroll Effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar?.classList.add('shadow-lg', 'shadow-brand-green/10');
    navbar?.classList.replace('py-4', 'py-3');
  } else {
    navbar?.classList.remove('shadow-lg', 'shadow-brand-green/10');
    navbar?.classList.replace('py-3', 'py-4');
  }
});

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');

mobileMenuBtn?.addEventListener('click', () => {
  mobileMenu?.classList.toggle('hidden');
});

mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu?.classList.add('hidden');
  });
});
