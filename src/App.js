import './App.css';
import View from './bricks/detail/ViewDetail';
import 'bootstrap/dist/css/bootstrap.min.css'
import { useState, useEffect } from 'react';
import ListDetail from './routes/list-detail';
import styles from './css/shoppingList.module.css'

import Icon from "@mdi/react";
import { mdiLoading } from "@mdi/js";

import ViewList from "./bricks/list/ViewList";


function App() {

    const [shoppingListLoadCall, setShoppingListLoadCall] = useState({
        state: "pending",
    })

    useEffect(() => {
        setShoppingListLoadCall({
            state: "pending",
        });

        const url = "http://localhost:8000/api/shopping-lists";

        (async () => {
            try {
                const req = await fetch(url);
                const res = await req.json();
                if (req.status >= 400) {
                    setShoppingListLoadCall({ state: "error", error: res });
                } else {
                    setShoppingListLoadCall({ state: "success", data: res });
                }
            } catch (err) {
                setShoppingListLoadCall({ state: "error", error: err });
            }
        })();
        
    }, []);

    return () => {
        switch (shoppingListLoadCall.state) {
            case "pending":
                return (
                    <div className={styles.loading}>
                        <Icon size={2} path={mdiLoading} spin={true} />
                    </div>
                );
            case "success":
                return (
                    <ViewList shoppingList={shoppingListLoadCall.data}/>
                );
            case "error":
                return (
                    <div className={styles.error}>
                        <div>Failed loading shopping lists</div>
                        <br />
                        <pre>{JSON.stringify(shoppingListLoadCall.error, null, 2)}</pre>
                    </div>
                );
            default:
                return null;
        }
    }
}

export default App;
