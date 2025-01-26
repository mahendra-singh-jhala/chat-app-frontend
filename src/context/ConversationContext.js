import { createContext, useContext, useState } from 'react';

// Create a ConversationContext to manage conversation data
const ConversationContext = createContext();

const ConversationProvider = ({ children }) => {
    const [selectedConversation, setSelectedConversation] = useState(null);
    const [conversations, setConversations] = useState([]) 
    const [messages, setMessages] = useState([]);

    return (
        <ConversationContext.Provider
            value={{
                conversations,
                setConversations,
                selectedConversation,
                setSelectedConversation,
                messages,
                setMessages,
            }}
        >
            {children}
        </ConversationContext.Provider>
    );
};

const useConversation = () => useContext(ConversationContext)

export { ConversationProvider, useConversation}
