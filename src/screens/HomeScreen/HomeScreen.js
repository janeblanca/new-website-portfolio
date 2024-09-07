import React, { useState, useEffect } from "react";
import "../HomeScreen/HomeScreen.css";
import myImage from "../../assets/me.jpg";
import WavingHandRoundedIcon from "@mui/icons-material/WavingHandRounded";

// Firestore
import { collection, onSnapshot } from "firebase/firestore";
import { firestore } from "../../firebase/firebase";

export default function HomeScreen() {
  const [isFilterClicked, setIsFilterClicked] = useState(false);
  const [isSkillsData, setSkillsData] = useState([]);

  const toggleFilter = () => {
    setIsFilterClicked(!isFilterClicked);
    console.log("Programming Language");
  };

  useEffect(() => {
    const fetchSkills = () => {
      const skillsRef = collection(firestore, "TECHNICAL_SKILLS");
      const unsubscribeSkills = onSnapshot(skillsRef, (snapshot) => {
        const skillsData = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setSkillsData(skillsData);
        console.log("SKILLS DATA: ", skillsData);
      });
      return unsubscribeSkills;
    };
    const subscribeSkills = fetchSkills();

    return () => {
      subscribeSkills();
    };
  }, []);

  return (
    <>
      <div className="homeScreenMainContainer">
        <div className="profileContainer">
          <div className="profileDetailsContainer">
            <div className="helloContainer">
              <span className="helloText">Hi, I'm Jane Blanca</span>
              <WavingHandRoundedIcon className="waveIcon" />
            </div>
            <div className="introductionContainer">
              <p className="introductionText">
                I am a passionate and dedicated Computer Engineering graduate
                with a strong focus on technology-driven solutions. My journey
                spans across data science, mobile and web development, and AI
                automation.
              </p>
              <p className="introductionText" style={{ marginTop: "1%" }}>
                Explore my portfolio to learn more about my projects, skills,
                and the unique experiences that have shaped my path. Let's
                connect and create something impactful together!
              </p>
            </div>
            <div className="cvContainer">
              <button className="cvButton">
                <span className="cvButtonText">DOWNLOAD CV</span>
              </button>
            </div>
          </div>
          <div className="profilePictureContainer">
            <img src={myImage} alt="myImage" className="myPictureContainer" />
          </div>
        </div>
      </div>
      <div className="skillsMainContainer">
        <div className="skillsTitleContainer">
          <span className="skillsTitle">Skills</span>
        </div>
        <div className="skillsFilterMainContainer">
          <div className="skillsFilterContainer">
            {isSkillsData.map((skillsData, skillsIndex) => (
              <button
                key={skillsIndex}
                className="skillsFilter"
                onClick={toggleFilter}
              >
                <span className="filterText">{skillsData.skillName}</span>
              </button>
            ))}
          </div>
          <div className="filterDetailsContainer"></div>
        </div>
      </div>
    </>
  );
}
