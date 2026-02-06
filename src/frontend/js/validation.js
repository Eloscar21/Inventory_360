/**
 * Validation Module
 * Handles form validation for the application.
 */

const Validation = {
    // Regular expressions for validation
    patterns: {
        email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
        phone: /^\d{10}$/, // Assumes 10 digit phone number
        password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, // Minimum 8 characters, at least one letter and one number
    },

    /**
     * validateField
     * Validates a single input field based on its attributes.
     * @param {HTMLInputElement} input - The input element to validate.
     * @returns {string|null} - Error message or null if valid.
     */
    validateField: function (input) {
        const value = input.value.trim();
        const label = input.getAttribute('placeholder') || input.name || 'Field';

        // Required check
        if (input.hasAttribute('required') && !value) {
            return `${label} is required.`;
        }

        // Email check
        if (input.type === 'email' && value && !this.patterns.email.test(value)) {
            return `Please enter a valid email address.`;
        }

        // Pattern attribute check (custom regex in HTML)
        if (input.hasAttribute('pattern') && value) {
            const regex = new RegExp(input.getAttribute('pattern'));
            if (!regex.test(value)) {
                return input.getAttribute('title') || `${label} is invalid.`;
            }
        }

        // Minlength check
        if (input.hasAttribute('minlength') && value.length < input.getAttribute('minlength')) {
            return `${label} must be at least ${input.getAttribute('minlength')} characters.`;
        }

        return null; // No errors
    },

    /**
     * validateForm
     * Validates all fields in a form.
     * @param {HTMLFormElement} form - The form element to validate.
     * @returns {boolean} - True if valid, false otherwise.
     */
    validateForm: function (form) {
        let isValid = true;
        const inputs = form.querySelectorAll('input, textarea, select');

        inputs.forEach(input => {
            const error = this.validateField(input);
            this.showError(input, error);
            if (error) {
                isValid = false;
            }
        });

        return isValid;
    },

    /**
     * showError
     * Displays or hides the error message for an input.
     * @param {HTMLInputElement} input - The input element.
     * @param {string|null} message - The error message.
     */
    showError: function (input, message) {
        // Find existing error message container or create one
        let errorSpan = input.parentNode.querySelector('.error-message');

        if (!errorSpan) {
            errorSpan = document.createElement('span');
            errorSpan.className = 'error-message';
            errorSpan.style.color = 'red';
            errorSpan.style.fontSize = '0.8em';
            errorSpan.style.display = 'block';
            errorSpan.style.marginTop = '5px';
            input.parentNode.appendChild(errorSpan);
        }

        if (message) {
            input.classList.add('invalid');
            errorSpan.textContent = message;
        } else {
            input.classList.remove('invalid');
            errorSpan.textContent = '';
        }
    },

    /**
     * init
     * Initializes validation on all forms with class 'validate-form'.
     */
    init: function () {
        const forms = document.querySelectorAll('.validate-form');

        forms.forEach(form => {
            // Validate on submit
            form.addEventListener('submit', (e) => {
                if (!this.validateForm(form)) {
                    e.preventDefault(); // Stop submission if invalid
                }
            });

            // validate on input change (optional, for immediate feedback)
            const inputs = form.querySelectorAll('input, textarea, select');
            inputs.forEach(input => {
                input.addEventListener('blur', () => {
                    const error = this.validateField(input);
                    this.showError(input, error);
                });
            });
        });
    }
};

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    Validation.init();
});
