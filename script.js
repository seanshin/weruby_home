/**
 * WeRuby 홈페이지 - 메인 JavaScript 파일
 * 
 * 이 파일은 홈페이지의 모든 인터랙티브 기능을 관리합니다.
 * - 다크모드 토글
 * - 네비게이션 메뉴
 * - 폼 검증
 * - 스크롤 애니메이션
 * - 능동형 인터랙티브 효과
 */

// ========================================
// 상수 정의
// ========================================
const CONFIG = {
    // 스크롤 관련 설정
    SCROLL_THRESHOLD: 50, // 네비게이션 바 스크롤 임계값
    PARALLAX_MAX_SCROLL: 700, // 패럴랙스 최대 스크롤 거리
    
    // 폼 검증 설정
    MIN_NAME_LENGTH: 2,
    MIN_MESSAGE_LENGTH: 10,
    FORM_STATUS_DISPLAY_TIME: 5000, // 밀리초
    
    // 애니메이션 설정
    COUNTER_ANIMATION_DURATION: 2000, // 밀리초
    THROTTLE_DELAY: 100, // 밀리초
    
    // 파티클 설정
    PARTICLE_COUNT: 30,
    MAX_SCROLL_PARTICLES: 50,
    PARTICLE_CREATION_PROBABILITY: 0.7,
    
    // 커서 효과 설정
    CURSOR_FOLLOW_SPEED: 0.1,
    CURSOR_SIZE_NORMAL: 20,
    CURSOR_SIZE_HOVER: 40,
    CURSOR_OPACITY_NORMAL: 0.4,
    CURSOR_OPACITY_HOVER: 0.6,
    
    // 개발 모드 설정
    IS_DEVELOPMENT: window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
};

// 이메일 검증 정규식
const EMAIL_VALIDATION_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ========================================
// 다크모드 관리
// ========================================
const DarkModeManager = {
    /**
     * 저장된 테마 설정을 불러와서 적용
     */
    initialize() {
        try {
            const savedTheme = this.getStoredTheme() || 'light';
            this.applyTheme(savedTheme);
        } catch (error) {
            // localStorage 접근 실패 시 기본 테마 사용
            console.warn('테마 설정을 불러올 수 없습니다:', error);
            this.applyTheme('light');
        }
    },

    /**
     * localStorage에서 테마를 안전하게 가져옵니다
     * @returns {string|null} 저장된 테마 또는 null
     */
    getStoredTheme() {
        try {
            return localStorage.getItem('theme');
        } catch (error) {
            console.warn('localStorage 접근 실패:', error);
            return null;
        }
    },

    /**
     * 테마를 localStorage에 안전하게 저장합니다
     * @param {string} theme - 저장할 테마
     */
    setStoredTheme(theme) {
        try {
            localStorage.setItem('theme', theme);
        } catch (error) {
            console.warn('테마 설정을 저장할 수 없습니다:', error);
        }
    },

    /**
     * 테마를 전환합니다
     */
    toggle() {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        this.applyTheme(newTheme);
    },

    /**
     * 테마를 적용하고 저장합니다
     * @param {string} theme - 'light' 또는 'dark'
     */
    applyTheme(theme) {
        if (theme !== 'light' && theme !== 'dark') {
            theme = 'light'; // 유효하지 않은 값은 기본값으로
        }
        
        document.documentElement.setAttribute('data-theme', theme);
        this.setStoredTheme(theme);
        this.updateThemeIcon(theme);
    },

    /**
     * 테마 아이콘을 업데이트합니다
     * @param {string} theme - 현재 테마
     */
    updateThemeIcon(theme) {
        const themeIconElement = document.querySelector('.theme-icon');
        if (themeIconElement) {
            themeIconElement.textContent = theme === 'dark' ? '☀️' : '🌙';
        }
    }
};

// 다크모드 토글 버튼 이벤트 연결
const themeToggleButton = document.getElementById('themeToggle');
if (themeToggleButton) {
    themeToggleButton.addEventListener('click', () => DarkModeManager.toggle());
}

// 페이지 로드 시 테마 초기화
DarkModeManager.initialize();

// ========================================
// 네비게이션 메뉴 관리
// ========================================
const NavigationManager = {
    hamburgerButton: null,
    navigationMenu: null,
    navigationBar: null,
    navigationLinks: null,

    /**
     * 네비게이션 요소들을 초기화합니다
     */
    initialize() {
        this.hamburgerButton = document.getElementById('hamburger');
        this.navigationMenu = document.getElementById('navMenu');
        this.navigationBar = document.getElementById('navbar');
        this.navigationLinks = document.querySelectorAll('.nav-link');

        if (this.hamburgerButton && this.navigationMenu) {
            this.setupHamburgerMenu();
        }

        if (this.navigationBar) {
            this.setupScrollEffect();
        }

        this.setupSmoothScrolling();
        this.setupActiveLinkTracking();
        this.setupKeyboardNavigation();
        this.setupKeyboardShortcuts();
    },

    /**
     * 햄버거 메뉴 토글 기능을 설정합니다
     */
    setupHamburgerMenu() {
        // 햄버거 버튼 클릭 이벤트
        this.hamburgerButton.addEventListener('click', () => {
            const isMenuOpen = this.hamburgerButton.classList.toggle('active');
            this.navigationMenu.classList.toggle('active');
            this.hamburgerButton.setAttribute('aria-expanded', isMenuOpen);
            this.hamburgerButton.setAttribute('aria-label', isMenuOpen ? '메뉴 닫기' : '메뉴 열기');
        });

        // 메뉴 외부 클릭 시 닫기
        document.addEventListener('click', (event) => {
            const isClickInsideMenu = this.hamburgerButton.contains(event.target) || 
                                     this.navigationMenu.contains(event.target);
            
            if (!isClickInsideMenu && this.navigationMenu.classList.contains('active')) {
                this.closeMenu();
            }
        });

        // 네비게이션 링크 클릭 시 메뉴 닫기
        this.navigationLinks.forEach(link => {
            link.addEventListener('click', () => this.closeMenu());
        });
    },

    /**
     * 메뉴를 닫습니다
     */
    closeMenu() {
        if (this.hamburgerButton && this.navigationMenu) {
            this.hamburgerButton.classList.remove('active');
            this.navigationMenu.classList.remove('active');
            this.hamburgerButton.setAttribute('aria-expanded', 'false');
        }
    },

    /**
     * 스크롤에 따른 네비게이션 바 효과를 설정합니다
     */
    setupScrollEffect() {
        const handleScroll = UtilityFunctions.throttle(() => {
            const currentScrollPosition = window.pageYOffset;
            
            if (currentScrollPosition > CONFIG.SCROLL_THRESHOLD) {
                this.navigationBar.classList.add('scrolled', 'is-scrolled');
            } else {
                this.navigationBar.classList.remove('scrolled', 'is-scrolled');
            }
        }, CONFIG.THROTTLE_DELAY);
        
        window.addEventListener('scroll', handleScroll, { passive: true });
    },

    /**
     * 부드러운 스크롤 기능을 설정합니다
     */
    setupSmoothScrolling() {
        const anchorLinks = document.querySelectorAll('a[href^="#"]');
        
        anchorLinks.forEach(anchorLink => {
            anchorLink.addEventListener('click', (event) => {
                event.preventDefault();
                
                const targetId = anchorLink.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement && this.navigationBar) {
                    const navbarHeight = this.navigationBar.offsetHeight;
                    const targetPosition = targetElement.offsetTop - navbarHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    },

    /**
     * 스크롤에 따른 활성 네비게이션 링크 추적을 설정합니다
     */
    setupActiveLinkTracking() {
        const allSections = document.querySelectorAll('section[id]');
        
        const updateActiveLink = () => {
            const currentScrollY = window.pageYOffset;
            
            allSections.forEach(section => {
                const sectionHeight = section.offsetHeight;
                const sectionTop = section.offsetTop - 100;
                const sectionId = section.getAttribute('id');
                
                const isSectionInView = currentScrollY > sectionTop && 
                                       currentScrollY <= sectionTop + sectionHeight;
                
                if (isSectionInView) {
                    this.navigationLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${sectionId}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        };

        window.addEventListener('scroll', 
            UtilityFunctions.throttle(updateActiveLink, CONFIG.THROTTLE_DELAY), 
            { passive: true }
        );
    },

    /**
     * 키보드 네비게이션을 설정합니다
     */
    setupKeyboardNavigation() {
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && this.navigationMenu?.classList.contains('active')) {
                this.closeMenu();
                this.hamburgerButton?.focus();
            }
        });
    },

    /**
     * 키보드 단축키를 설정합니다
     */
    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (event) => {
            // Alt + H: 홈으로 이동
            if (event.altKey && event.key === 'h') {
                event.preventDefault();
                const homeLink = document.querySelector('a[href="#home"]');
                if (homeLink) {
                    homeLink.click();
                    homeLink.focus();
                }
            }
            
            // Alt + S: Solutions로 이동
            if (event.altKey && event.key === 's') {
                event.preventDefault();
                const solutionsLink = document.querySelector('a[href="solutions.html"]');
                if (solutionsLink) {
                    solutionsLink.click();
                    solutionsLink.focus();
                }
            }
        });
    }
};

// ========================================
// 폼 검증 및 제출 관리
// ========================================
const FormManager = {
    contactForm: null,
    formInputs: null,

    /**
     * 폼 관리자를 초기화합니다
     */
    initialize() {
        this.contactForm = document.getElementById('contactForm');
        if (!this.contactForm) return;

        this.formInputs = this.contactForm.querySelectorAll('input, textarea');
        this.setupRealTimeValidation();
        this.setupFormSubmission();
    },

    /**
     * 실시간 입력 검증을 설정합니다
     */
    setupRealTimeValidation() {
        this.formInputs.forEach(inputElement => {
            // 포커스 아웃 시 검증
            inputElement.addEventListener('blur', () => {
                if (inputElement.hasAttribute('required')) {
                    this.validateInputField(inputElement);
                }
            });

            // 입력 시 에러 메시지 제거
            inputElement.addEventListener('input', () => {
                if (inputElement.getAttribute('aria-invalid') === 'true') {
                    this.clearInputError(inputElement.id);
                }
            });
        });
    },

    /**
     * 개별 입력 필드를 검증합니다
     * @param {HTMLElement} inputElement - 검증할 입력 요소
     */
    validateInputField(inputElement) {
        const inputValue = inputElement.value.trim();
        const inputId = inputElement.id;

        if (!inputValue) return;

        switch (inputId) {
            case 'email':
                if (!EMAIL_VALIDATION_REGEX.test(inputValue)) {
                    this.showInputError(inputId, '올바른 이메일 주소를 입력해주세요.');
                } else {
                    this.clearInputError(inputId);
                }
                break;

            case 'name':
                if (inputValue.length < CONFIG.MIN_NAME_LENGTH) {
                    this.showInputError(inputId, `이름을 ${CONFIG.MIN_NAME_LENGTH}자 이상 입력해주세요.`);
                } else {
                    this.clearInputError(inputId);
                }
                break;

            case 'message':
                if (inputValue.length < CONFIG.MIN_MESSAGE_LENGTH) {
                    this.showInputError(inputId, `문의내용을 ${CONFIG.MIN_MESSAGE_LENGTH}자 이상 입력해주세요.`);
                } else {
                    this.clearInputError(inputId);
                }
                break;
        }
    },

    /**
     * 입력 필드 에러를 표시합니다
     * @param {string} inputId - 입력 필드 ID
     * @param {string} errorMessage - 에러 메시지
     */
    showInputError(inputId, errorMessage) {
        const inputElement = document.getElementById(inputId);
        const errorElement = document.getElementById(inputId + 'Error');
        
        if (inputElement && errorElement) {
            inputElement.setAttribute('aria-invalid', 'true');
            inputElement.classList.add('error');
            errorElement.textContent = errorMessage;
        }
    },

    /**
     * 입력 필드 에러를 제거합니다
     * @param {string} inputId - 입력 필드 ID
     */
    clearInputError(inputId) {
        const inputElement = document.getElementById(inputId);
        const errorElement = document.getElementById(inputId + 'Error');
        
        if (inputElement && errorElement) {
            inputElement.setAttribute('aria-invalid', 'false');
            inputElement.classList.remove('error');
            errorElement.textContent = '';
        }
    },

    /**
     * 전체 폼을 검증합니다
     * @returns {boolean} 검증 통과 여부
     */
    validateEntireForm() {
        let isFormValid = true;
        
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');
        
        // 이름 검증
        if (!nameInput || nameInput.value.trim().length < CONFIG.MIN_NAME_LENGTH) {
            this.showInputError('name', `이름을 ${CONFIG.MIN_NAME_LENGTH}자 이상 입력해주세요.`);
            isFormValid = false;
        } else {
            this.clearInputError('name');
        }
        
        // 이메일 검증
        if (!emailInput || !EMAIL_VALIDATION_REGEX.test(emailInput.value.trim())) {
            this.showInputError('email', '올바른 이메일 주소를 입력해주세요.');
            isFormValid = false;
        } else {
            this.clearInputError('email');
        }
        
        // 메시지 검증
        if (!messageInput || messageInput.value.trim().length < CONFIG.MIN_MESSAGE_LENGTH) {
            this.showInputError('message', `문의내용을 ${CONFIG.MIN_MESSAGE_LENGTH}자 이상 입력해주세요.`);
            isFormValid = false;
        } else {
            this.clearInputError('message');
        }
        
        return isFormValid;
    },

    /**
     * 폼 상태 메시지를 표시합니다
     * @param {string} message - 표시할 메시지
     * @param {string} messageType - 'success' 또는 'error'
     */
    showFormStatusMessage(message, messageType) {
        const statusElement = document.getElementById('formStatus');
        if (!statusElement) return;

        statusElement.textContent = message;
        statusElement.className = `form-status ${messageType}`;
        statusElement.style.display = 'block';
        
        // 상태 메시지로 스크롤
        statusElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        // 일정 시간 후 메시지 숨기기
        setTimeout(() => {
            statusElement.style.display = 'none';
        }, CONFIG.FORM_STATUS_DISPLAY_TIME);
    },

    /**
     * 폼 제출 처리를 설정합니다
     */
    setupFormSubmission() {
        this.contactForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            
            if (!this.validateEntireForm()) {
                this.showFormStatusMessage('입력 정보를 확인해주세요.', 'error');
                // 첫 번째 에러 필드로 포커스 이동
                const firstErrorInput = this.contactForm.querySelector('input[aria-invalid="true"], textarea[aria-invalid="true"]');
                if (firstErrorInput) {
                    firstErrorInput.focus();
                }
                return;
            }
            
            const submitButton = document.getElementById('submitBtn');
            if (!submitButton) return;
            
            const buttonText = submitButton.querySelector('.btn-text');
            const buttonLoader = submitButton.querySelector('.btn-loader');
            
            // 로딩 상태 표시
            submitButton.classList.add('loading');
            submitButton.disabled = true;
            submitButton.setAttribute('aria-busy', 'true');
            
            // 폼 데이터 수집
            const formData = {
                name: document.getElementById('name')?.value.trim() || '',
                email: document.getElementById('email')?.value.trim() || '',
                company: document.getElementById('company')?.value.trim() || '',
                message: document.getElementById('message')?.value.trim() || ''
            };
            
            try {
                // 실제 API 호출로 대체 필요
                // 예: 
                // const response = await fetch('/api/contact', {
                //     method: 'POST',
                //     headers: { 'Content-Type': 'application/json' },
                //     body: JSON.stringify(formData)
                // });
                // if (!response.ok) throw new Error('Network response was not ok');
                
                // 시뮬레이션: 네트워크 지연
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                this.showFormStatusMessage(
                    '문의 내용이 성공적으로 전송되었습니다. 빠른 시일 내에 연락드리겠습니다.', 
                    'success'
                );
                this.contactForm.reset();
                
                // 모든 에러 메시지 제거
                ['name', 'email', 'message'].forEach(inputId => {
                    this.clearInputError(inputId);
                });
                
                // 성공 후 첫 번째 입력 필드로 포커스 이동
                const firstInput = this.contactForm.querySelector('input, textarea');
                if (firstInput) {
                    setTimeout(() => firstInput.focus(), 100);
                }
                
            } catch (error) {
                if (CONFIG.IS_DEVELOPMENT) {
                    console.error('폼 제출 오류:', error);
                }
                this.showFormStatusMessage(
                    '전송 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.', 
                    'error'
                );
            } finally {
                // 로딩 상태 제거
                submitButton.classList.remove('loading');
                submitButton.disabled = false;
                submitButton.removeAttribute('aria-busy');
            }
        });
    }
};

// ========================================
// 스크롤 애니메이션 관리
// ========================================
const ScrollAnimationManager = {
    /**
     * 스크롤 기반 페이드인 애니메이션을 설정합니다
     */
    initializeFadeInAnimations() {
        const animationObserverOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const animationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, animationObserverOptions);

        // 애니메이션 대상 요소들
        const animatedElements = document.querySelectorAll(
            '.vision-card, .solution-card, .alliance-card, .tech-content, .contact-grid'
        );

        animatedElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            animationObserver.observe(element);
        });
    },

    /**
     * Hero 섹션 패럴랙스 효과를 설정합니다
     */
    initializeParallaxEffect() {
        const heroContentElement = document.querySelector('.hero-content');
        if (!heroContentElement) return;

        const handleParallax = UtilityFunctions.throttle(() => {
            const scrollPosition = window.pageYOffset;
            
            if (scrollPosition < CONFIG.PARALLAX_MAX_SCROLL) {
                heroContentElement.style.transform = `translateY(${scrollPosition * 0.5}px)`;
                heroContentElement.style.opacity = 1 - (scrollPosition / CONFIG.PARALLAX_MAX_SCROLL);
            }
        }, 10);
        
        window.addEventListener('scroll', handleParallax, { passive: true });
    }
};

// ========================================
// 능동형 인터랙티브 효과 관리
// ========================================
const InteractiveEffectsManager = {
    /**
     * 마우스 커서 글로우 효과를 초기화합니다
     * 성능 최적화: 터치 디바이스에서는 비활성화
     */
    initializeCursorGlow() {
        // 터치 디바이스에서는 커서 효과 비활성화
        if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
            return;
        }
        
        // 사용자가 애니메이션 감소를 선호하는 경우 비활성화
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            return;
        }
        
        const cursorElement = document.createElement('div');
        cursorElement.className = 'cursor-glow';
        cursorElement.setAttribute('aria-hidden', 'true');
        document.body.appendChild(cursorElement);
        
        let mousePositionX = 0;
        let mousePositionY = 0;
        let cursorPositionX = 0;
        let cursorPositionY = 0;
        
        // 마우스 위치 추적
        document.addEventListener('mousemove', (event) => {
            mousePositionX = event.clientX;
            mousePositionY = event.clientY;
        });
        
        // 부드러운 커서 이동 애니메이션
        const animateCursor = () => {
            cursorPositionX += (mousePositionX - cursorPositionX) * CONFIG.CURSOR_FOLLOW_SPEED;
            cursorPositionY += (mousePositionY - cursorPositionY) * CONFIG.CURSOR_FOLLOW_SPEED;
            cursorElement.style.left = cursorPositionX + 'px';
            cursorElement.style.top = cursorPositionY + 'px';
            requestAnimationFrame(animateCursor);
        };
        
        animateCursor();
        
        // 인터랙티브 요소 호버 효과
        const interactiveElements = document.querySelectorAll(
            'a, button, .solution-card, .vision-card, .alliance-card'
        );
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursorElement.style.width = CONFIG.CURSOR_SIZE_HOVER + 'px';
                cursorElement.style.height = CONFIG.CURSOR_SIZE_HOVER + 'px';
                cursorElement.style.opacity = CONFIG.CURSOR_OPACITY_HOVER;
            });
            
            element.addEventListener('mouseleave', () => {
                cursorElement.style.width = CONFIG.CURSOR_SIZE_NORMAL + 'px';
                cursorElement.style.height = CONFIG.CURSOR_SIZE_NORMAL + 'px';
                cursorElement.style.opacity = CONFIG.CURSOR_OPACITY_NORMAL;
            });
        });
    },

    /**
     * Hero 섹션 파티클 배경 효과를 초기화합니다
     * 성능 최적화: prefers-reduced-motion을 고려
     */
    initializeParticleBackground() {
        // 사용자가 애니메이션 감소를 선호하는 경우 파티클 효과 비활성화
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            return;
        }
        
        const heroSection = document.querySelector('.hero');
        if (!heroSection) return;
        
        const particleContainer = document.createElement('div');
        particleContainer.className = 'particle-container';
        particleContainer.setAttribute('aria-hidden', 'true');
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
        heroSection.appendChild(particleContainer);
        
        // 파티클 생성
        for (let i = 0; i < CONFIG.PARTICLE_COUNT; i++) {
            this.createParticle(particleContainer);
        }
    },

    /**
     * 개별 파티클을 생성합니다
     * @param {HTMLElement} container - 파티클을 추가할 컨테이너
     */
    createParticle(container) {
        const particle = document.createElement('div');
        const particleSize = Math.random() * 4 + 2;
        const positionX = Math.random() * 100;
        const positionY = Math.random() * 100;
        const animationDuration = Math.random() * 20 + 10;
        const animationDelay = Math.random() * 5;
        const particleOpacity = Math.random() * 0.5 + 0.3;
        
        particle.style.cssText = `
            position: absolute;
            width: ${particleSize}px;
            height: ${particleSize}px;
            background: rgba(255, 255, 255, ${particleOpacity});
            border-radius: 50%;
            left: ${positionX}%;
            top: ${positionY}%;
            animation: float-particle ${animationDuration}s ease-in-out infinite;
            animation-delay: ${animationDelay}s;
            box-shadow: 0 0 ${particleSize * 2}px rgba(255, 255, 255, 0.5);
        `;
        container.appendChild(particle);
    },

    /**
     * 3D 카드 변환 효과를 초기화합니다
     */
    initialize3DCardEffects() {
        const cardElements = document.querySelectorAll('.vision-card, .solution-card, .alliance-card');
        
        cardElements.forEach(card => {
            card.addEventListener('mousemove', (event) => {
                const cardRect = card.getBoundingClientRect();
                const mouseX = event.clientX - cardRect.left;
                const mouseY = event.clientY - cardRect.top;
                
                const cardCenterX = cardRect.width / 2;
                const cardCenterY = cardRect.height / 2;
                
                const rotationX = (mouseY - cardCenterY) / 10;
                const rotationY = (cardCenterX - mouseX) / 10;
                
                card.style.transform = `perspective(1000px) rotateX(${rotationX}deg) rotateY(${rotationY}deg) translateY(-12px) scale(1.03)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        });
    },

    /**
     * 스크롤 기반 파티클 효과를 초기화합니다
     * 성능 최적화: prefers-reduced-motion을 고려하여 애니메이션 감소 선호 시 비활성화
     */
    initializeScrollParticles() {
        // 사용자가 애니메이션 감소를 선호하는 경우 파티클 효과 비활성화
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            return;
        }
        
        let activeParticles = [];
        
        const createScrollParticle = () => {
            if (activeParticles.length >= CONFIG.MAX_SCROLL_PARTICLES) return;
            
            const particle = document.createElement('div');
            particle.setAttribute('aria-hidden', 'true');
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
            
            const startPositionX = Math.random() * window.innerWidth;
            const startPositionY = window.innerHeight;
            const endPositionY = -10;
            const animationDuration = Math.random() * 3000 + 2000;
            const animationDelay = Math.random() * 1000;
            
            particle.style.left = startPositionX + 'px';
            particle.style.top = startPositionY + 'px';
            
            setTimeout(() => {
                particle.style.transition = `top ${animationDuration}ms linear, opacity ${animationDuration}ms linear`;
                particle.style.top = endPositionY + 'px';
                particle.style.opacity = '0';
                
                setTimeout(() => {
                    if (particle.parentNode) {
                        particle.remove();
                    }
                    activeParticles = activeParticles.filter(p => p !== particle);
                }, animationDuration);
            }, animationDelay);
            
            activeParticles.push(particle);
        };
        
        // 스크롤 시 파티클 생성 (스로틀링 적용)
        const throttledCreateParticle = UtilityFunctions.throttle(() => {
            if (Math.random() > (1 - CONFIG.PARTICLE_CREATION_PROBABILITY)) {
                createScrollParticle();
            }
        }, 100);
        
        window.addEventListener('scroll', throttledCreateParticle, { passive: true });
    },

    /**
     * 텍스트 글로우 효과를 초기화합니다
     */
    initializeTextGlow() {
        const glowTargetElements = document.querySelectorAll('.hero-title, .section-title, .logo-text');
        
        glowTargetElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                element.style.textShadow = '0 0 30px rgba(59, 130, 246, 0.5), 0 0 60px rgba(59, 130, 246, 0.3)';
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.textShadow = '';
            });
        });
    }
};

// 파티클 애니메이션 CSS 추가
const particleAnimationStyle = document.createElement('style');
particleAnimationStyle.textContent = `
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
document.head.appendChild(particleAnimationStyle);

// ========================================
// 유틸리티 함수
// ========================================
const UtilityFunctions = {
    /**
     * 함수 실행을 지연시킵니다 (디바운스)
     * @param {Function} func - 실행할 함수
     * @param {number} waitTime - 대기 시간 (밀리초)
     * @param {boolean} immediate - 즉시 실행 여부
     * @returns {Function} 디바운스된 함수
     */
    debounce(func, waitTime = 10, immediate = true) {
        let timeoutId;
        return function(...args) {
            const context = this;
            const callNow = immediate && !timeoutId;
            
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                timeoutId = null;
                if (!immediate) func.apply(context, args);
            }, waitTime);
            
            if (callNow) func.apply(context, args);
        };
    },

    /**
     * 함수 실행 빈도를 제한합니다 (스로틀)
     * @param {Function} func - 실행할 함수
     * @param {number} delayTime - 지연 시간 (밀리초)
     * @returns {Function} 스로틀된 함수
     */
    throttle(func, delayTime = 100) {
        let lastCallTime = 0;
        return function(...args) {
            const currentTime = new Date().getTime();
            if (currentTime - lastCallTime < delayTime) {
                return;
            }
            lastCallTime = currentTime;
            return func.apply(this, args);
        };
    }
};

// ========================================
// 접근성 관리
// ========================================
const AccessibilityManager = {
    /**
     * 네비게이션 링크의 포커스 관리를 설정합니다
     */
    initializeFocusManagement() {
        const navigationLinks = document.querySelectorAll('.nav-link');
        
        navigationLinks.forEach(link => {
            link.addEventListener('click', () => {
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
    }
};

// ========================================
// 페이지 초기화
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    // 네비게이션 초기화
    NavigationManager.initialize();
    
    // 폼 관리 초기화
    FormManager.initialize();
    
    // 스크롤 애니메이션 초기화
    ScrollAnimationManager.initializeFadeInAnimations();
    ScrollAnimationManager.initializeParallaxEffect();
    
    // 접근성 관리 초기화
    AccessibilityManager.initializeFocusManagement();
});

// 페이지 로드 완료 시 능동형 효과 초기화
window.addEventListener('load', () => {
    // 능동형 인터랙티브 효과 초기화
    InteractiveEffectsManager.initializeCursorGlow();
    InteractiveEffectsManager.initializeParticleBackground();
    InteractiveEffectsManager.initialize3DCardEffects();
    InteractiveEffectsManager.initializeScrollParticles();
    InteractiveEffectsManager.initializeTextGlow();
    
    // 페이지 로드 완료 표시
    document.body.classList.add('loaded');
    
    // Hero 제목 애니메이션
    const heroTitleElement = document.querySelector('.hero-title');
    if (heroTitleElement) {
        heroTitleElement.style.opacity = '1';
    }
});

// ========================================
// 콘솔 메시지 (개발 모드에서만 표시)
// ========================================
if (CONFIG.IS_DEVELOPMENT) {
    console.log('%c위루비 홈페이지에 오신 것을 환영합니다! 🏥', 
        'color: #2563eb; font-size: 20px; font-weight: bold;');
    console.log('%c미래의 스마트 병원을 함께 만들어갑니다.', 
        'color: #10b981; font-size: 14px;');
}
