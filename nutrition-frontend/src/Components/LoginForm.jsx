import { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { storeAccesstoken, storeRefreshToken } from "../Store/appSlice";


const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { accessToken, refreshToken } = useSelector(state => state.appData)
  const [error, setError] = useState(null)


  useEffect(() => {
    console.log(accessToken,"\n", refreshToken)
  }, [accessToken])


  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleEmail = (event) => {
    setEmail(event.target.value.trim());
  };

  const handleLogin = async () => {
    const loginDetails = {
      email: email,
      password: password,
    };

    try {
      const response = await fetch("http://127.0.0.1:5000/auth/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginDetails),
      });
      const data = await response.json();


        if (!response.ok) {
            setError(data.msg)
            throw new Error(`HTTP error! status: ${response.status}`);
        }
      
      console.log("Data variable is: ", data)
      const {access_token, refresh_token} = data
      
      dispatch(storeAccesstoken(access_token)); // Assuming the response contains an accessToken field
      dispatch(storeRefreshToken(refresh_token))
      
      console.log("Token retrieved")

      navigate("/")
    } catch (error) {
      console.error("There was an error!", error);
    }
  };

  return (
    <div className="">
      <Form.Group className="mb-4" controlId="formBasicEmail">
        <Form.Label className="block w-max">Email address</Form.Label>
        <Form.Control
          variant="success"
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={handleEmail}
        />
        <Form.Text className="text-muted block w-max">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="" controlId="formBasicPassword">
        <Form.Label className="block w-max">Password</Form.Label>
        <Form.Control
          variant="success"
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePassword}
        />
      </Form.Group>

      <Form.Group className="mb-4" controlId="formBasicPassword">
        {
            error && (
            <Form.Text className="text-danger">
                {error}
            </Form.Text>
            )
        }
      </Form.Group>

      <Form.Group className="mb-4" controlId="formBasicPassword">
        <Form.Text muted>
          Don't have an account? <Link to="/auth/signup">Sign up</Link>
        </Form.Text>
      </Form.Group>

        <div className="w-3/4 mx-auto">
            <Button 
                className="w-full"
                variant="success" 
                type="submit"
                onClick={handleLogin}
            >
                Submit
            </Button>
        </div>
    </div>
  );
};

export default LoginForm;
