import { Row, Col, InputGroup, Form, Button } from "react-bootstrap";
import { useState } from "react";
import validator from "validator";

const BmiCalculator = () => {
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBMI] = useState("");

  const ensureInteger = (event, setFunc) => {
    const intStr = event.target.value;

    if (validator.isInt(intStr, { min: 1 }) || intStr === "") 
        setFunc(intStr);
  };

  const handleDecimal = (event, setFunc) => {
    const decimalStr = event.target.value;

    if (validator.isNumeric(decimalStr) || validator.isFloat(decimalStr) || decimalStr === "")
        setFunc(decimalStr)
  };

  const calculateBMI = () => {
    if (height > 0 && weight > 0) {
        const heightInMeters = height / 100;
        const bmiValue = weight / (heightInMeters * heightInMeters);
        setBMI(bmiValue.toFixed(2));
    }
  }

  return (
    <>
      <div className="w-75 mx-auto border rounded-lg">
        <Row xs={1} sm={2} className="g-5">
          <Col>
            <Form.Label htmlFor="age">Age</Form.Label>
            <InputGroup>
              <Form.Control
                id="age"
                aria-describedby="age"
                type="number"
                min={1}
                placeholder="years"
                value={age}
                onChange={(event) => {
                    ensureInteger(event, setAge);
                }}
              />
            </InputGroup>
          </Col>

          <Col className="d-none d-sm-block"></Col>

          <Col>
            <Form.Label htmlFor="height">Height</Form.Label>
            <InputGroup>
              <Form.Control
                id="height"
                aria-describedby="height"
                type="number"
                min={1}
                step={0.1}
                placeholder="cm"
                value={height}
                onChange={(event) => {
                  ensureInteger(event, setHeight);
                }}
              />
            </InputGroup>
          </Col>

          <Col>
            <Form.Label htmlFor="weight">Weight</Form.Label>
            <InputGroup>
              <Form.Control
                id="weight"
                aria-describedby="weight"
                type="number"
                min={1}
                step={0.1}
                placeholder="kg"
                value={weight}
                onChange={(event) => {
                  handleDecimal(event, setWeight);
                }}
              />
            </InputGroup>
          </Col>

          <Col>
            <Button 
                variant="success"
                onClick={calculateBMI}
            >
                calculate BMI
            </Button>
          </Col>

          <Col>{bmi}</Col>
        </Row>
      </div>
    </>
  );
};

export default BmiCalculator;
