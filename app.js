// Initialize GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Smooth Scroll Setup
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Navigation
const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.classList.toggle('menu-open');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.classList.remove('menu-open');
    });
});

// Hero Animations
gsap.from('.hero h1 .line span', {
    y: 200,
    opacity: 0,
    duration: 1,
    ease: 'power4.out',
    stagger: 0.1
});

gsap.from('.hero p', {
    y: 50,
    opacity: 0,
    duration: 1,
    delay: 0.5,
    ease: 'power4.out'
});

gsap.from('.hero-cta a', {
    y: 50,
    opacity: 0,
    duration: 1,
    delay: 0.8,
    ease: 'power4.out',
    stagger: 0.2
});

// Section Headers Animation
gsap.utils.toArray('.section-header').forEach(section => {
    gsap.from(section, {
        scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        },
        y: 100,
        opacity: 0,
        duration: 1,
        ease: 'power4.out'
    });
});

// Project Cards Animation
gsap.utils.toArray('.project-card').forEach((card, i) => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        },
        y: 100,
        opacity: 0,
        duration: 1,
        delay: i * 0.2,
        ease: 'power4.out'
    });
});

// Skills Animation
gsap.utils.toArray('.skill-category').forEach((category, i) => {
    gsap.from(category, {
        scrollTrigger: {
            trigger: category,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        },
        y: 50,
        opacity: 0,
        duration: 1,
        delay: i * 0.2,
        ease: 'power4.out'
    });
});

// Contact Links Animation
gsap.utils.toArray('.contact-link').forEach((link, i) => {
    gsap.from(link, {
        scrollTrigger: {
            trigger: link,
            start: 'top 90%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        },
        x: -50,
        opacity: 0,
        duration: 1,
        delay: i * 0.1,
        ease: 'power4.out'
    });
});

// Magnetic Effect on Links
document.querySelectorAll('.project-link, .contact-link').forEach(link => {
    link.addEventListener('mousemove', (e) => {
        const bounds = link.getBoundingClientRect();
        const x = e.clientX - bounds.left - bounds.width / 2;
        const y = e.clientY - bounds.top - bounds.height / 2;
        
        gsap.to(link, {
            x: x * 0.3,
            y: y * 0.3,
            duration: 0.6,
            ease: 'power4.out'
        });
    });

    link.addEventListener('mouseleave', () => {
        gsap.to(link, {
            x: 0,
            y: 0,
            duration: 0.6,
            ease: 'elastic.out(1, 0.3)'
        });
    });
});

// Noise Effect
const noise = () => {
    let canvas, ctx;
    let wWidth, wHeight;
    let noiseData = [];
    let frame = 0;
    let loopTimeout;

    // Create Noise
    const createNoise = () => {
        const idata = ctx.createImageData(wWidth, wHeight);
        const buffer32 = new Uint32Array(idata.data.buffer);
        const len = buffer32.length;

        for (let i = 0; i < len; i++) {
            if (Math.random() < 0.5) {
                buffer32[i] = 0xff000000;
            }
        }

        noiseData.push(idata);
    };

    // Play Noise
    const paintNoise = () => {
        if (frame === 9) {
            frame = 0;
        } else {
            frame++;
        }

        ctx.putImageData(noiseData[frame], 0, 0);
    };

    // Loop
    const loop = () => {
        paintNoise(frame);
        loopTimeout = window.setTimeout(() => {
            window.requestAnimationFrame(loop);
        }, (1000 / 25));
    };

    // Setup
    const setup = () => {
        wWidth = window.innerWidth;
        wHeight = window.innerHeight;

        canvas.width = wWidth;
        canvas.height = wHeight;

        for (let i = 0; i < 10; i++) {
            createNoise();
        }

        loop();
    };

    // Reset
    let resizeThrottle;
    const reset = () => {
        window.addEventListener('resize', () => {
            window.clearTimeout(resizeThrottle);
            resizeThrottle = window.setTimeout(() => {
                window.clearTimeout(loopTimeout);
                setup();
            }, 200);
        }, false);
    };

    // Init
    const init = (() => {
        canvas = document.getElementById('noise');
        ctx = canvas.getContext('2d');
        setup();
    })();
};

noise();
