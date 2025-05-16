// Add any future interactive features here
document.addEventListener('DOMContentLoaded', () => {
    // Email protection function
    function setupEmailProtection(elementId) {
        const emailProtect = document.getElementById(elementId);
        if (emailProtect) {
            // Split email into parts and encode
            const parts = ['ben', '@', 'wpsteward', '.', 'com'];
            
            // Create clickable email link
            const link = document.createElement('a');
            link.href = 'mailto:' + parts.join('');
            link.textContent = parts.join('');
            link.className = 'email-link';
            
            // Add some basic protection
            link.addEventListener('click', (e) => {
                // Only allow clicks from actual users
                if (e.isTrusted) {
                    return true;
                }
                e.preventDefault();
                return false;
            });
            
            // Add the link to the page
            emailProtect.appendChild(link);
        }
    }

    // Setup both email protection elements
    setupEmailProtection('email-protect');
    setupEmailProtection('email-protect-bottom');
}); 