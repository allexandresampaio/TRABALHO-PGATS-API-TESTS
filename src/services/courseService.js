const { users } = require('../models/userModel');
const { courses } = require('../models/courseModel');

function enroll({ username, courseId }) {
  const user = users.find(u => u.username === username);
  if (!user) throw new Error('Usuário não encontrado');
  if (user.curso) throw new Error('Usuário já está inscrito em um curso');
  const course = courses.find(c => c.id === courseId);
  if (!course) throw new Error('Curso não encontrado');
  user.curso = course.name; // Salva apenas o nome do curso na propriedade 'curso' do usuário
  return user;
}

function getAllCourses() {
  return courses;
}

module.exports = {
  enroll,
  getAllCourses,
};