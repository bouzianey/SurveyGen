import React, { useState } from "react";
import './popup_window.css'
import './SignUp.css'

const TeamForm = ({user,onChangeClose}) =>{

    const [studentNameState, setStudentNameState] = useState(null);
    const [studentEmailState, setStudentEmailState] = useState(null);
    const [classIdState, setClassIdState] = useState("");
    const [teamIdState, setTeamIdState] = useState("");
    const [classList, setClassList] = useState([]);
    const [teamList, setTeamList] = useState([]);
    const [displayClassList, setdisplayClassList] = useState(true);
    const [formErrorsState, setformErrorsState] = useState({studentName:"", studentEmail:""});

    const emailRegex = RegExp(
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      );
    const formValid = () => {

          let valid = true;

            // validate form errors being empty
            Object.values(formErrorsState).forEach(val => {

              val.length > 0 && (valid = false);
            });
            // validate the form was filled out
            if(studentEmailState === null || studentNameState === null){

                valid = false;
            }
            console.log("valid state : ",valid)
        return valid;
    };
    const getClassList = e => {

            const objectToSend = {
                id : user.id
            }
        fetch("http://localhost:5000/get_class_list", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(objectToSend),
        })
            .then((res) => res.json())
            .then((res) => {

                if (res.result === "success"){

                    setClassList(res.classList);
                    for(let it of res.classList){
                        setClassIdState(it.classID);
                        getTeamList(it.classID);
                        break
                    }
                }
                else
                {
                    console.log("class  :",res.result);
                }

            });

            setdisplayClassList(false);
    }
    const getTeamList = (idx) => {

            const objectToSend2 = {
                id : idx
            }
        fetch("http://localhost:5000/get_team_list", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(objectToSend2),
        })
            .then((res) => res.json())
            .then((res) => {

                if (res.result === "success"){

                    setTeamList(res.teamList);
                    for(let it of res.teamList){
                        setTeamIdState(it.teamID);
                        break
                    }
                }
                else
                {
                    console.log("class  :",res.result);
                }

            });
    }
    const addStudent = e => {

        e.preventDefault();

        if(formValid() === true){

            const objectToSend3 = {
                team_id : teamIdState,
                studentName: studentNameState,
                studentEmail: studentEmailState
            }
            fetch("http://localhost:5000/add_student_post", {
                method: "POST",
                headers: {
                "Content-type": "application/json",
              },
                body: JSON.stringify(objectToSend3),
            })
              .then((res) => res.json())
              .then((res) => {
                    console.log(res);
              });
            }else {
                console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
        }
      };

    const handleStudentNameChange = e => {

            setStudentNameState(e.target.value);
            formErrorsState.studentName = e.target.value.length < 3 ? "minimum 3 characaters required" : "";
    };
    const handleStudentEmailChange = e => {

            setStudentEmailState(e.target.value);
            formErrorsState.studentEmail = emailRegex.test(e.target.value) ? "" : "invalid email address";
    };
    const handleSelectClassChange = e => {

        setClassIdState(e.target.value);
        getTeamList(e.target.value);

    };
    const handleSelectTeamChange = e => {

        setTeamIdState(e.target.value);
    };
    const handleCloseChange = e =>{
            onChangeClose();
        };
  return (
    <form onSubmit={addStudent}>
                {
                    displayClassList === true ? getClassList() : ""
                }
                <div className="studentName">
                    <label htmlFor="studentName">Type Student name :</label>
                    <input
                        type="text"
                        className={formErrorsState.studentName.length > 0 ? "error" : null}
                        name="StudentName"
                        placeholder="Student Name"
                        noValidate
                        onChange={handleStudentNameChange}
                    />
                    {formErrorsState.studentName.length > 0 && (
                        <span className="errorMessage">{formErrorsState.studentName}</span>
                    )}
                </div>
                <div className="studentEmail">
                    <label htmlFor="studentEmail">Type Student email :</label>
                    <input
                        type="text"
                        className={formErrorsState.studentEmail.length > 0 ? "error" : null}
                        name="studentEmail"
                        placeholder="Student Email"
                        noValidate
                        onChange={handleStudentEmailChange}
                    />
                    {formErrorsState.studentEmail.length > 0 && (
                        <span className="errorMessage">{formErrorsState.studentEmail}</span>
                    )}
                </div>
                <label htmlFor="ClassType">Choose a Class : </label>
                    <select onChange={handleSelectClassChange} value={classIdState} name="className" id="111">
                        {
                            classList.map((val, idx) => (

                                <option value={val.classID}>{val.className}</option>
                            ))
                         }
                    </select>
                <br/>
                <label htmlFor="ClassType">Choose a Team : </label>
                    <select onChange={handleSelectTeamChange} value={teamIdState} name="teamName" id="222">
                        {
                            teamList.map((val, idx) => (

                                <option value={val.teamID}>{val.teamName}</option>
                            ))
                         }
                    </select>
                <table border={0} id="22">
             <tr>
               <td> <input type="submit" className="btn-cancel" onClick={handleCloseChange} value="Close"/></td>
               <td> <input type="submit" className="btn-primary" value="Add" /></td>
             </tr>
                </table>
    </form>
  );
}

export default TeamForm;