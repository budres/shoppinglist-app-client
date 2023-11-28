import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import Icon from "@mdi/react"
import { mdiLoading } from "@mdi/js"
import styles from "../css/shoppingList.module.css"

import ViewDetail from "../bricks/detail/ViewDetail"
import { useLocation } from "react-router-dom"
import { Alert, Spinner } from "react-bootstrap"

const ListDetail = () => {
    const [shoppingList, setShoppingList] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    const location = useLocation()

    const id = location.pathname.split("/")[2]

    useEffect(() => {
        // setLoading(true)
        data(id)
            .then((data) => {
                setShoppingList(data)
                setLoading(false)
            })
            .catch((error) => {
                setError(error.message)
                setLoading(false)
            })
    }, [])

    const handlers = getHandlers(shoppingList, setShoppingList)

    return (
        <div>
            {loading ? (
                <Spinner animation="border" />
            ): error ? (
                <Alert variant="danger">{error}</Alert>
            ) : (
                <ViewDetail params={shoppingList} handlers={handlers} />
            )}
        </div>
    )
}

const data = (id) => {
    return new Promise((resolve, reject) => {
        fetch(`http://localhost:8000/api/shopping-lists/${id}`, {
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

const getHandlers = (shoppingList, setShoppingList) => {
    return {
            // list hanlders
            onRemoveList: () => {
                return new Promise((resolve, reject) => {
                    fetch(`http://localhost:8000/api/shopping-lists/${shoppingList.id}`, {
                        method: 'DELETE',
                        headers: {
                            'Authorization': localStorage.getItem('token'),
                        },
                    })
                        .then(async (res) => {
                            const data = await res.json()
                            if (res.ok) {
                                setShoppingList(data)
                                resolve()
                            }
                            else reject(data)
                        })
                        .catch((error) => reject(error))
                })
            },
            onRenameList: (newName) => {
                return new Promise((resolve, reject) => {
                    fetch(`http://localhost:8000/api/shopping-lists/${shoppingList.id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': localStorage.getItem('token'),
                        },
                        body: JSON.stringify({ name: newName }),
                    })
                        .then(async (res) => {
                            const data = await res.json()
                            if (res.ok) {
                                setShoppingList(data)
                                resolve()
                            }
                            else reject(data)
                        })
                        .catch((error) => reject(error))
                })
            },

            // item handlers
            onAddItem: (itemName) => {
                return new Promise((resolve, reject) => {
                    fetch(`http://localhost:8000/api/shopping-lists/${shoppingList.id}/items`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': localStorage.getItem('token'),
                        },
                        body: JSON.stringify({ name: itemName }),
                    })
                        .then(async (res) => {
                            const data = await res.json()
                            if (res.ok) {
                                setShoppingList(data)
                                resolve()
                            }
                            else reject(data)
                        })
                        .catch((error) => reject(error))
                })
            },
            onRenameItem: (id, newName) => {
                return new Promise((resolve, reject) => {
                    fetch(`http://localhost:8000/api/shopping-lists/${shoppingList.id}/items/${id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': localStorage.getItem('token'),
                        },
                        body: JSON.stringify({ name: newName }),
                    })
                        .then(async (res) => {
                            const data = await res.json()
                            if (res.ok) {
                                setShoppingList(data)
                                resolve()
                            }
                            else reject(data)
                        })
                        .catch((error) => reject(error))
                })
            },
            onRemoveItem: (id) => {
                return new Promise((resolve, reject) => {
                    fetch(`http://localhost:8000/api/shopping-lists/${shoppingList.id}/items/${id}`, {
                        method: 'DELETE',
                        headers: {
                            'Authorization': localStorage.getItem('token'),
                        },
                    })
                        .then(async (res) => {
                            const data = await res.json()
                            if (res.ok) {
                                setShoppingList(data)
                                resolve()
                            }
                            else reject(data)
                        })
                        .catch((error) => reject(error))
                })
            },
            onSwitchCompleted: (id) => {

                const {isCompleted} = shoppingList.items.find(item => item.id === id)


                return new Promise((resolve, reject) => {
                    fetch(`http://localhost:8000/api/shopping-lists/${shoppingList.id}/items/${id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': localStorage.getItem('token'),
                        },
                        body: JSON.stringify({ isCompleted: !isCompleted }),
                    })
                        .then(async (res) => {
                            const data = await res.json()
                            if (res.ok) {
                                setShoppingList(data)
                                console.log(data)
                                resolve()
                            }
                            else reject(data)
                        })
                        .catch((error) => reject(error))
                })
            },
            onAddUser: (tag) => {
                return new Promise((resolve, reject) => {
                    fetch(`http://localhost:8000/api/shopping-lists/${shoppingList.id}/users`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': localStorage.getItem('token'),
                        },
                        body: JSON.stringify({ tag }),
                    })
                        .then(async (res) => {
                            const data = await res.json()
                            if (res.ok) {
                                setShoppingList(data)
                                resolve()
                            }
                            else reject(data)
                        })
                        .catch((error) => reject(error))
                })  
            },
            onRemoveUser: (id) => {
                return new Promise((resolve, reject) => {
                    fetch(`http://localhost:8000/api/shopping-lists/${shoppingList.id}/users/${id}`, {
                        method: 'DELETE',
                        headers: {
                            'Authorization': localStorage.getItem('token'),
                        },
                    })
                        .then(async (res) => {
                            const data = await res.json()
                            if (res.ok) {
                                setShoppingList(data)
                                resolve()
                            }
                            else reject(data)
                        })
                        .catch((error) => reject(error))
                })
            }
    }
}



export default ListDetail
