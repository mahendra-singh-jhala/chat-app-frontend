import { useState, useEffect } from "react"
import ChatMessage from "./components/ChatMessage"
import MessageInput from "./components/MessageInput"
import axios from "axios"
import './App.css'

function App() {
    const [message, setMessage] = useState("");
    const [chat, setChat] = useState([]);
    const [user, setUser] = useState("")
    const [error, setError] = useState("");

    useEffect(() => {
        const interval = setInterval(async () => {
            try {
                const res = await axios.get("https://chat-app-backend-spj3.onrender.com/messages")
                setChat(res.data);
            } catch (error) {
                console.error("Error fetching messages:", error);
                setError("Failed to fetch messages. Please try again later")
            }
        }, 2000)

        return () => clearInterval(interval);
    }, [])


    const sendMessage = async () => {
        if (message.trim() && user.trim()) {
            try {
                await axios.post("https://chat-app-backend-spj3.onrender.com/send", { message, user });
                setMessage("");
                setError("");
            } catch (error) {
                console.error("Error sending messages:", error);
                setError("Failed to send messages. Please try again later")
            }
        }
    }


    const handleSetUser = (e) => {
        setUser(e.target.value);
    };

    return (
        <div className="container-fluid bg-primary-subtle p-4" style={{ height: "100vh" }}>
            <h1 className="text-center text-success">Chat Application</h1>

            <div className="container mt-4 bg-info rounded-1 px-4 py-5" style={{ width: "50%" }}>
                <div className="mb-4">
                    <label className="form-label mb-2">Username</label>
                    <input
                        type="text"
                        placeholder="Enter Your Name"
                        value={user}
                        onChange={handleSetUser}
                        className="form-control"
                    />
                </div>

                {error && <p className="text-center text-danger">{error}</p>}

                <div>
                    {chat.map((msg, index) => (
                        <ChatMessage
                            key={index}
                            user={msg.user}
                            message={msg.message}
                        />
                    ))
                    }
                </div>

                <div className="mt-4">
                    <MessageInput
                        message={message}
                        setMessage={setMessage}
                        sendMessage={sendMessage}
                    />
                </div>
            </div>
        </div>
    );
}

export default App;
