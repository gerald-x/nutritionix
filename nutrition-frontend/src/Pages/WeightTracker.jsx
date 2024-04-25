import { useState } from "react";
import { Chart, Dashboard } from "../Components"
import { Row, Col, InputGroup, Form, Button } from "react-bootstrap";
import validator from "validator";


const WeightTracker = () =>{
    const [date, setDate] = useState("")
    const [weight, setWeight] =  useState("") 


    const handleDecimal = (event, setFunc) => {
        const decimalStr = event.target.value;
    
        if (validator.isNumeric(decimalStr) || validator.isFloat(decimalStr) || decimalStr === "")
            setFunc(decimalStr)
    };

    const handleDay = (event) => {
        setDate(event.target.value)
    }

    const data = [
        { date: '2024-03-15', weight: 10 },
        { date: '2024-03-15', weight: 20 },
        { date: '2024-03-15', weight: 15 },
        // Add more data points here
    ];

    return(
        <>
            <Dashboard>
                {data && (<Chart data={data} />)}

                <div className="w-1/2 mx-auto my-5">                    
                    <Form.Label htmlFor="date">Date</Form.Label>
                    <InputGroup className="mb-5">
                        <Form.Control
                            id="date"
                            aria-describedby="date"
                            type="date"
                            value={date}
                            onChange={handleDay}
                        />
                    </InputGroup>

                    <Form.Label htmlFor="weight">Weight</Form.Label>
                    <InputGroup className="mb-5">
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

                    <Button 
                        variant="success"
                        className="w-full"
                    >
                        Submit Weight
                    </Button>
                </div>
            </Dashboard>
        </>
    )
}

export default WeightTracker