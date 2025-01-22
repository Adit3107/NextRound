import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Home from './components/Home';
import Aboutus from './components/Aboutus';
import Upgrade from './components/Upgrade';
import './App.css'
import Dashboard from './components/Dashboard';
import Signup from './components/Signup';

function App() {

  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}>
          <Route path='/Aboutus' element={<Aboutus/>}></Route>
          <Route path='/Upgrade' element={<Upgrade/>}></Route>
          <Route path='/Dashboard' element={<Dashboard/>}></Route>
          <Route path='/Signup' element={<Signup/>}></Route>
        </Route>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
