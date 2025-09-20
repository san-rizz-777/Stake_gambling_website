import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {Simulation} from './components/Simulation';
import {Game} from './components/Game';
import {Footer,Navbar}  from "./components";

function App() {
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/simulation" element={<Simulation/>}/>
        <Route path="/game" element={<Game/>}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App
