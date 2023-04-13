
import React, { useState } from "react";
import { AutoComplete } from "primereact/autocomplete";

export default function Search() {

    const [value, setValue] = useState('');
    const [items, setItems] = useState([]);

    const search = (event) => {
        setItems([...Array(10).keys()].map(item => event.query + '-' + item));
    }

    return (
        <div className="cardflex">
            <AutoComplete value={value} suggestions={items} completeMethod={search} onChange={(e) => setValue(e.value)} forceSelection />
        </div>
    )
}
        