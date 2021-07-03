import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";

const RegisterForm = () => {
  return (
    <>
      <Form>
        <Form.Group className="form-text-box">
          <Form.Control
            type="text"
            placeholder="Username"
            name="username"
            required
          />
        </Form.Group>
        <Form.Group className="form-text-box">
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            required
          />
        </Form.Group>
        <Form.Group className="form-text-box">
          <Form.Control
            type="password"
            placeholder="Confirm password"
            name="confirm password"
            required
          />
        </Form.Group>
        <Button type="submit" variant="success">
          Register
        </Button>
      </Form>
      <p>
        Already have an account?
        <Link to="/login">
          <Button variant="info" size="sm" className="login-button">
            Login
          </Button>
        </Link>
      </p>
    </>
  );
};

export default RegisterForm;
