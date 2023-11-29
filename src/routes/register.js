import React, { useState } from 'react'
import { Form, Button, Alert, Spinner } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const RegisterForm = () => {
    const [name, setName] = useState('')
    const [tag, setTag] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            setError('Passwords do not match.')
            return
        }

        if (name.length === 0 || tag.length === 0 || password.length === 0 || confirmPassword.length === 0) {
            setError('Please fill out all fields.')
            return
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
        if (!passwordRegex.test(password)) {
            setError('Password is not strong enough.')
            setLoading(false)
            return
        }

        const tagRegex = /^[a-zA-Z0-9_]{3,}$/
        if (!tagRegex.test(tag)) {
            setError('Tag is not valid.')
            setLoading(false)
            return
        }

        setError('')

        setLoading(true)

        try {
            await register(name, tag[0] !== '@' ? '@' + tag : tag, password)
            navigate('/login')
        } catch (error) {
            setError(error.message)
            setPassword('')
            setConfirmPassword('')
        } finally {
            setLoading(false)
        }
    }

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
    )
}

const register = (name, tag, password) => {
    return new Promise((resolve, reject) => {
        fetch('http://localhost:8000/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, tag, password }),
        })
            .then(async (res) => {
                const data = await res.json()
                if (res.ok) resolve(data)
                else reject(data)
            })
            .catch((error) => reject(error))
    })
}

export default RegisterForm
