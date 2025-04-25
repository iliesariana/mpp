const students = require("./studentModel");
const getAllStudents=() => students;
const getStudentById=(id) =>students.find((student)=>student.id === parseInt(id));
// const addStudent = (student) =>
// {
//     student.id = students.length + 1;
//     students.push(student);
//     return student;
// }
const addStudent = (student) => {
  let newId = student.id;

  if (!newId || students.find((s) => s.id === newId)) {
    // Generate a unique ID if it's missing or already exists
    newId = students.length > 0 ? Math.max(...students.map(s => s.id)) + 1 : 1;
  }

  const newStudent = { ...student, id: newId };

  students.push(newStudent);
  return newStudent;
};

const updateStudent=(id,updatedStudent) =>
{
const index = students.findIndex((student) => student.id === parseInt(id));
  if (index === -1) return null;

  students[index] = { ...students[index], ...updatedStudent };
  return students[index];
}

const deleteStudent = (id) => {
    const index = students.findIndex((student) => student.id === parseInt(id));
    if (index === -1) return false;
  
    students.splice(index, 1);
    return true;
  };
  
  module.exports = { getAllStudents, getStudentById, addStudent, updateStudent, deleteStudent };