
import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import EmployeeForm from "../../components/EmployeeForm/EmployeeForm";
import EmployeeTables from "../../components/EmployeeTables/EmployeeTables";
function Employee() {

  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: "Rahul Sharma",
      email: "rahul@gmail.com",
      department: "IT",
      salary: 35000
    },
    {
      id: 2,
      name: "Priya Patel",
      email: "priya@gmail.com",
      department: "HR",
      salary: 30000
    },
    {
      id: 3,
      name: "Amit Shah",
      email: "amit@gmail.com",
      department: "Finance",
      salary: 40000
    },
    {
      id: 4,
      name: "Neha Joshi",
      email: "neha@gmail.com",
      department: "IT",
      salary: 45000
    },
    {
      id: 5,
      name: "Karan Mehta",
      email: "karan@gmail.com",
      department: "Marketing",
      salary: 32000
    },
    {
      id: 6,
      name: "Riya Desai",
      email: "riya@gmail.com",
      department: "HR",
      salary: 28000
    }
  ]);

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [currentPage, setCurrentPage] = useState(1);

  const [showForm, setShowForm] = useState(false);
  const [editEmployee, setEditEmployee] = useState(null);

  const recordsPerPage = 5;

  // CREATE & UPDATE
  const handleSave = (employee) => {

    if (editEmployee) {

      setEmployees(employees.map((item) =>
        item.id === editEmployee.id
          ? { ...employee, id: editEmployee.id }
          : item
      ));

      setEditEmployee(null);

    } else {

      setEmployees([
        ...employees,
        { ...employee, id: Date.now() }
      ]);

    }

    setShowForm(false);
  };

  // DELETE
  const handleDelete = (id) => {

    if (window.confirm("Are you sure you want to delete this employee?")) {
      setEmployees(employees.filter((item) => item.id !== id));
    }
  };

  // EDIT
  const handleEdit = (employee) => {
    setEditEmployee(employee);
    setShowForm(true);
  };

  // SEARCH
  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(search.toLowerCase()) ||
    employee.email.toLowerCase().includes(search.toLowerCase()) ||
    employee.department.toLowerCase().includes(search.toLowerCase())
  );

  // SORTING
  const sortedEmployees = [...filteredEmployees].sort((a, b) => {

    if (sortBy === "salary") {
      return a.salary - b.salary;
    }

    return a[sortBy].localeCompare(b[sortBy]);

  });

  // PAGINATION
  const totalPages = Math.ceil(
    sortedEmployees.length / recordsPerPage
  );

  const startIndex = (currentPage - 1) * recordsPerPage;

  const currentEmployees = sortedEmployees.slice(
    startIndex,
    startIndex + recordsPerPage
  );

  return (
    <div className="container-fluid py-5">

      <div className="align-items-center mb-4">

        <div>
          <h2 className="fw-bold">Employee Management</h2>
          <p className="text-muted">
            Manage your employee records
          </p>
        </div>

        <div className="text-end">
          <Button onClick={() => {
            setEditEmployee(null);
            setShowForm(true);
          }}>
            + Add Employee
          </Button>
        </div>

      </div>

      {/* SEARCH AND SORT */}

      <div className="mb-3">

        <div md={6}>
          <Form.Control
            type="text"
            placeholder="Search name, email or department..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        <div md={3}>
          <Form.Select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="name">Sort by Name</option>
            <option value="department">Sort by Department</option>
            <option value="salary">Sort by Salary</option>
          </Form.Select>
        </div>

      </div>

      {/* EMPLOYEE FORM */}

      {showForm && (
        <EmployeeForm
          onSave={handleSave}
          onCancel={() => {
            setShowForm(false);
            setEditEmployee(null);
          }}
          editEmployee={editEmployee}
        />
      )}

      {/* EMPLOYEE TABLE */}

      <EmployeeTables
        employees={currentEmployees}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* PAGINATION */}

      <div className="d-flex justify-content-between align-items-center mt-3">

        <span>
          Showing {sortedEmployees.length === 0 ? 0 : startIndex + 1}-
          {Math.min(startIndex + recordsPerPage, sortedEmployees.length)}
          {" "}of {sortedEmployees.length} employees
        </span>

        <div className="d-flex gap-2">

          <Button
            variant="outline-primary"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Previous
          </Button>

          <span className="align-self-center">
            {currentPage} / {Math.max(totalPages, 1)}
          </span>

          <Button
            variant="outline-primary"
            disabled={currentPage >= totalPages || totalPages === 0}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </Button>

        </div>

      </div>

    </div>
  );
}

export default Employee;
