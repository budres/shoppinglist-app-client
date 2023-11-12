import React, { useState } from 'react'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Icon from '@mdi/react'
import { mdiDelete, mdiPencil, mdiFilter, mdiFilterOutline, mdiCheck, mdiClose } from '@mdi/js'
import styles from '../../css/shoppingList.module.css'
import { Button, ListGroup, Modal } from 'react-bootstrap'

import Item from "./ShoppingListListItem";

const ShoppingListList = ({ params: { shoppingLists }, handlers: { onAddList, onSwitchArchived } }) => {

    // filter button
    // add shoppinglist button launching modal
    // shopping list tiles

    const [show, setShow] = useState(false);
    const [listName, setListName] = useState("");

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const handleSubmit = () => {
        onAddList(listName)
        handleClose()
    }

    return (
        <Card>
            <Card.Body>
                <Button variant='light'>Show archived</Button>
                <Button variant='light' onClick={handleShow}>Add a list</Button>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>New list</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Control
                                type="text"
                                placeholder="Enter list name"
                                value={listName}
                                onChange={((e) => setListName(e.target.value))}
                            />
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="light" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="secondary" onClick={handleSubmit}>
                            Submit
                        </Button>
                    </Modal.Footer>
                </Modal>

                <ListGroup>
                    {
                        shoppingLists.map((shoppinglist) => (
                            <Item key={shoppinglist._id} shoppinglist={shoppinglist} />
                        ))
                    }
                </ListGroup>
            </Card.Body>
        </Card >
    )
}

export default ShoppingListList