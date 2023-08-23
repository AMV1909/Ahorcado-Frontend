import { useNavigate } from "react-router-dom";
import { useState } from "react";

import "./CardCode.css";

export function CardCode({ game, setShowCardCode }) {
    const [code, setCode] = useState(0);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const onChange = (e) => {
        setCode(+e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (code === game.code) {
            navigate(`/game/${game._id}`);
        } else {
            console.log(code, game.code);

            setError("El código es incorrecto");

            setTimeout(() => {
                setError("");
            }, 5000);
        }
    };

    return (
        <form className="ahorcado__cardCode" onSubmit={handleSubmit}>
            <h3>Ingresa el código de la partida</h3>
            <p>{error}</p>
            <input type="number" onChange={onChange} autoFocus required />
            <div>
                <button type="button" onClick={() => setShowCardCode(false)}>
                    Cancelar
                </button>
                <button>Jugar</button>
            </div>
        </form>
    );
}
