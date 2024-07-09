import './App.css';
import Navbar from './components/Navbar'
import LoginType from './components/LoginType';
import Home from './components/Home';
import About from './components/About';
import Services from './components/Services';
import Contact from './components/Contact';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <Navbar/>
          <Routes>
            <Route exact path="/" element={<Home/>} />
            <Route exact path="/login" element={<LoginType />} />
            <Route exact path="/about" element={<About/>} />
            <Route exact path="/services" element={<Services />} />
            <Route exact path="/contact" element={<Contact />} />

          </Routes>
      </Router>
    </div>
  );
}

export default App;
