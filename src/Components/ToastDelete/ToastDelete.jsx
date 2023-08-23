import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import { deleteGame } from "../../API/Games";

import "./ToastDelete.css";

export function ToastDelete({ t, id, socket }) {
    const navigate = useNavigate();

    return (
        <div className="ahorcado__toastDelete">
            <p>Are you sure you want to delete this game?</p>
            <div className="ahorcado__toastDelete-buttons">
                <button onClick={() => toast.dismiss(t.id)}>Cancel</button>
                <button
                    onClick={async () => {
                        await deleteGame(id).then(() =>
                            socket.emit("deleteGame", id)
                        );
                        toast.dismiss(t.id);
                        navigate("/list-games");
                    }}
                >
                    Delete
                </button>
            </div>
        </div>
    );
}
