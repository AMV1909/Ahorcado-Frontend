import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineSearch, AiOutlineReload } from "react-icons/ai";
import { BsArrowLeft } from "react-icons/bs";

import { getGames } from "../../API/Games";
import { CardGame } from "../../Components/CardGame/CardGame";
import { CardCode } from "../../Components/CardCode/CardCode";

import "./ListGames.css";

export function ListGames() {
    const [games, setGames] = useState([]);
    const [gameSelected, setGameSelected] = useState(null);
    const [auxGames, setAuxGames] = useState([]);
    const [number, setNumber] = useState(0);
    const [showCardCode, setShowCardCode] = useState(false);

    useEffect(() => {
        getGames().then((data) => {
            setGames(data);
            setAuxGames(data);
        });
    }, []);

    const onChange = (e) => {
        setNumber(e.target.value);
    };

    const filterGames = () => {
        if (number) {
            setGames(
                auxGames.filter((game) => {
                    return game.number == number;
                })
            );
        } else {
            setGames(auxGames);
        }
    };

    const rechargeGames = () => {
        getGames().then((data) => {
            setGames(data);
            setAuxGames(data);
        });
    };

    return (
        <div className="ahorcado__listGames content">
            {showCardCode && (
                <CardCode
                    game={gameSelected}
                    setShowCardCode={setShowCardCode}
                />
            )}

            <div className="ahorcado__listGames-header">
                <div className="ahorcado__listGames-header_title">
                    <Link to="/">
                        <BsArrowLeft size={30} />
                    </Link>
                    <h1>Partidas</h1>
                </div>
                <div className="ahorcado__listGames-header_form">
                    <input
                        type="number"
                        placeholder="Enter a table number"
                        onChange={onChange}
                    />
                    <div className="ahorcado__listGames-header_form-buttons">
                        <button onClick={() => filterGames()}>
                            <AiOutlineSearch />
                        </button>
                        <button onClick={() => rechargeGames()}>
                            <AiOutlineReload />
                        </button>
                    </div>
                </div>
            </div>
            <div className="ahorcado__listGames-span span">
                <span></span>
            </div>
            <div className="ahorcado__listGames-list">
                {games && games.length > 0 ? (
                    <div>
                        {games.map((game) => {
                            return (
                                <CardGame
                                    key={game._id}
                                    game={game}
                                    setShowCardCode={setShowCardCode}
                                    setGameSelected={setGameSelected}
                                />
                            );
                        })}
                    </div>
                ) : (
                    <h2>There are no games</h2>
                )}
            </div>
        </div>
    );
}
