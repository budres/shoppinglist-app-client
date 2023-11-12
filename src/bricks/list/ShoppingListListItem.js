import React, { useState } from 'react'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import { ListGroup } from 'react-bootstrap'
import Icon from '@mdi/react'
import { mdiArchive, mdiPencil, mdiFilter, mdiFilterOutline, mdiCheck, mdiClose } from '@mdi/js'
import styles from '../../css/shoppingList.module.css'

const ShoppingListListItem = () => {
    return (
        <ListGroup.Item>
            <Form>
                <Form.Check type="checkbox" />
                <Form.Label className={styles.listItemLabel}>Item 1</Form.Label>
                <Icon path={mdiArchive} size={1} />
            </Form>
        </ListGroup.Item>
    )
}

export default ShoppingListListItem