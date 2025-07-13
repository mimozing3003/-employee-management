require('dotenv').config();
const mongoose = require('mongoose');
const Department = require('./models/Department');
const Employee = require('./models/Employee');

const departmentsData = [
  { name: 'General Dentistry' },
  { name: 'Pediatric Dentistry' },
  { name: 'Restorative Dentistry' },
  { name: 'Surgery' },
  { name: 'Orthodontics' }
];

const employeesData = [
  { name: 'Alfred', surname: 'Christensen', department: 'General Dentistry' },
  { name: 'John', surname: 'Dudley', department: 'General Dentistry' },
  { name: 'Janet', surname: 'Doe', department: 'General Dentistry' },
  { name: 'Francisco', surname: 'Willard', department: 'Pediatric Dentistry' },
  { name: 'Sarah', surname: 'Alvarez', department: 'Pediatric Dentistry' },
  { name: 'Lisa', surname: 'Harris', department: 'Restorative Dentistry' },
  { name: 'Danny', surname: 'Perez', department: 'Restorative Dentistry' },
  { name: 'Constance', surname: 'Smith', department: 'Surgery' },
  { name: 'Leslie', surname: 'Roche', department: 'Orthodontics' },
  { name: 'Lisa', surname: 'Harris', department: 'Orthodontics' } // Lisa Harris is in two departments
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    await Department.deleteMany();
    await Employee.deleteMany();

    // Insert departments
    const departments = await Department.insertMany(departmentsData);
    const deptMap = {};
    departments.forEach(dept => { deptMap[dept.name] = dept._id; });

    // Insert employees
    const employeesToInsert = employeesData.map(emp => ({
      name: emp.name,
      surname: emp.surname,
      department: deptMap[emp.department]
    }));
    await Employee.insertMany(employeesToInsert);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
}

seed(); 