import React, {useEffect, useState} from "react";
import './styling.css'
import {MDBDataTable} from "mdbreact";
import StudentSurveyChart from "./StudentSurveyChart";


const StudentPerformanceGrid = ({user,surveyID, classSurveyList, studentList}) =>{

    const [dataObj, setDataObj] = useState({});
    const [isDisplayed, setIsDisplayed] = useState(true);
    const [isDisplayedTable, setIsDisplayedTable] = useState(false);
    const [isStudent, setIsStudent] = useState(false);
    const [surveyIdState, setSurveyIdState] = useState(surveyID);
    const [feedbackErrorState, setFeedbackErrorState] = useState("");
    const [studentIdState, setStudentIdState] = useState("");
    const [textAreaState, setTextAreaState] = useState("");

    const handleSelectSurveyChange = (e) => {

        setSurveyIdState(e.target.value);
    };
    const handleTextAreaChange = (e) => {

        setTextAreaState(e.target.value);
    };
    const DisplayPerformance = () => {
            openForm_Instructions();
            setIsStudent(true);
    };
    const handleSubmitChange = (val) =>{
        setStudentIdState(val);
        DisplayPerformance();
    }
     const handleSurveyCloseChange = e =>{
            setIsStudent(false);
            closeForm_Instructions();
        };
    const openForm_Instructions = () => {

             document.getElementById("StudentTable").style.display = "none";
             document.getElementById("survey_result").style.display = "block";

        };
    const closeForm_Instructions = () => {

            document.getElementById("StudentTable").style.display = "block";
            document.getElementById("survey_result").style.display = "none";
        };
    const displaySurvey =(val) =>{

        handleSubmitChange(val);
    }
    const leaveFeedback = (val) =>{

        setStudentIdState(val);
        document.getElementById("StudentTable").style.display = "none";
        document.getElementById("feed_back").style.display = "block";
        setFeedbackErrorState("");
        setTextAreaState("");
    }
    const send_feedback = () =>{

        const objectToSend33 = {
                studentID : studentIdState,
                surveyID : surveyIdState,
                feedback_comment : textAreaState
            }
        fetch("http://localhost:5000/post_instructor_feedback", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(objectToSend33),
        })
            .then((res) => res.json())
            .then((res) => {
                    if(res === "failed")
                    {
                        setFeedbackErrorState("failed");
                    }
                    else{
                        setFeedbackErrorState("success");
                    }
            })
    }
    const close_feedback = () =>{

        document.getElementById("StudentTable").style.display = "block";
        document.getElementById("feed_back").style.display = "none";
    }
    const getStudentDict = () => {

            console.log("student List Entry : ",studentList);
            const data = {
                              columns: [
                                {
                                  label: 'Name',
                                  field: 'Name',
                                  sort: 'asc',
                                  width: 270
                                },
                                  {
                                  label: 'Display Performance',
                                  field: 'Display_Performance',
                                  sort: 'asc',
                                  width: 250
                                },
                                  {
                                  label: 'Leave Feedback',
                                  field: 'Leave_Feedback',
                                  sort: 'asc',
                                  width: 250
                                }
                              ]
            }
                 const rowList = [];
                 let counter = 1
                for (const std_obj of studentList) {
                  const rowObj = {
                    Name: std_obj.studentName,
                    Display_Performance: <input type="submit" className="btn-primary" onClick={(id) =>displaySurvey(std_obj.studentID)} value="Display Performance" />,
                    Leave_Feedback: <input type="submit" className="btn-primary" onClick={(id) =>leaveFeedback(std_obj.studentID)} value="Leave Feedback" />
                  }
                  rowList.push(rowObj);
                  counter=counter+1
                }
                    data.rows = rowList;
                    setDataObj(data);
                    setIsDisplayed(false);
    };

  return (
      <div id="test" key={999}>
      <div id="StudentTable" key={101}>
          {
               isDisplayed === true ? getStudentDict() : ""
          }
          <div align="center" className="surveyName" key="surveyName">
                <h5>Choose a Survey : </h5>
                <select onChange={handleSelectSurveyChange} value={surveyIdState} name={surveyIdState} id="333" key={333}>
                            {
                                classSurveyList.map((val, idx) => (

                                    <option key={idx.toString()} value={val.surveyID}>{val.surveyName}</option>
                                ))
                             }
                </select>
          </div>
          <>
            {
              <MDBDataTable
                  striped
                  bordered
                  small
                  data={dataObj}
              />
            }
          </>

      </div>
          <div className="form-popup" id="survey_result" key={102}>
         {
             isStudent === true ? <StudentSurveyChart survey_ID={surveyIdState} studentID={studentIdState} onCloseChange={handleSurveyCloseChange}/> : ""
         }
         </div>
          <div className="form-popup" id="feed_back" key={103}>
              <h5>Leave a feedback</h5>
              <textarea wrap="off" cols="65" rows="6" value={textAreaState} onChange={handleTextAreaChange}>
              </textarea>
              <div align="center" className="all-buttons" key="all-buttons">
                  <input type="submit" className="btn-primary" onClick={(id) =>send_feedback()}  value="Send Feedback" />
                 <input type="submit" className="btn-danger" onClick={(id) =>close_feedback()}  value="Close" />
              </div>
              <div align="center" className="alter-boxes" key="alert-boxes">
                {feedbackErrorState === "failed" && (
                        <span className="errorMessage">Feedback was already provided</span>
                )}
                {feedbackErrorState === "success" && (
                        <span className="badge-success">Feedback has been successfully sumbitted</span>
                )}
              </div>
          </div>
      </div>
  );
}

export default StudentPerformanceGrid;