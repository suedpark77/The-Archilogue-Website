"use strict";

// Load More Functionality
function loadMore() {
    const loadContent = document.getElementById("load-more");
    loadContent.style.display = "flex";

    const loadButton = document.getElementById("load-more-click");
    loadButton.style.opacity = "0";

    const loadOverlay = document.getElementById("load-more-overlay-toggle");
    loadOverlay.style.opacity = "0";
    loadOverlay.style.display = "none";
}

// Toggle Search Dropdown
function toggleSearch() {
    const searchDropdown = document.getElementById("search-dropdown");
    searchDropdown.style.display = (searchDropdown.style.display === "block") ? "none" : "block";
}

// Close dropdown when clicking outside
document.addEventListener("click", function (event) {
    const searchDropdown = document.getElementById("search-dropdown");
    const searchButton = document.getElementById("search-button");

    if (
        searchDropdown &&
        searchButton &&
        searchDropdown.style.display === "block" &&
        !searchDropdown.contains(event.target) &&
        !searchButton.contains(event.target)
    ) {
        searchDropdown.style.display = "none";
    }
});

// Lazy Loading Content with IntersectionObserver
document.addEventListener("DOMContentLoaded", () => {
    const contentBlocks = document.querySelectorAll(".content");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target); // Stop observing once it's loaded
            }
        });
    }, { threshold: 0.1 });

    contentBlocks.forEach((block) => observer.observe(block));
});

// topnav curtain menu
function openNav() {
    document.getElementById("topnav-xs-button").style.transform = "rotate(360deg)";
    const topnavCurtain = document.getElementById("topnav-xs-curtain");
    const topnavOpacity = document.getElementById("topnav-xs-container");
    const topnavY = document.getElementById("topnav-xs-container");
    if (topnavCurtain.style.height !== "100%") {
        topnavCurtain.style.height = "100%";
        topnavOpacity.style.opacity = "1";
        topnavY.style.transform = "translateY(500px)";
        
    } else {
        topnavCurtain.style.height = "0%";
        document.getElementById("topnav-xs-button").style.transform = "rotate(0deg)";
        topnavOpacity.style.opacity = "0";
        topnavY.style.transform = "translateY(-500px)";
    }
}

