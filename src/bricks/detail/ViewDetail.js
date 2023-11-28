import React from "react";

import ShoppingListTile from "./ShoppingListTile";
import ShoppingListInfo from "./ShoppingListInfo";
import ShoppingListUsers from "./ShoppingListUsers";

import { Container, Row, Col } from 'react-bootstrap';

import styles from "../../css/shoppingList.module.css";

const ViewDetail = ({params, handlers}) => {

    return (

        <Container>
            <Row>
                <Col sm={12} lg={6} className={styles.viewTileColumn}>
                    <ShoppingListTile
                        params={params}
                        handlers={handlers}
                    />
                </Col>
                <Col sm={12} lg={3}>
                    <Col className={styles.viewInfoColumn}>
                        <ShoppingListInfo
                            params={params}
                            handlers={handlers}
                        />
                    </Col>
                    <Col>
                        <ShoppingListUsers
                            params={params}
                            handlers={handlers}
                        />
                    </Col>

                </Col>
            </Row>
        </Container>

    );
}

export default ViewDetail