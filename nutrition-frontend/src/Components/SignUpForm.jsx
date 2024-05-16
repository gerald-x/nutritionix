import { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import usePost from "../Hooks/usePost";
import { useDispatch } from "react-redux";
import { storeAccesstoken, storeRefreshToken } from "../Store/appSlice";

const LoginForm = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [error, setError] = useState(null)
  const {data, error:postError, postData} = usePost()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const setData = (event, setFunc, trim=false) => {
    setFunc(trim ? event.target.value : event.target.value.trim())
  }

  const handleSubmit = () => {
    postData("http://127.0.0.1:5000/auth/register/", {
      last_name: lastName,
      first_name: firstName,
      email: email,
      password: password,
      confirm_password: confirmPassword
    })
  }
  
  useEffect(()=>{
    if (data) {
      console.log("Data variable is: ", data)
      const {access_token, refresh_token} = data
      
      dispatch(storeAccesstoken(access_token)); // Assuming the response contains an accessToken field
      dispatch(storeRefreshToken(refresh_token))
      
      console.log("Token retrieved")

      navigate("/")
    }

  }, [data])


  useEffect(()=>{
    setError(postError)
  }, [postError])

  return (
    <div className="">
      <Form.Group className="mb-4" controlId="formBasicFirstName">
        <Form.Label className="block w-max">First Name</Form.Label>
        <Form.Control
          required
          variant="success"
          type="text"
          placeholder="Enter first name"
          value={firstName}
          onChange={(event) => {
            setData(event, setFirstName, true)
          }}
        />
      </Form.Group>

      <Form.Group className="mb-4" controlId="formBasicLastName">
        <Form.Label className="block w-max">Last Name</Form.Label>
        <Form.Control
          required
          variant="success"
          type="text"
          placeholder="Enter last name"
          value={lastName}
          onChange={(event) => {
            setData(event, setLastName, true)
          }}
        />
      </Form.Group>

      <Form.Group className="mb-4" controlId="formBasicEmail">
        <Form.Label className="block w-max">Email address</Form.Label>
        <Form.Control
          required
          variant="success"
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(event) => {
            setData(event, setEmail, true)
          }}
        />
        <Form.Text className="text-muted block w-max">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-4" controlId="formBasicPassword">
        <Form.Label className="block w-max">Password</Form.Label>
        <Form.Control
          required
          variant="success"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => {
            setData(event, setPassword)
          }}
        />
      </Form.Group>

      <Form.Group className="mb-4" controlId="formBasicConfirmPassword">
        <Form.Label className="block w-max">Confirm Password</Form.Label>
        <Form.Control
          required
          variant="success"
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(event) => {
            setData(event, setConfirmPassword)
          }}
        />
      </Form.Group>
      <Form.Group className="mb-4 text-center fs-5" controlId="formBasicError">
        {
            error && (
            <Form.Text className="text-danger">
                {error}
            </Form.Text>
            )
        }
      </Form.Group>

      <Form.Group className="mb-4" controlId="formBasicButton">
        <Form.Text muted>
          Don't have an account? <Link to="/auth/login">Login</Link>
        </Form.Text>
      </Form.Group>

     
      <div className="w-3/4 mx-auto">
        <Button className="w-full" variant="success" type="submit" onClick={handleSubmit}>
          Submit
        </Button>   
      </div>
      
    </div>
  );
};

export default LoginForm;
