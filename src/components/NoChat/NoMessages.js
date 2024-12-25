import { TiMessages } from "react-icons/ti"
import { useAuth } from "../../context/AuthContext"
import { useNavigate } from "react-router-dom";

const NoMessages = () => {
    const { auth } = useAuth()
    const navigate = useNavigate();

    if (auth.user === "") {
        navigate("/login");
        return null; 
    }

    return (
        <div className="flex items-center justify-center w-full h-full">
            <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
                <p>Welcome {auth.user?.firstname} {auth.user?.lastname}</p>
                <p>Select a chat to start Messaging</p>
                <TiMessages className="text-3xl md:text-6xl text-center"/>
            </div>
        </div>
      )
}

export default NoMessages

