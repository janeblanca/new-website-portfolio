import './App.css';
import Navigation from "./screens/NavigationScreen/NavigationScreen";
import HomeScreen from "./screens/HomeScreen/HomeScreen";
import PortfolioScreen from "./screens/PortfolioScreen/PortfolioScreen";
import ExperienceScreen from "./screens/ExperienceScreen/ExperienceScreen";
import ContactScreen from "./screens/ContactScreen/ContactScreen";

function App() {
  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId).scrollIntoView({ behavior: "smooth" });
    console.log("Navigated!");
  }
  
  return (
    <>
    <Navigation scrollToSection={scrollToSection}/>
    <div id="Home">
      <HomeScreen/>
    </div>
    <div id="Portfolio">
      <PortfolioScreen/>
    </div>
    <div id="Experience">
      <ExperienceScreen/>
    </div>
    <div id="Contact">
      <ContactScreen/>
    </div>
    </>
  );
}

export default App;
