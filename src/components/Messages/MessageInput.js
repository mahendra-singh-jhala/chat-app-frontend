import { BiSend } from "react-icons/bi";
import { useConversation } from "../../context/ConversationContext";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";

const MessageInput = () => {
    const { messages, setMessages, selectedConversation } = useConversation();
    const { auth } = useAuth()
    const [message, setMessage] = useState("");

    const token = auth.token;
    const sendMessage = async (message) => {
        try {
            const res = await axios.post(
                `https://chat-app-backend-gsxr.onrender.com/api/message/send/${selectedConversation._id}`,
                { message },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const data = res.data;

            setMessages([...messages, data]); 
            if (res.status === 200) {
                setMessage(""); 
            }
        } catch (error) {
            toast.error("Error sending message");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        if (!message) return;
        await sendMessage(message); 
    };



    return (
        <div className="px-4 my-3">
            <form onSubmit={handleSubmit}>
                <div className="w-full relative">
                    <input
                        type="text"
                        placeholder="Send Message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full bg-gray-900 text-sm rounded-lg p-2.5 outline-none hover:border-2 hover:border-slate-600"
                        required
                    />

                    <button
                        type="submit"
                        className="absolute inset-y-0 end-0 flex items-center pe-3"
                    >
                        <BiSend className="text-2xl" />
                    </button>
                </div>
            </form>
        </div>
    );
};

export default MessageInput;
