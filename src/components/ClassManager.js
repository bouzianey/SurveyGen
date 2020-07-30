import React, { useState } from "react";
import ClassForm from './ClassMod';
import TeamForm from "./TeamMod";
import StudentForm from "./StudentMod";
import './popup_window.css'
import './SignUp.css'

const ClassManager = ({user}) =>{

        const [isClass, setIsClass] = useState(false);
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
    <div className="wrapper" id="1">
         <table border={0} id="1">
             <tr>
                <td><input type="submit" className="btn-primary" onClick={(id) =>enableClass()}  value="class" /></td>
                <td><input type="submit" className="btn-primary" onClick={(id) =>enableTeam()}  value="Team" /></td>
                <td><input type="submit" className="btn-primary" onClick={(id) =>enableStudent()}  value="Student" /></td>
            </tr>
         </table>
        <div className="form-wrapper" id="instructionForm">
        {
                  isClass == true ? <ClassForm user={user} onChangeClose={handleCloseChange}/> : ""
        }

        {
                  isTeam == true ? <TeamForm user={user} onChangeClose={handleCloseChange}/> : ""
        }

        {
                  isStudent == true ? <StudentForm user={user} onChangeClose={handleCloseChange}/> : ""
        }
        </div>
    </div>
  );
}

export default ClassManager;