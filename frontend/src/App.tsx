import { Routes, Route } from "react-router-dom"
import { Navbar } from "./components/Navbar"
import { Footer } from "./components/Footer"
import { Login } from "./components/Login"
import { Home } from "./pages/Home"
import { Game } from "./components/Game"
import { Simulation } from "./pages/Simulation"
import Signup from "./components/SignUp";

export default function App() {
  return (
      <div className="flex min-h-screen flex-col bg-gray-950">
        <Navbar />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/game" element={<Game />} />
            <Route path="/simulation" element={<Simulation />} />
              <Route path="/signup" element={<Signup />} />
          </Routes>
        </div>
        <Footer />
      </div>
  )
}