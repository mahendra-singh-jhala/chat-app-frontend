import MessageUser from "./MessageUser";
import NoMessages from "../NoChat/NoMessages";
import { useConversation } from "../../context/ConversationContext";
import { useAuth } from "../../context/AuthContext";
import { useEffect } from "react";
import axios from "axios";
import { useSocket } from "../../context/SocketContext";
import MessageInput from "./MessageInput";

const Messages = () => {
    const { messages, setMessages, selectedConversation } = useConversation();
    const { auth } = useAuth();
    const { socket } = useSocket();

    const token = auth.token;

    useEffect(() => {
        const getMessages = async () => {
            try {
                const res = await axios.get(`https://chat-app-backend-gsxr.onrender.com/api/message/${selectedConversation._id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setMessages(res.data);
            } catch (error) {
                console.log("Error fetching messages", error);
            }
        };

        if (selectedConversation?._id) getMessages();
    }, [selectedConversation]);

    // Socket listener for new messages
    useEffect(() => {
        socket?.on("newMessage", (newMessage) => {
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        });

        return () => socket?.off("newMessage");
    }, [socket, setMessages]);

    return (
        <div className="md:min-w-[450px] flex flex-col h-full">
            {!selectedConversation ? (
                <NoMessages />
            ) : (
                <>
                    <div className="bg-slate-500 px-4 py-2 mb-2">
                        <span className="font-medium">To: </span>
                        <span className="text-gray-900 font-bold">
                            {selectedConversation.firstname} {selectedConversation.lastname}
                        </span>
                    </div>
                    <div className="px-4 flex-1 overflow-auto space-y-4 py-2">
                        {messages.length > 0 ? (
                            messages.map((message) => (
                                <MessageUser
                                    key={message._id}
                                    message={message}
                                    auth={auth}
                                    selectedConversation={selectedConversation}
                                />
                            ))
                        ) : (
                            <p className="text-gray-200 text-md text-center">Send a message to start the conversation</p>
                        )}
                    </div>
                </>
            )}

            <MessageInput />
        </div>
    );
};

export default Messages;
