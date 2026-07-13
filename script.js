document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const nav = document.getElementById('nav');
    
    if (mobileMenuBtn && nav) {
        mobileMenuBtn.addEventListener('click', () => {
            nav.classList.toggle('active');
            const icon = mobileMenuBtn.querySelector('i');
            if (nav.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        const navLinks = document.querySelectorAll('.nav-link, .btn-gold-outline');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    const icon = mobileMenuBtn.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }

    // 2. Scrolled Header Effect
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 3. Scroll Reveal Animations (Intersection Observer)
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Mantém a animação acionada permanentemente após a primeira vez
                observer.unobserve(entry.target); 
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

    // 4. Parallax Effect Subtil em Hero Backgrounds
    const parallaxSections = document.querySelectorAll('.parallax');
    window.addEventListener('scroll', () => {
        let scrollY = window.scrollY;
        parallaxSections.forEach(section => {
            const speed = 0.4; // Ajuste para mais ou menos parallax
            section.style.backgroundPositionY = `${scrollY * speed}px`;
        });
    });

    // 5. Testimonials Slider Carousel
    const testimonialCards = document.querySelectorAll('.testimonial-slider .test-card');
    const dots = document.querySelectorAll('.slider-dots .dot');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        if (testimonialCards.length === 0) return;
        testimonialCards.forEach(card => card.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        testimonialCards[index].classList.add('active');
        if (dots[index]) {
            dots[index].classList.add('active');
        }
        currentSlide = index;
    }

    function nextSlide() {
        if (testimonialCards.length === 0) return;
        let next = (currentSlide + 1) % testimonialCards.length;
        showSlide(next);
    }

    function startSlideShow() {
        if (testimonialCards.length === 0) return;
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 5000); // Muda a cada 5 segundos
    }

    if (testimonialCards.length > 0) {
        // Inicializa o slider
        showSlide(0);
        startSlideShow();

        // Clique nos dots
        dots.forEach(dot => {
            dot.addEventListener('click', (e) => {
                const index = parseInt(e.target.getAttribute('data-index'));
                showSlide(index);
                startSlideShow(); // Reinicia o timer ao clicar
            });
        });
    }
});
