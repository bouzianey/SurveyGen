import React, { useState } from "react";
import './styling.css'

const TeamForm = ({user,onChangeClose}) =>{

    const [studentNameState, setStudentNameState] = useState("");
    const [studentEmailState, setStudentEmailState] = useState("");
    const [classIdState, setClassIdState] = useState("");
    const [teamIdState, setTeamIdState] = useState("");
    const [classList, setClassList] = useState([]);
    const [teamList, setTeamList] = useState([]);
    const [displayClassList, setdisplayClassList] = useState(true);
    const [StudentNameErrorsState, setStudentNameErrorsState] = useState("");
    const [StudentEmailErrorsState, setStudentEmailErrorsState] = useState("");
    const [result, setResult] = useState("");

    const emailRegex = RegExp(
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      );
    const formValid = () => {

          let valid = true;

            // validate form errors being empty
            StudentNameErrorsState.length > 0 && (valid = false);
            StudentEmailErrorsState.length > 0 && (valid = false);
            // validate the form was filled out
            if(studentEmailState === "" || studentNameState === ""){

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
    const addStudent = () => {

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
                    if(res === "failed")
                    {
                        setResult("Student already exists");
                    }
                    else
                    {
                        setResult("Student account was successfully created!");
                    }
              });
            }else {
                if(StudentNameErrorsState.length === 0)
                {
                    if(studentNameState === ""){
                        setStudentNameErrorsState("Minimum 3 characters required");
                    }

                }
                if(StudentEmailErrorsState.length === 0)
                {
                    if(studentEmailState === ""){
                        setStudentEmailErrorsState("Field is required");
                    }
                }
        }
      };

    const handleStudentNameChange = e => {

            setStudentNameState(e.target.value);

            if(e.target.value.length < 3){
                setStudentNameErrorsState("Minimum 3 characters required");
            }else
            {
                setStudentNameErrorsState("");
            }
    };
    const handleStudentEmailChange = e => {

            setStudentEmailState(e.target.value);

            if(emailRegex.test(e.target.value)){

                setStudentEmailErrorsState("");
            }else
            {
                setStudentEmailErrorsState("Invalid email address");
            }
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
    <div key={125}>
                {
                    displayClassList === true ? getClassList() : ""
                }
                <div align="center" className="studentName" key={1254}>
                    <h5>Type Student name :</h5>
                    <input
                        type="text"
                        className={StudentNameErrorsState.length > 0 ? "error" : ""}
                        name="StudentName"
                        placeholder="Student Name"
                        onChange={handleStudentNameChange}
                    />
                    {StudentNameErrorsState.length > 0 && (
                        <span className="errorMessage">{StudentNameErrorsState}</span>
                    )}
                </div>
                <br/>
                <div align="center" className="studentEmail" key={1255}>
                    <h5>Type Student email :</h5>
                    <input
                        type="text"
                        className={StudentEmailErrorsState.length > 0 ? "error" : ""}
                        name="studentEmail"
                        placeholder="Student Email"
                        onChange={handleStudentEmailChange}
                    />
                    {StudentEmailErrorsState.length > 0 && (
                        <span className="errorMessage">{StudentEmailErrorsState}</span>
                    )}
                </div>
                <br/>
                <div align="center" className="className" key={1256}>
                    <h5>Choose a Class : </h5>
                    <select onChange={handleSelectClassChange} value={classIdState} name="className" id="111">
                        {
                            classList.map((val, idx) => (

                                <option key={idx} value={val.classID}>{val.className}</option>
                            ))
                         }
                    </select>
                </div>
                <br/>
                <div align="center" className="teamName" key={1257}>
                    <h5>Choose a Team : </h5>
                    <select onChange={handleSelectTeamChange} value={teamIdState} name="teamName" id="222">
                        {
                            teamList.map((val, idx) => (

                                <option key={idx} value={val.teamID}>{val.teamName}</option>
                            ))
                         }
                    </select>
                </div>
                <br/>
                <br/>
                <div align="center" className="add-team" key={1259}>
                    <table border={0} id="22">
                        <tbody>
                            <tr>
                                <td> <input type="submit" className="btn-primary" onClick={(id) =>addStudent()} value="Create Student Account" /></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            <br/>
            <div align="center" className="error-msg" key={1258}>
                {result.length > 0 && (
                        <span className="errorMessage">{result}</span>
                )}
            </div>
    </div>
  );
}

export default TeamForm;