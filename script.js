/* =============================================
   KAVINDU NAVEEN PORTFOLIO — JAVASCRIPT
   ============================================= */

"use strict";

// ---- Scroll Progress Bar ----
const scrollProgress = document.getElementById('scrollProgress');
function updateScrollProgress() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  scrollProgress.style.width = pct + '%';
}

// ---- Navbar scroll effect ----
const navbar = document.getElementById('navbar');
function updateNavbar() {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}

// ---- Active nav link on scroll ----
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');
function updateActiveLink() {
  const scrollY = window.scrollY + 100;
  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    if (scrollY >= top && scrollY < top + height) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + id) {
          link.classList.add('active');
        }
      });
    }
  });
}

// ---- Back to Top ----
const backToTop = document.getElementById('backToTop');
function updateBackToTop() {
  if (window.scrollY > 500) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
}
if (backToTop) {
  backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// ---- Combine all scroll listeners ----
window.addEventListener('scroll', () => {
  updateScrollProgress();
  updateNavbar();
  updateActiveLink();
  updateBackToTop();
}, { passive: true });

// ---- Hamburger Menu ----
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', isOpen);
  });
  document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });
  document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target)) {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });
}

// ---- Smooth Scroll for all anchor links ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const href = anchor.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ---- Typewriter Effect ----
const typewriterEl = document.getElementById('typewriter');
const roles = [
  'ERP Systems',
  'Mobile Apps',
  'Full-Stack Web Apps',
  'Business Automation',
  'Django Backends',
  'React Native Apps',
];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeTimeout;

function typeWriter() {
  const currentRole = roles[roleIndex];
  if (isDeleting) {
    charIndex--;
    typewriterEl.textContent = currentRole.substring(0, charIndex);
    if (charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typeTimeout = setTimeout(typeWriter, 500);
      return;
    }
    typeTimeout = setTimeout(typeWriter, 50);
  } else {
    charIndex++;
    typewriterEl.textContent = currentRole.substring(0, charIndex);
    if (charIndex === currentRole.length) {
      isDeleting = true;
      typeTimeout = setTimeout(typeWriter, 2000);
      return;
    }
    typeTimeout = setTimeout(typeWriter, 85);
  }
}
if (typewriterEl) {
  setTimeout(() => typeWriter(), 800);
}

// ---- Scroll Reveal (IntersectionObserver) ----
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -60px 0px'
});
revealElements.forEach(el => revealObserver.observe(el));

// ---- Project Filter ----
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const filter = btn.getAttribute('data-filter');
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    projectCards.forEach(card => {
      const category = card.getAttribute('data-category');
      if (filter === 'all' || category === filter) {
        card.classList.remove('hidden');
        card.style.animation = 'fadeInUp 0.4s ease forwards';
        // Re-trigger featured only when all shown
        if (filter === 'all' && card.classList.contains('featured')) {
          card.style.gridColumn = '1 / -1';
        } else {
          card.style.gridColumn = '';
        }
      } else {
        card.classList.add('hidden');
      }
    });

    // Handle featured card grid span
    if (filter === 'all') {
      const featuredCard = document.querySelector('.project-card.featured');
      if (featuredCard) featuredCard.style.gridColumn = '1 / -1';
    }
  });
});

// ---- Particle Canvas ----
const canvas = document.getElementById('particleCanvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let particles = [];
  let animationFrame;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas, { passive: true });

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 1.5 + 0.3;
      this.speedX = (Math.random() - 0.5) * 0.4;
      this.speedY = (Math.random() - 0.5) * 0.4;
      this.opacity = Math.random() * 0.6 + 0.1;
      this.pulse = Math.random() * Math.PI * 2;
      this.pulseSpeed = 0.008 + Math.random() * 0.015;
      const hue = Math.random() > 0.6 ? 200 : 195;
      this.color = `hsla(${hue}, 80%, 65%, `;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      this.pulse += this.pulseSpeed;
      this.currentOpacity = this.opacity * (0.6 + 0.4 * Math.sin(this.pulse));
      if (this.x < -10 || this.x > canvas.width + 10 ||
        this.y < -10 || this.y > canvas.height + 10) {
        this.reset();
      }
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color + this.currentOpacity + ')';
      ctx.fill();
    }
  }

  // Create particles
  const PARTICLE_COUNT = 90;
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push(new Particle());
  }

  // Draw connections
  function drawConnections() {
    const maxDist = 130;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < maxDist) {
          const opacity = (1 - dist / maxDist) * 0.15;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(59, 130, 246, ${opacity})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }
  }

  // Mouse interaction
  let mouse = { x: -1000, y: -1000 };
  document.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  }, { passive: true });

  let isCanvasVisible = true;
  const heroSection = document.getElementById('home');

  if (heroSection) {
    const canvasObserver = new IntersectionObserver((entries) => {
      isCanvasVisible = entries[0].isIntersecting;
      if (isCanvasVisible) {
        animateParticles();
      }
    }, { threshold: 0 });
    canvasObserver.observe(heroSection);
  }

  function animateParticles() {
    if (!isCanvasVisible) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      // Mouse repulsion
      const dx = p.x - mouse.x;
      const dy = p.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 100) {
        const force = (100 - dist) / 100;
        p.x += (dx / dist) * force * 1.5;
        p.y += (dy / dist) * force * 1.5;
      }
      p.update();
      p.draw();
    });
    drawConnections();
    animationFrame = requestAnimationFrame(animateParticles);
  }

  if (isCanvasVisible) {
    animateParticles();
  }
}

// ---- Copy Email to Clipboard ----
window.copyToClipboard = function (text, btn) {
  if (!navigator.clipboard) {
    const el = document.createElement('textarea');
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    showCopied(btn);
    return;
  }
  navigator.clipboard.writeText(text).then(() => showCopied(btn));
};

function showCopied(btn) {
  const originalHTML = btn.innerHTML;
  btn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><polyline points="20 6 9 17 4 12"/></svg>`;
  btn.style.color = '#4ade80';
  setTimeout(() => {
    btn.innerHTML = originalHTML;
    btn.style.color = '';
  }, 2000);
}

// ---- Contact Form ----
window.handleFormSubmit = async function (e) {
  e.preventDefault();
  const form = e.target;
  const btn = document.getElementById('submitContact');
  const btnText = btn.querySelector('.btn-text');

  // You need to replace this URL with your actual Formspree endpoint URL
  // Sign up at formspree.io, create a form, and paste the URL here.
  const formspreeUrl = 'https://formspree.io/f/mzdngelp';

  if (formspreeUrl.includes('YOUR_FORM_ID')) {
    alert("Please update the Formspree URL in script.js to send messages!");
    return;
  }

  const formData = new FormData(form);
  btnText.textContent = 'Sending...';
  btn.style.opacity = '0.7';
  btn.disabled = true;

  try {
    const response = await fetch(formspreeUrl, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    });

    if (response.ok) {
      btnText.textContent = 'Message Sent!';
      btn.style.backgroundColor = '#4ade80'; // Success green
      form.reset();
    } else {
      btnText.textContent = 'Error Sending';
    }
  } catch (error) {
    btnText.textContent = 'Network Error';
  }

  setTimeout(() => {
    btnText.textContent = 'Send Message';
    btn.style.opacity = '1';
    btn.disabled = false;
    btn.style.backgroundColor = '';
  }, 4000);
};

// ---- Cursor Glow Effect (desktop only) ----
if (window.innerWidth > 900) {
  const glow = document.createElement('div');
  glow.style.cssText = `
    position: fixed;
    width: 350px; height: 350px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%);
    pointer-events: none;
    z-index: 0;
    transform: translate(-50%, -50%);
    transition: left 0.15s ease, top 0.15s ease;
  `;
  document.body.appendChild(glow);
  document.addEventListener('mousemove', (e) => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
  }, { passive: true });
}

// ---- Hero image parallax tilt ----
const profileImg = document.getElementById('profileImg');
const heroWrap = document.querySelector('.hero-image-wrap');
if (heroWrap && window.innerWidth > 900) {
  heroWrap.addEventListener('mousemove', (e) => {
    const rect = heroWrap.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const rx = ((e.clientY - cy) / rect.height) * 8;
    const ry = ((e.clientX - cx) / rect.width) * -8;
    heroWrap.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg)`;
  });
  heroWrap.addEventListener('mouseleave', () => {
    heroWrap.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg)';
    heroWrap.style.transition = 'transform 0.5s ease';
  });
}

// ---- Skill tags hover color variety ----
const skillTags = document.querySelectorAll('.skill-tag');
const tagColors = [
  'rgba(59,130,246', 'rgba(6,182,212', 'rgba(139,92,246',
  'rgba(236,72,153', 'rgba(245,158,11', 'rgba(34,197,94',
];
skillTags.forEach((tag, i) => {
  const color = tagColors[i % tagColors.length];
  tag.style.color = color + ',0.9)';
  tag.style.background = color + ',0.1)';
  tag.style.borderColor = color + ',0.25)';
});

// ---- Number counter animation (stats) ----
function animateCounter(el, target, duration = 1500) {
  let start = 0;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= target) { start = target; clearInterval(timer); }
    el.textContent = Math.floor(start) + (el.dataset.suffix || '');
  }, 16);
}

// ---- Init on load ----
window.addEventListener('DOMContentLoaded', () => {
  updateScrollProgress();
  updateNavbar();
  updateBackToTop();

  // Stagger reveal delays for grids
  document.querySelectorAll('.skills-grid .reveal, .projects-grid .reveal, .education-grid .reveal').forEach((el, i) => {
    el.style.setProperty('--delay', (i * 0.08) + 's');
  });
});
