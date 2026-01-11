/**
 * Project Card Expand/Collapse Functionality
 */

document.addEventListener('DOMContentLoaded', function () {
    // Get all project cards
    const projectCards = document.querySelectorAll('.work__card');

    projectCards.forEach((card, index) => {
        const description = card.querySelector('.work__description');
        const content = card.querySelector('.work__content');

        if (!description) return;

        // Add collapsed class initially
        description.classList.add('collapsed');

        // Create Read More button
        const readMoreBtn = document.createElement('button');
        readMoreBtn.className = 'read-more-btn';
        readMoreBtn.textContent = 'Read More';
        readMoreBtn.setAttribute('aria-expanded', 'false');
        readMoreBtn.setAttribute('aria-controls', `project-desc-${index}`);

        description.setAttribute('id', `project-desc-${index}`);

        // Insert button after description
        description.insertAdjacentElement('afterend', readMoreBtn);

        // Toggle functionality
        readMoreBtn.addEventListener('click', function () {
            const isExpanded = description.classList.contains('expanded');

            if (isExpanded) {
                // Collapse
                description.classList.remove('expanded');
                description.classList.add('collapsed');
                card.classList.remove('expanded');
                readMoreBtn.textContent = 'Read More';
                readMoreBtn.setAttribute('aria-expanded', 'false');

                // Smooth scroll to card top when collapsing
                setTimeout(() => {
                    card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }, 100);
            } else {
                // Expand
                description.classList.remove('collapsed');
                description.classList.add('expanded');
                card.classList.add('expanded');
                readMoreBtn.textContent = 'Read Less';
                readMoreBtn.setAttribute('aria-expanded', 'true');
            }
        });
    });
});
