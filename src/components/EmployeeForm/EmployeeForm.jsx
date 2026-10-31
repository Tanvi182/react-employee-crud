
import React, { useEffect, useState } from "react";
import { Card, Form, Row, Col, Button } from "react-bootstrap";

function EmployeeForm({ onSave, onCancel, editEmployee }) {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
    salary: ""
  });

  // Fill form when editing
  useEffect(() => {

    if (editEmployee) {
      setFormData(editEmployee);
    } else {
      setFormData({
        name: "",
        email: "",
        department: "",
        salary: ""
      });
    }

  }, [editEmployee]);

  // Handle input changes
  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });

  };

  // Submit form
  const handleSubmit = (e) => {

    e.preventDefault();

    onSave({
      ...formData,
      salary: Number(formData.salary)
    });

  };

  return (

    <Card className="shadow-sm mb-4">

      <Card.Body>

        <h4 className="mb-4">
          {editEmployee ? "Edit Employee" : "Add Employee"}
        </h4>

        <Form onSubmit={handleSubmit}>

          <Row>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Employee Name</Form.Label>

                <Form.Control
                  name="name"
                  type="text"
                  placeholder="Enter name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>

                <Form.Control
                  name="email"
                  type="email"
                  placeholder="Enter email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Department</Form.Label>

                <Form.Select
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Department</option>
                  <option value="IT">IT</option>
                  <option value="HR">HR</option>
                  <option value="Finance">Finance</option>
                  <option value="Marketing">Marketing</option>
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Salary</Form.Label>

                <Form.Control
                  name="salary"
                  type="number"
                  placeholder="Enter salary"
                  min="1"
                  value={formData.salary}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>

          </Row>

          <Button type="submit" className="me-2">
            {editEmployee ? "Update Employee" : "Save Employee"}
          </Button>

          <Button variant="secondary" onClick={onCancel}>
            Cancel
          </Button>

        </Form>

      </Card.Body>

    </Card>

  );

}

export default EmployeeForm;
