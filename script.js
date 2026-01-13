// ========================================
// Dark Mode Toggle
// ========================================
function initTheme() {
    const theme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', theme);
    updateThemeIcon(theme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
    const themeIcon = document.querySelector('.theme-icon');
    if (themeIcon) {
        themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
    }
}

const themeToggle = document.getElementById('themeToggle');
if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
}

// Initialize theme on load
initTheme();

// ========================================
// Navigation Functionality
// ========================================

// Hamburger menu toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        const isActive = hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        hamburger.setAttribute('aria-expanded', isActive);
        hamburger.setAttribute('aria-label', isActive ? '메뉴 닫기' : '메뉴 열기');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        }
    });
    
    // Close menu on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            hamburger.focus();
        }
    });
}

// Close menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navbar scroll effect
const navbar = document.getElementById('navbar');
let lastScroll = 0;

if (navbar) {
    const handleScroll = throttle(() => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    }, 10);
    
    window.addEventListener('scroll', handleScroll, { passive: true });
}

// ========================================
// Smooth Scrolling for Navigation Links
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const navbarHeight = navbar.offsetHeight;
            const targetPosition = targetElement.offsetTop - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// Scroll Animations
// ========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and sections
const animatedElements = document.querySelectorAll(
    '.vision-card, .solution-card, .alliance-card, .tech-content, .contact-grid'
);

animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ========================================
// Active Navigation Link on Scroll
// ========================================
const sections = document.querySelectorAll('section[id]');

function activateNavLink() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', activateNavLink);

// ========================================
// Contact Form Handling with Validation
// ========================================
const contactForm = document.getElementById('contactForm');

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function showError(inputId, message) {
    const input = document.getElementById(inputId);
    const errorElement = document.getElementById(inputId + 'Error');
    
    if (input && errorElement) {
        input.setAttribute('aria-invalid', 'true');
        input.classList.add('error');
        errorElement.textContent = message;
    }
}

function clearError(inputId) {
    const input = document.getElementById(inputId);
    const errorElement = document.getElementById(inputId + 'Error');
    
    if (input && errorElement) {
        input.setAttribute('aria-invalid', 'false');
        input.classList.remove('error');
        errorElement.textContent = '';
    }
}

function showFormStatus(message, type) {
    const statusElement = document.getElementById('formStatus');
    if (statusElement) {
        statusElement.textContent = message;
        statusElement.className = `form-status ${type}`;
        statusElement.style.display = 'block';
        
        // Scroll to status
        statusElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        // Hide after 5 seconds
        setTimeout(() => {
            statusElement.style.display = 'none';
        }, 5000);
    }
}

function validateForm() {
    let isValid = true;
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');
    
    // Validate name
    if (!name || name.value.trim().length < 2) {
        showError('name', '이름을 2자 이상 입력해주세요.');
        isValid = false;
    } else {
        clearError('name');
    }
    
    // Validate email
    if (!email || !emailRegex.test(email.value.trim())) {
        showError('email', '올바른 이메일 주소를 입력해주세요.');
        isValid = false;
    } else {
        clearError('email');
    }
    
    // Validate message
    if (!message || message.value.trim().length < 10) {
        showError('message', '문의내용을 10자 이상 입력해주세요.');
        isValid = false;
    } else {
        clearError('message');
    }
    
    return isValid;
}

if (contactForm) {
    // Real-time validation
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            if (input.hasAttribute('required')) {
                if (input.id === 'email' && input.value) {
                    if (!emailRegex.test(input.value.trim())) {
                        showError(input.id, '올바른 이메일 주소를 입력해주세요.');
                    } else {
                        clearError(input.id);
                    }
                } else if (input.id === 'name' && input.value) {
                    if (input.value.trim().length < 2) {
                        showError(input.id, '이름을 2자 이상 입력해주세요.');
                    } else {
                        clearError(input.id);
                    }
                } else if (input.id === 'message' && input.value) {
                    if (input.value.trim().length < 10) {
                        showError(input.id, '문의내용을 10자 이상 입력해주세요.');
                    } else {
                        clearError(input.id);
                    }
                }
            }
        });
        
        input.addEventListener('input', () => {
            if (input.getAttribute('aria-invalid') === 'true') {
                clearError(input.id);
            }
        });
    });
    
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            showFormStatus('입력 정보를 확인해주세요.', 'error');
            return;
        }
        
        const submitBtn = document.getElementById('submitBtn');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoader = submitBtn.querySelector('.btn-loader');
        
        // Show loading state
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        
        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            company: document.getElementById('company').value.trim(),
            message: document.getElementById('message').value.trim()
        };
        
        try {
            // Simulate API call (replace with actual API endpoint)
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Here you would typically send the form data to a server
            // Example: await fetch('/api/contact', { method: 'POST', body: JSON.stringify(formData) });
            
            showFormStatus('문의 내용이 성공적으로 전송되었습니다. 빠른 시일 내에 연락드리겠습니다.', 'success');
            contactForm.reset();
            
            // Clear all errors
            ['name', 'email', 'message'].forEach(id => clearError(id));
            
        } catch (error) {
            console.error('Form submission error:', error);
            showFormStatus('전송 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.', 'error');
        } finally {
            // Hide loading state
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
        }
    });
}

// ========================================
// Counter Animation for Stats
// ========================================
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Observe stat numbers for animation
const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            entry.target.classList.add('animated');
            const targetValue = entry.target.getAttribute('data-value');
            if (targetValue && !isNaN(targetValue)) {
                animateCounter(entry.target, parseInt(targetValue));
            }
        }
    });
}, { threshold: 0.5 });

const statNumbers = document.querySelectorAll('.stat-number[data-value]');
statNumbers.forEach(stat => statObserver.observe(stat));

// ========================================
// Parallax Effect for Hero Section
// ========================================
const heroContent = document.querySelector('.hero-content');
if (heroContent) {
    const handleParallax = throttle(() => {
        const scrolled = window.pageYOffset;
        if (scrolled < 700) {
            heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
            heroContent.style.opacity = 1 - (scrolled / 700);
        }
    }, 10);
    
    window.addEventListener('scroll', handleParallax, { passive: true });
}

// ========================================
// Lazy Loading for Images (if any are added)
// ========================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => imageObserver.observe(img));
}

// ========================================
// Enhanced Card Interactions
// ========================================
// Solution cards hover effect is now handled by CSS
// This section can be used for additional interactive features if needed

// ========================================
// Typing Effect for Hero Title (Optional)
// ========================================
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// ========================================
// Page Load Animations
// ========================================
window.addEventListener('load', () => {
    // Remove any initial loading states
    document.body.classList.add('loaded');
    
    // Initialize any animations that need to run on load
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        heroTitle.style.opacity = '1';
    }
});

// ========================================
// Utility Functions
// ========================================

// Debounce function for performance
function debounce(func, wait = 10, immediate = true) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Throttle function for scroll events
function throttle(func, delay = 100) {
    let lastCall = 0;
    return function(...args) {
        const now = new Date().getTime();
        if (now - lastCall < delay) {
            return;
        }
        lastCall = now;
        return func(...args);
    };
}

// Apply throttle to scroll events
window.addEventListener('scroll', throttle(() => {
    activateNavLink();
}, 100), { passive: true });

// ========================================
// Keyboard Navigation Enhancement
// ========================================
document.addEventListener('keydown', (e) => {
    // Close mobile menu on Escape
    if (e.key === 'Escape') {
        if (hamburger && navMenu && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        }
    }
});

// ========================================
// Focus Management for Accessibility
// ========================================
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        // Focus management for screen readers
        setTimeout(() => {
            const targetId = link.getAttribute('href');
            if (targetId && targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.setAttribute('tabindex', '-1');
                    targetElement.focus();
                    targetElement.removeAttribute('tabindex');
                }
            }
        }, 100);
    });
});

// ========================================
// 능동형 마우스 커서 효과
// ========================================
function initCursorGlow() {
    const cursor = document.createElement('div');
    cursor.className = 'cursor-glow';
    document.body.appendChild(cursor);
    
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
    
    // 호버 시 커서 확대
    const interactiveElements = document.querySelectorAll('a, button, .solution-card, .vision-card, .alliance-card');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.width = '40px';
            cursor.style.height = '40px';
            cursor.style.opacity = '0.6';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.width = '20px';
            cursor.style.height = '20px';
            cursor.style.opacity = '0.4';
        });
    });
}

// ========================================
// 능동형 파티클 배경 효과
// ========================================
function initParticleBackground() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particle-container';
    particleContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        pointer-events: none;
        z-index: 0;
    `;
    hero.appendChild(particleContainer);
    
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        const size = Math.random() * 4 + 2;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: rgba(255, 255, 255, ${Math.random() * 0.5 + 0.3});
            border-radius: 50%;
            left: ${x}%;
            top: ${y}%;
            animation: float-particle ${duration}s ease-in-out infinite;
            animation-delay: ${delay}s;
            box-shadow: 0 0 ${size * 2}px rgba(255, 255, 255, 0.5);
        `;
        particleContainer.appendChild(particle);
    }
}

// 파티클 애니메이션 CSS 추가
const style = document.createElement('style');
style.textContent = `
    @keyframes float-particle {
        0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.3;
        }
        25% {
            transform: translate(30px, -50px) scale(1.2);
            opacity: 0.6;
        }
        50% {
            transform: translate(-30px, -100px) scale(0.8);
            opacity: 0.4;
        }
        75% {
            transform: translate(50px, -30px) scale(1.1);
            opacity: 0.7;
        }
    }
`;
document.head.appendChild(style);

// ========================================
// 능동형 카드 3D 효과
// ========================================
function init3DCards() {
    const cards = document.querySelectorAll('.vision-card, .solution-card, .alliance-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-12px) scale(1.03)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

// ========================================
// 능동형 스크롤 파티클 효과
// ========================================
function initScrollParticles() {
    let particles = [];
    const maxParticles = 50;
    
    function createParticle() {
        if (particles.length >= maxParticles) return;
        
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: var(--primary-color);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9998;
            opacity: 0.6;
            box-shadow: 0 0 10px currentColor;
        `;
        document.body.appendChild(particle);
        
        const startX = Math.random() * window.innerWidth;
        const startY = window.innerHeight;
        const endY = -10;
        const duration = Math.random() * 3000 + 2000;
        const delay = Math.random() * 1000;
        
        particle.style.left = startX + 'px';
        particle.style.top = startY + 'px';
        
        setTimeout(() => {
            particle.style.transition = `top ${duration}ms linear, opacity ${duration}ms linear`;
            particle.style.top = endY + 'px';
            particle.style.opacity = '0';
            
            setTimeout(() => {
                particle.remove();
                particles = particles.filter(p => p !== particle);
            }, duration);
        }, delay);
        
        particles.push(particle);
    }
    
    // 스크롤 시 파티클 생성
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (Math.random() > 0.7) {
            createParticle();
        }
    }, { passive: true });
}

// ========================================
// 능동형 그라디언트 애니메이션
// ========================================
function initGradientAnimation() {
    const gradientElements = document.querySelectorAll('.hero-background, .technology-section, .cta-section');
    
    gradientElements.forEach(el => {
        let hue = 0;
        setInterval(() => {
            hue = (hue + 1) % 360;
            // 그라디언트 색상 미세 조정
        }, 50);
    });
}

// ========================================
// 능동형 텍스트 글로우 효과
// ========================================
function initTextGlow() {
    const glowElements = document.querySelectorAll('.hero-title, .section-title, .logo-text');
    
    glowElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            el.style.textShadow = '0 0 30px rgba(59, 130, 246, 0.5), 0 0 60px rgba(59, 130, 246, 0.3)';
        });
        
        el.addEventListener('mouseleave', () => {
            el.style.textShadow = '';
        });
    });
}

// ========================================
// 초기화
// ========================================
window.addEventListener('load', () => {
    initCursorGlow();
    initParticleBackground();
    init3DCards();
    initScrollParticles();
    initTextGlow();
    
    // 페이지 로드 애니메이션
    document.body.classList.add('loaded');
});

// ========================================
// Console Message
// ========================================
console.log('%c위루비 홈페이지에 오신 것을 환영합니다! 🏥', 'color: #2563eb; font-size: 20px; font-weight: bold;');
console.log('%c미래의 스마트 병원을 함께 만들어갑니다.', 'color: #10b981; font-size: 14px;');
