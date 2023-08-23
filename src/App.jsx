import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import io from "socket.io-client";

import { CreateGame, Game, Home, ListGames } from "./Pages";

export function App() {
    const socket = io(import.meta.env.VITE_API_SOCKET_URL);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/create-game" element={<CreateGame />} />
                <Route path="/list-games" element={<ListGames />} />
                <Route path="/game/:id" element={<Game socket={socket} />} />
                <Route path="*" element={<h1>404 Not Found</h1>} />
            </Routes>

            <Toaster />
        </Router>
    );
}
