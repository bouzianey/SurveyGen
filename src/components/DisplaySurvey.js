import React, { useState } from "react";
import TextComponent from './QuestionTextResponse';
import RadioComponent from './QuestionRadioResponse';
import Form from './SurveyFormMod';
import './popup_window.css'
import './SignUp.css'

const DisplayClassSurvey = ({user}) =>{

        const [studentSurveyList, setStudentSurveyList] = useState([]);
        const [studentSurveyQuestion, setStudentSurveyQuestion] = useState([]);
        const [studentSurvey, setStudentSurvey] = useState([]);
        const [survey_id, setSurveyID] = useState("");
        const [isShown, setShown] = useState(false);
        const [isShownButton, setShownButton] = useState(false);
        const [isShownModButton, setShownModButton] = useState(false);
        const [isDisplayed, setIsDisplayed] = useState(true);

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
            const openForm_Instructions = () => {
                document.getElementById("instructionForm").style.display = "block";
                setShownButton(true);
            };
            const closeForm_Instructions = () => {
                document.getElementById("instructionForm").style.display = "none";
                setShownButton(false);
                setShownModButton(false);
            };

  return (
    <div className="wrapper" id="1">
        {
                isDisplayed == true ? displaySurveyList() : ""
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
              {
                  isShown == true ? <Form surveyModification={studentSurvey} user={user}/> : ""
              }
            {
                isShownButton == true ? <input type="submit" className="btn-cancel" onClick={closeForm_Instructions} value="Close"/> : ""
            }
            {
                isShownModButton == true ? <input type="submit" className="btn-primary" onClick={(id) =>modifySurvey()}  value="Use Survey Content" /> : ""
            }
        </div>

    </div>
  );
}

export default DisplayClassSurvey;