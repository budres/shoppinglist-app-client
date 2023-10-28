import './App.css';
import View from './bricks/View';
import 'bootstrap/dist/css/bootstrap.min.css'
import { useState } from 'react';



function App() {


    const [shoppingList, setShoppingList] = useState({
        _id: "5f9e1c9b0f0e7e1b3c3e1b3c",
        name: "Name",
        isArchived: true,
        totalItems: 3,
        createdAt: "1970-10-16T12:00:00.000Z",
        createdBy: "5f9e1c9b0f0e7e1b3c3e1b3b",
        users: [
            "5f9e1c9b0f0e7e1b3c3e1b3b",
            "5f9e1c9b0f0e7e1b3c3e1b3d",
        ],
        items: [
            {
                _id: "5f9e1c9b0f0e7e1b3c3e1b3d",
                name: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec iaculis gravida nulla. Aliquam erat volutpat. Cras pede libero, dapibus nec, pretium sit amet, tempor quis.",
                isCompleted: false
            },
            {
                _id: "5f9e1c9b0f0e7e1b3c3e1b3e",
                name: "Oranges",
                isCompleted: true
            },
            {
                _id: "5f9e1c9b0f0e7e1b3c3e1b3f",
                name: "Pears",
                isCompleted: false
            }
        ]
    })

    const [users, setUsers] = useState([
        {
            _id: "5f9e1c9b0f0e7e1b3c3e1b3b",
            name: "Lorem ipsum dolor sit amet",
            tag: '@user1'
        },
        {
            _id: "5f9e1c9b0f0e7e1b3c3e1b3c",
            name: "User 2",
            tag: '@user2'
        },
        {
            _id: "5f9e1c9b0f0e7e1b3c3e1b3d",
            name: "User 3",
            tag: '@user3'
        }
    ])

    return (
        <div className="App">
            <View users={users} setUsers={setUsers} shoppingList={shoppingList} setShoppingList={setShoppingList} />
        </div>
    );
}

export default App;
