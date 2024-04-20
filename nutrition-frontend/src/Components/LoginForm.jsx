import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

      /*
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
      */

      const data = await response.json();
      console.log(data); // Assuming the response contains an accessToken field
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

      <Form.Group className="mb-4" controlId="formBasicPassword">
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
        <Form.Text muted>
          Don't have an account? <Link to="/auth/signup">Sign up</Link>
        </Form.Text>
      </Form.Group>

      <Button 
        className="w-1/2" 
        variant="success" 
        type="submit"
        onClick={handleLogin}
      >
        Submit
      </Button>
    </div>
  );
};

export default LoginForm;
