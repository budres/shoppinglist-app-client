import React from "react";

import Navigation from "./Navigation";
import ShoppingListList from "./ShoppingListList";

import { Container, Row, Col } from 'react-bootstrap';

import { v4 as uuidv4 } from 'uuid'

import styles from "../../css/shoppingList.module.css";

const ViewList = ({ users, shoppingLists, setShoppingLists }) => {

    const {
        NavigationHandlers,
        ShoppingListListHandlers
    } = getHandlers(users, shoppingLists, setShoppingLists)

    return (
        <Container>
            <Row>
                <Navigation
                    params={shoppingLists}
                    handlers={NavigationHandlers}
                ></Navigation>
            </Row>
            <Row>
                <Col sm={12} lg={3}>
                    <ShoppingListList
                        params={shoppingLists}
                        handlers={ShoppingListListHandlers}
                    ></ShoppingListList>
                </Col>
            </Row>
        </Container>
    );
}


const getHandlers = (users, shoppingLists, setShoppingLists) => {
    return {
        NavigationHandlers: {
            onSelectUser: (id) => {
                localStorage.setItem('user', id)
            }
        },
        ShoppingListListHandlers: {
            onAddList: (name) => {
                setShoppingLists((shoppingLists) => {

                    const user = localStorage.getItem('user')

                    return [
                        ...shoppingLists,
                        {
                            _id: uuidv4(),
                            name,
                            isArchived: false,
                            createdAt: new Date(),
                            owner: user,
                            members: [
                                user
                            ],
                            items: []
                        }
                    ]
                })
            },
            onSwitchArchived: (id) => {
                setShoppingLists((shoppingLists) => {
                    return shoppingLists.map((shoppingList) => {
                        if (shoppingList._id === id) {
                            return {
                                ...shoppingList,
                                isArchived: !shoppingList.isArchived
                            }
                        }
                        return shoppingList
                    })
                })
            }
        }
    }
}



export default ViewList