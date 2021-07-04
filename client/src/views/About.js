import React from "react";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const About = () => {
  return (
    <Row className="mt-5" style={{ marginRight: 0 }}>
      <Col className="text-center">
        <Button
          varriant="primary"
          href="https://www.facebook.com/tuantai412/"
          size="lg"
        >
          Visit my facebook to contact me !
        </Button>
      </Col>
    </Row>
  );
};

export default About;
