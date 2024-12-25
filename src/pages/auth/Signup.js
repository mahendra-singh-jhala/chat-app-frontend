import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import axios from "axios"
import toast from "react-hot-toast"

const Signup = () => {
    const [username, setUsername] = useState("")
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [password, setPassword] = useState("")
    const [gender, setGender] = useState("")
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const user = { username, firstname, lastname, password, gender }

        try {
            const res = await axios.post("https://chat-app-backend-gsxr.onrender.com/api/auth/signup", user, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const data = res.data;
            if (res.status === 200) {
                toast.success(data.message || "Sign up successful");
                setUsername("");
                setFirstname("");
                setLastname("")
                setPassword("")
                setGender("")
                navigate("/login")
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
                <h1 className="text-2xl font-semibold text-center mb-8">Sign Up</h1>

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

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                        <div>
                            <label className="block mb-1 text-md text-slate-200 font-medium ">First Name</label>
                            <input
                                type="text"
                                placeholder="Enter Firstname"
                                value={firstname}
                                onChange={(e) => setFirstname(e.target.value)}
                                className="w-full bg-gray-900 h-10 p-2 outline-none rounded-md"
                                required
                            />
                        </div>

                        <div>
                            <label className="block mb-1 text-md text-slate-200 font-medium ">Last Name</label>
                            <input
                                type="text"
                                placeholder="Enter Lastname"
                                value={lastname}
                                onChange={(e) => setLastname(e.target.value)}
                                className="w-full bg-gray-900 h-10 p-2 outline-none rounded-md"
                                required
                            />
                        </div>
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

                    <div className="mt-4">
                        <div className="block mb-1 text-md text-slate-200 font-medium"> Gender </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="flex items-center ps-4 bg-gray-900 rounded w-full h-10">
                                <input
                                    type="radio"
                                    value="male"
                                    onChange={(e) => setGender(e.target.value)}
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
                                    required
                                />
                                <label className="ms-2 text-sm font-medium text-gray-50"> Male </label>
                            </div>

                            <div className="flex items-center ps-4 bg-gray-900 rounded w-full h-10">
                                <input
                                    type="radio"
                                    value="female"
                                    onChange={(e) => setGender(e.target.value)}
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
                                    required
                                />
                                <label className="ms-2 text-sm font-medium text-gray-50 "> Female </label>
                            </div>
                        </div>
                    </div>

                    
                    <Link to='/login' className="text-sm hover:underline hover:text-blue-600 mt-6 inline-block cursor-pointer">
                        Already have an account?
                    </Link>
                    <button type="submit" className="w-full flex items-center justify-center px-5 py-2 text-md font-medium text-center bg-gray-400 bg-opacity-50 rounded cursor-pointer hover:text-slate-900 mt-1">
                        Sign Up
                    </button>


                </form>
            </div>
        </div>
    )
}

export default Signup
