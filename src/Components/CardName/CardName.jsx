import { useState } from "react";

import "./CardName.css";

export function CardName({ createTheGame }) {
    const [name, setName] = useState("");

    const onChange = (e) => {
        setName(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        localStorage.setItem("name", name);
        await createTheGame();
    };

    return (
        <form className="ahorcado__cardName" onSubmit={handleSubmit}>
            <h3>Ingresa un nombre</h3>
            <input type="text" onChange={onChange} autoFocus required />
            <button>Jugar</button>
        </form>
    );
}
