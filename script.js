document.addEventListener("DOMContentLoaded", function () {
    const text = ["Software Engineer", "Digital Arts Pro Tutor"];
    let k = 0;
    let j = 0;
    let currentText = "";
    let isDeleting = false;

    function type() {
        currentText = text[k];

        if (!isDeleting) {
            document.getElementById("typing").innerHTML =
                currentText.substring(0, j++);

            if (j > currentText.length) {
                isDeleting = true;
                setTimeout(type, 1000);
                return;
            }
        } else {
            document.getElementById("typing").innerHTML =
                currentText.substring(0, j--);

            if (j < 0) {
                isDeleting = false;
                k++;
                if (k >= text.length) k = 0;
            }
        }

        setTimeout(type, isDeleting ? 50 : 100);
    }

    type();


    const faders = document.querySelectorAll('.fade-up, .fade-left, .fade-right');

    function showOnScroll() {
        const triggerBottom = window.innerHeight * 0.85;

        faders.forEach(el => {
            const boxTop = el.getBoundingClientRect().top;

            if (boxTop < triggerBottom) {
                el.classList.add('show');
            } else {
                el.classList.remove('show');
            }
        });
    }

    window.addEventListener('scroll', showOnScroll);
    showOnScroll();



    window.onscroll = function () {
        let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        let scrolled = (winScroll / height) * 100;
        document.getElementById("scrollBar").style.width = scrolled + "%";
    };

    window.addEventListener('scroll', function () {
        let scroll = window.scrollY;
        if (window.innerWidth > 768) {
            document.querySelector('.hero').style.transform = 'translateY(' + scroll * 0.3 + 'px)';
        } else {
            document.querySelector('.hero').style.transform = 'none';
        }
    });

    const nameText = "Dita";
    let i = 0;

    function typeName() {
        const el = document.getElementById("name-text");
        if (!el) return;

        if (i < nameText.length) {
            el.textContent += nameText.charAt(i);
            i++;
            setTimeout(typeName, 150);
        }
    }

    document.getElementById("name-text").textContent = "";
    typeName();

    const runCounter = (counter) => {
        const target = +counter.getAttribute('data-target');
        const start = +counter.getAttribute('data-start');
        const plus = counter.getAttribute('data-plus') || '';
        let count = start;

        const totalDuration = 3000;
        const stepTime = Math.max(Math.floor(totalDuration / target), 50);

        const increment = () => {
            if (count < target) {
                count++;
                counter.textContent = count + plus;
                setTimeout(increment, stepTime);
            } else {
                counter.textContent = target + plus;
            }
        };

        increment();
    };

    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                runCounter(counter);
                observer.unobserve(counter);
            }
        });
    }, {
        threshold: 0.5
    });

    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });

    const cards = document.querySelectorAll(".skill-card");

    cards.forEach(card => {
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = -(y - centerY) / 10;
            const rotateY = (x - centerX) / 10;

            card.style.transform = `scale(1.15) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = "scale(1)";
        });
    });

    function openModal(imgSrc) {
        document.getElementById("modal").style.display = "flex";
        document.getElementById("modal-img").src = imgSrc;
    }

    function closeModal() {
        document.getElementById("modal").style.display = "none";
    }

    const certImages = document.querySelectorAll('.cert-grid img');
    const certModal = document.getElementById('certModal');
    const certPreview = document.getElementById('certPreview');

    certImages.forEach(img => {
        img.onclick = () => {
            certModal.style.display = 'flex';
            certPreview.src = img.src;
        }
    });

    certModal.onclick = () => {
        certModal.style.display = 'none';
    }

    function revealOnScroll() {
        const reveals = document.querySelectorAll(".reveal");

        reveals.forEach((element) => {
            const windowHeight = window.innerHeight;
            const elementTop = element.getBoundingClientRect().top;
            const visiblePoint = 100;

            if (elementTop < windowHeight - visiblePoint) {
                element.classList.add("active");
            } else {
                element.classList.remove("active");
            }
        });
    }

    window.addEventListener("scroll", revealOnScroll);

    window.addEventListener("scroll", function () {
        let navbar = document.querySelector(".navbar");
        navbar.classList.toggle("scrolled", window.scrollY > 50);
    });

});

function toggleMenu() {
    document.getElementById("navMenu").classList.toggle("show");
}

document.querySelectorAll('#navMenu a').forEach(link => {
    link.addEventListener('click', () => {
        document.getElementById("navMenu").classList.remove("show");
    });
});