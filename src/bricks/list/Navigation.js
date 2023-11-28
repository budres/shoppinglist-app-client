import React, { useState } from 'react'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Icon from '@mdi/react'
import { mdiDelete, mdiPencil, mdiFilter, mdiFilterOutline, mdiCheck, mdiClose } from '@mdi/js'
import styles from '../../css/shoppingList.module.css'
import { Button, NavDropdown, Navbar } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const Navigation = ({ params: { users }, handlers: { onLogout } }) => {

    const navigate = useNavigate()

    const handleLogout = () => {
        onLogout()
            .then((data) => {
                if (data.message === "logged out") navigate("/login")
            })
    }

    return (
        <Navbar>
            <Navbar.Brand>Shopping List</Navbar.Brand>
            <div>Search Bar</div>
            <Navbar.Toggle />
            <Navbar.Collapse>
                <NavDropdown>
                    <Button onClick={handleLogout}>Logout</Button>
                </NavDropdown>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Navigation