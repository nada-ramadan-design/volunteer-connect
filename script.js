
"use strict";

// Get HTML elements
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const cards = Array.from(document.querySelectorAll(".card"));
const noResults = document.getElementById("noResults");
const resultsCount = document.getElementById("resultsCount");
const resetFilters = document.getElementById("resetFilters");

const detailsDialog = document.getElementById("detailsDialog");
const applicationDialog = document.getElementById("applicationDialog");

const detailsTitle = document.getElementById("detailsTitle");
const detailsCategory = document.getElementById("detailsCategory");
const detailsDescription = document.getElementById("detailsDescription");
const detailsTime = document.getElementById("detailsTime");
const detailsLocation = document.getElementById("detailsLocation");

const selectedOpportunity = document.getElementById("selectedOpportunity");
const applicationForm = document.getElementById("applicationForm");
const formMessage = document.getElementById("formMessage");

const closeDetails = document.getElementById("closeDetails");
const closeApplication = document.getElementById("closeApplication");
const applyButton = document.getElementById("applyButton");

let currentOpportunity = "";

// Search and filter opportunities
function filterOpportunities() {
    const searchText = searchInput.value.toLowerCase().trim();
    const selectedCategory = categoryFilter.value;

    let visibleCount = 0;

    cards.forEach(function (card) {
        const title = card.querySelector("h3").textContent.toLowerCase();
        const description = card.querySelector(".card-description")
            .textContent.toLowerCase();

        const category = card.dataset.category;

        const matchesSearch =
            title.includes(searchText) ||
            description.includes(searchText) ||
            category.includes(searchText);

        const matchesCategory =
            selectedCategory === "all" ||
            category === selectedCategory;

        const shouldShow = matchesSearch && matchesCategory;

        card.hidden = !shouldShow;

        if (shouldShow) {
            visibleCount++;
        }
    });

    resultsCount.textContent =
        `Showing ${visibleCount} of ${cards.length} opportunities`;

    noResults.hidden = visibleCount !== 0;
}

// Listen for search and filter changes
searchInput.addEventListener("input", filterOpportunities);
categoryFilter.addEventListener("change", filterOpportunities);

// Reset search and category filters
resetFilters.addEventListener("click", function () {
    searchInput.value = "";
    categoryFilter.value = "all";

    filterOpportunities();
    searchInput.focus();
});

// Open opportunity details
document.querySelectorAll(".details-button").forEach(function (button) {
    button.addEventListener("click", function () {
        currentOpportunity = button.dataset.title;

        detailsTitle.textContent = button.dataset.title;
        detailsCategory.textContent = button.dataset.category;
        detailsDescription.textContent = button.dataset.description;
        detailsTime.textContent = button.dataset.time;
        detailsLocation.textContent = button.dataset.location;

        detailsDialog.showModal();
    });
});

// Close details dialog
closeDetails.addEventListener("click", function () {
    detailsDialog.close();
});

// Open the application form
applyButton.addEventListener("click", function () {
    detailsDialog.close();

    selectedOpportunity.textContent =
        "Applying for: " + currentOpportunity;

    applicationForm.reset();

    formMessage.textContent = "";
    formMessage.classList.remove("error");

    applicationDialog.showModal();
});

// Close application dialog
closeApplication.addEventListener("click", function () {
    applicationDialog.close();
});

// Close a dialog by clicking outside its content
[detailsDialog, applicationDialog].forEach(function (dialog) {
    dialog.addEventListener("click", function (event) {
        if (event.target === dialog) {
            dialog.close();
        }
    });
});

// Validate and handle the demo application
applicationForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const fullName = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const motivation = document.getElementById("motivation").value.trim();

    formMessage.classList.remove("error");

    if (!fullName || !email || motivation.length < 10) {
        formMessage.textContent =
            "Please complete every field and write at least 10 characters about your motivation.";

        formMessage.classList.add("error");
        return;
    }

    formMessage.textContent =
        `Thank you, ${fullName}! Your demo application for ` +
        `${currentOpportunity} has been completed successfully.`;

    // This is a demo: no data is sent to a server.
    applicationForm.reset();
});

// Set the initial opportunity count
filterOpportunities();
