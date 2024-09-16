import React, { useState, useEffect } from "react";
import "../PortfolioScreen/PortfolioScreen.css";

// Firestore
import { collection, onSnapshot } from "firebase/firestore";
import { firestore } from "../../firebase/firebase";

import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import GitHubIcon from "@mui/icons-material/GitHub";
import ArticleIcon from "@mui/icons-material/Article";

export default function PortfolioScreen() {
  const [projectsData, setProjectsData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchProjects = () => {
      const projectsRef = collection(firestore, "PROJECTS_DB");
      const unsubscribeProjects = onSnapshot(projectsRef, (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setProjectsData(data);
        console.log("PROJECTS DATA: ", data);
      });
      return unsubscribeProjects;
    };
    const subscribeProjects = fetchProjects();

    return () => {
      subscribeProjects();
    };
  }, []);

  // Handle next button click
  const handleNextButton = () => {
    if (currentIndex < projectsData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  // Handle previous button click
  const handlePreviousButton = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(projectsData.length - 1);
    }
  };

  return (
    <div className="portfolioMainScreenContainer">
      <div className="portfolioContainer">
        <div className="pageTitleContainer">
          <span className="titleText">MY PORTFOLIO</span>
        </div>
        <div className="projectsContainer">
          <div className="previousContainer" onClick={handlePreviousButton}>
            <ArrowBackIosNewRoundedIcon
              style={{ fontSize: 80 }}
              className="arrowIcons"
            />
          </div>
          {projectsData.length > 0 && (
            <div className="projectDetailsContainer">
              <div className="picAndVidContainer">
                <img
                  src={projectsData[currentIndex].projectImageUrl}
                  alt="projectImage"
                  className="skaninMobPicture"
                />
              </div>
              <div className="projectInfoContainer">
                {!projectsData[currentIndex].projectLogo ? (
                  <div className="projectNameContainer">
                    <span className="projectNameTitle">
                      {projectsData[currentIndex].projectName}
                    </span>
                  </div>
                ) : (
                  <div className="projectNameContainer">
                    <img
                      src={projectsData[currentIndex].projectLogo}
                      alt="projectLogo"
                      className="projectLogo"
                    />
                  </div>
                )}
                <div className="linkContainer">
                  <a
                    href={projectsData[currentIndex].githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "inherit", textDecoration: "none" }}
                    className="logoLink"
                  >
                    <GitHubIcon style={{ cursor: "pointer" }} />
                  </a>
                  {!projectsData[currentIndex].docuLink ? (
                    console.log("No projects data")
                  ) : (
                    <a
                      href={projectsData[currentIndex].docuLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: "inherit",
                        textDecoration: "none",
                        marginLeft: "2%",
                      }}
                      className="logoLink"
                    >
                      <ArticleIcon style={{ cursor: "pointer" }} />
                    </a>
                  )}
                </div>
                <div className="projectDescContainer">
                  <p className="projectText">
                    {projectsData[currentIndex].projectDescription}
                  </p>
                </div>
                {projectsData[currentIndex].techStack.length > 5 ? (
                  <div className="techStackManyContainer">
                    <div className="techStackRow">
                      {projectsData[currentIndex].techStack
                        .slice(0, 5)
                        .map((techStackName, stackIndex) => (
                          <div key={stackIndex} className="techStack">
                            <span className="techStackText">
                              {techStackName}
                            </span>
                          </div>
                        ))}
                    </div>
                    <div className="techStackRow">
                      {projectsData[currentIndex].techStack
                        .slice(5)
                        .map((techStackName, stackIndex) => (
                          <div key={stackIndex} className="techStack">
                            <span className="techStackText">
                              {techStackName}
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>
                ) : (
                  <div className="techStackContainer">
                    {projectsData[currentIndex].techStack.map(
                      (techStackName, stackIndex) => (
                        <div key={stackIndex} className="techStack">
                          <span className="techStackText">{techStackName}</span>
                        </div>
                      )
                    )}
                  </div>
                )}
                <div className="projectRoleContainer">
                  <span className="roleText">Role:</span>
                  {projectsData[currentIndex].projectRole.map(
                    (role, roleIndex) => (
                      <div key={roleIndex} className="roleContainer">
                        <span className="projectText">{role}</span>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          )}
          <div className="nextContainer" onClick={handleNextButton}>
            <ArrowForwardIosRoundedIcon
              style={{ fontSize: 80 }}
              className="arrowIcons"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
