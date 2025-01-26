import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import io from "socket.io-client"

const SocketContext = createContext();

const SocketContextProvider = ({ children}) => {
    const [socket, setSocket] = useState(null);
    const [onlineUser, setOnlineUser] = useState([]);
    const { auth } = useAuth();

    useEffect(() => {
        let socketInstance = null;

        if (auth) {
            socketInstance = io("https://chat-app-backend-gsxr.onrender.com", {
                query: {
                    userId: auth?.user?.userId,
                },
            });

            setSocket(socketInstance);
            socketInstance.on("getOnlineUser", (users) => {
                setOnlineUser(users);
            });
        }

        return () => {
            if (socketInstance) {
                socketInstance.close();
            }
            setSocket(null);
        };
        
    }, [auth])
    
    return (
        <SocketContext.Provider value={{
            socket,
            onlineUser
        }}>
            { children }
        </SocketContext.Provider>
    )
}

const useSocket = () => useContext(SocketContext)

export { SocketContextProvider, useSocket }
