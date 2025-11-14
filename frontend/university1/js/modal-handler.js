let currentCourses = [];

// Open fees modal
async function openFeesModal() {
    const modal = document.getElementById('feesModal');
    const content = document.getElementById('fees-content');
    
    modal.classList.add('active');
    content.innerHTML = '<p class="text-center text-gray-500">Loading courses...</p>';
    
    // Load courses if not already loaded
    if (currentCourses.length === 0) {
        currentCourses = await fetchCourses();
    }
    
    if (currentCourses.length === 0) {
        content.innerHTML = '<p class="text-center text-red-500">Failed to load courses</p>';
        return;
    }
    
    // Display course selection
    content.innerHTML = `
        <div class="mb-4">
            <label class="block text-gray-700 font-semibold mb-2">Select a Course to View Fees:</label>
            <select id="course-fee-select" onchange="loadCourseFees(this.value)" 
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500">
                <option value="">-- Select Course --</option>
                ${currentCourses.map(course => 
                    `<option value="${course.id}">${course.name} (${course.degree})</option>`
                ).join('')}
            </select>
        </div>
        <div id="fee-details" class="mt-4"></div>
    `;
}

// Close fees modal
function closeFeesModal() {
    const modal = document.getElementById('feesModal');
    modal.classList.remove('active');
}

// Load course fees
async function loadCourseFees(courseId) {
    const feeDetails = document.getElementById('fee-details');
    
    if (!courseId) {
        feeDetails.innerHTML = '';
        return;
    }
    
    feeDetails.innerHTML = '<p class="text-center text-gray-500">Loading fees...</p>';
    
    const fees = await fetchFees(courseId);
    
    if (!fees) {
        feeDetails.innerHTML = '<p class="text-center text-red-500">Failed to load fees</p>';
        return;
    }
    
    feeDetails.innerHTML = `
        <div class="bg-gray-50 p-6 rounded-lg">
            <h4 class="text-xl font-bold text-gray-800 mb-4">${fees.courseName}</h4>
            
            <div class="space-y-3">
                <div class="flex justify-between border-b pb-2">
                    <span class="text-gray-600">Tuition Fee (per year):</span>
                    <span class="font-semibold text-gray-800">${fees.tuitionFee}</span>
                </div>
                
                <div class="flex justify-between border-b pb-2">
                    <span class="text-gray-600">Application Fee:</span>
                    <span class="font-semibold text-gray-800">${fees.applicationFee}</span>
                </div>
                
                <div class="flex justify-between border-b pb-2">
                    <span class="text-gray-600">Other Fees (per year):</span>
                    <span class="font-semibold text-gray-800">${fees.otherFees}</span>
                </div>
                
                <div class="flex justify-between border-b pb-2 bg-yellow-50 p-2 rounded">
                    <span class="text-gray-700 font-semibold">Total per Year:</span>
                    <span class="font-bold text-red-600">${fees.totalPerYear}</span>
                </div>
                
                <div class="flex justify-between bg-red-50 p-3 rounded">
                    <span class="text-gray-700 font-semibold">Total Program Cost:</span>
                    <span class="font-bold text-red-700 text-xl">${fees.totalProgram}</span>
                </div>
                
                <div class="mt-4 p-3 bg-green-50 rounded border-l-4 border-green-500">
                    <p class="text-sm text-gray-700">
                        <strong>Scholarships:</strong> ${fees.scholarships}
                    </p>
                </div>
            </div>
        </div>
    `;
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('feesModal');
    if (event.target == modal) {
        closeFeesModal();
    }
}