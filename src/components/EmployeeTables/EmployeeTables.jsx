
import React from "react";
import { Table, Button } from "react-bootstrap";

function EmployeeTables({ employees, onEdit, onDelete }) {

  return (

    <Table responsive bordered hover striped className="text-center align-middle">

      <thead className="table-dark">

        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Department</th>
          <th>Salary</th>
          <th>Actions</th>
        </tr>

      </thead>

      <tbody>

        {employees.length > 0 ? (

          employees.map((employee) => (

            <tr key={employee.id}>

              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.department}</td>
              <td>₹{employee.salary.toLocaleString("en-IN")}</td>

              <td>

                <Button
                  variant="warning"
                  size="sm"
                  className="me-2"
                  onClick={() => onEdit(employee)}
                >
                  Edit
                </Button>

                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => onDelete(employee.id)}
                >
                  Delete
                </Button>

              </td>

            </tr>

          ))

        ) : (

          <tr>
            <td colSpan="6" className="text-muted py-4">
              No employee records found.
            </td>
          </tr>

        )}

      </tbody>

    </Table>

  );

}

export default EmployeeTables;
