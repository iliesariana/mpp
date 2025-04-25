// // chartDataConfig.js
// export const getGradeChartData = (students) => {
//     return {
//       labels: students.map((s) => s.name),
//       datasets: [
//         {
//           label: "Grades",
//           data: students.map((s) => s.grade),
//           backgroundColor: "rgba(75,192,192,0.6)",
//         },
//       ],
//     };
//   };
  
//   export const getSpecializationPieChartData = (students) => {
//     const specializationCounts = students.reduce((acc, student) => {
//       acc[student.specialization] = (acc[student.specialization] || 0) + 1;
//       return acc;
//     }, {});
  
//     return {
//       labels: Object.keys(specializationCounts),
//       datasets: [
//         {
//           data: Object.values(specializationCounts),
//           backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
//         },
//       ],
//     };
//   };
  
//   export const getAvgGradeBarChartData = (students) => {
//     const avgGradesBySpecialization = students.reduce((acc, student) => {
//       acc[student.specialization] = acc[student.specialization] || [];
//       acc[student.specialization].push(student.grade);
//       return acc;
//     }, {});
  
//     const data = Object.keys(avgGradesBySpecialization).map((spec) => {
//       const avgGrade =
//         avgGradesBySpecialization[spec].reduce((sum, grade) => sum + grade, 0) /
//         avgGradesBySpecialization[spec].length;
//       return { specialization: spec, avgGrade };
//     });
  
//     return {
//       labels: data.map((d) => d.specialization),
//       datasets: [
//         {
//           label: "Average Grade",
//           data: data.map((d) => d.avgGrade),
//           backgroundColor: "#4CAF50",
//         },
//       ],
//     };
//   };
  