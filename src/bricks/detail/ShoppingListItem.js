import React, { useState } from "react"
import ListGroupItem from "react-bootstrap/ListGroupItem"
import Form from "react-bootstrap/Form"
import Icon from "@mdi/react"
import { mdiCheckboxBlankOutline, mdiCheckboxOutline, mdiDelete, mdiCheck, mdiClose } from "@mdi/js"
import styles from "../../css/shoppingList.module.css"

const ShoppingListItem = ({ shoppingListItem, onSwitchCompleted, onRenameItem, onRemoveItem }) => {
    const [isEditing, setIsEditing] = useState(false)
    const [itemName, setItemName] = useState(shoppingListItem.name)

    const handleEditItemName = () => {
        setIsEditing(true)
    }

    const handleSaveItemName = () => {
        if (itemName.trim() === "") {
            return
        }

        if (itemName === shoppingListItem.name) {
            handleCancelEditItemName()
            return
        }

        onRenameItem(shoppingListItem._id, itemName)
        setIsEditing(false)
    }

    const handleCancelEditItemName = () => {
        setItemName(shoppingListItem.name)
        setIsEditing(false)
    }

    return (
        <ListGroupItem className={styles.shoppingListItem}>
            <Icon
                size={1}
                path={
                    shoppingListItem.isCompleted ? mdiCheckboxOutline : mdiCheckboxBlankOutline
                }
                onClick={() => onSwitchCompleted(shoppingListItem._id)}
                className={styles.icon}
            />
            {isEditing ? (
                <>
                    <Form >
                        <Form.Group>
                            <Form.Control
                                type="text"
                                value={itemName}
                                onChange={(e) => setItemName(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        handleSaveItemName()
                                    } else if (e.key === "Escape") {
                                        handleCancelEditItemName()
                                    }
                                }}
                            />

                            <Icon
                                size={1}
                                path={mdiCheck}
                                onClick={handleSaveItemName}
                                className={styles.icon}
                            />
                            <Icon
                                size={1}
                                path={mdiClose}
                                onClick={handleCancelEditItemName}
                                className={styles.icon}
                            />
                        </Form.Group>
                    </Form>
                </>
            ) : (
                <>
                    <div className={shoppingListItem.isCompleted ? styles.shoppingListItemNameCompleted : styles.shoppingListItemName} onClick={handleEditItemName}>{shoppingListItem.name}</div>
                    <Icon
                        size={1}
                        path={mdiDelete}
                        onClick={() => onRemoveItem(shoppingListItem._id)}
                        className={styles.deleteIcon}
                    />
                </>
            )}
        </ListGroupItem>
    )
}

export default ShoppingListItem;