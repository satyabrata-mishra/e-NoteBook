import './App.css';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Navbar from './Components/Navbar';
import Home from './Components/Home ';
import About from './Components/About';
import NoteState from './context/notes/NoteState';
import Alert from './Components/Alert';
import Login from './Components/Login';
import Signup from './Components/Signup';
import { useEffect, useState } from 'react';

function App() {
  useEffect(() => {
    localStorage.clear();
  }, [])

  const [alert, setalert] = useState(null);
  const showAlert = (message, type) => {
    setalert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setalert(null);
    }, 1500);
  }
  return (
    <NoteState>
      <BrowserRouter>
        <Navbar showAlert={showAlert} />
        <Alert alert={alert} />
        <Routes>
          <Route path='/' element={<Home showAlert={showAlert} />} />
          <Route path='/about' element={<About />} />
          <Route path='/login' element={<Login showAlert={showAlert} />} />
          <Route path='/signup' element={<Signup showAlert={showAlert} />} />
        </Routes>
      </BrowserRouter>
    </NoteState>

  );
}

export default App;
