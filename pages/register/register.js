// Register Form Functionality
document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('registerForm');
    const submitBtn = document.querySelector('.submit-btn');
    
    // Form validation rules
    const validationRules = {
        firstName: {
            required: true,
            minLength: 2,
            pattern: /^[a-zA-Z\s]+$/,
            message: 'First name must contain only letters and be at least 2 characters long'
        },
        lastName: {
            required: true,
            minLength: 2,
            pattern: /^[a-zA-Z\s]+$/,
            message: 'Last name must contain only letters and be at least 2 characters long'
        },
        email: {
            required: true,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Please enter a valid email address'
        },
        cohort: {
            required: true,
            minLength: 1,
            message: 'Please enter your cohort'
        },
        campus: {
            required: true,
            message: 'Please select your campus'
        },
        dateOfBirth: {
            required: true,
            validate: function(value) {
                const date = new Date(value);
                const today = new Date();
                const age = today.getFullYear() - date.getFullYear();
                return age >= 16 && age <= 100;
            },
            message: 'Please enter a valid date of birth (age must be between 16-100)'
        },
        motivation: {
            required: true,
            minLength: 20,
            maxLength: 500,
            message: 'Please tell us why you want to join (20-500 characters)'
        }
    };
    
    // Add real-time validation
    Object.keys(validationRules).forEach(fieldName => {
        const field = document.getElementById(fieldName);
        if (field) {
            field.addEventListener('blur', () => validateField(fieldName));
            field.addEventListener('input', () => clearFieldError(fieldName));
        }
    });
    
    // Form submission
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            submitForm();
        }
    });
    
    function validateField(fieldName) {
        const field = document.getElementById(fieldName);
        const rule = validationRules[fieldName];
        const value = field.value.trim();
        
        // Clear previous errors
        clearFieldError(fieldName);
        
        // Required field check
        if (rule.required && !value) {
            showFieldError(fieldName, `${getFieldLabel(fieldName)} is required`);
            return false;
        }
        
        if (value) {
            // Pattern validation
            if (rule.pattern && !rule.pattern.test(value)) {
                showFieldError(fieldName, rule.message);
                return false;
            }
            
            // Length validation
            if (rule.minLength && value.length < rule.minLength) {
                showFieldError(fieldName, rule.message);
                return false;
            }
            
            if (rule.maxLength && value.length > rule.maxLength) {
                showFieldError(fieldName, rule.message);
                return false;
            }
            
            // Custom validation
            if (rule.validate && !rule.validate(value)) {
                showFieldError(fieldName, rule.message);
                return false;
            }
        }
        
        return true;
    }
    
    function validateForm() {
        let isValid = true;
        
        Object.keys(validationRules).forEach(fieldName => {
            if (!validateField(fieldName)) {
                isValid = false;
            }
        });
        
        return isValid;
    }
    
    function showFieldError(fieldName, message) {
        const field = document.getElementById(fieldName);
        const formGroup = field.closest('.form-group');
        
        field.classList.add('error');
        formGroup.classList.add('has-error');
        
        // Create or update error message
        let errorElement = formGroup.querySelector('.error-message');
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            formGroup.appendChild(errorElement);
        }
        
        errorElement.textContent = message;
    }
    
    function clearFieldError(fieldName) {
        const field = document.getElementById(fieldName);
        const formGroup = field.closest('.form-group');
        
        field.classList.remove('error');
        formGroup.classList.remove('has-error');
        
        const errorElement = formGroup.querySelector('.error-message');
        if (errorElement) {
            errorElement.textContent = '';
        }
    }
    
    function getFieldLabel(fieldName) {
        const labels = {
            firstName: 'First Name',
            lastName: 'Last Name',
            email: 'Email',
            cohort: 'Cohort',
            campus: 'Campus',
            dateOfBirth: 'Date of Birth',
            motivation: 'Motivation'
        };
        
        return labels[fieldName] || fieldName;
    }
    
    function submitForm() {
        // Show loading state
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        
        // Collect form data
        const formData = new FormData(registerForm);
        const data = Object.fromEntries(formData.entries());
        
        // Simulate API call
        setTimeout(() => {
            console.log('Registration data:', data);
            
            // Show success message
            showSuccessMessage();
            
            // Reset form
            registerForm.reset();
            
            // Remove loading state
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
            
            // In a real application, you would send the data to your server
            // fetch('/api/register', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify(data)
            // })
            // .then(response => response.json())
            // .then(result => {
            //     if (result.success) {
            //         showSuccessMessage();
            //         registerForm.reset();
            //     } else {
            //         showErrorMessage(result.message);
            //     }
            // })
            // .catch(error => {
            //     showErrorMessage('An error occurred. Please try again.');
            // })
            // .finally(() => {
            //     submitBtn.classList.remove('loading');
            //     submitBtn.disabled = false;
            // });
            
        }, 2000); // Simulate network delay
    }
    
    function showSuccessMessage() {
        // Create success message if it doesn't exist
        let successElement = document.querySelector('.form-success');
        if (!successElement) {
            successElement = document.createElement('div');
            successElement.className = 'form-success';
            registerForm.parentNode.insertBefore(successElement, registerForm);
        }
        
        successElement.innerHTML = `
            <strong>🎉 Registration Successful!</strong><br>
            Welcome to The Hive! We'll be in touch soon.
        `;
        successElement.classList.add('show');
        
        // Hide success message after 5 seconds
        setTimeout(() => {
            successElement.classList.remove('show');
        }, 5000);
        
        // Scroll to top to show success message
        successElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    
    function showErrorMessage(message) {
        alert(message); // Simple error handling - could be improved with a toast or modal
    }
    
    // Character counter for motivation field
    const motivationField = document.getElementById('motivation');
    if (motivationField) {
        const maxLength = 500;
        const counterElement = document.createElement('div');
        counterElement.className = 'character-counter';
        counterElement.style.cssText = `
            font-size: 0.8rem;
            color: #666;
            text-align: right;
            margin-top: 0.25rem;
        `;
        
        motivationField.parentNode.appendChild(counterElement);
        
        function updateCounter() {
            const length = motivationField.value.length;
            counterElement.textContent = `${length}/${maxLength}`;
            counterElement.style.color = length > maxLength ? '#e74c3c' : '#666';
        }
        
        motivationField.addEventListener('input', updateCounter);
        updateCounter();
    }
    
    // Enhanced date picker for better UX
    const dateField = document.getElementById('dateOfBirth');
    if (dateField) {
        // Set max date to today
        const today = new Date().toISOString().split('T')[0];
        dateField.setAttribute('max', today);
        
        // Set min date to 100 years ago
        const minDate = new Date();
        minDate.setFullYear(minDate.getFullYear() - 100);
        dateField.setAttribute('min', minDate.toISOString().split('T')[0]);
    }
});

// Add smooth scrolling to form on page load
window.addEventListener('load', function() {
    const registerForm = document.querySelector('.register-container');
    if (registerForm) {
        setTimeout(() => {
            registerForm.style.opacity = '0';
            registerForm.style.transform = 'translateY(20px)';
            registerForm.style.transition = 'all 0.6s ease';
            
            setTimeout(() => {
                registerForm.style.opacity = '1';
                registerForm.style.transform = 'translateY(0)';
            }, 100);
        }, 200);
    }
});
