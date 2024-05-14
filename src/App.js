import { Routes, Route } from 'react-router-dom'
import './App.css';
import LogIn from './LogIn/LogIn';
import Home from './Home/Home';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LogIn/>}/>
        <Route path="/login" element={<LogIn/>}/>
        <Route path="/home" element={<Home/>}/>
      </Routes>
    </div>
  );
}

export default App;
