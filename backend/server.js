const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
const port = 5000;
app.get("/", (req, res) => {
    res.send("Backend is running!");
});

let students =[  
{ id: 2, name: "Bob", grade: 6.5, age: 21, group: 924, specialization: "Informatics", courses: ["Programming", "Databases", "AI"] },
{ id: 3, name: "Charlie", grade: 3.8, age: 22, group: 932, specialization: "Mathematics and Informatics", courses: ["Calculus", "Machine Learning", "Data Science"] },
{ id: 4, name: "David", grade: 4.9, age: 24, group: 922, specialization: "Informatics", courses: ["Cybersecurity", "Software Engineering", "Networks"] },
{ id: 5, name: "Emma", grade: 7.1, age: 20, group: 911, specialization: "Mathematics", courses: ["Geometry", "Probability", "Linear Algebra"] },
{ id: 6, name: "Frank", grade: 8.2, age: 23, group: 910, specialization: "Physics", courses: ["Quantum Mechanics", "Thermodynamics"] },
{ id: 7, name: "Grace", grade: 9.0, age: 19, group: 915, specialization: "Informatics", courses: ["Data Structures", "Operating Systems"] },
{ id: 8, name: "Hannah", grade: 3.6, age: 22, group: 918, specialization: "Biology", courses: ["Genetics", "Microbiology"] },
{ id: 9, name: "Ian", grade: 5.5, age: 21, group: 916, specialization: "Mathematics", courses: ["Differential Equations", "Topology"] },
{ id: 10, name: "Jack", grade: 6.9, age: 23, group: 920, specialization: "Informatics", courses: ["Software Testing", "Embedded Systems"] },
{ id: 11, name: "Kate", grade: 4.1, age: 20, group: 924, specialization: "Physics", courses: ["Classical Mechanics", "Electromagnetism"] },
];
const validateStudent = (student) => {
    const errors = {};
    if (!student.name || !student.name.trim()) {
      errors.name = 'Name is required';
    }
    if(!student.group) {
      errors.group = 'Group is required';
    }
    if (!student.age || student.age < 19 || student.age > 30) {
      errors.age = 'Age must be between 19 and 30';
    }
    if (!student.grade || student.grade < 1 || student.grade > 10) {
      errors.grade = 'Grade must be between 1 and 10';
    }
    return errors;
  };
app.get("/api/students", (req, res) => {
    res.json(students);  // Return the list of students
});

app.post('/api/students',(req,res)=>
{
    const newStudent = req.body;
    const validationErrors = validateStudent(newStudent);
    if (Object.keys(validationErrors).length > 0) {
        return res.status(400).json({ errors: validationErrors });
      }
    newStudent.id = students.length + 1;
    students.push(newStudent);
    res.status(201).json(newStudent);
})
app.delete('/api/students/:id', (req, res) => {
    const { id } = req.params; // Get the student ID from the URL parameter
    const studentIndex = students.findIndex((student) => student.id === parseInt(id)); // Find the student by ID

    if (studentIndex === -1) {
        return res.status(404).json({ message: "Student not found" }); // If student is not found
    }

    // Remove the student from the array
    students.splice(studentIndex, 1);

    res.status(200).json({ message: "Student deleted successfully" }); // Respond with success message
});

app.put('/api/students/:id', (req, res) => {
    const { id } = req.params; // Get the student ID from the URL parameter
    const updatedStudent = req.body; // Get the updated student data from the request body
  
    // Find the student by ID
    const studentIndex = students.findIndex((student) => student.id === parseInt(id));
  
    if (studentIndex === -1) {
        return res.status(404).json({ message: "Student not found" }); // If student is not found
    }
  
    // Validate the updated student data
    const validationErrors = validateStudent(updatedStudent);
    if (Object.keys(validationErrors).length > 0) {
        return res.status(400).json({ errors: validationErrors }); // If validation errors exist, return a 400 status
    }
  
    // Update the student data
    students[studentIndex] = { ...students[studentIndex], ...updatedStudent };
  
    res.status(200).json(students[studentIndex]); // Respond with the updated student data
});
app.get("/api/students/:id", (req, res) => {
    const { id } = req.params; // Get the student ID from the URL parameter
    const student = students.find((student) => student.id === parseInt(id)); // Find the student by ID
  
    if (!student) {
      return res.status(404).json({ message: "Student not found" }); // If student not found
    }
  
    res.json(student); // Return the student data as JSON
  });
  
  

app.listen(5000, () => {
    console.log("Server started on http://localhost:5000");
});
