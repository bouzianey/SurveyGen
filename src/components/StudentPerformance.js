import React, {useEffect, useState} from "react";
import './styling.css'
import StudentPerformanceGrid from "./StudentPerformanceGrid";
import {MDBDataTable} from "mdbreact";

const StudentPerformance = ({user,OnEnableClass,OnEnableTeam,OnEnableStudent}) =>{

    const [surveyIdState, setSurveyIdState] = useState("");
    const [classIdState, setClassIdState] = useState("");
    const [teamIdState, setTeamIdState] = useState("");
    const [studentIdState, setStudentIdState] = useState("");
    const [studentList, setStudentList] = useState([]);
    const [classSurveyList, setClassSurveyList] = useState([]);
    const [classList, setClassList] = useState([]);
    const [teamList, setTeamList] = useState([]);

    const data = {
                              columns: [
                                {
                                  label: 'Name',
                                  field: 'Name',
                                  sort: 'asc',
                                  width: 270
                                },
                                  {
                                  label: 'Button',
                                  field: 'Button',
                                  sort: 'asc',
                                  width: 250
                                }
                              ]
            }
    const getTeamList = (idx) => {

        const objectToSend2 = {
                id : idx
            }
        fetch("https://survey-manager-yb-scsu.herokuapp.com/get_team_list", {
            method: "POST",
            //mode: "no-cors",
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
                        getStudentList(it.teamID);
                        break
                    }
                }
                else
                {
                    console.log("class  :",res.result);
                }

            });
    }
    const getClassSurveyList = (classID) => {

            const objectToSend3 = {
                class_id : classID,
                user_id : user.id
            }
            fetch("https://survey-manager-yb-scsu.herokuapp.com/get_class_survey_list", {
                method: "POST",
                //mode: "no-cors",
                headers: {
                "Content-type": "application/json",
              },
                body: JSON.stringify(objectToSend3),
            })
              .then((res) => res.json())
              .then((res) => {

                    if (res.result === "success"){

                        setClassSurveyList(res.surveyList);
                        for(let it of res.surveyList){
                            setSurveyIdState(it.surveyID);
                            break
                        }
                    }
                    else
                    {
                        console.log("Survey  :",res.result);
                    }
              });
      };
    const getStudentList = (teamID) => {

            const objectToSend4 = {
                team_id : teamID,
                user_id : user.id
            }
            fetch("https://survey-manager-yb-scsu.herokuapp.com/get_team_student_list", {
                method: "POST",
                //mode: "no-cors",
                headers: {
                "Content-type": "application/json",
              },
                body: JSON.stringify(objectToSend4),
            })
              .then((res) => res.json())
              .then((res) => {

                    if (res.result === "success"){

                        setStudentList(res.studentList);
                        for(let it of res.studentList){
                            setStudentIdState(it.studentID);
                            break
                        }
                    }
                    else
                    {
                        console.log("Survey  :",res.result);
                    }
              });
    };
    const handleSelectSurveyChange = (e) => {

        setSurveyIdState(e.target.value);
    };
    const handleSelectClassChange = e => {

        setClassIdState(e.target.value);
        getTeamList(e.target.value);
        getClassSurveyList(e.target.value);

    };
    const handleSelectTeamChange = e => {

        setTeamIdState(e.target.value);
        getStudentList(e.target.value);
    };

    const handleEnableStudentChange = e =>{
            OnEnableStudent();
        };
    const handleEnableTeamChange = e =>{
            OnEnableTeam();
        };
    const handleEnableClassChange = e =>{
            OnEnableClass();
        };

    useEffect(() => {

        const getClassList = () => {

            const objectToSend = {
                id : user.id
            }
        fetch("https://survey-manager-yb-scsu.herokuapp.com/get_class_list", {
            method: "POST",
            //mode: "no-cors",
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
                        getClassSurveyList(it.classID);
                        break;
                    }
                }
                else
                {
                    console.log("class  :",res.result);
                }

            });
    }
    getClassList();
  }, []);
  return (
    <div className="wrapper" id={777} key={777}>
        <div className="performance-form-wrapper" id="survey_manager" key={888}>
                <input  type="button" className="btn-outline-info" onClick={(id) =>handleEnableTeamChange()}  value="Team" />
                <input  type="button" className="btn-outline-success" onClick={(id) =>handleEnableStudentChange()}  value="Student" />
                <div align="center" className="className" key="className">
                    <h5>Choose a Class : </h5>
                    <select onChange={handleSelectClassChange} value={classIdState} name="className" id="111" key={111}>
                                {
                                    classList.map((val, idx) => (

                                        <option key={idx.toString()} value={val.classID}>{val.className}</option>
                                    ))
                                 }
                    </select>
                </div>
                <div align="center" className="teamName" key="teamName">
                    <h5>Choose a Team : </h5>
                    <select onChange={handleSelectTeamChange} value={teamIdState} name="teamName" id="222" key={222}>
                                {
                                    teamList.map((val, idx) => (

                                        <option key={idx.toString()} value={val.teamID}>{val.teamName}</option>
                                    ))
                                 }
                    </select>
                </div>

          <>
            {
                studentList.length > 0 ?
              <StudentPerformanceGrid
                  user={user}
                  surveyID={surveyIdState}
                  classSurveyList={classSurveyList}
                  studentList={studentList}
              />
              :
              <MDBDataTable
                  striped
                  bordered
                  small
                  data={data}
              />
            }
          </>

        </div>
    </div>
  );
}

export default StudentPerformance;