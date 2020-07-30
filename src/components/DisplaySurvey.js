import React, { useState } from "react";
import TextComponent from './QuestionTextResponse';
import RadioComponent from './QuestionRadioResponse';
import Form from './SurveyFormMod';
import './popup_window.css'
import './SignUp.css'

const DisplayClassSurvey = ({user}) =>{

        const [classIdState, setClassIdState] = useState("");
        const [classList, setClassList] = useState([]);
        const [studentSurveyList, setStudentSurveyList] = useState([]);
        const [studentSurveyQuestion, setStudentSurveyQuestion] = useState([]);
        const [studentSurvey, setStudentSurvey] = useState([]);
        const [survey_id, setSurveyID] = useState("");
        const [isShown, setShown] = useState(false);
        const [isShownButton, setShownButton] = useState(false);
        const [isShownModButton, setShownModButton] = useState(false);
        const [isDisplayed, setIsDisplayed] = useState(true);
        const [displayClassList, setDisplayClassList] = useState(false);


         const displaySurveyList = e => {

            setIsDisplayed(false);

            fetch("http://localhost:5000/get_survey_list", {
                method: "POST",
                headers: {
                "Content-type": "application/json",
              },
                body: JSON.stringify(user.id),
            })
              .then((res) => res.json())
              .then((res) => {
                    setStudentSurveyList(res);
              });
      };

        const displaySurvey = (id) => {

            setShown(false);
            setShownModButton(true);
            setSurveyID(id);
            fetch("http://localhost:5000/get_api", {
                method: "POST",
                headers: {
                "Content-type": "application/json",
              },
                body: JSON.stringify(id),
            })
              .then((res) => res.json())
              .then((res) => {
                    setStudentSurveyQuestion(res.questionList);
                    setStudentSurvey(res);
              });
            setDisplayClassList(true);
            openForm_Instructions();
      };
        const modifySurvey = () => {
            setStudentSurveyQuestion([]);
            setShown(true);
            setShownModButton(false);

            fetch("http://localhost:5000/get_api", {
                method: "POST",
                headers: {
                "Content-type": "application/json",
              },
                body: JSON.stringify(survey_id),
            })
              .then((res) => res.json())
              .then((res) => {
                    setStudentSurvey(res);
              });
            openForm_Instructions();
      };
        const getClassList = e => {

            const objectToSend = {
                id : user.id
            }
            setDisplayClassList(false);
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
                        break
                    }
                }
                else
                {
                    console.log("class : ",res.result);
                }

            });
    }
        const SetSurveyClass = () => {

            const objectToSend1 = {
                classID : classIdState,
                surveyID: survey_id
            }
            fetch("http://localhost:5000/set_survey_to_class", {
                method: "POST",
                headers: {
                "Content-type": "application/json",
              },
                body: JSON.stringify(objectToSend1),
            })
              .then((res) => res.json())
              .then((res) => {
                  console.log(res);
              });
      };
            const openForm_Instructions = () => {
                document.getElementById("instructionForm").style.display = "block";
                setShownButton(true);
            };
            const closeForm_Instructions = () => {
                document.getElementById("instructionForm").style.display = "none";
                setDisplayClassList(false);
                setShownButton(false);
                setShownModButton(false);
            };
            const handleSelectChange = e => {

                setClassIdState(e.target.value);
            };

  return (
    <div className="wrapper" id="1">
        {
                isDisplayed == true ? displaySurveyList() : ""
        }
        {
                displayClassList === true ? getClassList() : ""
        }
        <table border={2} id="1">
            {
                studentSurveyList.map((surveyList, idx) => (
                    <tr>
                        <td><b>{surveyList.surveyID}: </b></td><td><b>Name :</b> {surveyList.name} </td><td><b>Date :</b> {surveyList.date} </td>
                        <td><input type="submit" className="btn-primary" onClick={(id) =>displaySurvey(surveyList.surveyID)}  value="Display Survey" /></td>
                    </tr>

                ))
            }
        </table>
        <br/>
        <div className="form-popup" id="instructionForm">
            {
                studentSurveyQuestion.map((question, i) => (
                    <>
                    {
                        (question.type === "radio") ? <RadioComponent key={question.id} i={i} question={question}/> : <TextComponent key={question.id} question={question}/>
                    }
                    </>

                ))
            }
                    <label htmlFor="ClassType">Assign survey to a class : </label>
                    <select onChange={handleSelectChange} value={classIdState} name="className" id="111">
                        {
                            classList.map((val, idx) => (

                                <option value={val.classID}>{val.className}</option>
                            ))
                         }
                    </select>
              {
                  isShown == true ? <Form surveyModification={studentSurvey} user={user}/> : ""
              }
              <table border={0} id="556">
                  <tr>
                      <td>
            {
                isShownButton == true ? <input type="submit" className="btn-cancel" onClick={closeForm_Instructions} value="Close"/> : ""
            }
                      </td>
                      <td>
            {
                isShownModButton == true ? <input type="submit" className="btn-primary" onClick={(id) =>modifySurvey()}  value="Use Survey Content" /> : ""
            }
                      </td>
                      <td>
            {
                isShownButton == true ? <input type="submit" className="btn-primary" onClick={(id) =>SetSurveyClass()}  value="Assign Survey to Class" /> : ""
            }
                      </td>
                </tr>
            </table>
        </div>

    </div>
  );
}

export default DisplayClassSurvey;