const studentRepository = require("./studentRepo");
const validateStudent = (student) => {
  const errors = {};
  if (!student.name || !student.name.trim()) errors.name = "Name is required";
  if (!student.group) errors.group = "Group is required";
  if (!student.age || student.age < 19 || student.age > 30) errors.age = "Age must be between 19 and 30";
  if (!student.grade || student.grade < 1 || student.grade > 10) errors.grade = "Grade must be between 1 and 10";
  return errors;
};

const getAllStudents = () => studentRepository.getAllStudents();

const getStudentById = (id) => studentRepository.getStudentById(id);

const addStudent = (student) => {
  const errors = validateStudent(student);
  if (Object.keys(errors).length > 0) return { errors };

  return studentRepository.addStudent(student);
};
const allStudents = require("./studentModel"); // or however you store them

function getPaginatedStudents(page, limit) {
  const start = (page - 1) * limit;
  const end = start + limit;
  const paginated = allStudents.slice(start, end);

  return {
    students: paginated,
    totalPages: Math.ceil(allStudents.length / limit)
  };
}

// const updateStudent = (id, student) => {
//   const errors = validateStudent(student);
//   if (Object.keys(errors).length > 0) return { errors };

//   return studentRepository.updateStudent(id, student);
// };
function updateStudent(id, updatedData) {
    const students = studentRepository.getAllStudents();
    const student = students.find(student => student.id === parseInt(id));
    if (!student) return null;
  
    // Validate only the fields that are being updated
    const errors = validateStudent(updatedData);
    if (Object.keys(errors).length > 0) {
      return { errors };  // Return validation errors if any
    }
  
    // Perform a partial update
    Object.keys(updatedData).forEach(key => {
      if (updatedData[key]) {
        student[key] = updatedData[key];
      }
    });
  
    return student;
  }

// FILTER STUDENTS
const getStudentsBySpecialization = (specialization) => {
    const students = studentRepository.getAllStudents();
    return students.filter(student => student.specialization === specialization);

}

const deleteStudent = (id) => studentRepository.deleteStudent(id);

const getFailingStudents= ()=> {
    const students = studentRepository.getAllStudents();
    return students.filter(student => student.grade < 5);
}
const getGradeChartData = (students) => {
  return {
    labels: students.map((s) => s.name),
    datasets: [
      {
        label: "Grades",
        data: students.map((s) => s.grade),
        backgroundColor: "rgba(75,192,192,0.6)",
      },
    ],
  };
};

const getSpecializationChartData = (students) => {
  const specializationCounts = students.reduce((acc, student) => {
    acc[student.specialization] = (acc[student.specialization] || 0) + 1;
    return acc;
  }, {});

  return {
    labels: Object.keys(specializationCounts),
    datasets: [
      {
        label: "Specialization Distribution",
        data: Object.values(specializationCounts),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40"
        ],
      },
    ],
  };
};
const getAvgGradeChartData = (students) => {
  const specializationGrades = {};

  students.forEach((student) => {
    const { specialization, grade } = student;
    if (!specializationGrades[specialization]) {
      specializationGrades[specialization] = { total: 0, count: 0 };
    }
    specializationGrades[specialization].total += grade;
    specializationGrades[specialization].count += 1;
  });

  const labels = Object.keys(specializationGrades);
  const avgGrades = labels.map(
    (spec) =>
      specializationGrades[spec].total / specializationGrades[spec].count
  );

  return {
    labels,
    datasets: [
      {
        label: "Average Grade by Specialization",
        data: avgGrades,
        backgroundColor: "rgba(153, 102, 255, 0.6)",
      },
    ],
  };
};



module.exports = { getAllStudents, getStudentById, addStudent, updateStudent, deleteStudent,getStudentsBySpecialization,getFailingStudents 

,getGradeChartData,getSpecializationChartData,getAvgGradeChartData,getPaginatedStudents
};
