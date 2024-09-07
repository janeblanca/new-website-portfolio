import React, { useState, useRef, useEffect } from "react";
import "./NavigationScreen.css";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import BusinessCenterRoundedIcon from "@mui/icons-material/BusinessCenterRounded";
import WorkHistoryRoundedIcon from "@mui/icons-material/WorkHistoryRounded";
import ContactsRoundedIcon from "@mui/icons-material/ContactsRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";

export default function NavigationScreen({ scrollToSection }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const sideNavRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
    console.log("Toggle menu");
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sideNavRef.current && !sideNavRef.current.contains(event.target)) {
        closeMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <header className="header">
        <div className="webHeaderContainer">
          <div
            className="homeMyNameContainer"
            onClick={() => scrollToSection("Home")}
          >
            <span className="homeNameJane">Jane </span>
            <span className="homeNameBlanca">Blanca.</span>
          </div>
          <div className="webNavigationContainer">
            <div
              className="homeNavContainer"
              onClick={() => scrollToSection("Home")}
            >
              <HomeRoundedIcon className="navigationIcons" />
              <span className="navigationText">Home</span>
            </div>
            <div
              className="portfolioNavContainer"
              onClick={() => scrollToSection("Portfolio")}
            >
              <BusinessCenterRoundedIcon className="navigationIcons" />
              <span className="navigationText">Portfolio</span>
            </div>
            <div
              className="experienceNavContainer"
              onClick={() => scrollToSection("Experience")}
            >
              <WorkHistoryRoundedIcon className="navigationIcons" />
              <span className="navigationText">Journey</span>
            </div>
            <div
              className="contactNavContainer"
              onClick={() => scrollToSection("Contact")}
            >
              <ContactsRoundedIcon className="navigationIcons" />
              <span className="navigationText">Contact</span>
            </div>
            <div className="menuContainer">
              <MenuRoundedIcon onClick={toggleMenu} className="menuIcon" />
            </div>
          </div>
        </div>
      </header>
      {/*Side Navigation Bar*/}
      <div
        className={`sideNavigationContainer ${isMenuOpen ? "open" : ""}`}
        ref={sideNavRef}
      >
        <div className="sideNavItemContainer">
          <div className="sideNavItem">
            <div className="sideNavTextContainer" onClick={() => scrollToSection("Home")}>
              <HomeRoundedIcon className="navigationIcons" />
              <span className="sideNavText">Home</span>
            </div>
          </div>
          <div className="sideNavItem">
            <div className="sideNavTextContainer" onClick={() => scrollToSection("Portfolio")}>
              <BusinessCenterRoundedIcon className="navigationIcons" />
              <span className="sideNavText">Portfolio</span>
            </div>
          </div>
          <div className="sideNavItem">
            <div className="sideNavTextContainer" onClick={() => scrollToSection("Experience")}>
              <WorkHistoryRoundedIcon className="navigationIcons" />
              <span className="sideNavText">Experience</span>
            </div>
          </div>
          <div className="sideNavItem">
            <div className="sideNavTextContainer" onClick={() => scrollToSection("Contact")}>
              <ContactsRoundedIcon className="navigationIcons" />
              <span className="sideNavText">Contact</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
