// Disposable email domains
const disposableDomains = ['tempmail.com', '10minutemail.com', 'guerrillamail.com'];

// Country codes for phone validation
const countryCodes = {
    'IN': '+91',
    'US': '+1',
    'CA': '+1',
    'UK': '+44',
    'AU': '+61',
    'DE': '+49',
    'SG': '+65',
    'AE': '+971',
    'ZA': '+27'
};

// Expanded location data with more states and major cities
const locationData = {
    'IN': {
        'Andhra Pradesh': ['Visakhapatnam', 'Vijayawada', 'Guntur', 'Nellore', 'Tirupati'],
        'Maharashtra': ['Mumbai', 'Pune', 'Nagpur', 'Thane', 'Nashik'],
        'Karnataka': ['Bangalore', 'Mysore', 'Hubli', 'Mangalore', 'Belgaum'],
        'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem'],
        'Delhi': ['New Delhi', 'Delhi Cantonment', 'Karol Bagh', 'Connaught Place', 'Lajpat Nagar'],
        'Uttar Pradesh': ['Lucknow', 'Kanpur', 'Ghaziabad', 'Agra', 'Meerut'],
        'Telangana': ['Hyderabad', 'Warangal', 'Nizamabad', 'Khammam', 'Karimnagar'],
        'Gujarat': ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Bhavnagar'],
        'West Bengal': ['Kolkata', 'Howrah', 'Durgapur', 'Siliguri', 'Asansol']
    },
    'US': {
        'California': ['Los Angeles', 'San Francisco', 'San Diego', 'San Jose', 'Sacramento'],
        'New York': ['New York City', 'Buffalo', 'Rochester', 'Albany', 'Syracuse'],
        'Texas': ['Houston', 'Dallas', 'Austin', 'San Antonio', 'Fort Worth'],
        'Florida': ['Miami', 'Orlando', 'Tampa', 'Jacksonville', 'Tallahassee'],
        'Illinois': ['Chicago', 'Aurora', 'Naperville', 'Joliet', 'Rockford'],
        'Washington': ['Seattle', 'Spokane', 'Tacoma', 'Bellevue', 'Everett'],
        'Georgia': ['Atlanta', 'Savannah', 'Athens', 'Macon', 'Columbus']
    },
    'CA': {
        'Ontario': ['Toronto', 'Ottawa', 'Mississauga', 'Brampton', 'Hamilton'],
        'British Columbia': ['Vancouver', 'Victoria', 'Surrey', 'Burnaby', 'Richmond'],
        'Quebec': ['Montreal', 'Quebec City', 'Laval', 'Gatineau', 'Longueuil'],
        'Alberta': ['Calgary', 'Edmonton', 'Red Deer', 'Lethbridge', 'Medicine Hat'],
        'Manitoba': ['Winnipeg', 'Brandon', 'Steinbach', 'Thompson', 'Portage la Prairie']
    },
    'UK': {
        'England': ['London', 'Manchester', 'Birmingham', 'Liverpool', 'Leeds'],
        'Scotland': ['Edinburgh', 'Glasgow', 'Aberdeen', 'Dundee', 'Inverness'],
        'Wales': ['Cardiff', 'Swansea', 'Newport', 'Wrexham', 'Barry'],
        'Northern Ireland': ['Belfast', 'Derry', 'Lisburn', 'Newry', 'Armagh']
    },

    // Australia
    'AU': {
        'New South Wales': ['Sydney', 'Newcastle', 'Wollongong', 'Albury', 'Tamworth'],
        'Victoria': ['Melbourne', 'Geelong', 'Ballarat', 'Bendigo', 'Shepparton'],
        'Queensland': ['Brisbane', 'Gold Coast', 'Cairns', 'Townsville', 'Toowoomba'],
        'Western Australia': ['Perth', 'Bunbury', 'Geraldton', 'Kalgoorlie', 'Albany']
    },

    // Germany
    'DE': {
        'Bavaria': ['Munich', 'Nuremberg', 'Augsburg', 'Regensburg', 'Ingolstadt'],
        'Berlin': ['Berlin'],
        'Hesse': ['Frankfurt', 'Wiesbaden', 'Kassel', 'Darmstadt', 'Fulda'],
        'North Rhine–Westphalia': ['Cologne', 'Düsseldorf', 'Dortmund', 'Essen', 'Bonn']
    },

    // Singapore (one-state country)
    'SG': {
        'Singapore': ['Central', 'East Region', 'West Region', 'North Region', 'North-East Region']
    },

    // United Arab Emirates
    'AE': {
        'Dubai': ['Dubai City', 'Jumeirah', 'Deira', 'Bur Dubai', 'Jebel Ali'],
        'Abu Dhabi': ['Abu Dhabi City', 'Al Ain', 'Mussafah', 'Khalifa City', 'Yas Island'],
        'Sharjah': ['Sharjah City', 'Khor Fakkan', 'Kalba', 'Al Dhaid', 'Dibba Al Hisn']
    },

    // South Africa
    'ZA': {
        'Gauteng': ['Johannesburg', 'Pretoria', 'Soweto', 'Midrand', 'Springs'],
        'Western Cape': ['Cape Town', 'Stellenbosch', 'George', 'Paarl', 'Worcester'],
        'KwaZulu-Natal': ['Durban', 'Pietermaritzburg', 'Richards Bay', 'Newcastle', 'Umlazi']
    }
};

// Form elements
const form = document.getElementById('registrationForm');
const submitBtn = document.getElementById('submitBtn');
const alertDiv = document.getElementById('alert');

// Validation functions
function showError(elementId, message) {
    const errorElement = document.getElementById(elementId + 'Error');
    errorElement.textContent = message;
    document.getElementById(elementId).classList.add('invalid');
}

function clearError(elementId) {
    const errorElement = document.getElementById(elementId + 'Error');
    errorElement.textContent = '';
    document.getElementById(elementId).classList.remove('invalid');
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return false;

    const domain = email.split('@')[1];
    return !disposableDomains.includes(domain);
}

function isValidPhone(phone, country) {
    if (!country || !countryCodes[country]) return phone.length >= 10;
    const code = countryCodes[country];
    return phone.startsWith(code) && phone.length > code.length;
}

function checkPasswordStrength(password) {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    const meter = document.getElementById('strengthMeter');
    const text = document.getElementById('strengthText');
    meter.innerHTML = '<div></div>';
    const bar = meter.querySelector('div');

    if (strength <= 2) {
        bar.className = 'strength-weak';
        text.textContent = 'Weak';
    } else if (strength <= 3) {
        bar.className = 'strength-medium';
        text.textContent = 'Medium';
    } else {
        bar.className = 'strength-strong';
        text.textContent = 'Strong';
    }
}

function validateForm() {
    let isValid = true;

    // Required fields
    const requiredFields = ['firstName', 'lastName', 'email', 'phone'];
    requiredFields.forEach(field => {
        const value = document.getElementById(field).value.trim();
        if (!value) {
            showError(field, 'This field is required');
            isValid = false;
        } else {
            clearError(field);
        }
    });

    // Email validation
    const email = document.getElementById('email').value.trim();
    if (email && !isValidEmail(email)) {
        showError('email', 'Please enter a valid email address (not disposable)');
        isValid = false;
    }

    // Phone validation
    const phone = document.getElementById('phone').value.trim();
    const country = document.getElementById('country').value;
    if (phone && !isValidPhone(phone, country)) {
        showError('phone', 'Please enter a valid phone number');
        isValid = false;
    }

    // Age validation
    const age = document.getElementById('age').value;
    if (age && (age < 1 || age > 120)) {
        showError('age', 'Please enter a valid age (1-120)');
        isValid = false;
    } else {
        clearError('age');
    }

    // Gender validation
    const genderCheckboxes = document.querySelectorAll('input[name="gender"]:checked');
    if (genderCheckboxes.length === 0) {
        showError('gender', 'Please select at least one gender');
        isValid = false;
    } else {
        clearError('gender');
    }

    // Password validation
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    if (password !== confirmPassword) {
        showError('confirmPassword', 'Passwords do not match');
        isValid = false;
    } else {
        clearError('confirmPassword');
    }

    // Terms validation
    const terms = document.getElementById('terms').checked;
    if (!terms) {
        showError('terms', 'You must agree to the terms and conditions');
        isValid = false;
    } else {
        clearError('terms');
    }

    submitBtn.disabled = !isValid;
    return isValid;
}

// Populate states based on country
function populateStates(country) {
    const stateSelect = document.getElementById('state');
    stateSelect.innerHTML = '<option value="">Select State</option>';
    if (locationData[country]) {
        Object.keys(locationData[country]).forEach(state => {
            const option = document.createElement('option');
            option.value = state;
            option.textContent = state;
            stateSelect.appendChild(option);
        });
    }
    // Clear cities
    document.getElementById('city').innerHTML = '<option value="">Select City</option>';
}

// Populate cities based on country and state
function populateCities(country, state) {
    const citySelect = document.getElementById('city');
    citySelect.innerHTML = '<option value="">Select City</option>';
    if (locationData[country] && locationData[country][state]) {
        locationData[country][state].forEach(city => {
            const option = document.createElement('option');
            option.value = city;
            option.textContent = city;
            citySelect.appendChild(option);
        });
    }
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Real-time validation
    const inputs = document.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('input', validateForm);
        input.addEventListener('change', validateForm);
    });

    // Password strength
    document.getElementById('password').addEventListener('input', function() {
        checkPasswordStrength(this.value);
    });

    // Country change event
    document.getElementById('country').addEventListener('change', function() {
        const country = this.value;
        populateStates(country);
        validateForm();
    });

    // State change event
    document.getElementById('state').addEventListener('change', function() {
        const country = document.getElementById('country').value;
        const state = this.value;
        populateCities(country, state);
        validateForm();
    });

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        if (validateForm()) {
            // Simulate form submission
            const formData = new FormData(form);
            fetch('process.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alertDiv.className = 'alert success';
                    alertDiv.textContent = 'Registration Successful! Your profile has been submitted successfully.';
                } else {
                    alertDiv.className = 'alert error';
                    alertDiv.textContent = data.message || 'An error occurred during registration.';
                }
                alertDiv.classList.remove('hidden');
            })
            .catch(error => {
                alertDiv.className = 'alert error';
                alertDiv.textContent = 'An error occurred. Please try again.';
                alertDiv.classList.remove('hidden');
            });
        }
    });
});
