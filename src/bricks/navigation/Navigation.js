import React, { useState } from 'react'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Icon from '@mdi/react'
import { mdiDelete, mdiPencil, mdiFilter, mdiFilterOutline, mdiCheck, mdiClose } from '@mdi/js'
import styles from '../../css/shoppingList.module.css'
import { Button, NavDropdown, Navbar, NavbarText } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const Navigation = ({ params: { shoppingLists }, handlers: { } }) => {

    const navigate = useNavigate()

    const handleLogout = () => {
        onLogout()
            .then((data) => {
                if (data.message === "logged out") navigate("/login")
            })
    }

    const user = JSON.parse(localStorage.getItem('user'))

    const redirect = () => {
        navigate('/shopping-lists')
    }

    return (
        <Navbar>
            <Navbar.Brand onClick={redirect} style={{ cursor: "pointer" }}>Shopping List</Navbar.Brand>
            <Form inline>
                <Form.Control
                    type="text"
                    placeholder="Search"
                />
            </Form>
            <Navbar.Toggle />
            <Navbar.Collapse>
                <NavbarText>Logged in as {user.tag}</NavbarText>
                <NavDropdown>
                    <Button onClick={handleLogout}>Logout</Button>
                </NavDropdown>
            </Navbar.Collapse>
        </Navbar>
    )
}

const onLogout = () => {
    return new Promise((resolve, reject) => {
        fetch('http://localhost:8000/api/auth/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token'),
            },
        })
            .then(async (res) => {
                const data = await res.json()
                if (res.ok) resolve(data)
                else reject(data)
            })
            .catch((error) => reject(error))
    })
}

export default Navigation