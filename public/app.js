// Helper functions
const apiBase = '/api';

// Departments
const departmentsList = document.getElementById('departments-list');
const departmentForm = document.getElementById('department-form');
const departmentNameInput = document.getElementById('department-name');
const employeeDepartmentSelect = document.getElementById('employee-department');

// Employees
const employeesTableBody = document.querySelector('#employees-table tbody');
const employeeForm = document.getElementById('employee-form');
const employeeNameInput = document.getElementById('employee-name');
const employeeSurnameInput = document.getElementById('employee-surname');

// --- Departments CRUD ---
async function fetchDepartments() {
  const res = await fetch(`${apiBase}/departments`);
  return res.json();
}

function renderDepartments(departments) {
  departmentsList.innerHTML = '';
  employeeDepartmentSelect.innerHTML = '<option value="" disabled selected>Select Department</option>';
  departments.forEach(dept => {
    // List
    const li = document.createElement('li');
    li.textContent = dept.name;
    // Delete button
    const delBtn = document.createElement('button');
    delBtn.textContent = 'Delete';
    delBtn.onclick = async () => {
      if (confirm('Delete this department?')) {
        await fetch(`${apiBase}/departments/${dept._id}`, { method: 'DELETE' });
        loadDepartmentsAndEmployees();
      }
    };
    li.appendChild(delBtn);
    departmentsList.appendChild(li);
    // Select option
    const option = document.createElement('option');
    option.value = dept._id;
    option.textContent = dept.name;
    employeeDepartmentSelect.appendChild(option);
  });
}

departmentForm.onsubmit = async e => {
  e.preventDefault();
  const name = departmentNameInput.value.trim();
  if (!name) return;
  await fetch(`${apiBase}/departments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name })
  });
  departmentNameInput.value = '';
  loadDepartmentsAndEmployees();
};

// --- Employees CRUD ---
async function fetchEmployees() {
  const res = await fetch(`${apiBase}/employees`);
  return res.json();
}

function renderEmployees(employees, departments) {
  employeesTableBody.innerHTML = '';
  employees.forEach(emp => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><input type="text" value="${emp.name}" data-id="${emp._id}" class="edit-name" style="width:90px"></td>
      <td><input type="text" value="${emp.surname}" data-id="${emp._id}" class="edit-surname" style="width:90px"></td>
      <td>
        <select class="edit-department" data-id="${emp._id}">
          ${departments.map(d => `<option value="${d._id}"${emp.department && emp.department._id === d._id ? ' selected' : ''}>${d.name}</option>`).join('')}
        </select>
      </td>
      <td>
        <button class="save" data-id="${emp._id}">Save</button>
        <button class="delete" data-id="${emp._id}">Delete</button>
      </td>
    `;
    employeesTableBody.appendChild(tr);
  });

  // Save and Delete handlers
  employeesTableBody.querySelectorAll('.save').forEach(btn => {
    btn.onclick = async () => {
      const id = btn.dataset.id;
      const row = btn.closest('tr');
      const name = row.querySelector('.edit-name').value.trim();
      const surname = row.querySelector('.edit-surname').value.trim();
      const department = row.querySelector('.edit-department').value;
      await fetch(`${apiBase}/employees/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, surname, department })
      });
      loadDepartmentsAndEmployees();
    };
  });
  employeesTableBody.querySelectorAll('.delete').forEach(btn => {
    btn.onclick = async () => {
      const id = btn.dataset.id;
      if (confirm('Delete this employee?')) {
        await fetch(`${apiBase}/employees/${id}`, { method: 'DELETE' });
        loadDepartmentsAndEmployees();
      }
    };
  });
}

employeeForm.onsubmit = async e => {
  e.preventDefault();
  const name = employeeNameInput.value.trim();
  const surname = employeeSurnameInput.value.trim();
  const department = employeeDepartmentSelect.value;
  if (!name || !surname || !department) return;
  await fetch(`${apiBase}/employees`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, surname, department })
  });
  employeeNameInput.value = '';
  employeeSurnameInput.value = '';
  employeeDepartmentSelect.selectedIndex = 0;
  loadDepartmentsAndEmployees();
};

// --- Load Data ---
async function loadDepartmentsAndEmployees() {
  const departments = await fetchDepartments();
  renderDepartments(departments);
  const employees = await fetchEmployees();
  renderEmployees(employees, departments);
}

document.addEventListener('DOMContentLoaded', loadDepartmentsAndEmployees); 