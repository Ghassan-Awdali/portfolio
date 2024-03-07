import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Socials from "./components/Socials";
import About from "./components/About";
import Projects from "./components/Projects";
import Experience from "./components/Experience"
import Contact from "./components/Contact";



function App() {
  return (
    <div>
     <NavBar/>
     <Home/>
     <About/>
     <Projects/>
     <Experience/>
     <Contact/>

     <Socials/>
    </div>
  );
}
export default App;
