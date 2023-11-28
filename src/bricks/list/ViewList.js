import React from "react";

import Navigation from "./Navigation";
import ShoppingListList from "./ShoppingListList";

import { Container, Row, Col } from 'react-bootstrap';

import { v4 as uuidv4 } from 'uuid'

import styles from "../../css/shoppingList.module.css";

const ViewList = ({shoppingLists, handlers}) => {
    return (
        <Container>
            <Row>
                <Navigation
                    params={shoppingLists}
                    handlers= {handlers}
                ></Navigation>
            </Row>
            <Row>
                <Col sm={12} lg={3}>
                    <ShoppingListList
                        params={shoppingLists}
                        handlers={handlers}
                    ></ShoppingListList>
                </Col>
            </Row>
        </Container>
    );
}

export default ViewList