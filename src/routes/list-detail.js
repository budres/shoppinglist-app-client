import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Icon from "@mdi/react";
import { mdiLoading } from "@mdi/js";
import styles from "../css/shoppingList.module.css";

import ViewDetail from "../bricks/detail/ViewDetail";

const ListDetail = () => {

    const [shoppingListLoadCall, setShoppingListLoadCall] = useState({
        state: "pending",
    });
    let [searchParams] = useSearchParams();

    const shoppingListId = searchParams.get("id");

    useEffect(() => {
        setShoppingListLoadCall({
            state: "pending",
        });

        const params = new URLSearchParams();
        params.append("id", shoppingListId);

        const url = "http://localhost:3000/shopping-list/?" + params;

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
        
    }, [shoppingListId]);

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
                    <ViewDetail shoppingList={shoppingListLoadCall.data} />
                );
            case "error":
                return (
                    <div className={styles.error}>
                        <div>Nepodařilo se načíst data o třídě.</div>
                        <br />
                        <pre>{JSON.stringify(shoppingListLoadCall.error, null, 2)}</pre>
                    </div>
                );
            default:
                return null;
        }
    }
}

export default ListDetail
