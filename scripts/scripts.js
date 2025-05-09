document.addEventListener("DOMContentLoaded", () => {
  // Preloader
  setTimeout(() => {
    document.querySelector(".preloader").style.opacity = "0";
    document.querySelector(".preloader").style.visibility = "hidden";
  }, 1500);

  // Set dark mode as default on page load
  document.body.classList.add("dark");

  // Initialize theme icons for both desktop and mobile
  const themeToggle = document.getElementById("theme-toggle");
  const themeIcon = themeToggle.querySelector("i");
  const mobileThemeToggle = document.getElementById("mobile-theme-toggle");
  const mobileThemeIcon = mobileThemeToggle.querySelector("i");

  // Set initial icons to sun since dark mode is active by default
  themeIcon.classList.remove("fa-moon");
  themeIcon.classList.add("fa-sun");
  mobileThemeIcon.classList.remove("fa-moon");
  mobileThemeIcon.classList.add("fa-sun");

  // Initialize Typed.js
  const typed = new Typed("#element", {
    strings: [
      "Works",
      "Projects",
      "Achievements",
      "Skills",
      "Certifications",
      "Presentations",
      "Research",
      "Education",
      "Hobbies",
    ],
    typeSpeed: 20,
    backSpeed: 15,
    loop: true,
  });

  // Navigation active state
  const navItems = document.querySelectorAll(".nav-item");

  navItems.forEach((item) => {
    item.addEventListener("click", function () {
      navItems.forEach((nav) => nav.classList.remove("active"));
      this.classList.add("active");
    });
  });

  // Skill category selection
  const skillCategories = document.querySelectorAll(".skill-category");
  const skillGroups = document.querySelectorAll(".skills-group");

  skillCategories.forEach((category, index) => {
    category.addEventListener("click", function () {
      // Update active category
      skillCategories.forEach((cat) => cat.classList.remove("active"));
      this.classList.add("active");

      // Show corresponding skills group
      skillGroups.forEach((group) => group.classList.remove("active"));
      skillGroups[index].classList.add("active");
    });
  });

  // Skills tooltips
  const techBadges = document.querySelectorAll(".tech-badge");
  const tooltip = document.getElementById("tooltip");

  techBadges.forEach((badge) => {
    badge.addEventListener("mouseenter", function () {
      const info = this.getAttribute("data-info");
      if (info) {
        tooltip.textContent = info;
        tooltip.style.display = "block";

        // Position the tooltip
        const rect = this.getBoundingClientRect();
        const tooltipWidth = 250;

        // Check if tooltip would go off-screen to the right
        if (rect.right + tooltipWidth > window.innerWidth) {
          tooltip.style.left = rect.left - tooltipWidth + "px";
        } else {
          tooltip.style.left = rect.right + 10 + "px";
        }

        tooltip.style.top = rect.top + "px";
      }
    });

    badge.addEventListener("mouseleave", () => {
      tooltip.style.display = "none";
    });
  });

  // Theme toggle functionality for desktop
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
      themeIcon.classList.remove("fa-moon");
      themeIcon.classList.add("fa-sun");
      mobileThemeIcon.classList.remove("fa-moon");
      mobileThemeIcon.classList.add("fa-sun");
    } else {
      themeIcon.classList.remove("fa-sun");
      themeIcon.classList.add("fa-moon");
      mobileThemeIcon.classList.remove("fa-sun");
      mobileThemeIcon.classList.add("fa-moon");
    }
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      if (this.getAttribute("href") !== "#") {
        e.preventDefault();

        const targetId = this.getAttribute("href");
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 100,
            behavior: "smooth",
          });
        }
      }
    });
  });

  // Back to top button
  document.querySelector(".back-to-top").addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // Animate progress bars when they come into view
  const progressBars = document.querySelectorAll(".progress");

  // Create an Intersection Observer
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Get the width from the style attribute
          const width = entry.target.style.width;

          // Animate from 0 to the target width
          entry.target.style.width = "0";
          setTimeout(() => {
            entry.target.style.width = width;
          }, 100);

          // Unobserve after animation
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  // Observe each progress bar
  progressBars.forEach((bar) => {
    observer.observe(bar);
  });

  // Active navigation highlighting based on scroll position
  const sections = document.querySelectorAll("section");

  window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      // Using section.clientHeight for height, though it's not used here explicitly
      if (scrollY >= sectionTop - 200) {
        current = section.getAttribute("id");
      }
    });

    // Update desktop nav
    navItems.forEach((item) => {
      item.classList.remove("active");
      if (item.getAttribute("href") === `#${current}`) {
        item.classList.add("active");
      }
    });

    // Update mobile nav
    mobileNavItems.forEach((item) => {
      item.classList.remove("active");
      if (item.getAttribute("href") === `#${current}`) {
        item.classList.add("active");
      }
    });
  });

  // Hamburger menu functionality
  const menuToggle = document.getElementById("menu-toggle");
  const mobileNav = document.querySelector(".mobile-nav");
  const mobileNavItems = document.querySelectorAll(".mobile-nav .nav-item");

  // Toggle mobile menu
  menuToggle.addEventListener("click", () => {
    menuToggle.classList.toggle("active");
    mobileNav.classList.toggle("active");
    document.body.classList.toggle("no-scroll");
  });

  // Close mobile menu when clicking a nav item
  mobileNavItems.forEach((item) => {
    item.addEventListener("click", function () {
      menuToggle.classList.remove("active");
      mobileNav.classList.remove("active");
      document.body.classList.remove("no-scroll");

      // Update active state for mobile nav
      mobileNavItems.forEach((nav) => nav.classList.remove("active"));
      this.classList.add("active");

      // Also update desktop nav
      const href = this.getAttribute("href");
      navItems.forEach((nav) => {
        if (nav.getAttribute("href") === href) {
          nav.classList.add("active");
        } else {
          nav.classList.remove("active");
        }
      });
    });
  });

  // Mobile theme toggle functionality
  mobileThemeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
      mobileThemeIcon.classList.remove("fa-moon");
      mobileThemeIcon.classList.add("fa-sun");
      themeIcon.classList.remove("fa-moon");
      themeIcon.classList.add("fa-sun");
    } else {
      mobileThemeIcon.classList.remove("fa-sun");
      mobileThemeIcon.classList.add("fa-moon");
      themeIcon.classList.remove("fa-sun");
      themeIcon.classList.add("fa-moon");
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const img = document.getElementById('profile-pic');
  const tooltip = document.getElementById('instagram-tooltip');

  // Show tooltip on hover
  img.addEventListener('mouseenter', () => {
    tooltip.style.opacity = '1';
  });

  // Move tooltip with cursor
  img.addEventListener('mousemove', (e) => {
    const rect = img.getBoundingClientRect();
    // Calculate relative X/Y inside the image container
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    // Position tooltip
    tooltip.style.left  = `${x}px`;
    tooltip.style.top   = `${y}px`;
  });

  // Hide tooltip when leaving image
  img.addEventListener('mouseleave', () => {
    tooltip.style.opacity = '0';
  });
});

// Add this to the top of your CSS styles dynamically
document.head.insertAdjacentHTML(
  "beforeend",
  `
    <style>
        .no-scroll {
            overflow: hidden;
        }
    </style>
  `
);
