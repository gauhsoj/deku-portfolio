document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.getElementById('main-nav');
    const body = document.body;
    const bgAnimation = document.getElementById('background-animation');
    
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        themeToggle.textContent = body.classList.contains('dark-mode') ? '🌞' : '🌓';
        // if (body.classList.contains('dark-mode')) {
        //     '🌞'
        // } else {
        //     '🌓'
        // }
         update();
    });

    menuToggle.addEventListener('click', () => {
        mainNav.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    document.addEventListener('click', (e) => {
        if (!header.contains(e.target) && mainNav.classList.contains('active')) {
            mainNav.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });

    const dotCount = 50;
    for (let i = 0; i < dotCount; i++) {
        createDot();
    }

    function createDot() {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        const size = Math.random() * 5 + 2;
        dot.style.width = `${size}px`;
        dot.style.height = `${size}px`;
        dot.style.left = `${Math.random() * 100}vw`;
        dot.style.top = `${Math.random() * 100}vh`;
        bgAnimation.appendChild(dot);

        animateDot(dot);
    }

    function animateDot(dot) {
        const duration = Math.random() * 10 + 5;
        const xDistance = Math.random() * 200 - 100;
        const yDistance = Math.random() * 200 - 100;

        dot.animate([
            { transform: 'translate(0, 0)' },
            { transform: `translate(${xDistance}px, ${yDistance}px)` }
        ], {
            duration: duration * 1000,
            direction: 'alternate',
            iterations: Infinity,
            easing: 'ease-in-out'
        });
    }

    function update() {
        const dots = document.querySelectorAll('.dot');
        dots.forEach(dot => {
            dot.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--dot-color');
        });
    }

    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');

    const option = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                highlightNavLink(entry.target.id);
            }
        });
    }, option);

    sections.forEach(section => {
        observer.observe(section);
    });

    function highlightNavLink(sectionId) {
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === sectionId) {
                link.classList.add('active');
            }
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').slice(1);
            const targetSection = document.getElementById(targetId);
            targetSection.scrollIntoView({ behavior: 'smooth' });
            if (window.innerWidth <= 768) {
                mainNav.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });
    });

    const cards = document.querySelectorAll('.project-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'scale(1.05)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'scale(1)';
        });
    });

    const skillBars = document.querySelectorAll('.progress');
    skillBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0%';
        setTimeout(() => {
            bar.style.width = width;
        }, 500);
    });
});