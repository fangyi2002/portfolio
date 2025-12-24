// Update copyright year dynamically
function updateCopyrightYear() {
    const currentYear = new Date().getFullYear();
    const copyrightElement = document.getElementById('copyright-year');
    
    if (copyrightElement) {
        copyrightElement.textContent = currentYear;
    }
}

// Wink animation for smiley
function winkAnimation() {
    const winkElement = document.querySelector('.wink-smiley');
    
    if (winkElement) {
        // Start with :) at slightly larger size
        winkElement.textContent = ':)';
        winkElement.style.transform = 'scale(1.15)';
        
        // After 1.7s, change to ;) and scale down to normal
        setTimeout(() => {
            winkElement.textContent = ';)';
            winkElement.style.transform = 'scale(1)';
        }, 1700);
        
        // After 2s, add press effect (scale down slightly)
        setTimeout(() => {
            winkElement.style.transform = 'scale(0.95)';
        }, 2000);
        
        // After 2.2s, scale back to normal
        setTimeout(() => {
            winkElement.style.transform = 'scale(1)';
        }, 2200);
        
        // After 2.3s, return to :) and slightly larger size
        setTimeout(() => {
            winkElement.textContent = ':)';
            winkElement.style.transform = 'scale(1.15)';
        }, 2300);
    }
}

// Section Slider Navigation
function initSectionSlider() {
    const slider = document.getElementById('section-slider');
    const sliderTrack = document.getElementById('slider-track');
    const sliderIndicator = document.getElementById('slider-indicator');
    const sliderSections = document.getElementById('slider-sections');
    const sliderTitleText = document.getElementById('slider-title-text');
    const sectionLinks = sliderSections.querySelectorAll('a');
    const sections = Array.from(sectionLinks).map(link => {
        const sectionId = link.getAttribute('data-section');
        return {
            id: sectionId,
            element: document.getElementById(sectionId),
            link: link
        };
    }).filter(s => s.element !== null);

    if (sections.length === 0) return;

    let isDragging = false;
    let currentSectionIndex = 0;

    // Calculate positions
    function updateSliderPosition() {
        const trackHeight = sliderTrack.offsetHeight;
        const indicatorHeight = sliderIndicator.offsetHeight;
        const maxTop = trackHeight - indicatorHeight;
        const sectionCount = sections.length;
        
        if (sectionCount <= 1) {
            sliderIndicator.style.top = '0px';
            return;
        }
        
        const sectionHeight = maxTop / (sectionCount - 1);
        const top = currentSectionIndex * sectionHeight;
        sliderIndicator.style.top = `${top}px`;
        
        // Position title display next to indicator
        if (sliderTitleText && sliderTitleText.parentElement) {
            const titleDisplay = sliderTitleText.parentElement;
            titleDisplay.style.top = `${top}px`;
        }
    }

    // Scroll to section
    function scrollToSection(index) {
        if (index < 0 || index >= sections.length) return;
        currentSectionIndex = index;
        const section = sections[index];
        
        section.element.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
        
        updateSliderPosition();
        updateActiveSection(index);
    }

    // Update active section highlight and title
    function updateActiveSection(index) {
        const activeLink = sectionLinks[index];
        if (activeLink && sliderTitleText) {
            const title = activeLink.getAttribute('data-title') || activeLink.textContent.trim();
            sliderTitleText.textContent = title;
        }
    }

    // Get section index from mouse position
    function getSectionIndexFromY(y) {
        const trackRect = sliderTrack.getBoundingClientRect();
        const relativeY = y - trackRect.top;
        const trackHeight = sliderTrack.offsetHeight;
        const sectionCount = sections.length;
        
        if (sectionCount <= 1) return 0;
        
        const sectionHeight = trackHeight / sectionCount;
        const index = Math.floor(relativeY / sectionHeight);
        return Math.max(0, Math.min(sectionCount - 1, index));
    }

    // Mouse drag handlers
    sliderIndicator.addEventListener('mousedown', (e) => {
        isDragging = true;
        e.preventDefault();
        e.stopPropagation();
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        
        const index = getSectionIndexFromY(e.clientY);
        if (index !== currentSectionIndex) {
            currentSectionIndex = index;
            updateSliderPosition();
            updateActiveSection(index);
            scrollToSection(index);
        }
    });

    document.addEventListener('mouseup', () => {
        if (isDragging) {
            isDragging = false;
            // Small delay before allowing scrollspy to update again
            setTimeout(() => {
                updateSliderFromScroll();
            }, 100);
        }
    });

    // Click on track to jump
    sliderTrack.addEventListener('click', (e) => {
        const index = getSectionIndexFromY(e.clientY);
        scrollToSection(index);
    });

    // Click on section links
    sectionLinks.forEach((link, index) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            scrollToSection(index);
        });
    });

    // Scrollspy: Update slider based on scroll position
    function updateSliderFromScroll() {
        if (isDragging) return; // Don't update while dragging
        
        const scrollPosition = window.scrollY + window.innerHeight / 3;
        
        for (let i = sections.length - 1; i >= 0; i--) {
            const section = sections[i];
            const rect = section.element.getBoundingClientRect();
            const sectionTop = rect.top + window.scrollY;
            
            if (scrollPosition >= sectionTop) {
                if (currentSectionIndex !== i) {
                    currentSectionIndex = i;
                    updateSliderPosition();
                    updateActiveSection(i);
                }
                break;
            }
        }
    }

    // Throttle scroll events
    let scrollTimeout;
    let isScrolling = false;
    window.addEventListener('scroll', () => {
        if (isDragging) return;
        
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(() => {
            updateSliderFromScroll();
            isScrolling = false;
        }, 50);
        isScrolling = true;
    });

    // Initialize
    updateSliderPosition();
    updateSliderFromScroll();
}

// Run when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    updateCopyrightYear();
    
    // Start wink animation and repeat every 3 seconds
    winkAnimation();
    setInterval(winkAnimation, 3000);
    
    // Initialize section slider if it exists
    if (document.getElementById('section-slider')) {
        initSectionSlider();
    }
});


