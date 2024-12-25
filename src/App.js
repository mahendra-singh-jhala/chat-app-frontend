import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Login from "./pages/auth/Login"
import Signup from "./pages/auth/Signup"
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast"


function App() {
    
    return (
        <Router>
            <Toaster position="top-right" />
            
            <div className="p-4 h-screen flex items-center justify-center text-white">
                <Routes>
                    <Route path="/" element={<Home /> } />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
