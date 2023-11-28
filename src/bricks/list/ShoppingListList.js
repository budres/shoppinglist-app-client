import React, { useState } from 'react'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Icon from '@mdi/react'
import { mdiDelete, mdiPencil, mdiFilter, mdiFilterOutline, mdiCheck, mdiClose } from '@mdi/js'
import styles from '../../css/shoppingList.module.css'
import { Button, ListGroup, Modal } from 'react-bootstrap'

import Item from "./ShoppingListListItem";

const ShoppingListList = ({ params: shoppingLists, handlers: { onCreate, onToggleArchived } }) => {

    // filter button
    // add shoppinglist button launching modal
    // shopping list tiles

    const [show, setShow] = useState(false);
    const [listName, setListName] = useState("");

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const handleSubmit = () => {
        if (listName.trim() === "") {
            return
        }

        onCreate({ name: listName })
        handleClose()
    }

    const [filterByArchived, setFilterByArchived] = useState(false);
    const handleFilterByArchived = () => {
        setFilterByArchived(!filterByArchived);
    }

    return (
        <Card>
            <Card.Body>
                {filterByArchived ? (
                    <Icon
                        size={1}
                        path={mdiFilter}
                        onClick={handleFilterByArchived}
                    />
                ) : (
                    <Icon
                        size={1}
                        path={mdiFilterOutline}
                        onClick={handleFilterByArchived}
                    />
                )}
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
                        shoppingLists.map((shoppingList) => {
                            if (filterByArchived && shoppingList.isArchived) {
                                return null
                            }

                            return (<Item key={shoppingList.id} shoppingList={shoppingList} onToggleArchived={onToggleArchived} />)
                        })
                    }
                </ListGroup>
            </Card.Body>
        </Card >
    )
}

export default ShoppingListList