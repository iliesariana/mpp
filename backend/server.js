// const express = require("express");
// const cors = require("cors");

// const app = express();
// app.use(cors());
// app.use(express.json());
// const port = 5000;
// app.get("/", (req, res) => {
//     res.send("Backend is running!");
// });

// let students =[  
// { id: 2, name: "Bob", grade: 6.5, age: 21, group: 924, specialization: "Informatics", courses: ["Programming", "Databases", "AI"] },
// { id: 3, name: "Charlie", grade: 3.8, age: 22, group: 932, specialization: "Mathematics and Informatics", courses: ["Calculus", "Machine Learning", "Data Science"] },
// { id: 4, name: "David", grade: 4.9, age: 24, group: 922, specialization: "Informatics", courses: ["Cybersecurity", "Software Engineering", "Networks"] },
// { id: 5, name: "Emma", grade: 7.1, age: 20, group: 911, specialization: "Mathematics", courses: ["Geometry", "Probability", "Linear Algebra"] },
// { id: 6, name: "Frank", grade: 8.2, age: 23, group: 910, specialization: "Physics", courses: ["Quantum Mechanics", "Thermodynamics"] },
// { id: 7, name: "Grace", grade: 9.0, age: 19, group: 915, specialization: "Informatics", courses: ["Data Structures", "Operating Systems"] },
// { id: 8, name: "Hannah", grade: 3.6, age: 22, group: 918, specialization: "Biology", courses: ["Genetics", "Microbiology"] },
// { id: 9, name: "Ian", grade: 5.5, age: 21, group: 916, specialization: "Mathematics", courses: ["Differential Equations", "Topology"] },
// { id: 10, name: "Jack", grade: 6.9, age: 23, group: 920, specialization: "Informatics", courses: ["Software Testing", "Embedded Systems"] },
// { id: 11, name: "Kate", grade: 4.1, age: 20, group: 924, specialization: "Physics", courses: ["Classical Mechanics", "Electromagnetism"] },
// ];
// const validateStudent = (student) => {
//     const errors = {};
//     if (!student.name || !student.name.trim()) {
//       errors.name = 'Name is required';
//     }
//     if(!student.group) {
//       errors.group = 'Group is required';
//     }
//     if (!student.age || student.age < 19 || student.age > 30) {
//       errors.age = 'Age must be between 19 and 30';
//     }
//     if (!student.grade || student.grade < 1 || student.grade > 10) {
//       errors.grade = 'Grade must be between 1 and 10';
//     }
//     return errors;
//   };
// app.get("/api/students", (req, res) => {
//     res.json(students);  // Return the list of students
// });

// app.post('/api/students',(req,res)=>
// {
//     const newStudent = req.body;
//     const validationErrors = validateStudent(newStudent);
//     if (Object.keys(validationErrors).length > 0) {
//         return res.status(400).json({ errors: validationErrors });
//       }
//     newStudent.id = students.length + 1;
//     students.push(newStudent);
//     res.status(201).json(newStudent);
// })
// app.delete('/api/students/:id', (req, res) => {
//     const { id } = req.params; // Get the student ID from the URL parameter
//     const studentIndex = students.findIndex((student) => student.id === parseInt(id)); // Find the student by ID

//     if (studentIndex === -1) {
//         return res.status(404).json({ message: "Student not found" }); // If student is not found
//     }

//     // Remove the student from the array
//     students.splice(studentIndex, 1);

//     res.status(200).json({ message: "Student deleted successfully" }); // Respond with success message
// });

// app.put('/api/students/:id', (req, res) => {
//     const { id } = req.params; // Get the student ID from the URL parameter
//     const updatedStudent = req.body; // Get the updated student data from the request body
  
//     // Find the student by ID
//     const studentIndex = students.findIndex((student) => student.id === parseInt(id));
  
//     if (studentIndex === -1) {
//         return res.status(404).json({ message: "Student not found" }); // If student is not found
//     }
  
//     // Validate the updated student data
//     const validationErrors = validateStudent(updatedStudent);
//     if (Object.keys(validationErrors).length > 0) {
//         return res.status(400).json({ errors: validationErrors }); // If validation errors exist, return a 400 status
//     }
  
//     // Update the student data
//     students[studentIndex] = { ...students[studentIndex], ...updatedStudent };
  
//     res.status(200).json(students[studentIndex]); // Respond with the updated student data
// });
// app.get("/api/students/:id", (req, res) => {
//     const { id } = req.params; // Get the student ID from the URL parameter
//     const student = students.find((student) => student.id === parseInt(id)); // Find the student by ID
  
//     if (!student) {
//       return res.status(404).json({ message: "Student not found" }); // If student not found
//     }
  
//     res.json(student); // Return the student data as JSON
//   });
  
  

// app.listen(5000, () => {
//     console.log("Server started on http://localhost:5000");
// });

//ASTA MERGE pt prima parte 

// const express = require("express");
// const cors = require("cors");
// const studentRoutes = require("./studentsRoutes");
// const app = express();
// const port = 5000;
// const {generateStudents}= require("./studentModel");
// app.use(cors());
// app.use(express.json());

// app.get("/", (req, res) => res.send("Backend is running!"));

// app.use("/api/students", studentRoutes);
//  app.listen(port, () => console.log(`Server running on http://localhost:${port}`));



// // server.js
// const studentRoutes = require("./studentsRoutes");
// const express = require("express");
// const http = require("http");
// const socketIo = require("socket.io");
// const cors = require("cors");
// const { group } = require("console");
// const app = express();
// const server = http.createServer(app);  // Create a single HTTP server
// const io = socketIo(server, {
//     cors: {
//       origin: "http://localhost:3000",  // Allow requests from localhost:3000
//       methods: ["GET", "POST"],
//       allowedHeaders: ["Content-Type"],
//       credentials: true,
//     },
//   });

// io.on('connection', (socket) => {
//     console.log('A client has connected!');
//     socket.emit('clientConnected', { message: 'A client has connected!' });

//     // Handle other events, like receiving new students
//     socket.on('newStudent', (newStudent) => {
//         // Broadcast or send the new student to clients
//         io.emit('newStudent', newStudent);
//     });

//     socket.on('disconnect', () => {
//         console.log('A client has disconnected');
//     });
// });
// Socket.IO listens to the same server
// app.use(cors());
// // HTTP Route example (e.g., normal API route)
// app.get("/api", (req, res) => {
//   res.send("API is working");
// });
// app.use("/api/students", studentRoutes);
// // WebSocket event listener
// io.on('connection', (socket) => {
//   console.log('A client connected');

//   setInterval(() => {
//     const newStudent = {
//       id: Date.now(),
//       name: `Student ${Math.floor(Math.random() * 100)}`,
//       grade: Math.floor(Math.random() * 10) + 1,
//         age: Math.floor(Math.random() * 12) + 18,
//         group: Math.floor(Math.random() * 100) + 900,

//       specialization: 'Informatics',
//         courses: ['Course 1', 'Course 2'],
//     };

//     // Send the new student to all connected clients
//     io.emit('newStudent', newStudent);
//   }, 5000);

//   socket.on('disconnect', () => {
//     console.log('A client disconnected');
//   });
// });

// // Start the server on port 5000
// server.listen(5000, () => {
//   console.log("Server running on http://localhost:5000");
// });








const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const studentRoutes = require("./studentsRoutes");
const { faker } = require('@faker-js/faker');
const uploadRoute = require("./fileRoutes");
const path = require("path");
const app = express();
const multer = require("multer");

// REST API Setup (Port 5000)
app.use(cors());
app.use(express.json());

app.get("/api", (req, res) => {
  res.send("API is working");
});
 

app.use("/api/students", studentRoutes); // API routes for students
app.use("/api/upload", uploadRoute);
app.use("/api/files", uploadRoute); 
app.use("/uploads", express.static("uploads"));
// app.use("/api/files", fileRoute); // API routes for file uploads

//app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//app.use('/api/files', fileRoute);
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // folder to store uploads
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // unique file name
  },
});
const upload = multer({
  storage,
  limits: { fileSize: 1000 * 1024 * 1024 }, // limit to ~1GB
});
// Start the REST API server on port 5000
const restApiServer = app.listen(5000, () => {
  console.log("REST API Server running on http://localhost:5000");
});

//WebSocket Setup (Port 4000)
const wsServer = http.createServer();  // Create a new HTTP server for WebSocket
const io = socketIo(wsServer, {
  cors: {
    origin: "http://localhost:3000",  // Allow requests from your frontend
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  },
});

io.on('connection', (socket) => {
  console.log('A client connected to WebSocket');

  // Send a new student every 5 seconds
  setInterval(() => {
    const newStudent = {
      id: Date.now(), // Unique ID based on timestamp
      name: faker.person.fullName(),
      grade: faker.number.int({min:1,max:10}) ,// Random grade between 1 and 10
      age: faker.number.int({ min: 18, max: 30 }), // Corrected method for generating a random number
      group: faker.number.int({ min: 900, max: 999 }),
      specialization: faker.helpers.arrayElement([
        'Informatics',
        'Mathematics',
        'Physics',
        'Biology',
        'Chemistry',
        'Engineering',
      ]),
      courses: [
        faker.helpers.arrayElement([
          'Programming',
          'Databases',
          'AI',
          'Machine Learning',
          'Data Science',
          'Cybersecurity',
          'Quantum Mechanics',
          'Genetics',
          'Topology',
          'Embedded Systems',
        ]),
        faker.helpers.arrayElement([
          'Calculus',
          'Linear Algebra',
          'Probability',
          'Microbiology',
          'Genetics',
          'Software Engineering',
          'Electromagnetism',
          'Operating Systems',
        ]),
        faker.helpers.arrayElement([
          'Differential Equations',
          'Software Testing',
          'Networks',
          'Operating Systems',
          'Classical Mechanics',
        ]),
      ],
    };

    // Emit the new student to all connected WebSocket clients
    io.emit('newStudent', newStudent);
  }, 10000);
  app.get("/api/download/:filename", (req, res) => {
    const { filename } = req.params;
    
    // Define the path to the uploaded files
    const filePath = path.join(__dirname, "uploads", filename);
    
    // Check if the file exists
    if (fs.existsSync(filePath)) {
      // If the file exists, send it to the client
      res.download(filePath, filename, (err) => {
        if (err) {
          console.error("Error downloading file:", err);
          res.status(500).json({ message: "Error downloading file" });
        }
      });
    } else {
      // If the file doesn't exist, return a 404 error
      res.status(404).json({ message: "File not found" });
    }
  });
  // Endpoint to list all files
app.get('/api/files', (req, res) => {
  const uploadsDir = path.join(__dirname, 'uploads');

  // Read the "uploads" directory
  fs.readdir(uploadsDir, (err, files) => {
    if (err) {
      return res.status(500).json({ message: 'Error reading files', error: err });
    }
    res.status(200).json(files); // Send the list of filenames
  });
});

// Endpoint to download a specific file
app.get('/api/files/:filename', (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(__dirname, 'uploads', filename);

  // Check if the file exists
  if (fs.existsSync(filePath)) {
    // Send the file to the client
    res.download(filePath, filename, (err) => {
      if (err) {
        console.error('Error downloading file:', err);
        res.status(500).json({ message: 'Error downloading file' });
      }
    });
  } else {
    // If the file doesn't exist, return a 404 error
    res.status(404).json({ message: 'File not found' });
  }
});


  socket.on('disconnect', () => {
    console.log('A client disconnected from WebSocket');
  });
});



//Start the WebSocket server on port 4000
wsServer.listen(4000, () => {
  console.log("WebSocket Server running on http://localhost:4000");
});
