class LiquidLoader {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) return;

        this.heights = [0, 0, 0, 0, 0, 0, 0];
        this.droplets = [false, false, false, false, false, false, false];
        this.colors = [
            'grad-0', 'grad-1', 'grad-2', 'grad-3', 'grad-4', 'grad-5', 'grad-6'
        ];
        this.barColors = [
            'grad-bar-0', 'grad-bar-1', 'grad-bar-2', 'grad-bar-3', 'grad-bar-4', 'grad-bar-5', 'grad-bar-6'
        ];

        this.elements = [];
        this.init();
    }

    init() {
        // Clear container and create wrapper
        this.container.innerHTML = '';
        const loaderWrapper = document.createElement('div');
        loaderWrapper.id = 'liquid-loader-container';
        this.container.appendChild(loaderWrapper);

        // Create DOM elements
        for (let i = 0; i < 7; i++) {
            const col = document.createElement('div');
            col.className = 'liquid-bar-wrapper';

            // Top Droplet
            const droplet = document.createElement('div');
            droplet.className = `droplet ${this.colors[i]}`;
            col.appendChild(droplet);

            // Main Bar
            const bar = document.createElement('div');
            bar.className = `liquid-bar ${this.barColors[i]}`;

            // Internal effects
            const surface = document.createElement('div');
            surface.className = 'liquid-surface';
            bar.appendChild(surface);

            const wave = document.createElement('div');
            wave.className = 'liquid-wave';
            bar.appendChild(wave);

            const shimmer = document.createElement('div');
            shimmer.className = 'liquid-shimmer';
            bar.appendChild(shimmer);

            const bubble = document.createElement('div');
            bubble.className = 'liquid-bubble';
            bar.appendChild(bubble);

            col.appendChild(bar);

            // Base Droplet
            const baseDroplet = document.createElement('div');
            baseDroplet.className = `base-droplet ${this.colors[i]}`;
            col.appendChild(baseDroplet);

            loaderWrapper.appendChild(col);

            // Store references
            this.elements.push({
                droplet,
                bar,
                surface,
                wave,
                shimmer,
                bubble,
                baseDroplet
            });
        }

        this.startAnimation();
    }

    startAnimation() {
        // Use setInterval to match the React 32ms timing
        setInterval(() => {
            this.updatePhysics();
            this.render();
        }, 32);
    }

    updatePhysics() {
        this.heights = this.heights.map((height, index) => {
            const maxHeight = 80;
            const delay = index * 0.8;
            const time = Date.now() * 0.001;

            const primaryWave = Math.sin(time + delay);
            const bounceWave = Math.sin(time * 4 + delay) * 0.15;
            const ripple = Math.sin(time * 8 + delay) * 0.05;

            return maxHeight * (primaryWave + bounceWave + ripple);
        });

        this.droplets = this.droplets.map((_, index) => {
            const delay = index * 0.8;
            const time = Date.now() * 0.001;
            const waveValue = Math.sin(time + delay);
            return waveValue > 0.8;
        });
    }

    render() {
        const time = Date.now();

        this.elements.forEach((el, index) => {
            // Update Droplet
            const isDropletVisible = this.droplets[index];
            el.droplet.style.opacity = isDropletVisible ? '1' : '0';

            const dropTransY = Math.sin(time * 0.008 + index * 0.5) * 3;
            const dropScale = 0.8 + Math.sin(time * 0.006 + index * 0.3) * 0.4;

            el.droplet.style.transform = isDropletVisible
                ? `translateY(${dropTransY}px) scale(${dropScale})`
                : 'translateY(10px) scale(0.5)';

            // Update Bar
            const height = this.heights[index];
            el.bar.style.height = `${Math.abs(height)}px`;
            el.bar.style.transform = height < 0 ? 'scaleY(-1)' : 'scaleY(1)';
            el.bar.style.transformOrigin = 'bottom';

            const colorHex = this.getColorHex(index);
            el.bar.style.boxShadow = `0 0 20px ${colorHex}50, inset 0 0 20px rgba(255,255,255,0.1)`;

            // Update Surface
            const surfY = Math.sin(time * 0.003 + index * 0.5) * 1;
            const surfScale = 0.8 + Math.sin(time * 0.004 + index * 0.3) * 0.3;
            el.surface.style.transform = `translateY(${surfY}px) scaleY(${surfScale})`;

            // Update Wave
            const waveY = Math.sin(time * 0.002 + index * 0.5) * 2;
            el.wave.style.transform = `translateY(${waveY}px)`;

            // Update Shimmer
            const shimX = Math.sin(time * 0.0015 + index * 0.7) * 8;
            el.shimmer.style.transform = `translateX(${shimX}px)`;

            // Update Bubble
            const bubTop = 20 + Math.sin(time * 0.003 + index * 0.8) * 10;
            const bubLeft = 30 + Math.sin(time * 0.002 + index * 0.6) * 20;
            const bubScale = 0.5 + Math.sin(time * 0.004 + index * 0.4) * 0.5;
            const bubOp = Math.sin(time * 0.005 + index * 0.9) * 0.3 + 0.3;

            el.bubble.style.top = `${bubTop}%`;
            el.bubble.style.left = `${bubLeft}%`;
            el.bubble.style.transform = `scale(${bubScale})`;
            el.bubble.style.opacity = bubOp;

            // Update Base Droplet
            const baseOp = Math.sin(time * 0.003 + index * 0.9) * 0.4 + 0.6;
            const baseScale = 0.6 + Math.sin(time * 0.002 + index * 0.6) * 0.4;
            const baseY = Math.sin(time * 0.004 + index * 0.8) * 1;

            el.baseDroplet.style.opacity = baseOp;
            el.baseDroplet.style.transform = `scale(${baseScale}) translateY(${baseY}px)`;
            el.baseDroplet.style.boxShadow = `0 2px 8px ${colorHex}40`;
        });
    }

    getColorHex(index) {
        // Map index to approx primary color for shadows
        const shadowColors = [
            '#a855f7', // purple
            '#3b82f6', // blue
            '#06b6d4', // cyan
            '#10b981', // green
            '#eab308', // yellow
            '#f97316', // orange
            '#ef4444'  // red
        ];
        return shadowColors[index];
    }
}

// Global init to be called from main script
document.addEventListener('DOMContentLoaded', () => {
    // Only init if the container exists
    if (document.getElementById('loader-target')) {
        new LiquidLoader('loader-target');
    }
});
