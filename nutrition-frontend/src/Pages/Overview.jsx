import { Row, Col, InputGroup, Form, Button } from "react-bootstrap";
import { Dashboard } from "../Components";
import { useState } from "react";
import validator from "validator"

const Overview = () => {
    const [age, setAge] = useState("")
    const [height, setHeight] = useState("")
    const [weight, setWeight] = useState("")

    const ensureInteger = (event) => {
        const ageStr = event.target.value

        if(validator.isInt(ageStr, {min: 1}) || ageStr === "")
            setAge(ageStr)
    }

    const handleDecimal = (event, setFunc) => {
        const decimalStr = event.target.value

        if(validator.isNumeric(decimalStr, {no_symbols: true}) || decimalStr === ""){
            if(validator.isFloat(decimalStr))
                console.log(parseFloat(decimalStr).toFixed(1))
        }
    }
  return (
    <>
      <Dashboard>
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
                  onChange={ensureInteger}
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
                  onChange={(event)=>{
                    handleDecimal(event, setHeight)
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
                  onChange={(event)=>{
                    handleDecimal(event, setWeight)
                  }}
                />
              </InputGroup>
            </Col>

            <Col>
              <Button variant="success">calculate BMI</Button>
            </Col>

            <Col>2 of 2</Col>
          </Row>
        </div>
      </Dashboard>
    </>
  );
};

export default Overview;
