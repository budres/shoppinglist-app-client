import React from "react";

import ShoppingListTile from "./ShoppingListTile";
import ShoppingListInfo from "./ShoppingListInfo";
import ShoppingListUsers from "./ShoppingListUsers";

import { Container, Row, Col } from 'react-bootstrap';

import { v4 as uuidv4 } from 'uuid'

import styles from "../../css/shoppingList.module.css";

const ViewDetail = ({ users, setUsers, shoppingList, setShoppingList }) => {

    const {
        ShoppingListTileHandlers,
        ShoppingListInfoHandlers,
        ShoppingListUsersHandlers
    } = getHandlers(users, setUsers, shoppingList, setShoppingList)

    return (

        <Container>
            <Row>
                <Col sm={12} lg={6} className={styles.viewTileColumn}>
                    <ShoppingListTile
                        params={shoppingList}
                        handlers={ShoppingListTileHandlers}
                    />
                </Col>
                <Col sm={12} lg={3}>
                    <Col className={styles.viewInfoColumn}>
                        <ShoppingListInfo
                            params={shoppingList}
                            handlers={ShoppingListInfoHandlers}
                        />
                    </Col>
                    <Col>
                        <ShoppingListUsers
                            params={shoppingList}
                            handlers={ShoppingListUsersHandlers}
                        />
                    </Col>

                </Col>
            </Row>
        </Container>

    );
}


const getHandlers = (users, setUsers, shoppingList, setShoppingList) => {
    return {
        ShoppingListTileHandlers: {
            // list hanlders
            onRemoveList: (id) => {
                // delete list
                setShoppingList({})
            },
            onRenameList: (id, newName) => {
                setShoppingList({
                    ...shoppingList,
                    name: newName
                })
            },

            // item handlers
            onAddItem: (itemName) => {
                const newItem = {
                    _id: uuidv4(),
                    name: itemName,
                    isCompleted: false
                }

                setShoppingList({
                    ...shoppingList,
                    totalItems: shoppingList.totalItems + 1,
                    items: [
                        ...shoppingList.items,
                        newItem
                    ]
                })
            },
            onRenameItem: (id, newName) => {
                setShoppingList({
                    ...shoppingList,
                    items: shoppingList.items.map((i) => {
                        if (i._id === id) {
                            return {
                                ...i,
                                name: newName
                            }
                        }
                        return i
                    })
                })
            },
            onRemoveItem: (id) => {
                setShoppingList({
                    ...shoppingList,
                    totalItems: shoppingList.totalItems - 1,
                    items: shoppingList.items.filter((i) => i._id !== id)
                })
            },
            onSwitchCompleted: (id) => {
                setShoppingList({
                    ...shoppingList,
                    items: shoppingList.items.map((i) => {
                        if (i._id === id) {
                            return {
                                ...i,
                                isCompleted: !i.isCompleted
                            }
                        }
                        return i
                    })
                })
            }
        },
        ShoppingListInfoHandlers: {
            getUser: (id) => {
                return users.find((user) => user._id === id)
            }
        },
        ShoppingListUsersHandlers: {
            onAddUser: (tag) => {

                console.log(tag)
                console.log(users)

                const user = users.find((u) => u.tag === tag)
                if (!user) {
                    alert('User not found')
                    return
                }
                if (shoppingList.users.includes(user._id)) {
                    alert('User already added')
                    return
                }
                setShoppingList({
                    ...shoppingList,
                    users: [
                        ...shoppingList.users,
                        user._id
                    ]
                })
            },
            onRemoveUser: (id) => {
                if (shoppingList.createdBy === id) {
                    alert('Leaving the shopping list is not implemented yet.')
                    return
                }
                setShoppingList({
                    ...shoppingList,
                    users: shoppingList.users.filter((u) => u !== id)
                })
            },
            getUser: (id) => {
                return users.find((user) => user._id === id)
            }
        }
    }
}



export default ViewDetail