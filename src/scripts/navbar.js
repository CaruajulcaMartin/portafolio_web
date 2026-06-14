// ── Scroll behavior ─────────────────────────────────────────────
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
        navbar?.classList.remove("bg-transparent");
        navbar?.classList.add("backdrop-blur-xl", "border-b", "shadow-lg");
        navbar?.style.setProperty("background", "linear-gradient(to bottom, rgba(13,17,23,0.95) 0%, rgba(13,17,23,0.80) 100%)");
        navbar?.style.setProperty("border-color", "var(--border)");
    } else {
        navbar?.classList.add("bg-transparent");
        navbar?.classList.remove("backdrop-blur-xl", "border-b", "shadow-lg");
        navbar?.style.removeProperty("background");
        navbar?.style.removeProperty("border-color");
  }
});

// ── Mobile menu ──────────────────────────────────────────────────
const menuBtn    = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");
const overlay    = document.getElementById("mobile-overlay");
const barTop     = document.getElementById("bar-top");
const barMiddle  = document.getElementById("bar-middle");
const barBottom  = document.getElementById("bar-bottom");

let isOpen = false;

function setMenuState(open) {
    isOpen = open;
    document.body.style.overflow = open ? "hidden" : "";

    if (open) {
        mobileMenu?.classList.remove("opacity-0", "pointer-events-none");
        mobileMenu?.classList.add("opacity-100", "pointer-events-auto");
    } else {
        mobileMenu?.classList.add("opacity-0", "pointer-events-none");
        mobileMenu?.classList.remove("opacity-100", "pointer-events-auto");
    }

    // Hamburger animation
    if (barTop && barMiddle && barBottom) {
        barTop.style.transform    = open ? "rotate(45deg) translateY(5px)"  : "";
        barMiddle.style.opacity   = open ? "0" : "1";
        barMiddle.style.width     = open ? "0" : "";
        barBottom.style.transform = open ? "rotate(-45deg) translateY(-5px)" : "";
    }

    menuBtn?.setAttribute("aria-expanded", String(open));
    menuBtn?.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
}

menuBtn?.addEventListener("click", () => setMenuState(!isOpen));
overlay?.addEventListener("click", () => setMenuState(false));

// Cerrar también al hacer clic en un link del menú móvil
document.querySelectorAll(".mobile-nav-link").forEach((link) => {
    link.addEventListener("click", () => setMenuState(false));
});

// ── Language toggle ──────────────────────────────────────────────
const langButtons = document.querySelectorAll(".lang-btn");

function setActiveLang(activeBtn) {
    langButtons.forEach((btn) => {
        const isActive = btn === activeBtn;
        btn.style.backgroundColor = isActive ? "var(--primary)" : "";
        btn.style.color           = isActive ? "var(--primary-foreground)" : "var(--muted-foreground)";
        btn.style.boxShadow       = isActive ? "0 1px 2px rgba(0,0,0,0.2)" : "";
    });
}

langButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
        setActiveLang(btn);
        document.dispatchEvent(new CustomEvent("langChange", { detail: btn.dataset.lang }));
    });
});

// Estado inicial
const initialActive = document.querySelector(".lang-btn.lang-btn-active");
if (initialActive) setActiveLang(initialActive);