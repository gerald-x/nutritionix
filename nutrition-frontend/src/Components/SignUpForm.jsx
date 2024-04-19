import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const LoginForm = () => {
  return (
    <div className="">
      <Form.Group className="mb-4" controlId="formBasicEmail">
        <Form.Label className="block w-max">Email address</Form.Label>
        <Form.Control
          variant="success"
          type="email"
          placeholder="Enter email"
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
        />
      </Form.Group>

      <Form.Group className="mb-4" controlId="formBasicPassword">
        <Form.Label className="block w-max">Confirm Password</Form.Label>
        <Form.Control
          variant="success"
          type="password"
          placeholder="Confirm Password"
        />
      </Form.Group>

      <Form.Group className="mb-4" controlId="formBasicPassword">
        <Form.Text muted>
          Don't have an account? <Link to="/auth/login">Login</Link>
        </Form.Text>
      </Form.Group>

      <Button className="w-1/2" variant="success" type="submit">
        Submit
      </Button>
    </div>
  );
};

export default LoginForm;
