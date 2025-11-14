// Load university data on page load
async function loadUniversityData() {
    const university = await fetchUniversity();
    
    if (university) {
        // Update overview
        document.getElementById('university-overview').textContent = university.overview;
        
        // Load placements data
        loadPlacements(university.placements);
        
        // Load facilities
        loadFacilities(university.facilities);
    }
}

// Load courses
async function loadCourses() {
    const courses = await fetchCourses();
    const container = document.getElementById('courses-container');
    const courseSelect = document.getElementById('course-select');
    
    if (courses.length === 0) {
        container.innerHTML = '<p class="col-span-3 text-center text-red-500">Failed to load courses</p>';
        return;
    }
    
    // Store courses globally
    currentCourses = courses;
    
    // Display courses as cards
    container.innerHTML = courses.map(course => `
        <div class="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition">
            <h3 class="text-xl font-bold text-red-600 mb-2">${course.name}</h3>
            <p class="text-gray-600 mb-2"><strong>Degree:</strong> ${course.degree}</p>
            <p class="text-gray-600 mb-2"><strong>Duration:</strong> ${course.duration}</p>
            <p class="text-gray-600"><strong>Eligibility:</strong> ${course.eligibility}</p>
        </div>
    `).join('');
    
    // Populate course select dropdown in form
    courseSelect.innerHTML = '<option value="">Select Course</option>' + 
        courses.map(course => `<option value="${course.name}">${course.name} (${course.degree})</option>`).join('');
}

// Load placements data
function loadPlacements(placements) {
    const container = document.getElementById('placements-container');
    
    container.innerHTML = `
        <div class="bg-white p-6 rounded-lg shadow-md text-center">
            <div class="text-3xl font-bold text-green-600 mb-2">${placements.placementRate}</div>
            <p class="text-gray-600">Placement Rate</p>
        </div>
        
        <div class="bg-white p-6 rounded-lg shadow-md text-center">
            <div class="text-3xl font-bold text-blue-600 mb-2">${placements.averagePackage}</div>
            <p class="text-gray-600">Average Package</p>
        </div>
        
        <div class="bg-white p-6 rounded-lg shadow-md text-center">
            <div class="text-3xl font-bold text-purple-600 mb-2">${placements.highestPackage}</div>
            <p class="text-gray-600">Highest Package</p>
        </div>
        
        <div class="bg-white p-6 rounded-lg shadow-md">
            <h4 class="font-bold text-gray-800 mb-2">Top Recruiters</h4>
            <ul class="text-sm text-gray-600 space-y-1">
                ${placements.topRecruiters.map(recruiter => `<li>• ${recruiter}</li>`).join('')}
            </ul>
        </div>
    `;
}

// Load facilities
function loadFacilities(facilities) {
    const container = document.getElementById('facilities-container');
    
    container.innerHTML = facilities.map(facility => `
        <div class="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition">
            <div class="text-red-600 mb-3">
                <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
            </div>
            <p class="text-gray-700 font-semibold">${facility}</p>
        </div>
    `).join('');
}

// Handle form submission
document.getElementById('leadForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const submitBtn = document.getElementById('submitBtn');
    const formMessage = document.getElementById('formMessage');
    
    // Disable button and show loading
    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitting...';
    formMessage.classList.add('hidden');
    
    // Collect form data
    const formData = {
        name: this.name.value,
        email: this.email.value,
        phone: this.phone.value,
        state: this.state.value,
        course: this.course.value,
        intakeYear: this.intakeYear.value,
        consent: this.consent.checked,
        university: 'Stanford University',
        timestamp: new Date().toISOString()
    };
    
    // Validate phone number
    if (!/^[0-9]{10}$/.test(formData.phone)) {
        showFormMessage('Please enter a valid 10-digit phone number', 'error');
        submitBtn.disabled = false;
        submitBtn.textContent = 'Submit Application';
        return;
    }
    
    // Submit to Pipedream
    const result = await submitFormToPipedream(formData);
    
    if (result.success) {
        showFormMessage('Application submitted successfully! We will contact you soon.', 'success');
        this.reset();
    } else {
        showFormMessage('Failed to submit application. Please try again.', 'error');
    }
    
    // Re-enable button
    submitBtn.disabled = false;
    submitBtn.textContent = 'Submit Application';
});

// Show form message
function showFormMessage(message, type) {
    const formMessage = document.getElementById('formMessage');
    
    formMessage.classList.remove('hidden');
    formMessage.className = 'mt-4 text-center p-4 rounded-lg ' + 
        (type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700');
    formMessage.textContent = message;
    
    // Auto hide after 5 seconds
    setTimeout(() => {
        formMessage.classList.add('hidden');
    }, 5000);
}