import React, { useState } from 'react'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Icon from '@mdi/react'
import { mdiDelete, mdiPencil, mdiFilter, mdiFilterOutline, mdiCheck, mdiClose } from '@mdi/js'
import styles from '../../css/shoppingList.module.css'


const ShoppingListHead = ({ shoppingList, onRenameList, onRemoveList, onFilterByCompleted }) => {

    const [isEditingName, setIsEditingName] = useState(false)
    const [newName, setNewName] = useState(shoppingList.name)
    const [filterByCompleted, setFilterByCompleted] = useState(false);

    const handleEditName = () => {
        setIsEditingName(true)
    }

    const handleSaveName = () => {

        if (newName.trim() === "") {
            return
        }

        if (newName === shoppingList.name) {
            handleCancelEdit()
            return
        }

        onRenameList(newName)
        setIsEditingName(false)
    }

    const handleCancelEdit = () => {
        setNewName(shoppingList.name)
        setIsEditingName(false)
    }

    const handleNameChange = (e) => {
        setNewName(e.target.value)
    }

    const handleFilterByCompleted = () => {
        setFilterByCompleted(!filterByCompleted);
        onFilterByCompleted(!filterByCompleted);
    }

    shoppingList.totalItems = shoppingList.items.filter(item => item.isCompleted == false).length

    return (
        <Card>
            <Card.Body>
                {isEditingName ? (
                    // editing mode
                    <Form>
                        <Form.Label>Edit the shopping list name</Form.Label>
                        <Form.Control
                            type="text"
                            value={newName}
                            onChange={handleNameChange}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    handleSaveName()
                                } else if (e.key === "Escape") {
                                    handleCancelEdit()
                                }
                            }}
                        />
                        <Icon
                            size={1}
                            path={mdiCheck}
                            onClick={handleSaveName}
                            className={styles.icon}
                        />
                        <Icon
                            size={1}
                            path={mdiClose}
                            onClick={handleCancelEdit}
                            className={styles.icon}
                        />
                    </Form>
                ) : (
                    // display mode
                    <div className={styles.shoppingListHead}>
                        <div className="col">
                            <Card.Title>
                                {shoppingList.name}
                                <Icon
                                    size={1}
                                    path={mdiPencil}
                                    className={styles.icon}
                                    style={{ marginLeft: "10px" }}
                                    onClick={handleEditName}
                                />
                            </Card.Title>
                            <Card.Text>{shoppingList.totalItems} {shoppingList.totalItems == 1 ? "item" : "items"}</Card.Text>
                        </div>
                        <div className="col-auto">

                            <Card.Text>
                                <Icon
                                    size={1}
                                    path={filterByCompleted ? mdiFilter : mdiFilterOutline}
                                    onClick={handleFilterByCompleted}
                                    className={styles.icon}
                                />
                            </Card.Text>
                        </div>
                        <div className="col-auto">
                            <Card.Text>
                                <Icon
                                    size={1}
                                    path={mdiDelete}
                                    onClick={() => onRemoveList(shoppingList.id)}
                                    className={styles.deleteIcon}
                                />
                            </Card.Text>
                        </div>
                    </div>
                )}
            </Card.Body>
        </Card>
    )
}

export default ShoppingListHead;