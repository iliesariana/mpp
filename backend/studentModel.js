const { faker } = require('@faker-js/faker');

let students = [];

// Function to generate a list of students
const generateStudents = (num = 100) => {
  students = [];
  for (let i = 0; i < num; i++) {
    const student = {
      id: Date.now() + i, // Unique ID based on timestamp and index
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
    students.push(student);
  }
};

// Call the function to generate 100 fake students (you can change the number here)
generateStudents(100);
module.exports = students;