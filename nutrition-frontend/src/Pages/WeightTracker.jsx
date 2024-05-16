import { useState, useEffect } from "react";
import { Chart, Dashboard } from "../Components"
import { Row, Col, InputGroup, Form, Button } from "react-bootstrap";
import validator from "validator";
import useFetch from "../Hooks/useFetch";
import { useDispatch, useSelector } from "react-redux";
import usePost from "../Hooks/usePost";
import { storeWeightData } from "../Store/appSlice";


const WeightTracker = () =>{
    const [date, setDate] = useState("")
    const [weight, setWeight] =  useState("")
    const dispatch = useDispatch()
    const {weightData} = useSelector(state => state.appData)
    const {fetchData, isLoading, error, data:userWeightDetails} = useFetch()
    const {postData, error: postError, data:postResponse} = usePost()


    const changeWeight = (event) => {
        const decimalStr = event.target.value;
    
        if (validator.isNumeric(decimalStr) || validator.isFloat(decimalStr) || decimalStr === "")
            setWeight(decimalStr)
    };

    console.log(weightData, userWeightDetails, postError)

    const handleDay = (event) => {
        setDate(event.target.value)
    }

    const getWeights = () => {
        fetchData("http://127.0.0.1:5000/user/weight/get-weight/", true)
    }

    useEffect(() => {
        getWeights()
    }, [])

    const handleSubmit = () => {
        postData("http://127.0.0.1:5000/user/weight/submit-weight/", {
            date: date,
            weight: weight
        }, true)
        fetchData("http://127.0.0.1:5000/user/weight/get-weight/", true)
        setDate("")
        setWeight("")
    }

    useEffect(()=> {
        storeWeightData(userWeightDetails)
    }, [userWeightDetails])
    
    return(
        <>
            <Dashboard>
                {userWeightDetails.length > 0 && (<Chart data={userWeightDetails} />)}

                <div className="w-1/2 mx-auto my-5">                    
                    <Form.Label htmlFor="date">Date</Form.Label>
                    <InputGroup className="mb-8">
                        <Form.Control
                            id="date"
                            aria-describedby="date"
                            type="date"
                            value={date}
                            onChange={handleDay}
                        />
                    </InputGroup>

                    <Form.Label htmlFor="weight">Weight</Form.Label>
                    <InputGroup className="mb-8">
                        <Form.Control
                            id="weight"
                            aria-describedby="weight"
                            type="number"
                            min={1}
                            step={0.1}
                            placeholder="kg"
                            value={weight}
                            onChange={changeWeight}
                        />
                    </InputGroup>
                    <Form.Group className="mb-4 text-center" controlId="formBasicPassword">
                        {
                            postError && (
                            <Form.Text className="text-danger fs-6">
                                {postError}
                            </Form.Text>
                            )
                        }
                    </Form.Group>

                    <Button 
                        variant="success"
                        className="w-full"
                        onClick={handleSubmit}
                    >
                        Submit Weight
                    </Button>
                </div>
            </Dashboard>
        </>
    )
}

export default WeightTracker