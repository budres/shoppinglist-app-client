import React, { useState } from "react"
import ListGroup from "react-bootstrap/esm/ListGroup"
import ListGroupItem from "react-bootstrap/esm/ListGroupItem"
import Card from "react-bootstrap/esm/Card"
import Form from "react-bootstrap/esm/Form"
import styles from "../css/shoppingList.module.css"

import ShoppingListItem from "./ShoppingListItem"
import ShoppingListHead from "./ShoppingListHead"

const ShoppingListTile = ({ params: shoppingList, handlers: { onRemoveList, onRenameList, onAddItem, onRenameItem, onRemoveItem, onSwitchCompleted } }) => {


    const [newItemName, setNewItemName] = useState("")


    const handleAddItem = () => {
        if (newItemName.trim() === "") {
            return
        }

        onAddItem(newItemName)
        setNewItemName("")
    }


    const [filterByCompleted, setFilterByCompleted] = useState(false);
    const onFilterByCompleted = (filterByCompleted) => {
        setFilterByCompleted(filterByCompleted);
    }



    return (
        <Card >
            <Card.Body >
                <ShoppingListHead
                    shoppingList={shoppingList}

                    onFilterByCompleted={onFilterByCompleted}
                    onRenameList={onRenameList}
                    onRemoveList={onRemoveList}
                />

                <ListGroup className={styles.itemsListGroup}>
                    <ListGroupItem>
                        <Form onSubmit={(e) => e.preventDefault()}>
                            <Form.Control
                                placeholder="Type an item and press enter"
                                value={newItemName}
                                onChange={(e) => setNewItemName(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        handleAddItem()
                                    }
                                }}
                            />
                        </Form>
                    </ListGroupItem>

                    {shoppingList.items.length === 0 ? (
                        <ListGroupItem>No items in list</ListGroupItem>
                    ) : (
                        shoppingList.items.map((item) => {
                            if (filterByCompleted && item.isCompleted) {
                                return null
                            }

                            return (
                                <ShoppingListItem
                                    key={item._id}
                                    shoppingListItem={item}
                                    onSwitchCompleted={onSwitchCompleted}
                                    onRenameItem={onRenameItem}
                                    onRemoveItem={onRemoveItem}
                                />
                            )
                        })
                    )}
                </ListGroup>
            </Card.Body>




        </Card>




    )
}

export default ShoppingListTile;