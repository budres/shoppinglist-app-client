import React from "react";

import styles from "../../css/shoppingList.module.css";

// add delete user button
// add user icon
// add user tag

import Icon from "@mdi/react";
import { mdiAccountCircle, mdiDelete } from "@mdi/js";
import ListGroupItem from "react-bootstrap/esm/ListGroupItem";

const User = ({ user, onRemoveUser }) => {
    return (
        <ListGroupItem className={styles.userItem}>
            <Icon
                size={1.5}
                path={mdiAccountCircle}
                className={styles.icon}
            />
            <div className={styles.userInfo}>
                <div className={styles.userName}>{user.name}</div>
                <div className={styles.userTag}>{user.tag}</div>
            </div>
            <Icon
                size={1}
                path={mdiDelete}
                onClick={() => onRemoveUser(user.id)}
                className={styles.deleteIcon}
            />


        </ListGroupItem>
    );
};

export default User;