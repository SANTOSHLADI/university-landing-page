const universities = require('../data/universities.json');
const courses = require('../data/courses.json');
const fees = require('../data/fees.json');

// Get university by ID
exports.getUniversity = (req, res) => {
  try {
    const { id } = req.params;
    const university = universities.find(u => u.id === parseInt(id));
    
    if (!university) {
      return res.status(404).json({ 
        success: false, 
        message: 'University not found' 
      });
    }
    
    res.json({ 
      success: true, 
      data: university 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// Get courses by university ID (nested data)
exports.getCourses = (req, res) => {
  try {
    const { universityId } = req.params;
    const universityCourses = courses.filter(
      c => c.universityId === parseInt(universityId)
    );
    
    if (universityCourses.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'No courses found for this university' 
      });
    }
    
    res.json({ 
      success: true, 
      data: universityCourses 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// Get fees by course ID
exports.getFees = (req, res) => {
  try {
    const { courseId } = req.params;
    const courseFees = fees.find(f => f.courseId === parseInt(courseId));
    
    if (!courseFees) {
      return res.status(404).json({ 
        success: false, 
        message: 'Fees not found for this course' 
      });
    }
    
    res.json({ 
      success: true, 
      data: courseFees 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};