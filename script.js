/* =========================================================
   01. MOBILE NAVIGATION
========================================================= */

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", () => {

        const isOpen = navLinks.classList.toggle("open");

        menuToggle.classList.toggle("open", isOpen);

        menuToggle.setAttribute(
            "aria-expanded",
            isOpen ? "true" : "false"
        );

    });


    /* Close menu when clicking a navigation link */

    const navigationItems = navLinks.querySelectorAll("a");

    navigationItems.forEach((link) => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("open");

            menuToggle.classList.remove("open");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        });

    });


    /* Close menu when clicking outside */

    document.addEventListener("click", (event) => {

        const clickedInsideMenu =
            navLinks.contains(event.target);

        const clickedMenuButton =
            menuToggle.contains(event.target);

        if (
            !clickedInsideMenu &&
            !clickedMenuButton &&
            navLinks.classList.contains("open")
        ) {

            navLinks.classList.remove("open");

            menuToggle.classList.remove("open");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    });

}



/* =========================================================
   02. ACTIVE NAVIGATION LINK
========================================================= */

const sections = document.querySelectorAll(
    "main section[id]"
);

const navItems = document.querySelectorAll(
    ".nav-link"
);


function updateActiveNavigation() {

    const scrollPosition =
        window.scrollY + 150;

    let currentSection = "";

    sections.forEach((section) => {

        const sectionTop = section.offsetTop;

        const sectionHeight = section.offsetHeight;

        if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionTop + sectionHeight
        ) {

            currentSection = section.getAttribute("id");

        }

    });


    navItems.forEach((link) => {

        link.classList.remove("active");

        const href = link.getAttribute("href");

        if (
            href === `#${currentSection}` ||
            (
                currentSection === "class-xi-notes" &&
                href === "#notes"
            ) ||
            (
                currentSection === "class-xii-notes" &&
                href === "#notes"
            )
        ) {

            link.classList.add("active");

        }

    });

}


window.addEventListener(
    "scroll",
    updateActiveNavigation,
    { passive: true }
);

updateActiveNavigation();



/* =========================================================
   03. SCROLL REVEAL
========================================================= */

const revealElements = document.querySelectorAll(
    ".class-card, .note-card, .about-content, .about-image-wrapper, .contact-card"
);


revealElements.forEach((element) => {

    element.style.opacity = "0";

    element.style.transform = "translateY(18px)";

    element.style.transition =
        "opacity 0.65s ease, transform 0.65s ease";

});


const revealObserver = new IntersectionObserver(
    (entries, observer) => {

        entries.forEach((entry) => {

            if (!entry.isIntersecting) {
                return;
            }

            entry.target.style.opacity = "1";

            entry.target.style.transform =
                "translateY(0)";

            observer.unobserve(entry.target);

        });

    },
    {
        threshold: 0.12
    }
);


revealElements.forEach((element) => {

    revealObserver.observe(element);

});



/* =========================================================
   04. SMOOTH SCROLL FALLBACK
========================================================= */

document.querySelectorAll(
    'a[href^="#"]'
).forEach((link) => {

    link.addEventListener("click", (event) => {

        const targetId =
            link.getAttribute("href");

        if (
            !targetId ||
            targetId === "#"
        ) {
            return;
        }

        const target =
            document.querySelector(targetId);

        if (!target) {
            return;
        }

        event.preventDefault();

        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });

});



/* =========================================================
   05. DOWNLOAD BUTTON FEEDBACK
========================================================= */

const downloadButtons =
    document.querySelectorAll(".download-btn");


downloadButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const originalText =
            button.innerHTML;

        button.innerHTML =
            "Downloading <span>↓</span>";

        button.style.pointerEvents = "none";


        setTimeout(() => {

            button.innerHTML =
                originalText;

            button.style.pointerEvents =
                "";

        }, 1600);

    });

});



/* =========================================================
   06. CURRENT YEAR
========================================================= */

const footerYear =
    document.querySelector(".footer-bottom p");


if (footerYear) {

    const currentYear =
        new Date().getFullYear();

    footerYear.textContent =
        `© ${currentYear} Your Name. All rights reserved.`;

}