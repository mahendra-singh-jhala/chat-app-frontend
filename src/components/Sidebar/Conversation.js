import { useEffect } from "react";
import axios from "axios"
import { useAuth } from "../../context/AuthContext";
import { useConversation } from "../../context/ConversationContext";
import { useSocket } from "../../context/SocketContext";
import ConversationUser from "./ConversationUser"


const Conversation = () => {
    const { conversations, setConversations, selectedConversation, setSelectedConversation } = useConversation();
    const { auth } = useAuth();
    const { onlineUser } = useSocket();
    const token = auth.token;

    // useEffect to fetch conversations
    useEffect(() => {
        const getConversations = async () => {
            try {
                const res = await axios.get("https://chat-app-backend-gsxr.onrender.com/api/user", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                
                setConversations(res.data);
            } catch (error) {
                console.log("Error fetching users", error);
            }
        };
        getConversations();
    }, [token, setConversations]);

    // Function to handle selecting a conversation
    const handleSelectConversation = (conversation) => {
        setSelectedConversation(conversation);
    };

    return (
        <div className="mt-6 overflow-auto">
            {conversations.map((conversation) => {
                // Checking if the current conversation is the selected one
                const isSelected = selectedConversation?._id === conversation?._id;
                // Checking if the current conversation's user is online
                const isOnline = onlineUser.includes(conversation?._id);
                return (
                    <ConversationUser
                        key={conversation._id}
                        conversation={conversation}
                        isSelected={isSelected}
                        isOnline={isOnline}
                        onSelect={handleSelectConversation}
                    />
                );
            })}
        </div>
    );
};

export default Conversation;