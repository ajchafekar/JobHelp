import './App.css';
import HeroSection from './components/herosection';
import Navbar from './components/navbar';
import StepsContainer from './components/stepscontainer';
import CaseStudy from './components/casestudy';
import NewsLetter from './components/newsletter';
import Home from './pages/Home'; 
import Footer from './components/footer';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

function App() {
  return (
    <div className="App">
    <Router>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" exact componenet={Home}/>
      </Routes>
    </Router>
    <HeroSection/>
    <StepsContainer/>
    <CaseStudy/>
    <NewsLetter/>
    <Footer/>
    </div>
  );
}

export default App;
