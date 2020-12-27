import React, { useState } from "react";
import './styling.css';
import TeamPerformanceChart from "./TeamPerformanceChart";
import TeamPerformanceCont from "./TeamPerformanceCont";
import {MDBDataTable} from "mdbreact";

const TeamPerformance = ({user,OnEnableClass,OnEnableTeam,OnEnableStudent}) =>{

    const [surveyIdState, setSurveyIdState] = useState("");
    const [classIdState, setClassIdState] = useState("");
    const [teamIdState, setTeamIdState] = useState("");
    const [studentContList, setStudentContList] = useState([]);
    const [classList, setClassList] = useState([]);
    const [teamList, setTeamList] = useState([]);
    const [displayClassList,setdisplayClassList] = useState(true);
    const [chartData, setChartData] = useState({});

    const getClassList = e => {

            const objectToSend = {
                id : user.id
            }
        fetch("https://survey-manager-yb-scsu.herokuapp.com/get_class_list", {
            method: "POST",
            mode: "no-cors",
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
        fetch("https://survey-manager-yb-scsu.herokuapp.com/get_team_list", {
            method: "POST",
            mode: "no-cors",
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
                        getStudentContribution(it.teamID);
                        break
                    }
                }
                else
                {
                    console.log("class  :",res.result);
                }

            });
    }
    const getStudentContribution = (idx) => {

            const objectToSend3 = {
                teamID : idx
            }
        fetch("https://survey-manager-yb-scsu.herokuapp.com/get_student_contribution", {
            method: "POST",
            mode: "no-cors",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(objectToSend3),
        })
            .then((res) => res.json())
            .then((res) => {

                if (res.result === "success"){

                    const dataList = [];
                    const labelList = [];
                    setStudentContList(res.studentContributionList);

                    for (const studentObj of res.studentContributionList) {
                        dataList.push(studentObj.score);
                        labelList.push(studentObj.studentName);
                    };

                    const data = {
                        labels: labelList,
                        datasets: [{
                            data: dataList,
                            backgroundColor: [
                                  "rgba(0, 208, 0, 1)",
                                  "rgba(0, 0, 255, 1)",
                                  "rgba(255, 0, 0, 1)",
                                  "rgba(255, 255, 0, 1)",
                                  "rgba(255, 99, 132, 0.6)",
                                  "rgba(54, 162, 235, 0.6)",
                            ],
                            hoverBackgroundColor: [
                                  "rgba(0, 208, 0, 1)",
                                  "rgba(0, 0, 255, 1)",
                                  "rgba(255, 0, 0, 1)",
                                  "rgba(255, 255, 0, 1)",
                                  "rgba(255, 99, 132, 0.6)",
                                  "rgba(54, 162, 235, 0.6)",
                            ]
                        }]
                    };
                    setChartData(chartData =>  data);
                }
                else
                {
                    console.log("class  :",res.result);
                }
            });
    }
    const handleSelectClassChange = e => {

        setClassIdState(e.target.value);
        getTeamList(e.target.value);
    };
    const handleSelectTeamChange = e => {

        setTeamIdState(e.target.value);
        getStudentContribution(e.target.value);
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
  return (
    <div className="wrapper" id={777} key={777}>
        <div className="performance-form-wrapper" id="survey_manager" key={888}>
                <input  type="button" className="btn-outline-info" onClick={(id) =>handleEnableTeamChange()}  value="Team" />
                <input  type="button" className="btn-outline-success" onClick={(id) =>handleEnableStudentChange()}  value="Student" />
                <div align="center" className="className" key="className">
                    {
                        displayClassList === true ? getClassList() : ""
                    }
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
            {
                <TeamPerformanceChart user={user} dataobj={chartData} />
            }
            <div align="center" className="missed-survey" key="missed-survey">
                    <h5 key="Missing_Response" className="h5-color">List of Missing Survey's Response</h5>
                    {
                        studentContList.map((val, idx) => (
                            val.missed_survey.length > 0 ? <TeamPerformanceCont key={idx} user={user} dataobj={val}/> : ""
                        ))
                    }

            </div>
        </div>
    </div>
  );
}

export default TeamPerformance;