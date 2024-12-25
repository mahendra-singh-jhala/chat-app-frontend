import { FaSearch } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import Conversation from "./Conversation";
import { useState } from "react";
import { useConversation } from "../../context/ConversationContext";
import toast from "react-hot-toast"
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
    const [search, setSearch] = useState("")
    const { conversations, setSelectedConversation } = useConversation();
    const { setAuth } = useAuth();
    const navigate = useNavigate();

    const handleSearchClick = (e) => {
		e.preventDefault();
		if (!search) return;
		if (search.length < 3) {
			return toast.error("Search term must be at least 3 characters long");
		}

		const conversation = conversations.find((c) =>
            c.firstname.toLowerCase().includes(search.toLowerCase()) ||
            c.lastname.toLowerCase().includes(search.toLowerCase())
        );

		if (conversation) {
			setSelectedConversation(conversation);
			setSearch("");
		} else toast.error("No such user found!");
	};

    const handleLogout = () => {
        setAuth({
            user: "",
            token: "",
        })
        localStorage.removeItem("auth")
        toast.success("Logout Successfully");
        navigate("/login")
    }


    return (
        <div className="border-r border-slate-500 p-4 flex flex-col">
            <div className="flex items-center mb-2">
                <input
                    type="text"
                    placeholder="Search.."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full bg-gray-900 text-sm h-10 rounded-full px-4 outline-none"
                />
                <span onClick={handleSearchClick} className="bg-sky-500 p-3 rounded-full ms-4 hover:bg-sky-900 cursor-pointer"><FaSearch /></span>
            </div>

            <div className="border-t my-4 border-slate-400"></div>

            <Conversation />

            <button onClick={handleLogout} className="mt-auto">
                <BiLogOut className="w-6 h-6 text-white cursor-pointer" />
            </button>
        </div>

    )
}

export default Sidebar

