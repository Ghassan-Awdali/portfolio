import { useRef, useState, useEffect, useCallback } from "react";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Socials from "./components/Socials";
import About from "./components/About";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
import Particles from "./components/Particles";
import { ThemeProvider, useTheme } from "./context/ThemeContext";

function AppShell() {
  const homeScrollTargetRef = useRef(null);
  const [celestialIntroDone, setCelestialIntroDone] = useState(false);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    setCelestialIntroDone(false);
  }, [isDarkMode]);

  const handleCelestialIntroComplete = useCallback(() => {
    setCelestialIntroDone(true);
  }, []);

  return (
    <div>
      <Particles celestialIntroDone={celestialIntroDone} />
      <NavBar />
      <Home
        homeScrollTargetRef={homeScrollTargetRef}
        onCelestialIntroComplete={handleCelestialIntroComplete}
      />
      <About />
      <Projects />
      <Experience />
      <Contact />

      <Socials />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppShell />
    </ThemeProvider>
  );
}
export default App;
