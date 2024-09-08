import React, { useState, useEffect } from "react";
import "../HomeScreen/HomeScreen.css";
import myImage from "../../assets/me.jpg";
import WavingHandRoundedIcon from "@mui/icons-material/WavingHandRounded";

// Firestore
import { collection, onSnapshot } from "firebase/firestore";
import { firestore } from "../../firebase/firebase";

export default function HomeScreen() {
  const [isSkillsData, setSkillsData] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [isSkillActive, setSkillActive] = useState(0);
  const [isDocuData, setDocumentsData] = useState([]);

  const toggleFilter = (skill, index) => {
    setSelectedSkill(skill);
    setSkillActive(index);
    console.log("Selected Skill: ", skill);
  };

  const handleCV = () => {
    const cvDocument = isDocuData.find(
      (item) => item.docuName === "Curriculum Vitae"
    );

    if (cvDocument) {
      console.log("CV URL: ", cvDocument.docuUrl);
      window.open(cvDocument.docuUrl, "_blank");
    } else {
      console.log("Document not found!");
    }
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

        if (skillsData.length > 0) {
          setSelectedSkill(skillsData[0]);
        }

        console.log("SKILLS DATA: ", skillsData);
      });
      return unsubscribeSkills;
    };
    const subscribeSkills = fetchSkills();

    const fetchDocuments = () => {
      const documentsRef = collection(firestore, "DOCUMENTS");
      const unsubscribeDocs = onSnapshot(documentsRef, (snapshot) => {
        const documentsData = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setDocumentsData(documentsData);
        console.log("Documents Data: ", documentsData);
      });
      return unsubscribeDocs;
    };
    const subscribeDocs = fetchDocuments();

    return () => {
      subscribeSkills();
      subscribeDocs();
    };
  }, []);

  return (
    <>
      <div className="homeScreenMainContainer">
        <div className="profileContainer">
          <div className="profilePictureContainer">
            <img src={myImage} alt="myImage" className="myPictureContainer" />
          </div>
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
              <button onClick={handleCV} className="cvButton">
                <span className="cvButtonText">DOWNLOAD CV</span>
              </button>
            </div>
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
                className={`skillsFilter ${
                  isSkillActive === skillsIndex ? "activeSkills" : ""
                }`}
                onClick={() => toggleFilter(skillsData, skillsIndex)}
              >
                <span className="filterText">{skillsData.skillName}</span>
              </button>
            ))}
          </div>
          <div className="filterDetailsContainer">
            {selectedSkill && selectedSkill.skillsDetails && (
              <div className="filterDetails">
                {Object.values(selectedSkill.skillsDetails).map(
                  (techStackName, stackIndex) => (
                    <div key={stackIndex} className="filterMainContainer">
                      {techStackName.imageUrl && techStackName.techStack ? (
                        <div className="filterContainer">
                          <img
                            src={techStackName.imageUrl}
                            alt="techStackImage"
                            className="techStackLogo"
                          />
                          <span className="techStackText">
                            {techStackName.techStack}
                          </span>
                        </div>
                      ) : (
                        <div className="filterContainer">
                          <span className="techStackText">{techStackName}</span>
                        </div>
                      )}
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
