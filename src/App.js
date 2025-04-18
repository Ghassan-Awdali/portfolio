import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Socials from "./components/Socials";
import About from "./components/About";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <div>
        <NavBar />
        <Home />
        <About />
        <Projects />
        <Experience />
        <Contact />

        <Socials />
      </div>
    </ThemeProvider>
  );
}
export default App;
