const express = require("express");
const studentService = require("./studentService");
const students = require("./studentModel");



const { getGradeChartData, getSpecializationPieChartData, getAvgGradeBarChartData } = require("./chartDataConfig");

const router = express.Router();

// Get chart data for grades
router.get("/chart/grades", (req, res) => {
  try {
    const students = studentService.getAllStudents();
    const chartData = studentService.getGradeChartData(students);  // Get chart data directly from service
    //print the data
    console.log("Chart Data:", chartData);
    res.json(chartData);
  } catch (error) {
    res.status(500).json({ message: "Error fetching grade chart data", error });
  }
});

// Get chart data for specialization distribution
router.get("/chart/specialization", (req, res) => {
  try {
    const students = studentService.getAllStudents();
    const chartData = studentService.getSpecializationChartData(students); // Get chart data directly from service
    res.json(chartData);
  } catch (error) {
    res.status(500).json({ message: "Error fetching specialization chart data", error });
  }
});

// Get chart data for average grade by specialization
router.get("/chart/avgGrade", (req, res) => {
  try {
    const students = studentService.getAllStudents();
    const chartData = studentService.getAvgGradeChartData(students); // Get chart data directly from service
    res.json(chartData);
  } catch (error) {
    res.status(500).json({ message: "Error fetching average grade chart data", error });
  }
});



///filter students 
router.get("/filter/spec/:spec", (req, res) => {
  const specialization = req.params.spec;
  try{
    const students = studentService.getStudentsBySpecialization(specialization);
    res.json(students);
  }catch (error) {
    res.status(500).json({ message: "Error filtering by specialization", error });
  }

});

router.get("/filter/fail", (req, res) => {
    try {
      const students = studentService.getFailingStudents();
      res.json(students);
    } catch (error) {
      res.status(500).json({ message: "Error filtering failing students", error });
    }
  });






router.get("/sort/asc", (req, res) => {
    try {
      const students = studentService.getAllStudents();
      //console.log("Students from service:", students);
      const sortedStudents = students.sort((a, b) => a.age - b.age);
      res.json(sortedStudents);
    } catch (error) {
      res.status(500).json({ message: "Error sorting students", error });
    }
  });
  
  // Sort students by age in descending order
  router.get("/sort/desc", (req, res) => {
    try {
      const students = studentService.getAllStudents();
      const sortedStudents = students.sort((a, b) => b.age - a.age);
      res.json(sortedStudents);
    } catch (error) {
      res.status(500).json({ message: "Error sorting students", error });
    }
  });

// //Get all students
// router.get("/", (req, res) => {
//   res.json(studentService.getAllStudents());
// });
// Get paginated students
router.get("/", (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  try {
    
    const paginated = studentService.getPaginatedStudents(page, limit);
   // console.log("Paginated Students:", paginated);
    res.json(paginated);
  } catch (error) {
    res.status(500).json({ message: "Error fetching paginated students", error });
  }
});


// Get student by ID
router.get("/:id", (req, res) => {
  const student = studentService.getStudentById(req.params.id);
  if (!student) return res.status(404).json({ message: "Student not found" });
  res.json(student);
});

// Add student
router.post("/", (req, res) => {
  console.log("Request Body:", req.body); // Log the request body
  const result = studentService.addStudent(req.body);
  if (result.errors) return res.status(400).json({ errors: result.errors });

  res.status(201).json(result);
});

// Update student
// router.put("/:id", (req, res) => {
//   const result = studentService.updateStudent(req.params.id, req.body);
//   if (result.errors) return res.status(400).json({ errors: result.errors });
//   if (!result) return res.status(404).json({ message: "Student not found" });

//   res.json(result);
// });

// Delete student
router.delete("/:id", (req, res) => {
  const success = studentService.deleteStudent(req.params.id);
  if (!success) return res.status(404).json({ message: "Student not found" });

  res.json({ message: "Student deleted successfully" });
});

router.patch("/:id", (req, res) => {
    const result = studentService.updateStudent(req.params.id, req.body);
    if (result.errors) return res.status(400).json({ errors: result.errors });
    if (result === null) return res.status(404).json({ message: "Student not found" });
  
    res.json(result);
  });

  
module.exports = router;
