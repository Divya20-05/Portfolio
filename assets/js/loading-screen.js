/**
 * AI Loading Screen
 * Handles the fade-out of the loading screen after page load
 */

class LoadingScreen {
    constructor() {
        this.container = document.getElementById('loading-screen');
        this.init();
    }

    init() {
        // Enforce a minimum display time for the animation (e.g., 2.5 seconds)
        const minDisplayTime = 2500;
        const startTime = Date.now();

        // Wait for the window to fully load (images, etc.)
        window.addEventListener('load', () => {
            const elapsedTime = Date.now() - startTime;
            const remainingTime = Math.max(0, minDisplayTime - elapsedTime);

            setTimeout(() => {
                this.fadeOut();
            }, remainingTime);
        });
    }

    fadeOut() {
        if (this.container) {
            this.container.style.opacity = '0';
            this.container.style.pointerEvents = 'none';

            // Remove from DOM after transition matches CSS transition time (0.5s)
            setTimeout(() => {
                this.container.remove();
            }, 500);
        }
    }
}

// Initialize loading screen
if (document.readyState === 'loading') {
    new LoadingScreen();
} else {
    // If DOM is already ready (unlikely for script at bottom, but safe)
    new LoadingScreen();
}
