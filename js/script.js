// ==========================================================
// Josh Arellano | Portfolio
// Runs on every page. Handles: theme toggle, mobile menu,
// current-page nav highlight, footer year.
// ==========================================================

const root = document.documentElement;

// ---------- Theme (light / dark) ----------
const themeButton = document.querySelector(".theme-toggle");

function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    if (themeButton) {
        const next = theme === "dark" ? "light" : "dark";
        themeButton.textContent = next === "dark" ? "Dark" : "Light";
        themeButton.setAttribute("aria-label", "Switch to " + next + " theme");
    }
}

function getSavedTheme() {
    try {
        return localStorage.getItem("theme");
    } catch (error) {
        return null;
    }
}

const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
applyTheme(getSavedTheme() || (prefersDark ? "dark" : "light"));

if (themeButton) {
    themeButton.addEventListener("click", function () {
        const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
        applyTheme(next);
        try {
            localStorage.setItem("theme", next);
        } catch (error) {
            // Saving is optional; the theme still changes for this visit.
        }
    });
}

// ---------- Mobile menu ----------
const menuButton = document.querySelector(".nav-toggle");
const siteNav = document.querySelector("#site-nav");

if (menuButton && siteNav) {
    menuButton.addEventListener("click", function () {
        const isOpen = siteNav.classList.toggle("is-open");
        menuButton.setAttribute("aria-expanded", String(isOpen));
    });
}

// ---------- Highlight the current page in the nav ----------
const currentFile = window.location.pathname.split("/").pop() || "index.html";

document.querySelectorAll(".site-nav a").forEach(function (link) {
    if (link.getAttribute("href") === currentFile) {
        link.setAttribute("aria-current", "page");
    }
});

// ---------- Footer year ----------
const yearSpan = document.querySelector("#year");
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}