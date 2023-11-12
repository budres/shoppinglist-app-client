import React, { useState } from 'react'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Icon from '@mdi/react'
import { mdiDelete, mdiPencil, mdiFilter, mdiFilterOutline, mdiCheck, mdiClose } from '@mdi/js'
import styles from '../../css/shoppingList.module.css'
import { NavDropdown, Navbar } from 'react-bootstrap'

const Navigation = ({ params: { users }, handlers: { onSelectUser } }) => {
    return (
        <Navbar>
            <Navbar.Brand>Shopping List</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse>
                <NavDropdown>
                    {users.map((user) => (
                        <NavDropdown.Item key={user._id} onClick={() => onSelectUser(user._id)}>
                            {user.name}
                        </NavDropdown.Item>
                    ))}
                </NavDropdown>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Navigation