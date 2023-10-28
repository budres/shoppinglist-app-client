import React from "react";
import User from "./ShoppingListUser";


import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import styles from "../css/shoppingList.module.css";

const ShoppingListUserList = ({ params: { users: userIds }, handlers: { onAddUser, onRemoveUser, getUser } }) => {


    const [newUserName, setNewUserName] = useState("")

    const handleAddUser = () => {
        if (newUserName.trim() === "") {
            return
        }

        let tag = newUserName
        if (tag[0] !== "@") {
            tag = "@" + tag
        }

        onAddUser(tag)
        setNewUserName("")
    }

    return (
        <Card>
            <Card.Body>
                <Card.Title>Members</Card.Title>
                <Card.Header>
                    <Form onSubmit={(e) => e.preventDefault()}>
                        <Form.Label>Add a user</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Type a tag and press enter"
                            value={newUserName}
                            onChange={(e) => setNewUserName(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    handleAddUser()
                                }
                            }}
                        />
                    </Form>
                </Card.Header>
                <ListGroup className={styles.usersListGroup}>
                    {userIds.map((id) => (
                        <User
                            key={getUser(id)._id}
                            user={getUser(id)}
                            onRemoveUser={onRemoveUser}
                        />
                    ))}
                </ListGroup>
            </Card.Body>
        </Card>

    );
}

export default ShoppingListUserList;