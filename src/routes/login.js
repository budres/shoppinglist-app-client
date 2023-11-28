import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Button, Alert, Spinner } from 'react-bootstrap'

const LoginForm = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [token, setToken] = useState(null)
    const [user, setUser] = useState(null)

    localStorage.removeItem('token')
    localStorage.removeItem('user')

    const navigate = useNavigate()

    useEffect(() => {
        // Check if a token exists in local storage on component mount
        const storedToken = localStorage.getItem('token')
        const storedUser = localStorage.getItem('user')
        if (storedToken && storedUser) {
            setToken(storedToken)
            setUser(storedUser)
            navigate('/shopping-lists')
        }
    }, [navigate])

    const handleSubmit = async (e) => {
        e.preventDefault()

        // Reset previous error message
        setError('')

        setLoading(true)

        try {
            const response = await login(username, password)
            const token = response.token
            
            setToken(token)
            setUser(user)

            localStorage.setItem('token', token)
            localStorage.setItem('user', user)  

            navigate('/shopping-lists')
        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

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
    )
}

const login = (tag, password) => {
    return new Promise((resolve, reject) => {
        fetch('http://localhost:8000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ tag, password }),
        })
            .then(async (res) => {
                const data = await res.json()
                if (res.ok) {
                    resolve(data)
                } else {
                    reject(data)
                }
            })
            .catch((error) => {
                reject(error)
            })
    })
}

export default LoginForm