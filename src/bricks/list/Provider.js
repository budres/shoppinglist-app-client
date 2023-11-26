import React, { useState, useEffect } from 'react';
import { Alert, Spinner, ListGroup } from 'react-bootstrap';

const ShoppingLists = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [shoppingLists, setShoppingLists] = useState([]);

    useEffect(() => {
        const fetchShoppingLists = async () => {
            try {
                const response = await data();
                setShoppingLists(response);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchShoppingLists();
    }, []);

    return (
        <div>
            {loading ? (
                <Spinner animation="border" />
            ) : error ? (
                <Alert variant="danger">{error}</Alert>
            ) : (
                <ListGroup>
                    {shoppingLists.map((shoppingList) => (
                        <ListGroup.Item key={shoppingList.id}>
                            {shoppingList.name} ({shoppingList.totalItems}) ({shoppingList.isArchived ? 'archived' : 'active'})
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            )}
        </div>
    );
};

const data = () => {
    return new Promise((resolve, reject) => {
        fetch('http://localhost:8000/api/shopping-lists', {
            method: 'GET',
            headers: {
                'Authorization': localStorage.getItem('token'),
            },
        })
            .then((res) => {
                if (res.ok) resolve(res.json())
                else reject(res.json())
            })
            .catch((error) => reject(error));
    });
};

export default ShoppingLists;
