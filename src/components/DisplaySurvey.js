import React, { useState, useEffect } from "react";
import TextComponent from './QuestionTextResponse';
import RadioComponent from './QuestionRadioResponse';
import { MDBDataTable } from 'mdbreact';
import Form from './SurveyFormMod';
import './styling.css'

const DisplayClassSurvey = ({user}) =>{

        const [resultState, setResultState] = useState("");
        const [classIdState, setClassIdState] = useState("");
        const [classList, setClassList] = useState([]);
        const [studentSurveyList, setStudentSurveyList] = useState([]);
        const [studentSurveyQuestion, setStudentSurveyQuestion] = useState([]);
        const [studentSurvey, setStudentSurvey] = useState([]);
        const [survey_id, setSurveyID] = useState("");
        const [isShown, setShown] = useState(false);
        const [isShownButton, setShownButton] = useState(false);
        const [isShownModButton, setShownModButton] = useState(false);
        const [displayClassList, setDisplayClassList] = useState(false);
        const [dataObj, setDataObj] = useState({});


        useEffect(() => {

            const displaySurveyList = e => {

            fetch("https://survey-manager-yb-scsu.herokuapp.com/get_survey_list", {
                method: "POST",
                //mode: "no-cors",
                headers: {
                "Content-type": "application/json",
              },
                body: JSON.stringify(1),
            })
              .then((res) => res.json())
              .then((res) => {
                    setStudentSurveyList(res);

                    const data = {
                              columns: [
                                {
                                  label: 'ID',
                                  field: 'ID',
                                  sort: 'asc',
                                  width: 150
                                },
                                {
                                  label: 'Name',
                                  field: 'Name',
                                  sort: 'asc',
                                  width: 270
                                },
                                {
                                  label: 'Date',
                                  field: 'Date',
                                  sort: 'asc',
                                  width: 200
                                },
                                {
                                  label: 'Button',
                                  field: 'Button',
                                  sort: 'asc',
                                  width: 100
                                }
                              ]
                    }
                 const rowList = [];
                    console.log(res)
                for (const surveyList of res) {

                  const rowObj = {
                    ID: surveyList.surveyID,
                    Name: surveyList.name,
                    Date: surveyList.date,
                    Button: <input type="submit" className="btn-primary" onClick={(id) =>displaySurvey(surveyList.surveyID)}  value="Display Survey" />

                  }
                  rowList.push(rowObj);
                }
                data.rows = rowList;
                setDataObj(data);
              });
      };
    displaySurveyList();
  }, []);

        const displaySurvey = (id) => {

            setShown(false);
            setShownModButton(true);
            setSurveyID(id);
            fetch("https://survey-manager-yb-scsu.herokuapp.com/get_api", {
                method: "POST",
                //mode: "no-cors",
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
            //setStudentSurveyQuestion([]);
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
            openForm_SurveyMod();
      };
        const getClassList = e => {

            const objectToSend = {
                id : user.id
            }
            setDisplayClassList(false);
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
            fetch("https://survey-manager-yb-scsu.herokuapp.com/set_survey_to_class", {
                method: "POST",
                //mode: "no-cors",
                headers: {
                "Content-type": "application/json",
              },
                body: JSON.stringify(objectToSend1),
            })
              .then((res) => res.json())
              .then((res) => {
                  if(res === "success")
                  {
                      setResultState("success");
                  }
                  else
                  {
                      setResultState("failure");
                  }
              });
            closeForm_Instructions();
      };
            const openForm_SurveyMod = () => {
                document.getElementById("instructionForm").style.display = "none";
                document.getElementById("SurveyMod").style.display = "block";
            };
            const closeForm_SurveyMod = () => {
                document.getElementById("instructionForm").style.display = "block";
                document.getElementById("SurveyMod").style.display = "none";
            };
            const openForm_Instructions = () => {
                document.getElementById("instructionForm").style.display = "block";
                document.getElementById("DataGrid").style.display = "none";
                setShownButton(true);
            };
            const closeForm_Instructions = () => {
                document.getElementById("instructionForm").style.display = "none";
                document.getElementById("DataGrid").style.display = "block";
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
                displayClassList === true ? getClassList() : ""
        }
        <h2>List of all Surveys</h2>
        <div id="DataGrid">
            <MDBDataTable
                striped
                bordered
                small
                data={dataObj}
              />
        </div>
        <div className="form-wrapper" id="SurveyMod">
            {
                  isShown === true ? <Form surveyModification={studentSurvey} user={user} closeForm_SurveyMod={closeForm_SurveyMod}/> : ""
            }
            <label htmlFor="result"></label>
            {resultState === "success" && (
                <span className="badge-success">Survey was successfully assigned to this class</span>
            )}
            {resultState === "failure" && (
                <span className="errorMessage">Survey was already assigned to this class</span>
            )}
        </div>
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
                    <h5 >Assign survey to a class : </h5>
                    <div key="classList" align="center">
                        <select onChange={handleSelectChange} value={classIdState} name="className" id="111">
                            {
                                classList.map((val, idx) => (

                                    <option value={val.classID}>{val.className}</option>
                                ))
                             }
                        </select>
                    </div>
              <table border={0} id="556" align="center" className="table-grid">
                  <tbody align="center">
                    <tr key={433}>
                      <td>
                            {
                                isShownButton === true ? <input type="submit" className="btn-danger" onClick={closeForm_Instructions} value="Close"/> : ""
                            }
                      </td>
                      <td>
                            {
                                isShownButton === true ? <input type="submit" className="btn-primary" onClick={(id) =>modifySurvey()}  value="Duplicate Survey" /> : ""
                            }
                      </td>
                      <td>
                            {
                                isShownButton === true ? <input type="submit" className="btn-primary" onClick={(id) =>SetSurveyClass()}  value="Assign Survey to Class" /> : ""
                            }
                      </td>
                    </tr>
                  </tbody>
            </table>
        </div>

    </div>
  );
}

export default DisplayClassSurvey;