import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { BsArrowLeft } from "react-icons/bs";
import { AiOutlineDelete, AiOutlineReload } from "react-icons/ai";

import { ToastDelete } from "../../Components/ToastDelete/ToastDelete";
import {
    Errors_0,
    Errors_1,
    Errors_2,
    Errors_3,
    Errors_4,
    Errors_5,
    Errors_6,
    Errors_7,
    Errors_8,
    Errors_9,
} from "../../Assets/Errors";

import "./Game.css";
import { ToastReset } from "../../Components/ToastReset/ToastReset";

const drawImage = (errors) => {
    switch (errors) {
        case 0:
            return Errors_0;
        case 1:
            return Errors_1;
        case 2:
            return Errors_2;
        case 3:
            return Errors_3;
        case 4:
            return Errors_4;
        case 5:
            return Errors_5;
        case 6:
            return Errors_6;
        case 7:
            return Errors_7;
        case 8:
            return Errors_8;
        case 9:
            return Errors_9;
        default:
            return Errors_0;
    }
};

export function Game({ socket }) {
    const { id } = useParams();
    const [game, setGame] = useState(null);
    const letters = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";
    const navigate = useNavigate();

    useEffect(() => {
        if (!socket || !localStorage.getItem("name")) {
            navigate("/list-games");
        } else {
            if (socket.disconnected) socket.connect();

            socket.emit("join-game", id, localStorage.getItem("name"));
        }
    }, []);

    socket.on("game-" + id, (data) => setGame(data) && console.log(data));
    socket.on("resetGame-" + id, () => window.location.reload());
    socket.on("deleteGame-" + id, () => navigate("/list-games"));

    const resetGame = () => {
        if (game.win || game.lose) {
            socket.emit("resetGame", id);
        } else {
            toast((t) => <ToastReset t={t} id={id} socket={socket} />, {
                duration: Infinity,
                style: {
                    background: "white",
                    color: "black",
                },
            });
        }
    };

    const deleteGame = async () => {
        toast((t) => <ToastDelete t={t} id={id} socket={socket} />, {
            duration: Infinity,
            style: {
                background: "white",
                color: "black",
            },
        });
    };

    const letterSelected = (letter) => {
        if (game.availableLetters.includes(letter)) {
            socket.emit("letterSelected", id, letter);
        }
    };

    const leaveGame = () => {
        socket.emit("leaveGame", id);
        socket.disconnect();
        navigate("/list-games");
    };

    return (
        <div className="ahorcado__game content">
            <div className="ahorcado__game-header">
                <Link to="/list-games" onClick={leaveGame}>
                    <BsArrowLeft size={30} />
                </Link>
                <h1>Juego N°</h1>
                <p>{game && game.number}</p>
                <button onClick={() => resetGame()}>
                    <AiOutlineReload size={30} />
                </button>
                <button onClick={() => deleteGame()}>
                    <AiOutlineDelete size={30} />
                </button>
            </div>

            <div className="ahorcado__game-span span">
                <span></span>
            </div>

            {game ? (
                <div className="ahorcado__game-game">
                    <div className="ahorcado__game-game_draw">
                        <img src={drawImage(game.bad)} alt="Ahorcado" />
                    </div>
                    {!game.win && !game.lose ? (
                        <>
                            <div className="ahorcado__game-game_inputs">
                                {game.word.split("").map((letter, index) => {
                                    return (
                                        <div key={index}>
                                            <input
                                                type="text"
                                                value={
                                                    game.good.includes(letter)
                                                        ? letter
                                                        : ""
                                                }
                                                disabled
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="ahorcado__game-game_letters">
                                {game.players[game.turn].id == socket.id ? (
                                    letters.split("").map((letter, index) => (
                                        <div
                                            key={index}
                                            onClick={() =>
                                                letterSelected(letter)
                                            }
                                            className={`${
                                                game.availableLetters.includes(
                                                    letter
                                                )
                                                    ? "ahorcado__game-game_letters-letter"
                                                    : "ahorcado__game-game_letters-letter-disabled"
                                            }`}
                                            disabled={game.availableLetters.includes(
                                                letter
                                            )}
                                        >
                                            <h1>{letter}</h1>
                                        </div>
                                    ))
                                ) : (
                                    <h1>
                                        Esperando a que{" "}
                                        {game.players[game.turn].name}{" "}
                                        seleccione una letra
                                    </h1>
                                )}
                            </div>
                        </>
                    ) : (
                        <div className="ahorcado__game-game_win">
                            <h1>{game.win ? "Ganaste" : "Perdiste"}</h1>
                            <h2>La palabra era: {game.word}</h2>
                            {game.win ? (
                                <h2>Errores: {game.bad}</h2>
                            ) : (
                                <button onClick={() => resetGame()}>
                                    Reiniciar
                                </button>
                            )}
                        </div>
                    )}
                </div>
            ) : (
                <div className="ahorcado__game-game">
                    <h1>Cargando...</h1>
                </div>
            )}
        </div>
    );
}
