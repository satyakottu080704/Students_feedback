// Global configuration and utilities
const CONFIG = {
    animationDuration: 300,
    scrollThreshold: 100,
    debounceDelay: 250,
    fadeInDelay: 800
};

// Utility functions
const utils = {
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    throttle: (func, limit) => {
        let inThrottle;
        return function () {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    isElementInViewport: (el) => {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    },

    addClassWithDelay: (element, className, delay = 0) => {
        setTimeout(() => {
            element.classList.add(className);
        }, delay);
    }
};

// Enhanced animations and effects
class AnimationManager {
    constructor() {
        this.animatedElements = new Set();
        this.observer = null;
        this.initIntersectionObserver();
    }

    initIntersectionObserver() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.animatedElements.has(entry.target)) {
                    this.animateElement(entry.target);
                    this.animatedElements.add(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '50px'
        });
    }

    animateElement(element) {
        const animationType = element.dataset.animation || 'fadeIn';

        switch (animationType) {
            case 'fadeIn':
                this.fadeInAnimation(element);
                break;
            case 'slideIn':
                this.slideInAnimation(element);
                break;
            case 'scaleIn':
                this.scaleInAnimation(element);
                break;
            default:
                this.fadeInAnimation(element);
        }
    }

    fadeInAnimation(element) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = `opacity ${CONFIG.fadeInDelay}ms ease, transform ${CONFIG.fadeInDelay}ms ease`;

        requestAnimationFrame(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        });
    }

    slideInAnimation(element) {
        element.style.opacity = '0';
        element.style.transform = 'translateX(-50px)';
        element.style.transition = `opacity ${CONFIG.fadeInDelay}ms ease, transform ${CONFIG.fadeInDelay}ms ease`;

        requestAnimationFrame(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateX(0)';
        });
    }

    scaleInAnimation(element) {
        element.style.opacity = '0';
        element.style.transform = 'scale(0.8)';
        element.style.transition = `opacity ${CONFIG.fadeInDelay}ms ease, transform ${CONFIG.fadeInDelay}ms ease`;

        requestAnimationFrame(() => {
            element.style.opacity = '1';
            element.style.transform = 'scale(1)';
        });
    }

    observeElements(selector) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => this.observer.observe(element));
    }
}

// Enhanced card interactions
class CardManager {
    constructor() {
        this.cards = document.querySelectorAll('.card');
        this.initCardEffects();
    }

    initCardEffects() {
        this.cards.forEach(card => {
            this.addCardHoverEffects(card);
            this.addCardClickEffects(card);
        });
    }

    addCardHoverEffects(card) {
        card.addEventListener('mouseenter', () => {
            this.enhanceCard(card);
        });

        card.addEventListener('mouseleave', () => {
            this.resetCard(card);
        });
    }

    addCardClickEffects(card) {
        card.addEventListener('click', (e) => {
            if (e.target.tagName !== 'A') {
                this.createRippleEffect(e, card);
            }
        });
    }

    enhanceCard(card) {
        card.style.transform = 'translateY(-8px) scale(1.02)';
        card.style.boxShadow = '0 20px 50px rgba(0, 0, 0, 0.25)';
    }

    resetCard(card) {
        card.style.transform = 'translateY(0) scale(1)';
        card.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.15)';
    }

    createRippleEffect(event, element) {
        const ripple = document.createElement('span');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;

        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.6);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;

        element.style.position = 'relative';
        element.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
}

// Enhanced button interactions
class ButtonManager {
    constructor() {
        this.buttons = document.querySelectorAll('.btn');
        this.initButtonEffects();
    }

    initButtonEffects() {
        this.buttons.forEach(button => {
            this.addButtonHoverEffects(button);
            this.addButtonClickEffects(button);
        });
    }

    addButtonHoverEffects(button) {
        button.addEventListener('mouseenter', () => {
            this.enhanceButton(button);
        });

        button.addEventListener('mouseleave', () => {
            this.resetButton(button);
        });
    }

    addButtonClickEffects(button) {
        button.addEventListener('click', (e) => {
            this.createButtonRipple(e, button);
        });
    }

    enhanceButton(button) {
        button.style.transform = 'translateY(-3px) scale(1.05)';
        button.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.8)';
    }

    resetButton(button) {
        button.style.transform = 'translateY(0) scale(1)';
        button.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)';
    }

    createButtonRipple(event, button) {
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;

        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.8);
            border-radius: 50%;
            transform: scale(0);
            animation: buttonRipple 0.4s linear;
            pointer-events: none;
        `;

        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 400);
    }
}

// Enhanced list group interactions
class ListGroupManager {
    constructor() {
        this.listItems = document.querySelectorAll('.list-group-item');
        this.initListEffects();
    }

    initListEffects() {
        this.listItems.forEach((item, index) => {
            this.addListItemEffects(item, index);
        });
    }

    addListItemEffects(item, index) {
        item.addEventListener('mouseenter', () => {
            this.enhanceListItem(item);
        });

        item.addEventListener('mouseleave', () => {
            this.resetListItem(item);
        });

        // Staggered animation on page load
        utils.addClassWithDelay(item, 'fade-in', index * 100);
    }

    enhanceListItem(item) {
        item.style.transform = 'translateX(8px) scale(1.02)';
        item.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        item.style.color = 'white';
    }

    resetListItem(item) {
        item.style.transform = 'translateX(0) scale(1)';
        item.style.background = '';
        item.style.color = '';
    }
}
