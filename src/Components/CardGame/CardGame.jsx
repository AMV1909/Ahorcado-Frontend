import "./CardGame.css";

export function CardGame({ game, setShowCardCode, setGameSelected }) {
    const onClick = () => {
        setGameSelected(game);
        setShowCardCode(true);
    };

    return (
        <div className="card" onClick={onClick}>
            <h2>Número de mesa: </h2>
            <p>{game.number}</p>
        </div>
    );
}
