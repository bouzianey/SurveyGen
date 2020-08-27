import React, { useState } from "react";
import ClassPerformance from './ClassPerformance';
import TeamPerformance from "./TeamPerformance";
import StudentPerformance from "./StudentPerformance";
import './styling.css'

const DataVisualization = ({user}) =>{

        const [isClass, setIsClass] = useState(false);
        const [isTeam, setIsTeam] = useState(true);
        const [isStudent, setIsStudent] = useState(false);
        const [isDisplayed, setIsDisplayed] = useState(true);

         const enableClass = e => {
            setIsTeam(false);
            setIsStudent(false);
            setIsClass(true);
            setIsDisplayed(true);
      };
         const enableStudent = e => {
            setIsTeam(false);
            setIsStudent(true);
            setIsClass(false);
            setIsDisplayed(true);
      };
         const enableTeam = e => {
            setIsTeam(true);
            setIsStudent(false);
            setIsClass(false);
            setIsDisplayed(true);
      };

  return (
    <div className="wrapper" id="332" key={332}>

                    {
                              isClass === true ? <ClassPerformance user={user}  OnEnableClass={enableClass} OnEnableTeam={enableTeam} OnEnableStudent={enableStudent}/> : ""
                    }
                    {
                              isTeam === true ? <TeamPerformance user={user}  OnEnableClass={enableClass} OnEnableTeam={enableTeam} OnEnableStudent={enableStudent}/> : ""
                    }
                    {
                              isStudent === true ? <StudentPerformance user={user}  OnEnableClass={enableClass} OnEnableTeam={enableTeam} OnEnableStudent={enableStudent} /> : ""
                    }
    </div>
  );
}

export default DataVisualization;