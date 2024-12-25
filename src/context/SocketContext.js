import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import io from "socket.io-client"

const SocketContext = createContext();

const SocketContextProvider = ({ children}) => {
    const [socket, setSocket] = useState(null);
    const [onlineUser, setOnlineUser] = useState([]);
    const { auth } = useAuth();

    useEffect(() => {
        if(auth) {
            const socket = io("http://localhost:5000", {
                query: {
                    userId: auth.user.userId
                }
            })

            setSocket(socket);
            socket.on("getOnlineUser", (users) => {
                setOnlineUser(users)
            })

            return () => socket.close()
        } else {
            if(socket) {
                socket.close();
                setSocket(null)
            }
        }
    }, [auth, socket])
    
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
