import React, { useState, useEffect } from "react";
import "../ExperienceScreen/ExperienceScreen.css";

// Firestore
import { collection, onSnapshot } from "firebase/firestore";
import { firestore } from "../../firebase/firebase";

import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";

export default function ExperienceScreen() {
  const [educationData, setEducationData] = useState([]);
  const [workExperienceData, setWorkExpData] = useState([]);

  useEffect(() => {
    const fetchEducation = () => {
      const educRef = collection(firestore, "EDUCATION_BG");
      const unsubscribeEducation = onSnapshot(educRef, (snapshot) => {
        const educData = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        const sortEducation = educData.sort((a, b) => {
            const yearA = new Date(a.yearGraduated);
            const yearB = new Date(b.yearGraduated); 

            console.log("YEar A: ", yearA);
            console.log("Year B: ", yearB);

            return yearB - yearA; 
        })
        setEducationData(sortEducation);
        console.log("EDUCATION BG DATA: ", educData);
      });
      return unsubscribeEducation;
    };
    const subscribeEducation = fetchEducation();

    const fetchWorkExp = () => {
      const workExpRef = collection(firestore, "WORK_EXPERIENCE");
      const unsubscribeWorkExp = onSnapshot(workExpRef, (snapshot) => {
        const workExpData = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        const sortedWorkExp = workExpData.sort((a, b) => {
          const [endMonthA, endYearA] = a.monthEnded.split(" ");
          const [endMonthB, endYearB] = b.monthEnded.split(" ");
          const [startMonthA, startYearA] = a.monthStarted.split(" ");
          const [startMonthB, startYearB] = b.monthStarted.split(" ");

          const dateEndedA = new Date(
            `${endYearA}-${new Date(`${endMonthA} 1`).getMonth() + 1}`
          );
          const dateEndedB = new Date(
            `${endYearB}-${new Date(`${endMonthB} 1`).getMonth() + 1}`
          );
          console.log("Date A: ", dateEndedA);
          console.log("Date B: ", dateEndedB);

          if (dateEndedB === dateEndedA) {
            const dateStartedA = new Date(
              `${startMonthA}-${new Date(`${startYearA} 1`).getMonth() + 1}`
            );
            const dateStartedB = new Date(
              `${startMonthB}-${new Date(`${startYearB} 1`).getMonth() + 1}`
            );

            console.log("Date Started A: ", dateStartedA);
            console.log("Date Started B: ", dateEndedB);

            return dateStartedB - dateStartedA;
          } else {
            return dateEndedB - dateEndedA;
          }
        });
        setWorkExpData(sortedWorkExp);
        console.log("WORK EXPERIENCE: ", workExpData);
      });
      return unsubscribeWorkExp;
    };
    const subscribeWorkExp = fetchWorkExp();

    return () => {
      subscribeEducation();
      subscribeWorkExp();
    };
  }, []);

  return (
    <div className="experienceMainContainer">
      <div className="experienceContainer">
        <div className="titleContainer">
          <span className="titleText">MY JOURNEY</span>
        </div>
        <div className="educAndWorkExpContainer">
          {/* Education Section */}
          <div className="educationContainer">
            <div className="educationDetailsContainer">
              <div className="educTitleContainer">
                <span className="expTitleText">Education</span>
              </div>
              <div className="infoContainer">
                {educationData.map((educ, educIndex) => (
                  <div key={educIndex} className="timelineContainer">
                    <div className="timeDrawContainer">
                      <div className="timelineCircle"></div>
                      <div className="timelineLine"></div>
                    </div>
                    <div className="timelineDetailedInfoContainer">
                      <div className="timelineDetails">
                        <div className="timeline">
                          <div className="dateContainer">
                            <div className="calendarContainer">
                              <CalendarMonthRoundedIcon className="calendarIcon" />
                            </div>
                            <div className="dateTextContainer">
                              <span className="dateText">
                                {educ.yearStarted} - {educ.yearGraduated}
                              </span>
                            </div>
                          </div>
                          <div className="positionContainer">
                            <div className="position">
                              <span className="positionText">
                                {educ.programTaken}
                              </span>
                            </div>
                            <div className="workplaceContainer">
                              <span className="workplaceText">
                                {educ.schoolName} - {educ.schoolAddress}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Work Experience Section */}
          <div className="workExpContainer">
            <div className="workExpDetailsContainer">
              <div className="workExpTitleContainer">
                <span className="expTitleText">Experience</span>
              </div>
              <div className="infoContainer">
                {workExperienceData.map((workExp, workExpIndex) => (
                  <div key={workExpIndex} className="timelineContainer">
                    <div className="timeDrawContainer">
                      <div className="timelineCircle"></div>
                      <div className="timelineLine"></div>
                    </div>
                    <div className="timelineDetailedInfoContainer">
                      <div className="timelineDetails">
                        <div className="timeline">
                          <div className="dateContainer">
                            <div className="calendarContainer">
                              <CalendarMonthRoundedIcon className="calendarIcon" />
                            </div>
                            <div className="dateTextContainer">
                              <span className="dateText">
                                {workExp.monthStarted} - {workExp.monthEnded}
                              </span>
                            </div>
                          </div>
                          <div className="positionContainer">
                            <div className="position">
                              <span className="positionText">
                                {workExp.workPosition}
                              </span>
                            </div>
                            <div className="workplaceContainer">
                              <span className="workplaceText">
                                {workExp.companyName}
                              </span>
                            </div>
                            <div className="workDescriptionContainer">
                              <span className="workDescText">
                                {workExp.workDescription}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
