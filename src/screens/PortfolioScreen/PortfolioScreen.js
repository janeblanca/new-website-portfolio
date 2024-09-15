import React, { useState, useEffect } from "react";
import "../PortfolioScreen/PortfolioScreen.css";

// Firestore
import { collection, onSnapshot } from "firebase/firestore";
import { firestore } from "../../firebase/firebase";

import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";

export default function PortfolioScreen() {
  const [isProjectsData, setProjectsData] = useState([]);

  useEffect(() => {
    const fetchProjects = () => {
      const projectsRef = collection(firestore, "PROJECTS_DB");
      const unsubscribeProjects = onSnapshot(projectsRef, (snapshot) => {
        const projectsData = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setProjectsData(projectsData);
        console.log("PROJECTS DATA: ", projectsData);
      });
      return unsubscribeProjects;
    };
    const subscribeProjects = fetchProjects();

    return () => {
      subscribeProjects();
    };
  }, []);

  return (
    <div className="portfolioMainScreenContainer">
      <div className="portfolioContainer">
        <div className="pageTitleContainer">
          <span className="titleText">MY PORTFOLIO</span>
        </div>
        <div className="projectsContainer">
          <div className="previousContainer">
            <ArrowBackIosNewRoundedIcon
              style={{ fontSize: 100 }}
              className="arrowIcons"
            />
          </div>
          {isProjectsData.map((projectsData, projectIndex) => (
            <div key={projectIndex} className="projectDetailsContainer">
              <div className="picAndVidContainer">
                <img
                  src={projectsData.projectImageUrl}
                  alt="projectImage"
                  className="skaninMobPicture"
                />
              </div>
              <div className="projectInfoContainer">
                <div className="projectNameContainer">
                  <img
                    src={projectsData.projectLogo}
                    alt="projectLogo"
                    className="projectLogo"
                  />
                </div>
                <div className="projectDescContainer">
                    <p className="projectText">{projectsData.projectDescription}</p>
                </div>
                <div className="techStackContainer">
                </div>
                <div className="projectRoleContainer">
                    <p>{projectsData.projectRole}</p>
                </div>
              </div>
            </div>
          ))}
          <div className="nextContainer">
            <ArrowForwardIosRoundedIcon
              style={{ fontSize: 100 }}
              className="arrowIcons"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
