import React, { useState } from "react";
import ClassForm from './ClassMod';
import TeamForm from "./TeamMod";
import StudentForm from "./StudentMod";
import './styling.css'

const ClassManager = ({user}) =>{

        const [isClass, setIsClass] = useState(true);
        const [isTeam, setIsTeam] = useState(false);
        const [isStudent, setIsStudent] = useState(false);
        const [isDisplayed, setIsDisplayed] = useState(true);

         const enableClass = e => {
            setIsTeam(false);
            setIsStudent(false);
            setIsClass(true);
            setIsDisplayed(true);
            openForm_Instructions();

      };
         const enableStudent = e => {
            setIsTeam(false);
            setIsStudent(true);
            setIsClass(false);
            setIsDisplayed(true);
            openForm_Instructions();

      };
         const enableTeam = e => {
            setIsTeam(true);
            setIsStudent(false);
            setIsClass(false);
            setIsDisplayed(true);
            openForm_Instructions();

      };
         const openForm_Instructions = () => {

             document.getElementById("instructionForm").style.display = "block";
             setIsDisplayed(false);

        };
        const closeForm_Instructions = () => {

                document.getElementById("instructionForm").style.display = "none";
        };
         const handleCloseChange = () =>{

             closeForm_Instructions();
         };


  return (
    <div className="wrapper" id="1" key={1087}>
         <table border={0} id="1" key={10}>
             <tbody>
                 <tr>
                    <td><input type="submit" className="btn-primary" onClick={(id) =>enableClass()}  value="class" /></td>
                    <td><input type="submit" className="btn-primary" onClick={(id) =>enableTeam()}  value="Team" /></td>
                    <td><input type="submit" className="btn-primary" onClick={(id) =>enableStudent()}  value="Student" /></td>
                 </tr>
             </tbody>
         </table>
        <div className="class-manager-wrapper" id="instructionForm" key={34252}>
        {
                  isClass === true ? <ClassForm user={user} onChangeClose={handleCloseChange}/> : ""
        }

        {
                  isTeam === true ? <TeamForm user={user} onChangeClose={handleCloseChange}/> : ""
        }

        {
                  isStudent === true ? <StudentForm user={user} onChangeClose={handleCloseChange}/> : ""
        }
        </div>
    </div>
  );
}

export default ClassManager;