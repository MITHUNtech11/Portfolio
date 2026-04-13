// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Initialize Lucide Icons
window.lucide?.createIcons();

// ╔════════════════════════════════════════╗
// ║ HERO SECTION ANIMATIONS (GSAP Timeline) ║
// ╚════════════════════════════════════════╝

const heroTimeline = gsap.timeline({ delay: 0.2 });

// Animate hero title with staggered slide-in
heroTimeline
  .to('.fade-in-2', { 
    opacity: 1, 
    x: 0, 
    duration: 0.7, 
    ease: 'expo.out' 
  }, 0)
  .to('.fade-in-3', { 
    opacity: 1, 
    x: 0, 
    duration: 0.7, 
    ease: 'expo.out' 
  }, 0.15)
  // Tagline fades in with scale
  .to('.fade-in-4', { 
    opacity: 1, 
    y: 0, 
    duration: 0.6, 
    ease: 'back.out' 
  }, 0.3)
  // Buttons bounce and scale in
  .to('.fade-in-5', { 
    opacity: 1, 
    scale: 1, 
    y: 0, 
    duration: 0.8, 
    ease: 'elastic.out(1, 0.5)' 
  }, 0.4)
  // Stats fade in
  .to('.fade-in-6', { 
    opacity: 1, 
    duration: 0.6, 
    ease: 'power2.out' 
  }, 0.6);

// Add floating animation to hero card
gsap.to(".hero-card", { 
  y: -8, 
  duration: 2.5, 
  ease: "sine.inOut", 
  repeat: -1, 
  yoyo: true,
  delay: 1
});

// ╔════════════════════════════════════════╗
// ║ TYPEWRITER EFFECT                      ║
// ╚════════════════════════════════════════╝

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

// ╔════════════════════════════════════════╗
// ║ SCROLL REVEAL ANIMATIONS (Intersection Observer) ║
// ╚════════════════════════════════════════╝

// Enhanced scroll reveal with stagger and different animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px"
};

const revealElements = document.querySelectorAll('[data-animate]');

const revealCallback = (entries, observer) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      const animationType = entry.target.dataset.animate;
      const staggerDelay = (entry.target.dataset.stagger || 0) * 100;

      // Add animation class with delay
      requestAnimationFrame(() => {
        entry.target.classList.add(`${animationType}-animation`);
        entry.target.style.animationDelay = `${staggerDelay}ms`;
      });

      observer.unobserve(entry.target);
    }
  });
};

const revealObserver = new IntersectionObserver(revealCallback, observerOptions);
revealElements.forEach(el => {
  revealObserver.observe(el);
});

// ╔════════════════════════════════════════╗
// ║ SKILL CARDS STAGGER ON SCROLL          ║
// ╚════════════════════════════════════════╝

const skillCardsContainer = document.querySelector('.skills-grid');
if (skillCardsContainer) {
  const skillCards = skillCardsContainer.querySelectorAll('.skill-card');
  
  const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Stagger animation for each card
        skillCards.forEach((card, index) => {
          gsap.to(card, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: index * 0.08,
            ease: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
            onStart: () => {
              card.style.opacity = '0';
              card.style.transform = 'translateY(40px)';
            }
          });
        });
        skillsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  skillsObserver.observe(skillCardsContainer);
}

// ╔════════════════════════════════════════╗
// ║ PROJECT ITEMS ALTERNATING SLIDE-IN     ║
// ╚════════════════════════════════════════╝

const projectItems = document.querySelectorAll('.project-item');
const projectObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      const isEven = index % 2 === 0;
      gsap.fromTo(
        entry.target,
        {
          opacity: 0,
          x: isEven ? -80 : 80,
          skewY: isEven ? 2 : -2
        },
        {
          opacity: 1,
          x: 0,
          skewY: 0,
          duration: 0.7,
          delay: index * 0.1,
          ease: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
        }
      );
      projectObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

projectItems.forEach(item => {
  projectObserver.observe(item);
});

// ╔════════════════════════════════════════╗
// ║ TIMELINE ANIMATIONS                    ║
// ╚════════════════════════════════════════╝

const timelineEntries = document.querySelectorAll('.timeline-entry');
const timelineObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      // Animate timeline line first
      const timelineElement = entry.target.closest('.timeline');
      if (timelineElement) {
        gsap.to(
          timelineElement.querySelector('.timeline-line'),
          { 
            height: '100%', 
            duration: 1.2, 
            ease: 'power2.out' 
          }
        );
      }

      // Then animate each entry with stagger
      gsap.to(entry.target, {
        opacity: 1,
        x: 0,
        duration: 0.6,
        delay: index * 0.15,
        ease: 'power2.out',
        onStart: () => {
          entry.target.style.opacity = '0';
          entry.target.style.transform = 'translateX(-40px)';
        }
      });

      timelineObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

timelineEntries.forEach(entry => {
  timelineObserver.observe(entry);
});

// ╔════════════════════════════════════════╗
// ║ EDUCATION CARDS SCALE-UP               ║
// ╚════════════════════════════════════════╝

const backgroundCards = document.querySelectorAll('.background-card');
const cardsObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      gsap.to(entry.target, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.7,
        delay: index * 0.12,
        ease: 'back.out(1.5)',
        onStart: () => {
          entry.target.style.opacity = '0';
          entry.target.style.transform = 'scale(0.85) translateY(40px)';
        }
      });
      cardsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

backgroundCards.forEach(card => {
  cardsObserver.observe(card);
});

// ╔════════════════════════════════════════╗
// ║ NAVBAR SCROLL EFFECT                   ║
// ╚════════════════════════════════════════╝

const navbar = document.getElementById('navbar');
let lastScrollY = 0;

window.addEventListener('scroll', () => {
  const currentScrollY = window.scrollY;
  
  if (currentScrollY > 50) {
    navbar?.classList.add('scrolled');
  } else {
    navbar?.classList.remove('scrolled');
  }

  lastScrollY = currentScrollY;
});

// ╔════════════════════════════════════════╗
// ║ SECTION MARKERS FADE-IN                ║
// ╚════════════════════════════════════════╝

const sectionMarkers = document.querySelectorAll('.section-marker');
const markersObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      gsap.to(entry.target, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
        onStart: () => {
          entry.target.style.opacity = '0';
          entry.target.style.transform = 'translateY(20px)';
        }
      });
      markersObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

sectionMarkers.forEach(marker => {
  markersObserver.observe(marker);
});

// ╔════════════════════════════════════════╗
// ║ MOBILE MENU TOGGLE                     ║
// ╚════════════════════════════════════════╝

const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');

mobileMenuBtn?.addEventListener('click', () => {
  mobileMenu?.classList.toggle('hidden');
  
  // Animate menu items
  if (!mobileMenu?.classList.contains('hidden')) {
    const menuItems = mobileMenu?.querySelectorAll('a');
    menuItems?.forEach((item, index) => {
      gsap.fromTo(
        item,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.3, delay: index * 0.1 }
      );
    });
  }
});

mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu?.classList.add('hidden');
  });
});

// ╔════════════════════════════════════════╗
// ║ CONTACT FORM ANIMATIONS                ║
// ╚════════════════════════════════════════╝

const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  const formObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const inputs = entry.target.querySelectorAll('.form-input, .btn');
        inputs.forEach((input, index) => {
          gsap.to(input, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: index * 0.1,
            ease: 'back.out(1.5)',
            onStart: () => {
              input.style.opacity = '0';
              input.style.transform = 'translateY(30px)';
            }
          });
        });
        formObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  formObserver.observe(contactForm);
}
