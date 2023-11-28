import React from 'react'
import Card from 'react-bootstrap/Card'

// add info about shopping list

const ShoppingListInfo = ({ params: { createdAt, isArchived, owner }}) => {

    return (
        <Card>
            <Card.Body>
                <Card.Title>Info</Card.Title>
                <Card.Text>
                    Created at: {new Date(createdAt).toLocaleString()}<br />
                    Created by: {owner.tag}<br />
                    Is archived: {isArchived ? 'Yes' : 'No'}<br />
                </Card.Text>
            </Card.Body>
        </Card>
    )

}

export default ShoppingListInfo