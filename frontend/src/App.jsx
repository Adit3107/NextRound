import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Aboutus from './components/Aboutus';
import Upgrade from './components/Upgrade';
import Dashboard from './components/Dashboard';
import Interview from './components/Interview'
import Signup from './components/Signup';
import Navbar from './components/Navbar'; 
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Navbar /> 
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Aboutus' element={<Aboutus />} />
        <Route path='/Upgrade' element={<Upgrade />} />
        <Route path='/Dashboard' element={<Dashboard />} />
        <Route path='/Interview' element={<Interview />} />
        <Route path='/Signup' element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
