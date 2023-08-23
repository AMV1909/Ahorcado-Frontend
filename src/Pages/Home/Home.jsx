import { Link } from "react-router-dom";
import ahorcado from "../../Assets/Ahorcado.png";
import "./Home.css";

export function Home() {
    return (
        <div className="ahorcado__home content">
            <div className="ahorcado__home-logo">
                <img src={ahorcado} alt="logo" />
            </div>
            <div className="ahorcado__home-menu">
                <Link to="/create-game">Crear Partida</Link>
                <Link to="/list-games">Unirse a Partida</Link>
            </div>
        </div>
    );
}
