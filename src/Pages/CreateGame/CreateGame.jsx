import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";

import { createGame } from "../../API/Games";
import { CardName } from "../../Components/CardName/CardName";

import "./CreateGame.css";

export function CreateGame() {
    const navigate = useNavigate();
    const [number, setNumber] = useState();
    const [showInputName, setShowInputName] = useState(false);
    const [disableInput, setDisableInput] = useState(false);

    const onChange = (e) => {
        setNumber(+e.target.value);
    };

    const createTheGame = async () => {
        if (number) {
            await createGame(number)
                .then((res) => navigate(`/game/${res._id}`))
                .catch((err) => console.log(err));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setDisableInput(!disableInput);
        setShowInputName(!showInputName);
    };

    return (
        <div className="ahorcado__createGame content">
            {showInputName && <CardName createTheGame={createTheGame} />}

            <div className="ahorcado__createGame-header">
                <div className="ahorcado__createGame-header_title">
                    <Link to="/">
                        <BsArrowLeft size={30} />
                    </Link>
                    <h1>Crear Partida</h1>
                </div>
            </div>

            <div className="ahorcado__createGame-span span">
                <span></span>
            </div>

            <div className="ahorcado__createGame-form">
                <form onSubmit={handleSubmit}>
                    <input
                        type="number"
                        onChange={onChange}
                        placeholder="Enter a password code for your game"
                        disabled={disableInput}
                        autoFocus
                        required
                    />

                    <button>Crear Partida</button>
                </form>
            </div>
        </div>
    );
}
