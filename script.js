// ==========================================================
// script.js - used by every page
// 1. Mobile menu (hamburger)
// 2. Highlight the current page in the navigation
// 3. Contact form message
// ==========================================================


// ---------- 1. Mobile menu ----------
// The "Menu" button only shows on small screens (see styles.css).
// Clicking it adds or removes the class "open" on the nav,
// and CSS shows or hides the links based on that class.
const navToggle = document.getElementById("nav-toggle");
const siteNav = document.getElementById("site-nav");

if (navToggle && siteNav) {
    navToggle.addEventListener("click", function () {
        const isOpen = siteNav.classList.toggle("open");
        navToggle.setAttribute("aria-expanded", String(isOpen));
    });
}


// ---------- 2. Active navigation link ----------
// Get the file name of the current page (like "projects.html"),
// then mark the matching link so CSS can highlight it.
const currentPage = window.location.pathname.split("/").pop() || "index.html";
const navLinks = document.querySelectorAll(".site-nav a");

navLinks.forEach(function (link) {
    if (link.getAttribute("href") === currentPage) {
        link.classList.add("active");
        link.setAttribute("aria-current", "page");
    }
});


// ---------- 3. Contact form ----------
// This only runs on contact.html, because the form only exists there.
// There is no server, so nothing is really sent. We just check the
// fields and show a message on the page.
const contactForm = document.getElementById("contact-form");
const formMessage = document.getElementById("form-message");

// Shows a message. "type" is either "success" or "error".
function showMessage(text, type) {
    formMessage.textContent = text;
    formMessage.className = "form-message show " + type;
}

if (contactForm && formMessage) {
    contactForm.addEventListener("submit", function (event) {
        // Stop the page from reloading when the form is submitted
        event.preventDefault();

        // Read what the visitor typed (trim removes extra spaces)
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const subject = document.getElementById("subject").value.trim();
        const message = document.getElementById("message").value.trim();

        // Check that every field has something in it
        if (name === "" || email === "" || subject === "" || message === "") {
            showMessage("Please fill in all the fields.", "error");
            return;
        }

        // Very simple email check: it needs an @ and a dot
        if (!email.includes("@") || !email.includes(".")) {
            showMessage("Please enter a valid email address.", "error");
            return;
        }

        // Everything is fine
        showMessage("Thank you, " + name + "! Your message has been received.", "success");
        contactForm.reset();
    });
}
