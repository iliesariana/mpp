// const request = require("supertest");
// const express = require("express");
// const studentRouter = require("../studentsRoutes"); // path to your router


// const app = express();
// app.use(express.json()); // important for POST/PUT tests
// app.use("/", studentRouter);

// jest.mock("../studentService");
// const studentService = require("../studentService");

// const mockStudents = [
//   { id: 1, name: "Alice", grade: 4.5, age: 21, group: 921, specialization: "Math" },
//   { id: 2, name: "Bob", grade: 6.5, age: 22, group: 922, specialization: "Physics" },
// ];

// describe("Student Routes", () => {
//     beforeEach(() => {
//       jest.clearAllMocks();
//     });
  
//     test("GET / should return all students", async () => {
//       studentService.getAllStudents.mockReturnValue(mockStudents);
  
//       const res = await request(app).get("/");
//       expect(res.status).toBe(200);
//       expect(res.body).toEqual(mockStudents);
//     });
  
//     test("GET /:id should return a student", async () => {
//       studentService.getStudentById.mockReturnValue(mockStudents[0]);
  
//       const res = await request(app).get("/1");
//       expect(res.status).toBe(200);
//       expect(res.body.name).toBe("Alice");
//     });
  
//     test("GET /:id should return 404 if not found", async () => {
//       studentService.getStudentById.mockReturnValue(null);
  
//       const res = await request(app).get("/99");
//       expect(res.status).toBe(404);
//     });
  
//     test("POST / should add a student", async () => {
//       const newStudent = { name: "Eve", age: 23, grade: 7, group: 900 };
//       const createdStudent = { ...newStudent, id: 3 };
//       studentService.addStudent.mockReturnValue(createdStudent);
  
//       const res = await request(app).post("/").send(newStudent);
//       expect(res.status).toBe(201);
//       expect(res.body.id).toBe(3);
//     });
  
//     test("POST / should return 400 for invalid student", async () => {
//       studentService.addStudent.mockReturnValue({ errors: { name: "Name is required" } });
  
//       const res = await request(app).post("/").send({ name: "", age: 30, group: 901, grade: 9 });
//       expect(res.status).toBe(400);
//       expect(res.body.errors.name).toBe("Name is required");
//     });
  
//     test("PATCH /:id should update a student", async () => {
//       const updated = { id: 1, name: "Alice", age: 21, group: 921, grade: 5 };
//       studentService.updateStudent.mockReturnValue(updated);
  
//       const res = await request(app).patch("/1").send({ grade: 5 });
//       expect(res.status).toBe(200);
//       expect(res.body.grade).toBe(5);
//     });
  
//     test("DELETE /:id should delete student", async () => {
//       studentService.deleteStudent.mockReturnValue(true);
  
//       const res = await request(app).delete("/1");
//       expect(res.status).toBe(200);
//       expect(res.body.message).toBe("Student deleted successfully");
//     });
  
//     test("GET /filter/fail should return failing students", async () => {
//       studentService.getFailingStudents.mockReturnValue([mockStudents[0]]);
  
//       const res = await request(app).get("/filter/fail");
//       expect(res.status).toBe(200);
//       expect(res.body.length).toBe(1);
//     });
  
//     test("GET /filter/spec/:spec should return students by specialization", async () => {
//       studentService.getStudentsBySpecialization.mockReturnValue([mockStudents[1]]);
  
//       const res = await request(app).get("/filter/spec/Physics");
//       expect(res.status).toBe(200);
//       expect(res.body[0].specialization).toBe("Physics");
//     });
  
//     test("GET /sort/asc should return students sorted by age ascending", async () => {
//       studentService.getAllStudents.mockReturnValue(mockStudents);
  
//       const res = await request(app).get("/sort/asc");
//       expect(res.status).toBe(200);
//       expect(res.body[0].age).toBeLessThanOrEqual(res.body[1].age);
//     });
//   });

//   test("GET /:id should return 404 if not found", async () => {
//     studentService.getStudentById.mockReturnValue(null);
  
//     const res = await request(app).get("/99");
//     expect(res.status).toBe(404);
//     expect(res.body.message).toBe("Student not found");
//   });
  
//   test("GET /:id should return 500 if there's an internal server error", async () => {
//     studentService.getStudentById.mockImplementation(() => {
//       throw new Error("Internal server error");
//     });
  
//     const res = await request(app).get("/1");
//     expect(res.status).toBe(500);
//     expect(res.body.message).toBe("Error filtering by specialization");
//   });
  
const request = require("supertest");
const express = require("express");
const studentRouter = require("../studentsRoutes"); // path to your router

const app = express();
app.use(express.json());
app.use("/", studentRouter);

// Mock studentService
jest.mock("../studentService");
const studentService = require("../studentService");

const mockStudents = [
  { id: 1, name: "Alice", grade: 4.5, age: 21, group: 921, specialization: "Math" },
  { id: 2, name: "Bob", grade: 6.5, age: 22, group: 922, specialization: "Physics" },
];

describe("Student Routes", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("GET /:id should return student by ID", async () => {
    studentService.getStudentById.mockReturnValue(mockStudents[0]);

    const res = await request(app).get("/1");
    expect(res.status).toBe(200);
    expect(res.body.name).toBe("Alice");
  });
  test("GET /filter/spec/:spec should return students by specialization", async () => {
    studentService.getStudentsBySpecialization.mockReturnValue([mockStudents[0]]);
    
    const res = await request(app).get("/filter/spec/Math");
    expect(res.status).toBe(200);
    expect(res.body[0].specialization).toBe("Math");
  });

  test("GET /filter/spec/:spec should return 500 if an error occurs", async () => {
    studentService.getStudentsBySpecialization.mockImplementation(() => {
      throw new Error("Error filtering by specialization");
    });

    const res = await request(app).get("/filter/spec/Math");
    expect(res.status).toBe(500);
    expect(res.body.message).toBe("Error filtering by specialization");
  });

  test("GET /filter/fail should return failing students", async () => {
    studentService.getFailingStudents.mockReturnValue([mockStudents[0]]);
    
    const res = await request(app).get("/filter/fail");
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
  });

  test("GET /sort/asc should return students sorted by age ascending", async () => {
    studentService.getAllStudents.mockReturnValue(mockStudents);

    const res = await request(app).get("/sort/asc");
    expect(res.status).toBe(200);
    expect(res.body[0].age).toBeLessThanOrEqual(res.body[1].age);
  });

  test("GET /sort/desc should return students sorted by age descending", async () => {
    studentService.getAllStudents.mockReturnValue(mockStudents);

    const res = await request(app).get("/sort/desc");
    expect(res.status).toBe(200);
    expect(res.body[0].age).toBeGreaterThanOrEqual(res.body[1].age);
  });

  // test("GET / should return all students", async () => {
  //   studentService.getAllStudents.mockReturnValue(mockStudents);

  //   const res = await request(app).get("/");
  //   expect(res.status).toBe(200);
  //   expect(res.body).toEqual( { id: 1, name: "Alice", grade: 4.5, age: 21, group: 921, specialization: "Math" });
  // });

  

  test("GET /:id should return 404 if student is not found", async () => {
    studentService.getStudentById.mockReturnValue(null);

    const res = await request(app).get("/99");
    expect(res.status).toBe(404);
  });

  test("POST / should create a student", async () => {
    const newStudent = { name: "Eve", age: 23, grade: 7, group: 900 };
    studentService.addStudent.mockReturnValue({ ...newStudent, id: 3 });

    const res = await request(app).post("/").send(newStudent);
    expect(res.status).toBe(201);
    expect(res.body.id).toBe(3);
  });

  test("POST / should return 400 if data is invalid", async () => {
    studentService.addStudent.mockReturnValue({ errors: { name: "Name is required" } });

    const res = await request(app).post("/").send({ name: "", age: 30, group: 901, grade: 9 });
    expect(res.status).toBe(400);
    expect(res.body.errors.name).toBe("Name is required");
  });

  test("DELETE /:id should delete student", async () => {
    studentService.deleteStudent.mockReturnValue(true);

    const res = await request(app).delete("/1");
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Student deleted successfully");
  });

  test("DELETE /:id should return 404 if student is not found", async () => {
    studentService.deleteStudent.mockReturnValue(false);

    const res = await request(app).delete("/99");
    expect(res.status).toBe(404);
  });

  test("PATCH /:id should update student", async () => {
    const updatedStudent = { id: 1, name: "Alice", age: 21, group: 921, grade: 5 };
    studentService.updateStudent.mockReturnValue(updatedStudent);

    const res = await request(app).patch("/1").send({ grade: 5 });
    expect(res.status).toBe(200);
    expect(res.body.grade).toBe(5);
  });

  // test("PATCH /:id should return 404 if student is not found", async () => {
  //   studentService.updateStudent.mockReturnValue(null);

  //   const res = await request(app).patch("/99").send({ grade: 5 });
  //   expect(res.status).toBe(404);
  // });

  test("PATCH /:id should return 400 if invalid input", async () => {
    studentService.updateStudent.mockReturnValue({ errors: { grade: "Grade must be a number" } });

    const res = await request(app).patch("/1").send({ grade: "invalid" });
    expect(res.status).toBe(400);
    expect(res.body.errors.grade).toBe("Grade must be a number");
  });
});
