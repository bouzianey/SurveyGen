import React, { useState } from "react";
import TextComponent from './QuestionTextResponse';
import RadioComponent from './QuestionRadioResponse';
import Form from './SurveyFormMod';
import './popup_window.css'

function DisplayClassSurvey() {

        const [studentSurveyList, setStudentSurveyList] = useState([]);
        const [studentSurveyQuestion, setStudentSurveyQuestion] = useState([]);
        const [studentSurvey, setStudentSurvey] = useState([]);
        const [survey_id, setSurveyID] = useState("");
        const [isShown, setShown] = useState(false);

        const displaySurveyList = e => {
                e.preventDefault();

            fetch("http://localhost:5000/get_survey_list", {
                headers: {
                "Content-type": "application/json",
              },
            })
              .then((res) => res.json())
              .then((res) => {
                    setStudentSurveyList(res);
              });
      };

        const displaySurvey = (id) => {

            setShown(false);

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
        const modifySurvey = (id) => {
            setStudentSurveyQuestion([]);
            setSurveyID(id);
            setShown(true);

            fetch("http://localhost:5000/get_api", {
                method: "POST",
                headers: {
                "Content-type": "application/json",
              },
                body: JSON.stringify(id),
            })
              .then((res) => res.json())
              .then((res) => {
                    setStudentSurvey(res);
              });
            openForm_Instructions();
      };
            const openForm_Instructions = () => {
                document.getElementById("instructionForm").style.display = "block";
            };
            const closeForm_Instructions = () => {
                document.getElementById("instructionForm").style.display = "none";
            };
  return (
    <div className="App">
        <input type="submit" onClick={displaySurveyList} value="Display All Survey List" />
        <table border={2}>
            {
                studentSurveyList.map((surveyList, idx) => (
                    <tr>
                        <td><b>{surveyList.surveyID}: </b></td><td><b>Name :</b> {surveyList.name} </td><td><b>Date :</b> {surveyList.date} </td>
                        <td><input type="submit" onClick={(id) =>displaySurvey(surveyList.surveyID)}  value="Display Survey" /></td>
                        <td><input type="submit" onClick={(id) =>modifySurvey(surveyList.surveyID)}  value="Use Survey Content" /></td>
                    </tr>

                ))
            }
        </table>
        <br/>
        <div class="form-popup" id="instructionForm">
            {
                studentSurveyQuestion.map((question, i) => (
                    <>
                    {
                        (question.type === "radio") ? <RadioComponent key={question.id} i={i} question={question}/> : <TextComponent key={question.id} question={question}/>
                    }
                    </>

                ))

            }
              { isShown && <Form surveyModification={studentSurvey}/> }
            <button type="button" className="btn-cancel" onClick={closeForm_Instructions}>Close</button>
        </div>

    </div>
  );
}

export default DisplayClassSurvey;