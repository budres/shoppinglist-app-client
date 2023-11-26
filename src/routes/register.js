import React, { useState } from 'react';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [name, setName] = useState('');
    const [tag, setTag] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        // Reset previous error message
        setError('');

        // Set loading state to true
        setLoading(true);

        try {
            // Simulate an asynchronous registration request (replace with your actual API call)
            const response = await simulateRegistration(name, tag, password);

            // Simulated success
            navigate('/login');
        } catch (error) {
            // Simulated error
            setError('Registration failed. Please try again.');
        } finally {
            // Set loading state back to false
            setLoading(false);
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName">
                <Form.Label>Full name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </Form.Group>

            <Form.Group controlId="formTag">
                <Form.Label>Tag</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter your tag"
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
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

            <Form.Group controlId="formConfirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </Form.Group>

            <Button variant="primary" type="submit" disabled={loading}>
                {loading ? <Spinner animation="border" size="sm" /> : 'Register'}
            </Button>

            {error && <Alert variant="danger">{error}</Alert>}
        </Form>
    );
};

// Simulated registration function (replace with your actual API call)
const simulateRegistration = (name, tag, password) => {
    return new Promise((resolve, reject) => {
        fetch('http://localhost:8000/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, tag, password }),
        })
            .then((response) => {
                if (response.ok) {
                    resolve(response.json());
                } else {
                    reject(response.json());
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
};

export default Register;
