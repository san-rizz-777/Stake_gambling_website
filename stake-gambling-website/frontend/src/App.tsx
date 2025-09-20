import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {Simulation} from './components/Simulate';
import {Game} from './components/Game';
import {Navbar} from './components/Navbar';

function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/simulation" element={<Simulation/>}/>
        <Route path="/game" element={<Game/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
