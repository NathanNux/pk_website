// to fix the issue with the navigation bug (when click on the current page's link) Lets build better solution
const activeObservers = new Map();
const activeScrollHandlers = new Map();

export function detectBGcolor(logoSelector, type = 'logo') {
    if (typeof window === 'undefined') return;

    // Handle both DOM element references and selector strings
    let element;
    if (typeof logoSelector === 'string') {
        element = document.querySelector(logoSelector);
    } else {
        element = logoSelector; // It's already a DOM reference
    }

    if (!element) return;   

    // Generate a unique ID for this element
    const elementId = element.getAttribute('data-observer-id') || 
                     `logo-${Math.random().toString(36).substr(2, 9)}`;
    element.setAttribute('data-observer-id', elementId);
    
    // Clean up any existing observers for this element
    if (activeObservers.has(elementId)) {
        activeObservers.get(elementId).disconnect();
        activeObservers.delete(elementId);
    }
    
    if (activeScrollHandlers.has(elementId)) {
        window.removeEventListener('scroll', activeScrollHandlers.get(elementId));
        activeScrollHandlers.delete(elementId);
    }

    // Recursive function to get the effective background color of an element
    function getEffectiveBackgroundColor(el) {
        if (!el || !document.body.contains(el)) return 'rgb(255, 255, 255)';
        
        try {
            const bgColor = window.getComputedStyle(el).backgroundColor;
            
            if (bgColor === 'rgba(0, 0, 0, 0)' || bgColor === 'transparent') {
                if (el.parentElement) {
                    return getEffectiveBackgroundColor(el.parentElement);
                }
                return window.getComputedStyle(document.body).backgroundColor;
            }
            
            return bgColor;
        } catch (e) {
            return 'rgb(255, 255, 255)';
        }
    }

    function isLight(color) {
        const rgb = color.match(/\d+/g);
        if (!rgb) return true;
        
        const brightness = (parseInt(rgb[0]) * 299 + parseInt(rgb[1]) * 587 + parseInt(rgb[2]) * 114) / 1000;
        return brightness > 128;
    }

    const checkBackground = () => {
        if(!element || !document.body.contains(element)) return;

        try {
            const rect = element.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const elementsAtPoint = document.elementsFromPoint(centerX, centerY);
            const elementBehind = elementsAtPoint.find(el => el !== element && !element.contains(el));

            if (elementBehind) {
                const bgColor = getEffectiveBackgroundColor(elementBehind);
                const isLightBg = isLight(bgColor);
                
                // Use the type parameter or check the element class/id
                if (type === 'logo' || (typeof logoSelector === 'string' && logoSelector.includes('logo'))) {
                    if (isLightBg) {
                        element.classList.add('logo--on-light');
                    } else {
                        element.classList.remove('logo--on-light');
                    }
                }
            }
        } catch (error) {
            console.error('Error checking background color:', error);
        }
    };

    const scrollHandler = () => {
        requestAnimationFrame(checkBackground);
    };

    activeScrollHandlers.set(elementId, scrollHandler);
    // Add with named reference
    window.addEventListener('scroll', scrollHandler);

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                checkBackground();
            }
        });
    }, { threshold: 0.25 });

    activeObservers.set(elementId, observer);
    
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    // Initial check
    checkBackground();

    // IMPORTANT: Return cleanup function
    return function cleanup() {
        if (activeScrollHandlers.has(elementId)) {
            window.removeEventListener('scroll', activeScrollHandlers.get(elementId));
            activeScrollHandlers.delete(elementId);
        }
        
        if (activeObservers.has(elementId)) {
            activeObservers.get(elementId).disconnect();
            activeObservers.delete(elementId);
        }
    };
}

export function detectNavSpanColor(spanElement) {
    if (typeof window === 'undefined' || !spanElement) return;

    const elementId = spanElement.getAttribute('data-observer-id') ||
                        `span-${Math.random().toString(36).substr(2, 9)}`;
    spanElement.setAttribute('data-observer-id', elementId);

    if ( activeObservers.has(elementId) ) {
        activeObservers.get(elementId).disconnect();
        activeObservers.delete(elementId);
    }

    if( activeScrollHandlers.has(elementId) ) {
        window.removeEventListener('scroll', activeScrollHandlers.get(elementId));
        activeScrollHandlers.delete(elementId);
    }

    function getEffectiveBackgroundColor(element) {
        if (!element || !document.body.contains(element)) return 'rgb(255, 255, 255)';
        
        try {
            const bgColor = window.getComputedStyle(element).backgroundColor;
            
            if (bgColor === 'rgba(0, 0, 0, 0)' || bgColor === 'transparent') {
                if (element.parentElement) {
                    return getEffectiveBackgroundColor(element.parentElement);
                }
                return window.getComputedStyle(document.body).backgroundColor;
            }
            
            return bgColor;
        } catch (e) {
            return 'rgb(255, 255, 255)';
        }
    }

    function isLight(color) {
        const rgb = color.match(/\d+/g);
        if (!rgb) return true;
        
        const brightness = (parseInt(rgb[0]) * 299 + parseInt(rgb[1]) * 587 + parseInt(rgb[2]) * 114) / 1000;
        return brightness > 128;
    }

    function checkSpanBackground() {
        if (!spanElement || !document.body.contains(spanElement)) return;

        try {
            const rect = spanElement.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            // Get all elements at this point excluding the span and its parents
            const elementsAtPoint = document.elementsFromPoint(centerX, centerY);
            
            // Find the first element that's not the span or any of its parents
            const elementBehind = elementsAtPoint.find(el => {
                // Skip the span itself and all of its parent elements
                let currentParent = spanElement;
                while (currentParent) {
                    if (el === currentParent) return false;
                    currentParent = currentParent.parentElement;
                }
                return true;
            });

            if (elementBehind) {
                const bgColor = getEffectiveBackgroundColor(elementBehind);
                const isLightBg = isLight(bgColor);
                
                // Apply color directly to the span
                spanElement.style.color = isLightBg ? '#000000' : '#ffffff';
            }
        } catch (error) {
            console.error('Error checking span background:', error);
        }
    }

    // Create named function for removal
    const scrollHandler = () => {
        requestAnimationFrame(checkSpanBackground);
    };
    
    activeScrollHandlers.set(elementId, scrollHandler);
    // Add with named reference
    window.addEventListener('scroll', scrollHandler);

    // Check when sections enter viewport
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                checkSpanBackground();
            }
        });
    }, { threshold: 0.1 });
    
    activeObservers.set(elementId, observer);
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
    
    // Initial check
    checkSpanBackground();

    // IMPORTANT: Return cleanup function
    return function cleanup() {
        if (activeScrollHandlers.has(elementId)) {
            window.removeEventListener('scroll', activeScrollHandlers.get(elementId));
            activeScrollHandlers.delete(elementId);
        }
        
        if (activeObservers.has(elementId)) {
            activeObservers.get(elementId).disconnect();
            activeObservers.delete(elementId);
        }
    };
}