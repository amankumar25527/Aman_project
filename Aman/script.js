document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.navbar') && navLinks && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });

    // Image optimization and lazy loading
    optimizeImages();

    // Responsive effects
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.fade-in, .slide-in');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 50) {
                element.classList.add('visible');
            }
        });
    };

    // Run once on load
    animateOnScroll();
    
    // Add scroll event listener
    window.addEventListener('scroll', animateOnScroll);
});

// Image optimization functions
function optimizeImages() {
    // Handle lazy loading for all images
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    // Process each image
    lazyImages.forEach(img => {
        // Add loaded class when image is loaded
        img.onload = function() {
            this.classList.add('loaded');
        };
        
        // For images already loaded from cache
        if (img.complete) {
            img.classList.add('loaded');
        }
        
        // Add error handling
        img.onerror = function() {
            // If image fails to load, add a placeholder or fallback
            console.log('Image failed to load:', img.src);
            
            // Optionally add a fallback image or placeholder
            // this.src = 'image/placeholder.jpg';
        };
        
        // Compress images on the fly if needed
        compressImageIfNeeded(img);
    });
}

// Compress large images to improve performance
function compressImageIfNeeded(img) {
    // Only process JPG/JPEG and PNG images (not SVGs, etc.)
    if (!img.src.match(/\.(jpg|jpeg|png)$/i)) return;
    
    // Create an observer to check when image comes into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Check if image is large and needs compression
                if (img.naturalWidth > 1200 || img.naturalHeight > 1200) {
                    console.log('Large image detected, could be optimized:', img.src);
                }
                
                // Stop observing once processed
                observer.unobserve(img);
            }
        });
    });
    
    // Start observing
    observer.observe(img);
} 