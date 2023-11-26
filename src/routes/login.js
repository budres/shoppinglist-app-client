import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [token, setToken] = useState(null);

    localStorage.removeItem('token');

    const navigate = useNavigate();

    useEffect(() => {
        // Check if a token exists in local storage on component mount
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
            navigate('/shopping-lists');
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Reset previous error message
        setError('');

        // Set loading state to true
        setLoading(true);

        try {
            // Simulate an asynchronous login request (replace with your actual API call)
            const response = await login(username, password);

            const token = response.token
            
            setToken(token);

            // Store the token in local storage
            localStorage.setItem('token', token);

            // Redirect to /shopping-lists
            navigate('/shopping-lists');
        } catch (error) {
            // Simulated error
            setError(error.message);
        } finally {
            // Set loading state back to false
            setLoading(false);
        }
    };

    return (
        <div>
            {token ? (
                <p>You are already logged in.</p>
            ) : (
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="formPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit" disabled={loading}>
                        {loading ? (
                            <Spinner animation="border" size="sm" />
                        ) : (
                            'Login'
                        )}
                    </Button>

                    {error && <Alert variant="danger">{error}</Alert>}
                </Form>
            )}
        </div>
    );
};

// Simulated login function (replace with your actual API call)
const login = (tag, password) => {
    return new Promise((resolve, reject) => {
        fetch('http://localhost:8000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ tag, password }),
        })
            .then((res) => {
                if (res.ok) {
                    resolve(res.json());
                } else {
                    reject(res.json());
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
};

export default LoginForm;