import axios from "axios"
import { useState } from "react"
import toast from "react-hot-toast"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"

function Login() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const { setAuth } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault()

        const user = { username, password}
        try {
            const res = await axios.post("https://chat-app-backend-gsxr.onrender.com/api/auth/login", user, {
                headers: {
                    "Content-Type": "application/json"
                }
            })

            const data = res.data
            if (res.status === 200) {
                toast.success(data.message || "Login successful");

                localStorage.setItem("auth", JSON.stringify(res.data))
                setAuth(data)
                
                navigate("/")
                setUsername("")
                setPassword("")
            }
        } catch (error) {
            if (error.response) {
                toast.error( error.response.data.message || "An error occurred");
            } else {
                toast.error("Signup failed due to a network error");
            } 
        }
    }

    return (

        <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
            <div className="w-full p-6 rounded-lg shadow-md bg-slate-500 bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-0">
                <h1 className="text-3xl font-semibold text-center mb-4 text-orange-400"> ChatApp </h1>
                <h1 className="text-3xl font-semibold text-center mb-8"> Login </h1>

                <form onSubmit={handleSubmit}>
                    <div className="mt-4">
                        <label className="block mb-1 text-md text-slate-200 font-medium ">Username</label>
                        <input
                            type="text"
                            placeholder="Enter Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full bg-gray-900 h-10 p-2 outline-none rounded-md"
                            required
                        />
                    </div>

                    <div className="mt-4">
                        <label className="block mb-1 text-md text-slate-200 font-medium">Password</label>
                        <input
                            type="password"
                            placeholder="Enter Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-gray-900 h-10 p-2 outline-none rounded-md"
                            required
                        />
                    </div>

                    <Link to='/signup' className="text-sm hover:underline hover:text-blue-600 mt-6 inline-block cursor-pointer">
                        Don't have an account?
                    </Link>
                    <button type="submit" className="w-full flex items-center justify-center px-5 py-2 text-md font-medium text-center bg-gray-400 bg-opacity-50 rounded cursor-pointer hover:text-slate-900 mt-1">
                        LogIn
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login
