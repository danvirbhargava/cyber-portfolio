document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggling Logic
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;
    
    // Check for saved theme preference in localStorage
    const savedTheme = localStorage.getItem('cyber-theme');
    
    if (savedTheme) {
        body.className = savedTheme;
    } else {
        // Default to dark theme if no preference
        body.className = 'theme-dark';
    }

    themeToggleBtn.addEventListener('click', () => {
        if (body.classList.contains('theme-dark')) {
            body.classList.replace('theme-dark', 'theme-light');
            localStorage.setItem('cyber-theme', 'theme-light');
        } else {
            body.classList.replace('theme-light', 'theme-dark');
            localStorage.setItem('cyber-theme', 'theme-dark');
        }
    });

    // Dynamic Year for Footer
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Smooth Scrolling for Anchors (Optional enhancement to CSS scroll-behavior)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Password Generator Logic
    const pwdResult = document.getElementById('pwd-result');
    const pwdCopy = document.getElementById('pwd-copy');
    const pwdLength = document.getElementById('pwd-slider');
    const pwdLengthVal = document.getElementById('pwd-length-val');
    const pwdUpper = document.getElementById('pwd-upper');
    const pwdLower = document.getElementById('pwd-lower');
    const pwdNums = document.getElementById('pwd-nums');
    const pwdSyms = document.getElementById('pwd-syms');
    const pwdGenerate = document.getElementById('pwd-generate');

    if (pwdGenerate) {
        // Update length display
        pwdLength.addEventListener('input', () => {
            pwdLengthVal.textContent = pwdLength.value;
        });

        // Generate Password function
        const generatePassword = () => {
            const length = +pwdLength.value;
            const hasUpper = pwdUpper.checked;
            const hasLower = pwdLower.checked;
            const hasNums = pwdNums.checked;
            const hasSyms = pwdSyms.checked;

            const upperChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            const lowerChars = 'abcdefghijklmnopqrstuvwxyz';
            const numChars = '0123456789';
            const symChars = '!@#$%^&*()_+~`|}{[]:;?><,./-=';

            let charSet = '';
            if (hasUpper) charSet += upperChars;
            if (hasLower) charSet += lowerChars;
            if (hasNums) charSet += numChars;
            if (hasSyms) charSet += symChars;

            if (charSet === '') {
                pwdResult.value = 'Select an option!';
                return;
            }

            let password = '';
            // Ensure at least one of each selected type
            if (hasUpper) password += upperChars[Math.floor(Math.random() * upperChars.length)];
            if (hasLower) password += lowerChars[Math.floor(Math.random() * lowerChars.length)];
            if (hasNums) password += numChars[Math.floor(Math.random() * numChars.length)];
            if (hasSyms) password += symChars[Math.floor(Math.random() * symChars.length)];

            // Fill the rest
            for (let i = password.length; i < length; i++) {
                password += charSet[Math.floor(Math.random() * charSet.length)];
            }

            // Shuffle the password to make it random (Fisher-Yates)
            password = password.split('').sort(() => 0.5 - Math.random()).join('');
            
            pwdResult.value = password;
        };

        pwdGenerate.addEventListener('click', generatePassword);

        // Copy logic
        pwdCopy.addEventListener('click', () => {
            if (!pwdResult.value || pwdResult.value === 'Select an option!') return;
            
            navigator.clipboard.writeText(pwdResult.value).then(() => {
                const originalText = pwdCopy.textContent;
                pwdCopy.textContent = '✅';
                setTimeout(() => {
                    pwdCopy.textContent = originalText;
                }, 2000);
            });
        });
    }
});
