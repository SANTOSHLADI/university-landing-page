// API Base URL
const API_BASE_URL = 'https://university-backend-nivs.onrender.com/';
const UNIVERSITY_ID = 1; // Stanford

// Fetch university data
async function fetchUniversity() {
    try {
        const response = await fetch(`${API_BASE_URL}/university/${UNIVERSITY_ID}`);
        if (!response.ok) throw new Error('Failed to fetch university data');
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('Error fetching university:', error);
        return null;
    }
}

// Fetch courses
async function fetchCourses() {
    try {
        const response = await fetch(`${API_BASE_URL}/courses/${UNIVERSITY_ID}`);
        if (!response.ok) throw new Error('Failed to fetch courses');
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('Error fetching courses:', error);
        return [];
    }
}

// Fetch fees by course ID
async function fetchFees(courseId) {
    try {
        const response = await fetch(`${API_BASE_URL}/fees/${courseId}`);
        if (!response.ok) throw new Error('Failed to fetch fees');
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('Error fetching fees:', error);
        return null;
    }
}

// Submit form to Pipedream
async function submitFormToPipedream(formData) {
    const PIPEDREAM_URL = 'https://035530e0082957b389884fed33d98a92.m.pipedream.net';

    
    try {
        const response = await fetch(PIPEDREAM_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });
        
        if (!response.ok) throw new Error('Failed to submit form');
        return { success: true };
    } catch (error) {
        console.error('Error submitting form:', error);
        return { success: false, error: error.message };
    }
}