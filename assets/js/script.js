document.addEventListener("DOMContentLoaded", () => {
    /**
     * Lógica para o Menu Hamburger.
     */
    const initMobileMenu = () => {
        const hamburgerBtn = document.getElementById('hamburger-btn');
        const navLinks = document.getElementById('nav-links');
        if (!hamburgerBtn || !navLinks) return;

        hamburgerBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburgerBtn.classList.toggle('active');
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                hamburgerBtn.classList.remove('active');
            });
        });
    };

    /**
     * Altera o fundo do Header durante o scroll.
     */
    const initHeaderScroll = () => {
        const header = document.querySelector('header.header');
        if (header) {
            window.addEventListener('scroll', () => {
                header.classList.toggle('scrolled', window.scrollY > 50);
            });
        }
    };

    /**
     * Inicia o efeito de partículas.
     */
    const initParticles = () => {
        const particlesContainer = document.getElementById('particles-container');
        if (particlesContainer && typeof tsParticles !== 'undefined') {
            tsParticles.load("particles-container", {
                fpsLimit: 60,
                interactivity: {
                    events: {
                        onHover: { enable: true, mode: "repulse" },
                        onClick: { enable: true, mode: "push" },
                        resize: true,
                    },
                    modes: {
                        push: { quantity: 2 },
                        repulse: { distance: 150, duration: 0.4 },
                    },
                },
                particles: {
                    color: { value: "#EB4C89" },
                    links: { color: "#ffffff", distance: 150, enable: true, opacity: 0.1, width: 1 },
                    collisions: { enable: true },
                    move: { direction: "none", enable: true, outModes: { default: "bounce" }, random: false, speed: 1, straight: false },
                    number: { density: { enable: true, area: 800 }, value: 60 },
                    opacity: { value: 0.2 },
                    shape: { type: "circle" },
                    size: { value: { min: 1, max: 3 } },
                },
                detectRetina: true,
            });
        }
    };

    /**
     * Animação de elementos ao aparecerem na tela (scroll).
     */
    const initScrollAnimations = () => {
        const scrollObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const delay = parseInt(entry.target.getAttribute('data-delay') || '0', 10);
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, delay * 150);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });

        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            if (el) scrollObserver.observe(el);
        });
    };

    /**
     * Lógica para o formulário de contato e notificação "Toast".
     */
    const initContactForm = () => {
        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                showToast('Mensagem Enviada!', 'Obrigado pelo seu contato. Retornaremos em breve!');
                e.target.reset();
            });
        }
    };

    const showToast = (title, description) => {
        let toast = document.getElementById('toast-container');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'toast-container';
            document.body.appendChild(toast);
        }

        toast.innerHTML = `
            <h4 class="toast-title">${title}</h4>
            <p>${description}</p>
        `;
        toast.classList.add('show');

        setTimeout(() => {
            toast.classList.remove('show');
        }, 5000);
    };


    // --- INICIALIZAÇÃO DE TODAS AS FUNÇÕES ---
    initMobileMenu();
    initHeaderScroll();
    initParticles();
    initScrollAnimations();
    initContactForm();
});