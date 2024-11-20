import { Button, Form, InputGroup } from "react-bootstrap";
import React from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

export const Home = () => {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [error, setError] = React.useState("");
    const navigate = useNavigate();

    const preGeneratedUsername = "admin";
    const preGeneratedPassword = "password123";
    const userRole = "administrator";

    const handleUsernameChange = (event: any) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event: any) => {
        setPassword(event.target.value);
    };

    const handleAdminLogin = async () => {
        if (username === preGeneratedUsername && password === preGeneratedPassword) {
            localStorage.setItem("userId", "1"); // Example user ID
            localStorage.setItem("userRole", userRole);
            // Redirect based on user role
            if (userRole === "administrator") {
                window.location.href = "/administrator";
            } else {
                setError("Invalid username or password");
            }
        }
    };

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:5175/auths/login', {
                username: username,
                password: password
            });

            const { userId, role } = response.data;
            console.log('Logged in userId:', userId);
            localStorage.setItem("userId", userId);
            console.log('Stored userId in localStorage:', localStorage.getItem("userId"));

            if (role === "professor") {
                navigate(`/professor/${userId}`);
            } else if (role === "student") {
                navigate(`/student/${userId}`);
            } else {
                setError("Invalid role");
            }
        } catch (error) {
            setError("Invalid username or password");
        }
    };

    const handleSubmit = () => {
        if (username === preGeneratedUsername) {
            handleAdminLogin();
        } else {
            handleLogin();
        }
    };

    return (
        <div>
            <div className="h1 text-center">Log In</div>
            <hr />
            <Form className="container pb-5">
                <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">Username</InputGroup.Text>
                    <Form.Control
                        type="text"
                        value={username}
                        onChange={handleUsernameChange}
                    />
                </InputGroup>

                <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">Password</InputGroup.Text>
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                </InputGroup>
                {error && <div className="text-danger">{error}</div>}
                <Button className={"w-100"} variant="outline-secondary" onClick={handleSubmit}>
                    Login
                </Button>
            </Form>
        </div>
    );
};