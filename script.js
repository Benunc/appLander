// Add any future interactive features here
document.addEventListener('DOMContentLoaded', () => {
    // Email protection function
    function setupEmailProtection(elementId) {
        const emailProtect = document.getElementById(elementId);
        if (emailProtect) {
            // Split email into parts and encode with some randomization
            const parts = [
                btoa('ben').split('').reverse().join(''),
                btoa('@').split('').reverse().join(''),
                btoa('wpsteward').split('').reverse().join(''),
                btoa('.').split('').reverse().join(''),
                btoa('com').split('').reverse().join('')
            ];
            
            // Create clickable email link
            const link = document.createElement('a');
            link.href = 'mailto:' + atob(parts[0].split('').reverse().join('')) + 
                              atob(parts[1].split('').reverse().join('')) +
                              atob(parts[2].split('').reverse().join('')) +
                              atob(parts[3].split('').reverse().join('')) +
                              atob(parts[4].split('').reverse().join(''));
            
            // Set display text to a generic "Contact Us"
            link.textContent = 'Contact Us';
            link.className = 'email-link';
            link.setAttribute('aria-label', 'Contact us via email');
            
            // Add enhanced protection
            let lastClickTime = 0;
            link.addEventListener('click', (e) => {
                const currentTime = Date.now();
                
                // Check for trusted click and reasonable timing
                if (!e.isTrusted || currentTime - lastClickTime < 1000) {
                    e.preventDefault();
                    return false;
                }
                
                // Check for automated clicks
                if (e.detail > 1 || e.screenX === 0 && e.screenY === 0) {
                    e.preventDefault();
                    return false;
                }
                
                lastClickTime = currentTime;
                return true;
            });
            
            // Add the link to the page
            emailProtect.appendChild(link);
        }
    }

    // Setup both email protection elements
    setupEmailProtection('email-protect');
    setupEmailProtection('email-protect-bottom');
}); 