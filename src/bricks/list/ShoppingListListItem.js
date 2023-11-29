import React, { useState } from 'react'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import { ListGroup } from 'react-bootstrap'
import Icon from '@mdi/react'
import { mdiArchive, mdiArchiveOutline, mdiPencil, mdiFilter, mdiFilterOutline, mdiCheck, mdiClose, mdiDelete } from '@mdi/js'
import styles from '../../css/shoppingList.module.css'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const ShoppingListListItem = ({ shoppingList, onToggleArchived }) => {
    // name, total items, toggle archived button

    const navigate = useNavigate()

    const handleOnToggleArchived = (e) => {
        e.preventDefault()
        e.stopPropagation()
        onToggleArchived({ id: shoppingList.id})
        shoppingList.isArchived = !shoppingList.isArchived
    }

    return (
        <ListGroup.Item onClick={() => navigate(`/shopping-lists/${shoppingList.id}`)}>
            <div className={styles.userInfo}>
                <div className={styles.userName}>{shoppingList.name}</div>
                <div className={styles.userTag}>{shoppingList?.totalItems >= 0 ? shoppingList.totalItems : shoppingList.items.length} items</div>
            </div>
            <Icon
                size={1}
                path={shoppingList.isArchived ? mdiArchive : mdiArchiveOutline}
                onClick={(e) => handleOnToggleArchived(e)}
            />
        </ListGroup.Item>
    )
}

export default ShoppingListListItem