import './App.css';
import Navbar from './components/Navbar'
import LoginType from './components/LoginType';
import Home from './components/Home';
import About from './components/About';
import Services from './components/Services';
import Contact from './components/Contact';
import LoginBB from './components/LoginBB'

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import BBState from './context/bloodbank/BBState';

function App() {
  return (
    <>
      <BBState>
        <Router>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<LoginType />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/services" element={<Services />} />
            <Route exact path="/contact" element={<Contact />} />

            <Route exact path="/login/bloodBank" element={<LoginBB />} />
          </Routes>
        </Router>
      </BBState>
    </>
  );
}

export default App;
