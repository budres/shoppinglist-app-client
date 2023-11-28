import React, { useState, useEffect } from 'react'
import { Alert, Spinner, ListGroup } from 'react-bootstrap'
import ViewList from './ViewList'

const ShoppingLists = () => {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [shoppingLists, setShoppingLists] = useState([])

    useEffect(() => {
        const fetchShoppingLists = async () => {
            try {
                const response = await data()
                setShoppingLists(response)
            } catch (error) {
                setError(error.message)
            } finally {
                setLoading(false)
            }
        }

        fetchShoppingLists()
    }, [])

    const handlers = getHandlers(shoppingLists, setShoppingLists)


    return (
        <div>
            {loading ? (
                <Spinner animation="border" />
            ) : error ? (
                <Alert variant="danger">{error}</Alert>
            ) : (
                <ListGroup>
                    <ViewList shoppingLists={shoppingLists} handlers={handlers} />
                </ListGroup>
            )}
        </div>
    )
}

const data = () => {
    return new Promise((resolve, reject) => {
        fetch('http://localhost:8000/api/shopping-lists', {
            method: 'GET',
            headers: {
                'Authorization': localStorage.getItem('token'),
            },
        })
            .then(async (res) => {
                const data = await res.json()
                if (res.ok) resolve(data)
                else reject(data)
            })
            .catch((error) => reject(error))
    })
}

const getHandlers = (shoppingLists, setShoppingLists) => {
    return {
        onCreate: ({name}) => {
            return new Promise((resolve, reject) => {
                fetch('http://localhost:8000/api/shopping-lists', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': localStorage.getItem('token'),
                    },
                    body: JSON.stringify({ name }),
                })
                    .then(async (res) => {
                        const data = await res.json()
                        if (res.ok) {
                            setShoppingLists([...shoppingLists, data])
                            resolve()
                        }
                        else reject(data)
                    })
                    .catch((error) => reject(error))
            })
        },

        onToggleArchived: ({id}) => {
            return new Promise((resolve, reject) => {

                const {isArchived} = shoppingLists.find(shoppingList => shoppingList.id === id)

                fetch(`http://localhost:8000/api/shopping-lists/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': localStorage.getItem('token'),
                    },
                    body: JSON.stringify({ isArchived: !isArchived }),
                })
                    .then(async (res) => {
                        const data = await res.json()
                        if (res.ok) {
                            setShoppingLists(shoppingLists.map(shoppingList => shoppingList.id === id ? data : shoppingList))
                            resolve()
                        }
                        else reject(data)
                    })
                    .catch((error) => reject(error))
            })
        },

        onLogout: () => {
            return new Promise((resolve, reject) => {
                fetch('http://localhost:8000/api/auth/logout', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': localStorage.getItem('token'),
                    },
                })
                    .then(async (res) => {
                        const data = await res.json()
                        if (res.ok) resolve(data)
                        else reject(data)
                    })
                    .catch((error) => reject(error))
            })
        }
    }
}



export default ShoppingLists
